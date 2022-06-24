import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'
import draggable from 'vuedraggable'
import {
  DraggableItemComponentsParts,
  DraggableItemEnum,
} from '../draggable-item'

import { Button, DraggableItem } from '@/components'

import { MyStore } from '@/store'

import { v4 as uuidv4 } from 'uuid'

import styles from './style.module.css'
import { useModule } from 'vuex-simple'
import { CodeBlockSettings } from '../code-block-settings'
import { Icon } from '../icon'

export enum Action { // первый dropdown
  forward = 'forward',
  back = 'back',
  right = 'right',
  left = 'left',
}

// Блок условие

export enum Position { // первый dropdown
  front = 'front',
  behind = 'behind',
  right = 'right',
  left = 'left',
}

export enum If { // второй dropdown
  barrier = 'barrier', // препятствие
  empty = 'empty', // пустота
}

export type CodeBlockType = {
  //TODO добавить необязательные поля для инпута и селекта
  name?: string
  id?: string
  type?: DraggableItemEnum
  position?: Position
  duration?: number
  action?: Action
  insertedBlock?: CodeBlockType[]
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

  root = useModule<MyStore>(this.$store)

  store = this.root?.game

  @Watch('codeBlocks', { immediate: true, deep: true })
  pushBlocsInStore() {
    this.store?.setCodeBlocks(this.normalize(this.codeBlocks))
  }

  codeBlocks: CodeBlockType[] = []

  codeBlocks1: CodeBlockType[] = [
    {
      name: 'Если',
      id: uuidv4(),
      type: DraggableItemEnum.if,
    },
    { name: 'Ехать', id: uuidv4(), type: DraggableItemEnum.action },
  ]

  showDrag = false

  normalize(arr: CodeBlockType[]) {
    let ifCounter = 0
    let actualIf = {}
    const insertedBlock: CodeBlockType[] = []
    return arr.reduce((acc: any, item: any) => {
      const { type } = item
      if (type === DraggableItemEnum.if) {
        if (ifCounter === 0) {
          actualIf = item
        } else {
          insertedBlock.push(item)
        }
        ifCounter++
      } else if (type === DraggableItemEnum.ifEnd) {
        ifCounter--
        if (ifCounter === 0 && !!actualIf) {
          const insertedArray: any = [
            ...acc,
            {
              ...actualIf,
              insertedBlock: this.normalize(insertedBlock),
            },
          ]
          insertedBlock.length = 0
          actualIf = {}
          return insertedArray
        }
        insertedBlock.push(item)
      } else if (ifCounter !== 0) {
        insertedBlock.push(item)
      } else if (ifCounter === 0) {
        return [...acc, item]
      }
      return acc
    }, [])
  }

  whenClick(item1: any) {
    console.log(item1)
  }

  whenClickDropdownSelect(item: any, value: any) {
    this.codeBlocks = this.codeBlocks.map((block) => {
      if (block.id === item.id) {
        return (block = {
          ...block,
          position: value,
          action: block.type === DraggableItemEnum.action ? value : undefined,
        })
      }
      return block
    })
  }

  whenChangeInput(item: any, value: any) {
    this.codeBlocks = this.codeBlocks.map((block) => {
      if (block.id === item.id) {
        return (block = {
          ...block,
          duration: value,
        })
      }
      return block
    })
  }

  render() {
    return (
      <div class={styles.draggableWrapper}>
        <draggable
          list={this.codeBlocks}
          animation={150}
          draggable={'.draggable'}
        >
          {this.codeBlocks.map((item, index) => {
            return (
              <div class={['draggable', styles.draggableItemWrapper]}>
                <div class={styles.draggableItemWrapperContent}>
                  <span class={styles.itemIndex}>{index + 1}</span>
                  <DraggableItem
                    whenClick={this.whenClick}
                    style={{
                      zIndex: this.codeBlocks.length - index,
                    }}
                    item={item}
                    id={index}
                    whenClickDropdownSelect={this.whenClickDropdownSelect}
                    whenChangeInput={this.whenChangeInput}
                  />
                </div>
                <Icon
                  imgSrc={'delete-icon'}
                  whenClick={() => {
                    this.codeBlocks = [
                      ...this.codeBlocks.slice(0, index),
                      ...this.codeBlocks.slice(index + 1),
                    ]
                  }}
                />
              </div>
            )
          })}
        </draggable>

        <Button
          whenClick={() => (this.showDrag = !this.showDrag)}
          class={styles.addBlocksButton}
          text={this.showDrag ? 'Убрать добавление' : 'Добавить блок'}
        />

        <div class={[styles.drag, { [styles.drag2]: this.showDrag }]}>
          <draggable
            disabled={true}
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
                      id: uuidv4(),
                      position: Position.front,
                      action: Action.forward,
                      duration:
                        item.type === DraggableItemEnum.action ? 1 : undefined,
                    })

                    if (item.type === DraggableItemEnum.if) {
                      this.codeBlocks.push({
                        name: 'Конец условия',
                        id: uuidv4(),
                        type: DraggableItemEnum.ifEnd,
                      })
                    }
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
