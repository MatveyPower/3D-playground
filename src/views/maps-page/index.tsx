import Vue from 'vue'
import Component from 'vue-class-component'
import {
  Canvas3d,
  DefaultLayout,
  Button,
  MapCard,
  SelectedMap,
} from '../../components'
import store, { MyStore } from '@/store'
import { Map } from '@/store/modules/maps'
import { useModule } from 'vuex-simple'

import styles from './style.module.css'
import { Input } from '@/components/input'

@Component({
  components: {
    Canvas3d,
  },
})
export class MapsPage extends Vue {
  store = useModule<MyStore>(this.$store) as MyStore
  mapsArr = store

  maps: Array<Map> = this.store.maps.maps

  selectedMap: Map = this.maps[0]

  search = ''
  isHidePassedCards = false
  isSortWithRating = false

  get selected() {
    return this.selectedMap
  }

  clickOnMap(map: Map) {
    this.selectedMap = map
    this.store.maps.setSelectionMap(map)
  }

  get mapsSearch() {
    let newMaps = [...this.maps]
    if (this.search !== '') {
      newMaps = newMaps.filter((map) =>
        map.name.toLowerCase().includes(this.search.toLowerCase())
      )
    }
    if (this.isHidePassedCards && this.store.user.user) {
      newMaps = newMaps.filter((map) => !this.isPassedMap(map.name))
    }
    if (this.isSortWithRating && this.store.user.user) {
      newMaps = newMaps.sort(({ rating: a }, { rating: b }) => a - b)
    }
    return newMaps
  }

  isPassedMap(name: string) {
    const userPassedMaps = this.store.user.user.passedMaps
    return userPassedMaps.some((map: any) => map.map === name)
  }

  render() {
    return (
      <DefaultLayout>
        <div class={styles.root}>
          <div class={styles.headerWrapper}>
            <div class={styles.headerText}>Карты для прохождения</div>
            <div class={styles.headerButtonsWrapper}>
              <Button
                disabled={true}
                class={styles.headerButtons}
                whenClick={() => this.$router.push('/playground')}
                text={'Создать карту'}
              />

              <Button
                disabled={true}
                class={styles.headerButtons}
                whenClick={() => this.$router.push('/playground')}
                text={'Загрузить карту'}
              />
            </div>
          </div>
          <div class={styles.body}>
            <div class={styles.mapsList}>
              <Input
                placeholder="Поиск"
                class={styles.searchInput}
                value={this.search}
                whenChange={(v: string) => (this.search = v)}
              />
              <div class={styles.filters}>
                <Button
                  class={[
                    styles.filterButton,
                    this.isHidePassedCards && styles.filterButtonActive,
                  ]}
                  text="Скрыть пройденые карты"
                  whenClick={() =>
                    (this.isHidePassedCards = !this.isHidePassedCards)
                  }
                  disabled={!this.store.user.user}
                />
                <Button
                  class={[
                    styles.filterButton,
                    this.isSortWithRating && styles.filterButtonActive,
                  ]}
                  text="Отсортировать по рейтингу"
                  whenClick={() =>
                    (this.isSortWithRating = !this.isSortWithRating)
                  }
                  disabled={!this.store.user.user}
                />
              </div>
              {this.mapsSearch.map(
                ({ name, desciption, rating, structure }) => (
                  <div
                    onClick={() =>
                      this.clickOnMap({ name, desciption, rating, structure })
                    }
                  >
                    <MapCard
                      passed={this.store.user.user && this.isPassedMap(name)}
                      name={name}
                      desciption={desciption}
                      rating={rating}
                      class={this.selectedMap.name === name && styles.activeMap}
                    />
                  </div>
                )
              )}
            </div>
            <SelectedMap
              selectedMap={this.selected}
              passed={
                this.store.user.user && this.isPassedMap(this.selected.name)
              }
            />
          </div>
        </div>
      </DefaultLayout>
    )
  }
}
