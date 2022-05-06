import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import draggable from 'vuedraggable'
import {
  DraggableItemComponentsParts,
  DraggableItemEnum,
} from '../draggable-item'

import { DraggableItem } from '@/components'

import styles from './style.module.css'

interface DraggableWrapperProps {
  whenDrag: () => void
  items: DraggableItemComponentsParts[]
}

@Component({
  components: { draggable },
})
export class DraggableWrapper extends Vue {
  @Prop()
  items: DraggableWrapperProps['items']

  draggable = true

  list1 = [
    { name: 'Начало', id: 1, type: DraggableItemEnum.start },
    { name: 'Условие', id: 2, type: DraggableItemEnum.condition },
    { name: 'lorem', id: 3, type: DraggableItemEnum.action },
    { name: 'Условие', id: 5, type: DraggableItemEnum.condition },
  ]

  updateDraggableList(e: any) {
    const newPositionElement = this.list1.findIndex(
      (item, index) => index === e.newIndex
    )
    const oldPositionElement = this.list1.findIndex(
      (item, index) => index === e.oldIndex
    )

    this.list1 = this.list1.map((item, index) => {
      if (index === newPositionElement) {
        return (item = {
          ...item,
          id: this.list1.length - newPositionElement,
        })
      }
      if (index === oldPositionElement) {
        return (item = {
          ...item,
          id: this.list1.length - oldPositionElement,
        })
      }
      return item
    })
  }

  render() {
    return (
      <div>
        <draggable
          list={this.list1}
          onUpdate={this.updateDraggableList}
          animation={150}
          draggable={'.drag'}
        >
          {this.list1.map((item, index) => {
            return (
              <DraggableItem
                style={{
                  zIndex:
                    item.type === DraggableItemEnum.start
                      ? '100'
                      : this.list1.length - index,
                }}
                item={item}
                id={index}
                class={[{ ['drag']: item.type !== DraggableItemEnum.start }]}
              />
            )
          })}
        </draggable>
      </div>
    )
  }
}
