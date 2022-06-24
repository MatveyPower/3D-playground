import { DraggableItemEnum } from '@/components/draggable-item'
import { Action, CodeBlockType } from '@/components/draggable-wrapper'
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

export class GameModule {
  @State()
  play = false

  @State()
  removeCanvas = false

  @State()
  // programBlocks: Array<ActionBlock | IfBlock> = [
  programBlocks: CodeBlockType[] = [
    // {
    //   id: String(Number(new Date())),
    //   type: DraggableItemEnum.action,
    //   action: Action.back,
    //   duration: 2,
    // },
    // {
    //   id: String(Number(new Date()) + 1),
    //   type: DraggableItemEnum.if,
    //   position: Position.front,
    //   If: If.barrier,
    //   insertedBlocks: [
    //     {
    //       id: String(Number(new Date())),
    //       type: DraggableItemEnum.action,
    //       action: Action.back,
    //       duration: 3,
    //     },
    //   ],
    // },
    // {
    //   id: String(Number(new Date())),
    //   type: DraggableItemEnum.action,
    //   action: Action.right,
    //   duration: 2.6,
    // },
    // {
    //   id: String(Number(new Date())),
    //   type: DraggableItemEnum.action,
    //   action: Action.back,
    //   duration: 2.6,
    // },
    // {
    //   id: String(Number(new Date())),
    //   type: DraggableItemEnum.action,
    //   action: Action.forward,
    //   duration: 6,
    // },
    // {
    //   id: String(Number(new Date())),
    //   type: DraggableItemEnum.action,
    //   action: Action.right,
    //   duration: 1.15,
    // },
    // {
    //   id: String(Number(new Date())),
    //   type: DraggableItemEnum.action,
    //   action: Action.forward,
    //   duration: 3.7,
    // },
    // {
    //   id: String(Number(new Date())),
    //   type: DraggableItemEnum.action,
    //   action: Action.right,
    //   duration: 1,
    // },
    // {
    //   id: String(Number(new Date())),
    //   type: DraggableItemEnum.action,
    //   action: Action.forward,
    //   duration: 2.7,
    // },
    // {
    //   id: String(Number(new Date())),
    //   type: DraggableItemEnum.action,
    //   action: Action.forward,
    //   duration: 1,
    // },
  ]

  @Mutation()
  setCodeBlocks(programBlocks: CodeBlockType[]) {
    console.log(programBlocks)

    this.programBlocks = programBlocks
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
