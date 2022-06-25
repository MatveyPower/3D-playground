import { Component, Prop } from 'vue-property-decorator'
import styles from './style.module.css'
import { CodeBlock } from '../code-block'
import { DraggableItemComponentsParts } from '@/components/draggable-item'

interface CircleEndkProps {
  item: DraggableItemComponentsParts
}

@Component
export class CircleEndBlock extends CodeBlock {
  @Prop()
  item: CircleEndkProps['item']

  blockStyle = {
    block: [styles.block, styles.color],
    rhombus: [styles.rhombus],
  }

  renderContent() {
    return <div>{this.item.name}</div>
  }
}
