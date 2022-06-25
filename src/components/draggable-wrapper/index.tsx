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
  duration?: string
  action?: Action
  insertedBlock?: CodeBlockType[]
  margin?: number
}

interface DraggableWrapperProps {
  items: DraggableItemComponentsParts[]
}

export const TextForEnumName: Partial<
  Record<keyof typeof DraggableItemEnum, string>
> = {
  [DraggableItemEnum.ifEnd]: 'Конец условия',
  [DraggableItemEnum.circleEnd]: 'Конец цикла',
}

@Component({
  components: { draggable },
})
export class DraggableWrapper extends Vue {
  @Prop()
  items: DraggableWrapperProps['items']

  root = useModule<MyStore>(this.$store)

  store = this.root?.game

  mounted() {
    this.codeBlocks = JSON.parse(localStorage.getItem('structure') || `${[]}`)
    this.store?.setCodeBlocks(this.normalize(this.codeBlocks))
  }

  // @Watch('codeBlocks', { immediate: true, deep: true })
  pushBlocsInStore() {
    localStorage.setItem('structure', JSON.stringify(this.codeBlocks))
    this.store?.setCodeBlocks(this.normalize(this.codeBlocks))
    console.log(localStorage.getItem('structure'))
  }

  get codeBlocks2() {
    let marginMultipy = 0
    const newArr: CodeBlockType[] = []
    this.codeBlocks.forEach((block) => {
      if (
        block.type === DraggableItemEnum.ifEnd ||
        block.type === DraggableItemEnum.circleEnd
      ) {
        marginMultipy -= 1
      }
      newArr.push({
        ...block,
        margin: marginMultipy * 44,
      })
      if (
        block.type === DraggableItemEnum.if ||
        block.type === DraggableItemEnum.circle
      ) {
        marginMultipy += 1
      }
    })

    console.log(newArr)

    return newArr
  }

  codeBlocks: CodeBlockType[] = []

  codeBlocks1: CodeBlockType[] = [
    {
      name: 'Если',
      id: uuidv4(),
      type: DraggableItemEnum.if,
    },
    { name: 'Ехать', id: uuidv4(), type: DraggableItemEnum.action },
    { name: 'Повторить в цикле', id: uuidv4(), type: DraggableItemEnum.circle },
  ]

  showDrag = false

  normalize(arr: CodeBlockType[]) {
    let ifCounter = 0
    let actualIf = {}
    const insertedBlock: CodeBlockType[] = []
    return (
      arr
        // .map((item) => {
        //   if (item.type === DraggableItemEnum.circle) {
        //     return {
        //       ...item,
        //     }
        //   }
        // })
        .reduce((acc: any, item: any) => {
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
    )
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
    this.pushBlocsInStore()
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
    this.pushBlocsInStore()
  }

  isItemHasEndBlock(block: CodeBlockType) {
    switch (block.type) {
      case DraggableItemEnum.circle:
        return DraggableItemEnum.circleEnd
      case DraggableItemEnum.if:
        return DraggableItemEnum.ifEnd
      default:
        return undefined
    }
  }

  render() {
    return (
      <div class={styles.draggableWrapper}>
        <draggable
          class={styles.codeBlocksWrapper}
          list={this.codeBlocks}
          animation={150}
          draggable={'.draggable'}
          onChange={() => {
            this.pushBlocsInStore()
          }}
        >
          {this.codeBlocks2.map((item, index) => {
            return (
              <div class={['draggable', styles.draggableItemWrapper]}>
                <div class={styles.draggableItemWrapperContent}>
                  <span class={styles.itemIndex}>{index + 1}</span>
                  <DraggableItem
                    whenClick={this.whenClick}
                    style={{
                      zIndex: this.codeBlocks.length - index,
                      marginLeft: item.margin + 'px',
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
                    this.pushBlocsInStore()
                  }}
                />
              </div>
            )
          })}
        </draggable>

        <Button
          whenClick={() => {
            this.showDrag = !this.showDrag
          }}
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
                        item.type === DraggableItemEnum.action
                          ? '1'
                          : undefined,
                    })

                    if (this.isItemHasEndBlock(item)) {
                      this.codeBlocks.push({
                        name: TextForEnumName[this.isItemHasEndBlock(item)!],
                        id: uuidv4(),
                        type: this.isItemHasEndBlock(item),
                      })
                    }
                    this.pushBlocsInStore()
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
