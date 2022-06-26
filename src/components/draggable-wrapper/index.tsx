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

interface HistoryBlock {
  previous: HistoryBlock | null
  blocks: CodeBlockType[]
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

  historyActiveBlock: HistoryBlock = {
    previous: null,
    blocks: [],
  }

  historyLastBlock: HistoryBlock = this.historyActiveBlock

  addHistoryBlock(blocks: CodeBlockType[]) {
    this.historyActiveBlock = {
      previous: {
        ...this.historyActiveBlock,
      },
      blocks: [...blocks],
    }

    this.historyLastBlock = this.historyActiveBlock
  }

  getNextHistoryBlock() {
    let lastBlock = this.historyLastBlock
    while (lastBlock.previous !== this.historyActiveBlock) {
      if (lastBlock.previous) {
        lastBlock = lastBlock.previous
      } else break
    }

    if (lastBlock.previous === null) {
      return null
    }

    return lastBlock
  }

  historyLast() {
    if (this.historyActiveBlock.previous?.previous) {
      this.historyActiveBlock = this.historyActiveBlock.previous
      this.codeBlocks = this.historyActiveBlock.blocks
    }
    localStorage.setItem('structure', JSON.stringify(this.codeBlocks))
  }

  historyNext() {
    const nextBlock = this.getNextHistoryBlock()
    if (nextBlock) {
      this.codeBlocks = nextBlock.blocks
      this.historyActiveBlock = nextBlock
    }
    localStorage.setItem('structure', JSON.stringify(this.codeBlocks))
  }

  mounted() {
    this.codeBlocks = JSON.parse(localStorage.getItem('structure') || `${[]}`)
    this.addHistoryBlock(this.codeBlocks)
    this.store?.setCodeBlocks(this.normalize(this.codeBlocks))
  }

  // @Watch('codeBlocks', { immediate: true, deep: true })
  pushBlocsInStore() {
    localStorage.setItem('structure', JSON.stringify(this.codeBlocks))
    this.store?.setCodeBlocks(this.normalize(this.codeBlocks))
    this.addHistoryBlock(this.codeBlocks)
  }

  @Watch('store.activeBlock')
  setActiveBlock() {
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

  normalizeCycle(arr: CodeBlockType[]) {
    let cycleCounter = 0
    let actualcycle = {}
    const cycleArr: CodeBlockType[] = []
    return arr.reduce((acc: any, item: any) => {
      const { type } = item
      if (type === DraggableItemEnum.circle) {
        console.log('обноружен начальный блок')
        if (cycleCounter === 0) {
          actualcycle = item
        } else {
          cycleArr.push(item)
        }
        cycleCounter++
      } else if (type === DraggableItemEnum.circleEnd) {
        console.log('обноружен конечный блок', item)
        cycleCounter--
        if (cycleCounter === 0 && !!actualcycle) {
          const repeatArr: any = []
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-expect-error
          repeatArr.length = actualcycle.duration || 0
          let insertedArray = [...acc, ...repeatArr.fill([...cycleArr])]
          insertedArray = this.normalizeCycle(insertedArray.flat())
          cycleArr.length = 0
          actualcycle = {}
          return insertedArray
        }
        cycleArr.push(item)
      } else if (cycleCounter !== 0) {
        cycleArr.push(item)
      } else if (cycleCounter === 0) {
        return [...acc, item]
      }
      return acc
    }, [])
  }

  normalize(arr: CodeBlockType[]) {
    let ifCounter = 0
    let actualIf = {}
    const insertedBlock: CodeBlockType[] = []
    console.log(arr, 'normalizeCycle =', this.normalizeCycle(arr))
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

  clearBlocks() {
    this.codeBlocks = []
    localStorage.setItem('structure', JSON.stringify(this.codeBlocks))
    this.addHistoryBlock(this.codeBlocks)
  }

  render() {
    return (
      <div class={styles.root}>
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
                      whenClick={() => null}
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
            {this.codeBlocks2.length === 0 && (
              <div class={styles.emptyBlock}>
                <div>
                  Добавьте первый блок в программу <br />
                  Нажмите на кнопку
                </div>

                <Button
                  disabled={true}
                  whenClick={() => false}
                  text={'Добавить блок'}
                />
              </div>
            )}
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
          <div class={styles.actionIcons}>
            <Icon
              svg={
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M19 11.4967H7.14L10.77 7.1367C10.9397 6.93249 11.0214 6.66921 10.997 6.40478C10.9726 6.14036 10.8442 5.89644 10.64 5.72671C10.4358 5.55697 10.1725 5.4753 9.90808 5.49968C9.64365 5.52406 9.39974 5.65249 9.23 5.85671L4.23 11.8567C4.19636 11.9044 4.16628 11.9546 4.14 12.0067C4.14 12.0567 4.14 12.0867 4.07 12.1367C4.02467 12.2514 4.00094 12.3734 4 12.4967C4.00094 12.62 4.02467 12.742 4.07 12.8567C4.07 12.9067 4.07 12.9367 4.14 12.9867C4.16628 13.0388 4.19636 13.089 4.23 13.1367L9.23 19.1367C9.32402 19.2496 9.44176 19.3404 9.57485 19.4026C9.70793 19.4648 9.85309 19.4969 10 19.4967C10.2337 19.4972 10.4601 19.4158 10.64 19.2667C10.7413 19.1828 10.825 19.0797 10.8863 18.9633C10.9477 18.847 10.9855 18.7197 10.9975 18.5887C11.0096 18.4577 10.9957 18.3256 10.9567 18.2C10.9176 18.0744 10.8542 17.9578 10.77 17.8567L7.14 13.4967H19C19.2652 13.4967 19.5196 13.3913 19.7071 13.2038C19.8946 13.0163 20 12.7619 20 12.4967C20 12.2315 19.8946 11.9771 19.7071 11.7896C19.5196 11.6021 19.2652 11.4967 19 11.4967Z" />
                </svg>
              }
              whenClick={() => this.historyLast()}
            />
            <Icon
              svg={
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M5 13.4967L16.86 13.4967L13.23 17.8567C13.0603 18.0609 12.9786 18.3242 13.003 18.5886C13.0274 18.8531 13.1558 19.097 13.36 19.2667C13.5642 19.4364 13.8275 19.5181 14.0919 19.4937C14.3563 19.4693 14.6003 19.3409 14.77 19.1367L19.77 13.1367C19.8036 13.089 19.8337 13.0388 19.86 12.9867C19.86 12.9367 19.86 12.9067 19.93 12.8567C19.9753 12.742 19.9991 12.62 20 12.4967C19.9991 12.3734 19.9753 12.2514 19.93 12.1367C19.93 12.0867 19.93 12.0567 19.86 12.0067C19.8337 11.9546 19.8036 11.9044 19.77 11.8567L14.77 5.8567C14.676 5.74382 14.5582 5.65304 14.4252 5.59082C14.2921 5.5286 14.1469 5.49646 14 5.4967C13.7663 5.49625 13.5399 5.57762 13.36 5.7267C13.2587 5.81065 13.175 5.91375 13.1137 6.0301C13.0523 6.14645 13.0145 6.27375 13.0025 6.40473C12.9904 6.53571 13.0043 6.66778 13.0433 6.79338C13.0824 6.91899 13.1458 7.03565 13.23 7.1367L16.86 11.4967L5 11.4967C4.73478 11.4967 4.48043 11.6021 4.29289 11.7896C4.10536 11.9771 4 12.2315 4 12.4967C4 12.7619 4.10536 13.0163 4.29289 13.2038C4.48043 13.3913 4.73478 13.4967 5 13.4967Z" />
                </svg>
              }
              whenClick={() => this.historyNext()}
            />
            <Icon
              svg={
                <svg
                  width="24"
                  height="25"
                  viewBox="0 0 24 25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M10.2 7.0967H13.8C13.8 6.61931 13.6104 6.16148 13.2728 5.82391C12.9352 5.48635 12.4774 5.2967 12 5.2967C11.5226 5.2967 11.0648 5.48635 10.7272 5.82391C10.3896 6.16148 10.2 6.61931 10.2 7.0967ZM8.4 7.0967C8.4 6.14192 8.77928 5.22625 9.45442 4.55112C10.1295 3.87599 11.0452 3.4967 12 3.4967C12.9548 3.4967 13.8705 3.87599 14.5456 4.55112C15.2207 5.22625 15.6 6.14192 15.6 7.0967H20.1C20.3387 7.0967 20.5676 7.19153 20.7364 7.36031C20.9052 7.52909 21 7.75801 21 7.9967C21 8.2354 20.9052 8.46432 20.7364 8.6331C20.5676 8.80188 20.3387 8.8967 20.1 8.8967H19.3062L18.5088 18.2027C18.4321 19.1013 18.021 19.9384 17.3567 20.5484C16.6924 21.1584 15.8233 21.4968 14.9214 21.4967H9.0786C8.17672 21.4968 7.30765 21.1584 6.64333 20.5484C5.97902 19.9384 5.56786 19.1013 5.4912 18.2027L4.6938 8.8967H3.9C3.66131 8.8967 3.43239 8.80188 3.2636 8.6331C3.09482 8.46432 3 8.2354 3 7.9967C3 7.75801 3.09482 7.52909 3.2636 7.36031C3.43239 7.19153 3.66131 7.0967 3.9 7.0967H8.4ZM14.7 12.4967C14.7 12.258 14.6052 12.0291 14.4364 11.8603C14.2676 11.6915 14.0387 11.5967 13.8 11.5967C13.5613 11.5967 13.3324 11.6915 13.1636 11.8603C12.9948 12.0291 12.9 12.258 12.9 12.4967V16.0967C12.9 16.3354 12.9948 16.5643 13.1636 16.7331C13.3324 16.9019 13.5613 16.9967 13.8 16.9967C14.0387 16.9967 14.2676 16.9019 14.4364 16.7331C14.6052 16.5643 14.7 16.3354 14.7 16.0967V12.4967ZM10.2 11.5967C9.96131 11.5967 9.73239 11.6915 9.5636 11.8603C9.39482 12.0291 9.3 12.258 9.3 12.4967V16.0967C9.3 16.3354 9.39482 16.5643 9.5636 16.7331C9.73239 16.9019 9.96131 16.9967 10.2 16.9967C10.4387 16.9967 10.6676 16.9019 10.8364 16.7331C11.0052 16.5643 11.1 16.3354 11.1 16.0967V12.4967C11.1 12.258 11.0052 12.0291 10.8364 11.8603C10.6676 11.6915 10.4387 11.5967 10.2 11.5967Z" />
                </svg>
              }
              whenClick={() => this.clearBlocks()}
            />
            <Icon
              svg={
                <svg
                  width="21"
                  height="25"
                  viewBox="0 0 21 25"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M17.4979 7.9946L14.5021 4.99881C14.1806 4.67732 13.7446 4.49671 13.2899 4.4967H3.71429C2.7675 4.4967 2 5.2642 2 6.21099V18.7824C2 19.7292 2.7675 20.4967 3.71429 20.4967H16.2857C17.2325 20.4967 18 19.7292 18 18.7824V9.20678C18 8.75212 17.8194 8.31609 17.4979 7.9946ZM10 18.211C8.73764 18.211 7.71429 17.1876 7.71429 15.9253C7.71429 14.6629 8.73764 13.6396 10 13.6396C11.2624 13.6396 12.2857 14.6629 12.2857 15.9253C12.2857 17.1876 11.2624 18.211 10 18.211ZM13.4286 7.33528V10.9253C13.4286 11.162 13.2367 11.3538 13 11.3538H4.71429C4.47761 11.3538 4.28571 11.162 4.28571 10.9253V7.21099C4.28571 6.97431 4.47761 6.78242 4.71429 6.78242H12.8757C12.9894 6.78242 13.0984 6.82756 13.1788 6.90795L13.303 7.03224C13.3428 7.07203 13.3744 7.11927 13.396 7.17127C13.4175 7.22326 13.4286 7.27899 13.4286 7.33528Z" />
                </svg>
              }
              whenClick={() => null}
            />
          </div>
        </div>
      </div>
    )
  }
}
