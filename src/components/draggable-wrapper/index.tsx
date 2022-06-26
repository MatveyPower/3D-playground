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
  activeBlock?: boolean
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

  @Watch('store.activeBlock')
  setActiveBlock() {
    console.log(this.store?.activeBlock)

    this.codeBlocks = this.codeBlocks.map((block) => {
      if (block.id === this.store?.activeBlock?.id) {
        return {
          ...block,
          activeBlock: true,
        }
      }
      return {
        ...block,
        activeBlock: false,
      }
    })
    console.log(this.codeBlocks)
  }

  get activeIdBlock() {
    return this.store?.activeBlock?.id
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
      <div>
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
                <div
                  class={[
                    'draggable',
                    {
                      [styles.draggableItemWrapperActive]:
                        this.activeIdBlock === item.id,
                    },
                    styles.draggableItemWrapper,
                  ]}
                >
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
                    svg={
                      <svg
                        width="12"
                        height="13"
                        viewBox="0 0 12 13"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M11.7342 1.02191C11.65 0.937532 11.55 0.870589 11.4399 0.824915C11.3298 0.77924 11.2117 0.755729 11.0925 0.755729C10.9733 0.755729 10.8553 0.77924 10.7452 0.824915C10.6351 0.870589 10.535 0.937532 10.4508 1.02191L6 5.46364L1.54916 1.01281C1.4649 0.92854 1.36486 0.861696 1.25476 0.816091C1.14466 0.770485 1.02665 0.747013 0.90748 0.747013C0.788308 0.747013 0.670302 0.770485 0.560202 0.816091C0.450101 0.861696 0.350062 0.92854 0.265794 1.01281C0.181527 1.09707 0.114683 1.19711 0.0690775 1.30722C0.0234724 1.41732 -8.879e-10 1.53532 0 1.65449C8.879e-10 1.77366 0.0234724 1.89167 0.0690775 2.00177C0.114683 2.11187 0.181527 2.21191 0.265794 2.29618L4.71663 6.74701L0.265794 11.1978C0.181527 11.2821 0.114683 11.3822 0.0690775 11.4923C0.0234724 11.6024 0 11.7204 0 11.8395C0 11.9587 0.0234724 12.0767 0.0690775 12.1868C0.114683 12.2969 0.181527 12.397 0.265794 12.4812C0.350062 12.5655 0.450101 12.6323 0.560202 12.6779C0.670302 12.7235 0.788308 12.747 0.90748 12.747C1.02665 12.747 1.14466 12.7235 1.25476 12.6779C1.36486 12.6323 1.4649 12.5655 1.54916 12.4812L6 8.03038L10.4508 12.4812C10.5351 12.5655 10.6351 12.6323 10.7452 12.6779C10.8553 12.7235 10.9733 12.747 11.0925 12.747C11.2117 12.747 11.3297 12.7235 11.4398 12.6779C11.5499 12.6323 11.6499 12.5655 11.7342 12.4812C11.8185 12.397 11.8853 12.2969 11.9309 12.1868C11.9765 12.0767 12 11.9587 12 11.8395C12 11.7204 11.9765 11.6024 11.9309 11.4923C11.8853 11.3822 11.8185 11.2821 11.7342 11.1978L7.28337 6.74701L11.7342 2.29618C12.0801 1.9503 12.0801 1.36778 11.7342 1.02191Z" />
                      </svg>
                    }
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

          <div class={[styles.drag, { [styles.drag2]: this.showDrag }]}>
            <Icon
              class={styles.iconInAddBlock}
              svg={
                <svg
                  width="12"
                  height="13"
                  viewBox="0 0 12 13"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M11.7342 1.02191C11.65 0.937532 11.55 0.870589 11.4399 0.824915C11.3298 0.77924 11.2117 0.755729 11.0925 0.755729C10.9733 0.755729 10.8553 0.77924 10.7452 0.824915C10.6351 0.870589 10.535 0.937532 10.4508 1.02191L6 5.46364L1.54916 1.01281C1.4649 0.92854 1.36486 0.861696 1.25476 0.816091C1.14466 0.770485 1.02665 0.747013 0.90748 0.747013C0.788308 0.747013 0.670302 0.770485 0.560202 0.816091C0.450101 0.861696 0.350062 0.92854 0.265794 1.01281C0.181527 1.09707 0.114683 1.19711 0.0690775 1.30722C0.0234724 1.41732 -8.879e-10 1.53532 0 1.65449C8.879e-10 1.77366 0.0234724 1.89167 0.0690775 2.00177C0.114683 2.11187 0.181527 2.21191 0.265794 2.29618L4.71663 6.74701L0.265794 11.1978C0.181527 11.2821 0.114683 11.3822 0.0690775 11.4923C0.0234724 11.6024 0 11.7204 0 11.8395C0 11.9587 0.0234724 12.0767 0.0690775 12.1868C0.114683 12.2969 0.181527 12.397 0.265794 12.4812C0.350062 12.5655 0.450101 12.6323 0.560202 12.6779C0.670302 12.7235 0.788308 12.747 0.90748 12.747C1.02665 12.747 1.14466 12.7235 1.25476 12.6779C1.36486 12.6323 1.4649 12.5655 1.54916 12.4812L6 8.03038L10.4508 12.4812C10.5351 12.5655 10.6351 12.6323 10.7452 12.6779C10.8553 12.7235 10.9733 12.747 11.0925 12.747C11.2117 12.747 11.3297 12.7235 11.4398 12.6779C11.5499 12.6323 11.6499 12.5655 11.7342 12.4812C11.8185 12.397 11.8853 12.2969 11.9309 12.1868C11.9765 12.0767 12 11.9587 12 11.8395C12 11.7204 11.9765 11.6024 11.9309 11.4923C11.8853 11.3822 11.8185 11.2821 11.7342 11.1978L7.28337 6.74701L11.7342 2.29618C12.0801 1.9503 12.0801 1.36778 11.7342 1.02191Z" />
                </svg>
              }
              whenClick={() => (this.showDrag = false)}
            />
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
        <div class={styles.actionsButtonsWrapper}>
          <Button
            whenClick={() => {
              this.showDrag = true
            }}
            disabled={this.showDrag}
            class={styles.addBlocksButton}
            style={
              this.showDrag && {
                'background-color': '#49474a !important',
              }
            }
            text={'Добавить блок'}
          />
        </div>
      </div>
    )
  }
}
