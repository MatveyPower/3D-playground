import { Component, Prop } from 'vue-property-decorator'
import styles from './style.module.css'
import { CodeBlock } from '../code-block'
import { DraggableItemComponentsParts } from '@/components/draggable-item'

interface IfEndBlockProps {
  item: DraggableItemComponentsParts
  dragIteminChoose?: boolean
}

@Component
export class IfEndBlock extends CodeBlock {
  @Prop()
  item: IfEndBlockProps['item']

  blockStyle = {
    block: [styles.block, styles.color],
    rhombus: [styles.rhombus],
  }

  renderContent() {
    return <div class={styles.ifEndWrapper}>{this.item.name}</div>
  }
}
