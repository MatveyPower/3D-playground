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

  selected = options[0]

  blockStyle = {
    block: [styles.block, styles.color],
    rhombus: [styles.rhombus],
  }

  inputValue = ''

  renderContent() {
    return (
      <div>
        <CodeBlockSettings type={'action'} />
        {this.item.name}
        <DropdownSelect
          whenClick={this.whenClickDropdownSelect}
          options={options}
          selected={this.selected}
          values={optionsRusForAction}
        />
        <input
          value={this.inputValue}
          class={styles.input}
          type="text"
          onInput={(value: any) => {
            if (value.data) {
              this.inputValue = this.inputValue += value.data
              this.whenChangeInput?.(this.inputValue)
            } else {
              this.inputValue = this.inputValue.slice(0, -1)
            }
          }}
        />
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
