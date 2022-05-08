import { DraggableItemEnum } from '@/components/draggable-item'
import { Mutation, State } from 'vuex-simple'

interface ActionBlock {
  id: string
  type: DraggableItemEnum.action
  action: Action
  duration: number
}

interface IfBlock {
  id: string
  type: DraggableItemEnum.if
  position: Position
  condition: Condition
  insertedBlocks: Array<ActionBlock | IfBlock>
}

// Блок действие

enum Action { // первый dropdown
  forward = 'forward',
  back = 'back',
  right = 'right',
  left = 'left',
}

// Блок условие

enum Position { // первый dropdown
  front = 'front',
  behind = 'behind',
  right = 'right',
  left = 'left',
}

enum Condition { // второй dropdown
  barrier = 'barrier', // препятствие
  empty = 'empty', // пустота
}

export class GameModule {
  @State()
  play = false

  @State()
  programBlocks: Array<ActionBlock | IfBlock> = [
    {
      id: String(Number(new Date())),
      type: DraggableItemEnum.action,
      action: Action.forward,
      duration: 2,
    },
    {
      id: String(Number(new Date()) + 1),
      type: DraggableItemEnum.if,
      position: Position.front,
      condition: Condition.barrier,
      insertedBlocks: [
        {
          id: String(Number(new Date())),
          type: DraggableItemEnum.action,
          action: Action.back,
          duration: 3,
        },
      ],
    },
    {
      id: String(Number(new Date())),
      type: DraggableItemEnum.action,
      action: Action.right,
      duration: 4,
    },
  ]

  @Mutation()
  startProgram() {
    this.play = true
  }

  @Mutation()
  stopProgram() {
    this.play = false
  }
}
