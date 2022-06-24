import Vue from 'vue'
import Component from 'vue-class-component'
import {
  Canvas3d,
  DefaultLayout,
  DraggableWrapper,
  ControlButtons,
} from '../../components'
import { MyStore } from '@/store'
import { useModule } from 'vuex-simple'

import styles from './style.module.css'
import { MapStructure } from '@/store/modules/maps'

@Component({
  components: {
    Canvas3d,
  },
})
export class PlaygroundPage extends Vue {
  store = useModule<MyStore>(this.$store) as MyStore

  selectedMap = this.store.maps.selectedMap.structure

  render() {
    return (
      <DefaultLayout>
        <div class={styles.playgroundPageContainer}>
          <DraggableWrapper class={styles.dropdownWrapper} />
          <div class={styles.rightBlock}>
            <Canvas-3d map={this.selectedMap} />
            <ControlButtons
              whenClickRestart={() => console.log('123')}
              whenClickPlay={this.store.game.startProgram}
              whenClickStop={this.store.game.stopProgram}
            />
          </div>
        </div>
      </DefaultLayout>
    )
  }
}
