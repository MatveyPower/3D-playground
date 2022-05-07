import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import draggable from 'vuedraggable'
import {
  DraggableItemComponentsParts,
  DraggableItemEnum,
} from '../draggable-item'

import { DraggableItem } from '@/components'

type CodeBlockType = {
  //TODO добавить необязательные поля для инпута и селекта
  name: string
  id: number
  type: DraggableItemEnum
}

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

  codeBlocks: CodeBlockType[] = [
    { name: 'Начало', id: 1, type: DraggableItemEnum.start },
    { name: 'Условие', id: 2, type: DraggableItemEnum.condition },
    { name: 'Ехать', id: 3, type: DraggableItemEnum.action },
    { name: 'Конец', id: 5, type: DraggableItemEnum.finish },
  ]

  updateDraggableList(e: any) {
    const newPositionElement = this.codeBlocks.findIndex(
      (item, index) => index === e.newIndex
    )
    const oldPositionElement = this.codeBlocks.findIndex(
      (item, index) => index === e.oldIndex
    )

    this.codeBlocks = this.codeBlocks.map((item, index) => {
      if (index === newPositionElement) {
        return {
          ...item,
          id: this.codeBlocks.length - newPositionElement,
        }
      }
      if (index === oldPositionElement) {
        return {
          ...item,
          id: this.codeBlocks.length - oldPositionElement,
        }
      }
      return item
    })
  }

  render() {
    return (
      <div>
        <draggable
          list={this.codeBlocks}
          onUpdate={this.updateDraggableList}
          animation={150}
          draggable={'.drag'}
        >
          {this.codeBlocks.map((item, index) => {
            return (
              <DraggableItem
                style={{
                  zIndex:
                    item.type === DraggableItemEnum.start
                      ? '100'
                      : this.codeBlocks.length - index,
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
