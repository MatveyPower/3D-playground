import Vue, { VNode } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { DropdownSelect } from '@/components'
import styles from './style.module.css'

export enum DraggableItemEnum {
  condition = 'condition',
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
      start: (
        <div class={[styles.dragItem, styles.start, styles.colorStart]}>
          {this.item.name}
          <div class={[styles.rectangle, styles.colorStart]}></div>
        </div>
      ),

      action: (
        <div class={[styles.dragItem, styles.action, styles.colorAction]}>
          {this.item.name}
          {/* TODO сделать отедльным компонентом инпут и стилизовать */}
          <input />
          <div class={[styles.rectangle, styles.colorAction]}></div>
        </div>
      ),

      condition: (
        <div class={[styles.dragItem, styles.condition, styles.colorCondition]}>
          {this.item.name}
          <DropdownSelect />
          <DropdownSelect />
          <div class={[styles.rectangle, styles.colorCondition]}></div>
        </div>
      ),

      finish: (
        <div class={[styles.dragItem, styles.finish, styles.colorFinish]}>
          {this.item.name}
          <div class={[styles.rectangle, styles.colorFinish]}></div>
        </div>
      ),
    }
  }

  render() {
    return this.draggableItem[this.item.type]
  }
}
