import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import draggable from 'vuedraggable'
import {
  DraggableItemComponentsParts,
  DraggableItemEnum,
} from '../draggable-item'

import { DraggableItem } from '@/components'

import styles from './style.module.css'

type CodeBlockType = {
  //TODO добавить необязательные поля для инпута и селекта
  name: string
  id: number
  type: DraggableItemEnum
}

interface DraggableWrapperProps {
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
    { name: 'Конец условия', id: 4, type: DraggableItemEnum.ifEnd },
  ]

  codeBlocks1: CodeBlockType[] = [
    { name: 'Условие', id: 5, type: DraggableItemEnum.condition },
    { name: 'Ехать', id: 6, type: DraggableItemEnum.action },
  ]

  showDrag = false

  render() {
    return (
      <div>
        <draggable list={this.codeBlocks} animation={150} draggable={'.drag'}>
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

        <div
          class={styles.showDrag}
          onClick={() => (this.showDrag = !this.showDrag)}
        >
          {this.showDrag ? 'Добавление блока кода' : 'Добавить блок +'}
        </div>

        <div class={[styles.drag, { [styles.drag2]: this.showDrag }]}>
          <draggable
            style={{
              marginTop: '20px',
            }}
            list={this.codeBlocks1}
          >
            {this.codeBlocks1.map((item, index) => {
              return (
                <DraggableItem
                  whenClick={() => {
                    this.codeBlocks.push({
                      ...item,
                      id: this.codeBlocks.length + 1,
                    })
                  }}
                  dragIteminChoose={true}
                  style={{
                    zIndex: this.codeBlocks1.length - index,
                  }}
                  item={item}
                  id={index}
                />
              )
            })}
          </draggable>
        </div>
      </div>
    )
  }
}
