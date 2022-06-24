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

  get selected() {
    return this.selectedMap
  }

  clickOnMap(map: Map) {
    this.selectedMap = map
    this.store.maps.setSelectionMap(map)
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
              {this.maps.map(({ name, desciption, rating, structure }) => (
                <div
                  onClick={() =>
                    this.clickOnMap({ name, desciption, rating, structure })
                  }
                >
                  <MapCard
                    name={name}
                    desciption={desciption}
                    rating={rating}
                  />
                </div>
              ))}
            </div>
            <SelectedMap selectedMap={this.selected} />
          </div>
        </div>
      </DefaultLayout>
    )
  }
}
