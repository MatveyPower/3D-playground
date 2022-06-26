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
  selectValue: string
}

const options = [Position.front, Position.behind, Position.left, Position.right]

export const optionsRusForIf: Record<Position, string> = {
  [Position.front]: 'Впереди',
  [Position.behind]: 'Сзади',
  [Position.left]: 'Слева',
  [Position.right]: 'Справа',
}

@Component
export class IfBlock extends CodeBlock {
  @Prop()
  item: IfBlockProps['item']

  @Prop()
  dragIteminChoose: IfBlockProps['dragIteminChoose']

  @Prop()
  whenClickDropdownSelect: IfBlockProps['whenClickDropdownSelect']

  @Prop()
  selectValue: IfBlockProps['selectValue']

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
        <div class={styles.dropdowSelectInput}>
          <DropdownSelect
            whenClick={this.whenClickDropdownSelect}
            options={options}
            selected={this.selectValue}
            values={optionsRusForIf}
          />
          препятствие
        </div>
      </div>
    )
  }

  renderDescription() {
    return (
      <div>
        <div class={styles.descriptionTitle}>Блок условие</div>
        <div class={styles.description}>
          Дает выполнить вложенные блоки, только если условие выполняется
        </div>
      </div>
    )
  }
}
