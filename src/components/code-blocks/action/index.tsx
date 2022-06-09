import { Component, Prop } from 'vue-property-decorator'
import styles from './style.module.css'
import { CodeBlock } from '../code-block'
import { DraggableItemComponentsParts } from '@/components/draggable-item'

interface ActionBlockProps {
  item: DraggableItemComponentsParts
  dragIteminChoose?: boolean
}

@Component
export class ActionBlock extends CodeBlock {
  @Prop()
  item: ActionBlockProps['item']

  blockStyle = {
    block: [styles.block, styles.color],
    rhombus: [styles.rhombus],
  }

  renderContent() {
    return (
      <div>
        {this.item.name}
        <input type="text" />
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
