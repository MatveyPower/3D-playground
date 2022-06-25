import Vue from 'vue'
import Component from 'vue-class-component'
import {
  Canvas3d,
  DefaultLayout,
  DraggableWrapper,
  ControlButtons,
  Button,
} from '../../components'
import { MyStore } from '@/store'
import { useModule } from 'vuex-simple'
import { Watch } from 'vue-property-decorator'

import styles from './style.module.css'
import { Cmd } from '@/components/cmd'

@Component({
  components: {
    Canvas3d,
  },
})
export class PlaygroundPage extends Vue {
  store = useModule<MyStore>(this.$store) as MyStore

  selectedMap = this.store.maps.selectedMap.structure
  rating = this.store.maps.selectedMap.rating

  isShowMapPassedWindow = false

  @Watch('store.game.mapPassed', { immediate: true, deep: true })
  showMapPassedWindow() {
    this.isShowMapPassedWindow = this.store.game.mapPassed
  }

  restart() {
    this.store.game.removeProgram()
    this.selectedMap = {
      ...this.store.maps.selectedMap.structure,
    }
    this.store.game.stopRemoveProgram()
  }

  renderRating() {
    const renderArr = []
    for (let i = 1; i <= 5; i++) {
      if (i <= this.rating) {
        renderArr.push(
          <svg
            class={styles.ratingStar}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.4829 5.63406L10.6864 4.90408L8.54222 0.352135C8.48365 0.227506 8.38731 0.126615 8.26829 0.0652895C7.96981 -0.0890138 7.6071 0.0395723 7.45786 0.352135L5.3137 4.90408L0.517213 5.63406C0.384974 5.65384 0.26407 5.71912 0.171503 5.81803C0.0595945 5.93848 -0.0020722 6.10053 5.31712e-05 6.26856C0.00217854 6.4366 0.0679221 6.59688 0.182838 6.71418L3.65316 10.2572L2.83328 15.2602C2.81405 15.3766 2.82635 15.4963 2.86878 15.6057C2.91121 15.7151 2.98207 15.8099 3.07333 15.8793C3.16459 15.9488 3.27259 15.99 3.38509 15.9984C3.4976 16.0068 3.6101 15.982 3.70983 15.9269L8.00004 13.5648L12.2902 15.9269C12.4074 15.9922 12.5434 16.0139 12.6737 15.9902C13.0024 15.9308 13.2235 15.6044 13.1668 15.2602L12.3469 10.2572L15.8172 6.71418C15.9117 6.61724 15.974 6.49064 15.9929 6.35216C16.0439 6.00597 15.8135 5.68549 15.4829 5.63406V5.63406Z" />
          </svg>
        )
      } else {
        renderArr.push(
          <svg
            class={styles.notRatingStar}
            width="16"
            height="16"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M15.4829 5.63406L10.6864 4.90408L8.54222 0.352135C8.48365 0.227506 8.38731 0.126615 8.26829 0.0652895C7.96981 -0.0890138 7.6071 0.0395723 7.45786 0.352135L5.3137 4.90408L0.517213 5.63406C0.384974 5.65384 0.26407 5.71912 0.171503 5.81803C0.0595945 5.93848 -0.0020722 6.10053 5.31712e-05 6.26856C0.00217854 6.4366 0.0679221 6.59688 0.182838 6.71418L3.65316 10.2572L2.83328 15.2602C2.81405 15.3766 2.82635 15.4963 2.86878 15.6057C2.91121 15.7151 2.98207 15.8099 3.07333 15.8793C3.16459 15.9488 3.27259 15.99 3.38509 15.9984C3.4976 16.0068 3.6101 15.982 3.70983 15.9269L8.00004 13.5648L12.2902 15.9269C12.4074 15.9922 12.5434 16.0139 12.6737 15.9902C13.0024 15.9308 13.2235 15.6044 13.1668 15.2602L12.3469 10.2572L15.8172 6.71418C15.9117 6.61724 15.974 6.49064 15.9929 6.35216C16.0439 6.00597 15.8135 5.68549 15.4829 5.63406V5.63406Z" />
          </svg>
        )
      }
    }

    return renderArr
  }

  renderPassedWindow() {
    const map = this.store.maps.selectedMap

    return (
      <div class={styles.popupRoot}>
        <div class={styles.popupBody}>
          <div class={styles.popupTitle}>Карта пройдена!</div>
          <div class={styles.popupMapName}>{map.name}</div>
          <div class={styles.popupPlusRaiting}>
            {' '}
            + {this.rating * 10} к рейтингу!
          </div>
          <div class={styles.popupRating}>{this.renderRating()}</div>
          <div class={styles.popupButtons}>
            <Button
              text={'Назад'}
              class={styles.popupButtonBack}
              whenClick={() => {
                this.isShowMapPassedWindow = false
                this.store.game.nullMapPassed()
              }}
            />
            <Button
              text={'К списку карт'}
              class={styles.popupButtonMaps}
              whenClick={() => {
                this.store.game.nullMapPassed()
                this.$router.push('/maps')
              }}
            />
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <DefaultLayout>
        <div class={styles.playgroundPageContainer}>
          <DraggableWrapper class={styles.dropdownWrapper} />
          <div class={styles.rightBlock}>
            <Canvas-3d map={this.selectedMap} />
            <ControlButtons
              whenClickRestart={this.restart}
              whenClickPlay={() => {
                this.store.game.setCmdMessage({
                  status: 'green',
                  message: 'Старт программы',
                })
                this.store.game.startProgram()
              }}
              whenClickStop={this.store.game.stopProgram}
            />
            <Cmd />
          </div>
        </div>
        {this.isShowMapPassedWindow && this.renderPassedWindow()}
      </DefaultLayout>
    )
  }
}
