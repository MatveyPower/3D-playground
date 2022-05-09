import { Component, Prop } from 'vue-property-decorator'
import styles from './style.module.css'
import { CodeBlock } from '../code-block'
import { DraggableItemComponentsParts } from '@/components/draggable-item'

interface FinishBlockProps {
  item: DraggableItemComponentsParts
}

@Component
export class FinishBlock extends CodeBlock {
  @Prop()
  item: FinishBlockProps['item']

  blockStyle = {
    block: [styles.block, styles.color],
    rhombus: [styles.color],
  }

  renderContent() {
    return <div>{this.item.name}</div>
  }
}
