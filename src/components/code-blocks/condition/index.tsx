import { Component, Prop } from 'vue-property-decorator'
import styles from './style.module.css'
import { CodeBlock } from '../code-block'
import { DraggableItemComponentsParts } from '@/components/draggable-item'
import { DropdownSelect } from '@/components'

interface ConditionBlockProps {
  item: DraggableItemComponentsParts
}

@Component
export class ConditionBlock extends CodeBlock {
  @Prop()
  item: ConditionBlockProps['item']

  blockStyle = {
    block: [styles.block, styles.color],
    rhombus: [styles.color],
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
}
