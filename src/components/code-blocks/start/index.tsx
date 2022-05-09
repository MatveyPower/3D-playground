import { Component, Prop } from 'vue-property-decorator'
import styles from './style.module.css'
import { CodeBlock } from '../code-block'
import { DraggableItemComponentsParts } from '@/components/draggable-item'

interface StartBlockProps {
  item: DraggableItemComponentsParts
}

@Component
export class StartBlock extends CodeBlock {
  @Prop()
  item: StartBlockProps['item']

  blockStyle = {
    block: [styles.block, styles.color],
    rhombus: [styles.color],
  }

  renderContent() {
    return <div>{this.item.name}</div>
  }
}
