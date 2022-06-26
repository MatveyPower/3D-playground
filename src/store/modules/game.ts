import { DraggableItemEnum } from '@/components/draggable-item'
import { Action, CodeBlockType } from '@/components/draggable-wrapper'
import { Map } from './maps'
// import {
// Action,
// CodeBlockType,
// If,
// Position,
// } from '@/components/draggable-wrapper'
import { Mutation, State } from 'vuex-simple'

// interface ActionBlock {
//   id: string
//   type: DraggableItemEnum.action
//   action: Action
//   duration: number
// }

// interface IfBlock {
//   id: string
//   type: DraggableItemEnum.if
//   position: Position
//   If: If
//   insertedBlocks: Array<ActionBlock | IfBlock>
// }

// // Блок действие

// enum Action { // первый dropdown
//   forward = 'forward',
//   back = 'back',
//   right = 'right',
//   left = 'left',
// }

// // Блок условие

// enum Position { // первый dropdown
//   front = 'front',
//   behind = 'behind',
//   right = 'right',
//   left = 'left',
// }

// enum If { // второй dropdown
//   barrier = 'barrier', // препятствие
//   empty = 'empty', // пустота
// }

export type cmdMsg = { status: 'green' | 'orange' | 'red'; message: string }

export class GameModule {
  @State()
  play = false

  @State()
  mapPassed = false

  @State()
  removeCanvas = false

  @State()
  cmdMessage: cmdMsg | null = null

  @State()
  activeBlock: CodeBlockType | null = null

  @State()
  programBlocks: CodeBlockType[] = []

  @Mutation()
  setCodeBlocks(programBlocks: CodeBlockType[]) {
    this.programBlocks = programBlocks
  }

  @Mutation()
  setActiveBlock(block: CodeBlockType) {
    this.activeBlock = {
      ...block,
    }
  }

  @Mutation()
  setMapPassed() {
    this.mapPassed = true
  }

  @Mutation()
  setCmdMessage(message: cmdMsg) {
    this.cmdMessage = message
  }

  @Mutation()
  nullMapPassed() {
    this.mapPassed = false
  }

  @Mutation()
  startProgram() {
    this.play = true
  }

  @Mutation()
  stopProgram() {
    this.play = false
  }

  @Mutation()
  removeProgram() {
    this.removeCanvas = true
  }

  @Mutation()
  stopRemoveProgram() {
    this.removeCanvas = false
  }

  @Mutation()
  restartProgram() {
    this.removeCanvas = true
  }
}
