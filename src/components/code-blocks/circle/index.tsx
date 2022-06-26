import { Component, Prop } from 'vue-property-decorator'
import styles from './style.module.css'
import { CodeBlock } from '../code-block'
import { DraggableItemComponentsParts } from '@/components/draggable-item'
import { Input } from '@/components/input'

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
      <div class={styles.content}>
        {this.item.name}
        <Input
          class={styles.input}
          value={this.inputValue}
          whenChange={(value: any) => {
            console.log(this.inputValue)
            this.whenChangeInput?.(value)
          }}
        />
        раз
      </div>
    )
  }

  renderDescription() {
    return (
      <div>
        <div class={styles.descriptionTitle}>
          Цикл <span class={styles.description}>повторяет вложенный код</span>
        </div>
      </div>
    )
  }
}
