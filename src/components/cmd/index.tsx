import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { MyStore } from '@/store'
import { useModule } from 'vuex-simple'

import styles from './style.module.css'
import { Action, CodeBlockType } from '../draggable-wrapper'
import { DraggableItemEnum } from '../draggable-item'
import { cmdMsg } from '@/store/modules/game'

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
  data: Array<CodeBlockType | cmdMsg> = []

  @Watch('store.game.activeBlock', { immediate: true, deep: true })
  updateData() {
    if (this.store?.game.activeBlock) {
      // this.data.shift()
      this.data.push(this.store.game.activeBlock)
    }

    if (this.$refs.list) {
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.$refs.list.scrollTop = 100000
      }, 1)
    }
  }

  @Watch('store.game.cmdMessage', { immediate: true, deep: true })
  updateMessage() {
    if (this.store?.game.cmdMessage) {
      this.data.push(this.store?.game.cmdMessage)
      setTimeout(() => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-expect-error
        this.$refs.list.scrollTop = 100000
      }, 1)
    }
  }

  renderSelectOption(block: CodeBlockType) {
    switch (block.action) {
      case Action.forward:
        return 'Вперед ⬆'
      case Action.back:
        return 'Назад ⬇'
      case Action.right:
        return 'Вправо ➡'
      case Action.left:
        return 'Влево ⬅'

      default:
        break
    }
  }

  renderCmdBlocks(block: CodeBlockType | cmdMsg) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    switch (block?.type) {
      case DraggableItemEnum.action:
        return (
          <div class={styles.line}>
            <div class={[styles.title, styles.actionTitle]}>
              Выполнение действия
            </div>
            <div class={styles.duration}>
              {this.renderSelectOption(block as CodeBlockType)}
            </div>
            <div class={styles.duration}>
              Длительность {(block as CodeBlockType).duration} сек.
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
    }

    if ((block as cmdMsg).status) {
      return (
        <div class={styles.line}>
          <div
            class={[styles.title, styles[`color-${(block as cmdMsg).status}`]]}
          >
            {(block as cmdMsg).message}
          </div>
        </div>
      )
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
