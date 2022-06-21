import { Component, Prop } from 'vue-property-decorator'
import styles from './style.module.css'
import { CodeBlock } from '../code-block'
import { DraggableItemComponentsParts } from '@/components/draggable-item'
import { DropdownSelect, CodeBlockSettings } from '@/components'
import { Position } from '@/components/draggable-wrapper'

interface IfBlockProps {
  item: DraggableItemComponentsParts
  dragIteminChoose?: boolean
  whenClickDropdownSelect?: (item: any, value: any) => void
}

const options = [Position.front, Position.behind, Position.left, Position.right]

export const optionsRusForIf: Record<Position, string> = {
  [Position.front]: 'Вперед',
  [Position.behind]: 'Назад',
  [Position.left]: 'Влево',
  [Position.right]: 'Вправо',
}

@Component
export class IfBlock extends CodeBlock {
  @Prop()
  item: IfBlockProps['item']

  @Prop()
  dragIteminChoose: IfBlockProps['dragIteminChoose']

  @Prop()
  whenClickDropdownSelect: IfBlockProps['whenClickDropdownSelect']

  blockStyle = {
    block: [styles.block, styles.color],
    rhombus: [styles.rhombus],
  }

  selected = options[0]

  renderContent() {
    return (
      <div>
        <div class={styles.nameActionWrapper}>
          {this.item.name}
          <CodeBlockSettings type={'action'} />
        </div>
        <DropdownSelect
          class={styles.dropdownSelect}
          whenClick={this.whenClickDropdownSelect}
          options={options}
          selected={this.selected}
          values={optionsRusForIf}
        />
      </div>
    )
  }

  renderDescription() {
    return (
      <div>
        <div>Блок условие</div>
        <div>
          Дает выполнить вложенные блоки, только если условие выполняется
        </div>
      </div>
    )
  }
}
