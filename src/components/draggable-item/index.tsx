import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { DropdownSelect } from '@/components'
import styles from './style.module.css'

export enum DraggableItemEnum {
  condition = 'condition',
  action = 'action',
  start = 'start',
  finish = 'finish',
}

export type DraggableItemType = keyof typeof DraggableItemEnum

export type DraggableItemComponentsParts = {
  name: string
  order: number
  fixable: boolean
  type: DraggableItemType
  id: number
}

interface DraggableItemProps {
  item: DraggableItemComponentsParts
}

@Component
export class DraggableItem extends Vue {
  @Prop()
  item: DraggableItemProps['item']

  colorStyleName(type: DraggableItemType) {
    return `${type.split('')[0].toUpperCase()}${type.slice(1)}`
  }

  render() {
    return (
      <div
        class={[
          styles.dragItem,
          styles[this.item.type],
          styles[`color${this.colorStyleName(this.item.type)}`],
        ]}
      >
        {this.item.name}
        <DropdownSelect />
        <div
          class={[
            styles.rectangle,
            styles[`color${this.colorStyleName(this.item.type)}`],
          ]}
        ></div>
      </div>
    )
  }
}
