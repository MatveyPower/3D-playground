import Vue, { VNode } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import {
  ActionBlock,
  ConditionBlock,
  StartBlock,
  FinishBlock,
} from '@/components'

export enum DraggableItemEnum {
  if = 'if',
  action = 'action',
  start = 'start',
  finish = 'finish',
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
}

@Component
export class DraggableItem extends Vue {
  @Prop()
  item: DraggableItemProps['item']

  get draggableItem(): Record<DraggableItemEnum, VNode> {
    return {
      start: <StartBlock item={this.item} />,

      action: <ActionBlock item={this.item} />,

      if: <ConditionBlock item={this.item} />,

      finish: <FinishBlock item={this.item} />,
    }
  }

  render() {
    return this.draggableItem[this.item.type]
  }
}
