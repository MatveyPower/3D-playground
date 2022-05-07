import Vue from 'vue'
import Component from 'vue-class-component'
import { Canvas3d, DraggableWrapper } from '../../components'

import styles from './style.module.css'

@Component({
  components: {
    Canvas3d,
  },
})
export class PlaygroundPage extends Vue {
  render() {
    return (
      <div class={styles.playgroundPageContainer}>
        <DraggableWrapper class={styles.dropdownWrapper} />
        <Canvas-3d />
      </div>
    )
  }
}
