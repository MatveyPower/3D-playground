import { Component, Prop } from 'vue-property-decorator'
import styles from './style.module.css'
import { CodeBlock } from '../code-block'
import { DraggableItemComponentsParts } from '@/components/draggable-item'
import { DropdownSelect } from '@/components'

interface ConditionBlockProps {
  item: DraggableItemComponentsParts
  dragIteminChoose?: boolean
}

@Component
export class ConditionBlock extends CodeBlock {
  @Prop()
  item: ConditionBlockProps['item']

  @Prop()
  dragIteminChoose: ConditionBlockProps['dragIteminChoose']

  blockStyle = {
    block: [styles.block, styles.color],
    rhombus: [styles.rhombus],
  }

  renderContent() {
    return (
      <div>
        {this.item.name}
        <DropdownSelect />
        <DropdownSelect />
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
