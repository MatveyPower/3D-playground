import Vue, { VNode } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import {
  ActionBlock,
  IfBlock,
  StartBlock,
  FinishBlock,
  IfEndBlock,
} from '@/components'

import styles from './style.module.css'
import { Action, CodeBlockType, Position } from '../draggable-wrapper'

export enum DraggableItemEnum {
  if = 'if',
  action = 'action',
  // start = 'start',
  // finish = 'finish',
  ifEnd = 'IfEnd',
}

export type DraggableItemComponentsParts = {
  name: string
  order: number
  fixable: boolean
  position?: Position
  duration?: number
  action?: Action
  type: DraggableItemEnum
  id: number
}

interface DraggableItemProps {
  item: DraggableItemComponentsParts
  dragIteminChoose?: boolean
  whenClick?: (item: DraggableItemComponentsParts) => void
  whenClickDropdownSelect?: (
    item: DraggableItemComponentsParts,
    value: any
  ) => void
  whenChangeInput?: (item: DraggableItemComponentsParts, value: any) => void
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

  @Prop()
  whenClickDropdownSelect: DraggableItemProps['whenClickDropdownSelect']

  @Prop()
  whenChangeInput: DraggableItemProps['whenChangeInput']

  showDescriptionAction = false
  showDescriptionIf = false

  get draggableItem(): Record<DraggableItemEnum, VNode> {
    return {
      action: (
        <ActionBlock
          whenClick={() => this.whenClick?.(this.item)}
          whenMouseOver={() => (this.showDescriptionAction = true)}
          whenMouseOut={() => (this.showDescriptionAction = false)}
          class={{
            [styles.chooseAction]: this.dragIteminChoose,
          }}
          item={this.item}
          showDescription={this.showDescriptionAction && this.dragIteminChoose}
          whenClickDropdownSelect={(value: any) => {
            this.whenClickDropdownSelect?.(this.item, value)
          }}
          whenChangeInput={(value: any) => {
            this.whenChangeInput?.(this.item, value)
          }}
        />
      ),

      IfEnd: <IfEndBlock item={this.item} />,
      if: (
        <IfBlock
          whenClick={() => this.whenClick?.(this.item)}
          whenMouseOver={() => (this.showDescriptionIf = true)}
          whenMouseOut={() => (this.showDescriptionIf = false)}
          class={{
            [styles.chooseIf]: this.dragIteminChoose,
          }}
          item={this.item}
          showDescription={this.showDescriptionIf && this.dragIteminChoose}
          whenClickDropdownSelect={(value: any) => {
            this.whenClickDropdownSelect?.(this.item, value)
          }}
        />
      ),
    }
  }

  render() {
    return this.draggableItem[this.item.type]
  }
}
