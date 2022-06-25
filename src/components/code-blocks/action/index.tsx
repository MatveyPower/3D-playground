import { Component, Prop } from 'vue-property-decorator'
import styles from './style.module.css'
import { CodeBlock } from '../code-block'
import { DraggableItemComponentsParts } from '@/components/draggable-item'
import { CodeBlockSettings, DropdownSelect } from '@/components'
import { Action } from '@/components/draggable-wrapper'

interface ActionBlockProps {
  item: DraggableItemComponentsParts
  dragIteminChoose?: boolean
  whenClickDropdownSelect?: (item: any, value: any) => void
  whenChangeInput?: (value: string) => void
  inputValue: string
  selectValue: string
}

const options = [Action.forward, Action.back, Action.left, Action.right]

export const optionsRusForAction: Record<Action, string> = {
  [Action.forward]: 'Вперед',
  [Action.back]: 'Назад',
  [Action.left]: 'Влево',
  [Action.right]: 'Вправо',
}

@Component
export class ActionBlock extends CodeBlock {
  @Prop()
  item: ActionBlockProps['item']

  @Prop()
  whenClickDropdownSelect: ActionBlockProps['whenClickDropdownSelect']

  @Prop()
  whenChangeInput: ActionBlockProps['whenChangeInput']

  @Prop({
    default: '0',
  })
  inputValue: ActionBlockProps['inputValue']

  @Prop()
  selectValue: ActionBlockProps['selectValue']

  selected = options[0]

  blockStyle = {
    block: [styles.block, styles.color],
    rhombus: [styles.rhombus],
  }

  renderContent() {
    return (
      <div>
        <div class={styles.nameActionWrapper}>
          {this.item.name}
          <CodeBlockSettings type={'action'} />
        </div>
        <div class={styles.dropdowSelectInput}>
          <DropdownSelect
            class={styles.dropdownSelect}
            whenClick={this.whenClickDropdownSelect}
            options={options}
            selected={this.selectValue}
            values={optionsRusForAction}
          />
          <input
            value={this.inputValue}
            class={styles.input}
            type="text"
            onInput={(value: any) => {
              console.log(this.inputValue)
              if (value.data) {
                this.whenChangeInput?.(this.inputValue + value.data)
              } else {
                this.whenChangeInput?.(
                  this.inputValue.slice(0, this.inputValue.length - 1)
                )
              }
            }}
          />
          сек
        </div>
      </div>
    )
  }

  renderDescription() {
    return (
      <div>
        <div>Блок действие</div>
        <div>Выполняет действие за указанное время</div>
      </div>
    )
  }
}
