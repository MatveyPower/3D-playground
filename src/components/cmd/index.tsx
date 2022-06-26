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
        {this.data.length === 0 && (
          <div class={styles.emptyCmd}>
            Нажмите на
            <svg
              class={styles.icon}
              width="25"
              height="24"
              viewBox="0 0 25 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M17.894 13.0455L8.3495 18.5835C7.5395 19.053 6.5 18.4845 6.5 17.538V6.462C6.5 5.517 7.538 4.947 8.3495 5.418L17.894 10.956C18.0783 11.0612 18.2314 11.2132 18.3379 11.3967C18.4445 11.5802 18.5006 11.7886 18.5006 12.0008C18.5006 12.2129 18.4445 12.4213 18.3379 12.6048C18.2314 12.7883 18.0783 12.9403 17.894 13.0455Z" />
            </svg>
            для запуска программы
          </div>
        )}
      </div>
    )
  }
}
