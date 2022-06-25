import { Component, Prop } from 'vue-property-decorator'
import styles from './style.module.css'
import { CodeBlock } from '../code-block'
import { DraggableItemComponentsParts } from '@/components/draggable-item'

interface CircleBlockProps {
  item: DraggableItemComponentsParts
  whenChangeInput?: (value: string) => void
  inputValue: string
}

@Component
export class CircleBlock extends CodeBlock {
  @Prop()
  item: CircleBlockProps['item']

  @Prop()
  whenChangeInput: CircleBlockProps['whenChangeInput']

  @Prop({
    default: '0',
  })
  inputValue: CircleBlockProps['inputValue']

  blockStyle = {
    block: [styles.block, styles.color],
    rhombus: [styles.rhombus],
  }

  renderContent() {
    return (
      <div>
        {this.item.name}
        <input
          value={this.inputValue}
          class={styles.input}
          type="text"
          onInput={(value: any) => {
            if (value.data) {
              this.whenChangeInput?.(this.inputValue + value.data)
            } else {
              this.whenChangeInput?.(
                this.inputValue.slice(0, this.inputValue.length - 1)
              )
            }
          }}
        />
      </div>
    )
  }
}
