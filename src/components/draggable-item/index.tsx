import Vue, { VNode } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import {
  ActionBlock,
  IfBlock,
  CircleBlock,
  CircleEndBlock,
  IfEndBlock,
} from '@/components'

import styles from './style.module.css'
import { Action, CodeBlockType, Position } from '../draggable-wrapper'

export enum DraggableItemEnum {
  if = 'if',
  action = 'action',
  circle = 'circle',
  circleEnd = 'circleEnd',
  ifEnd = 'ifEnd',
}

export type DraggableItemComponentsParts = {
  name: string
  order: number
  fixable: boolean
  position?: Position
  duration?: string
  condition?: Action
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
          inputValue={this.item.duration}
          selectValue={this.item.action}
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

      ifEnd: <IfEndBlock item={this.item} />,
      if: (
        <IfBlock
          selectValue={this.item.position}
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
      circle: (
        <CircleBlock
          inputValue={this.item.duration}
          whenClick={() => this.whenClick?.(this.item)}
          whenMouseOver={() => (this.showDescriptionIf = true)}
          whenMouseOut={() => (this.showDescriptionIf = false)}
          class={{
            [styles.chooseCycle]: this.dragIteminChoose,
          }}
          item={this.item}
          showDescription={this.showDescriptionIf && this.dragIteminChoose}
          whenClickDropdownSelect={(value: any) => {
            this.whenClickDropdownSelect?.(this.item, value)
          }}
          whenChangeInput={(value: any) => {
            this.whenChangeInput?.(this.item, value)
          }}
        />
      ),
      circleEnd: <CircleEndBlock item={this.item} />,
    }
  }

  render() {
    return this.draggableItem[this.item.type]
  }
}
