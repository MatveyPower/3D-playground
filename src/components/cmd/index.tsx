import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { MyStore } from '@/store'
import { useModule } from 'vuex-simple'

import styles from './style.module.css'
import { Action, CodeBlockType } from '../draggable-wrapper'
import { DraggableItemEnum } from '../draggable-item'

// interface ControlButtonsProps {
//   whenClickRestart: () => void
//   whenClickPlay: () => void
//   whenClickStop: () => void
// }

@Component
export class Cmd extends Vue {
  // @Prop()
  // whenClickRestart: ControlButtonsProps['whenClickRestart']

  store = useModule<MyStore>(this.$store)
  data: CodeBlockType[] = []

  @Watch('store.game.activeBlock', { immediate: true, deep: true })
  updateData() {
    if (this.store?.game.activeBlock) {
      this.data.shift()
      this.data.push(this.store.game.activeBlock)
    }

    if (this.$refs.list) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.$refs.list.scrollTop = 100000
    }
  }

  renderCmdBlocks(block: CodeBlockType) {
    switch (block.type) {
      case DraggableItemEnum.action:
        return (
          <div class={styles.line}>
            <div class={[styles.title, styles.actionTitle]}>
              Выполнение действия
            </div>
            <div class={styles.duration}>
              Длительность {block.duration} сек.
            </div>
          </div>
        )

      case DraggableItemEnum.if:
        return (
          <div class={styles.line}>
            <div class={[styles.title, styles.ifTitle]}>Проверка условия</div>
            {/* <div class={styles.duration}>
              {block?.status}
            </div> */}
          </div>
        )

      default:
        break
    }
  }

  render() {
    return (
      <div class={styles.root} ref="list">
        {this.data.map(this.renderCmdBlocks)}
      </div>
    )
  }
}
