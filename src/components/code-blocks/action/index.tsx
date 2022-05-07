import { Component, Prop } from 'vue-property-decorator'
import styles from './style.module.css'
import { CodeBlock } from '../code-block'
import { DraggableItemComponentsParts } from '@/components/draggable-item'

interface ActionBlockProps {
  item: DraggableItemComponentsParts
}

@Component
export class ActionBlock extends CodeBlock {
  @Prop()
  item: ActionBlockProps['item']

  blockStyle = {
    block: [styles.block, styles.color],
    rhombus: [styles.color],
  }

  renderContent() {
    return (
      <div>
        {this.item.name}
        <input type="text" />
      </div>
    )
  }
}
