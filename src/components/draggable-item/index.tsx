import Vue, { VNode } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import {
  ActionBlock,
  ConditionBlock,
  StartBlock,
  FinishBlock,
  IfEndBlock,
} from '@/components'

import styles from './style.module.css'

export enum DraggableItemEnum {
  if = 'if',
  action = 'action',
  start = 'start',
  finish = 'finish',
  ifEnd = 'IfEnd',
}

export type DraggableItemComponentsParts = {
  name: string
  order: number
  fixable: boolean
  type: DraggableItemEnum
  id: number
}

interface DraggableItemProps {
  item: DraggableItemComponentsParts
  dragIteminChoose?: boolean
  whenClick?: (item: any) => void
}

@Component
export class DraggableItem extends Vue {
  @Prop()
  item: DraggableItemProps['item']

  @Prop({
    default: false,
  })
  dragIteminChoose: DraggableItemProps['dragIteminChoose']

  @Prop()
  whenClick: DraggableItemProps['whenClick']

  showDescriptionAction = false
  showDescriptionIf = false

  get draggableItem(): Record<DraggableItemEnum, VNode> {
    return {
      start: <StartBlock item={this.item} />,

      action: (
        <ActionBlock
          whenClick={this.whenClick}
          whenMouseOver={() => (this.showDescriptionAction = true)}
          whenMouseOut={() => (this.showDescriptionAction = false)}
          class={{
            [styles.chooseAction]: this.dragIteminChoose,
          }}
          item={this.item}
          showDescription={this.showDescriptionAction && this.dragIteminChoose}
        />
      ),

      IfEnd: <IfEndBlock item={this.item} />,
      if: <ConditionBlock item={this.item} />,

      finish: <FinishBlock item={this.item} />,
    }
  }

  render() {
    return this.draggableItem[this.item.type]
  }
}
