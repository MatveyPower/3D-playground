import { DraggableItemEnum } from '@/components/draggable-item'
import { Mutation, State } from 'vuex-simple'

export interface MapStructure {
  walls: Array<{
    size: Array<number>
    position: Array<number>
    mass: number
  }>
  endPoint: {
    position: Array<number>
  }
}

export interface Map {
  name: string
  desciption: string
  rating: number
  structure: MapStructure
}

export class MapsModule {
  @State()
  maps: Array<Map> = [
    {
      name: 'Стандартная',
      desciption:
        'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться.',
      rating: 3,
      structure: {
        walls: [
          {
            size: [20, 5, 0.5],
            position: [0, 2, 0],
            mass: 0,
          },
          {
            size: [0.5, 5, 20],
            position: [10, 2, 0],
            mass: 0,
          },
          {
            size: [0.5, 5, 20],
            position: [-10, 2, 0],
            mass: 0,
          },
          {
            size: [0.5, 5, 50],
            position: [-25, 2, 0],
            mass: 0,
          },
          {
            size: [0.5, 5, 50],
            position: [25, 2, 0],
            mass: 0,
          },
          {
            size: [50, 5, 0.5],
            position: [0, 2, 25],
            mass: 0,
          },
          {
            size: [50, 5, 0.5],
            position: [0, 2, -25],
            mass: 0,
          },
        ],
        endPoint: {
          position: [0, 0, 15],
        },
      },
    },
    {
      name: 'Новая',
      desciption:
        'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться. Lorem Ipsum используют потому, что тот обеспечивает более или менее стандартное заполнение шаблона, а также реальное распределение букв и пробелов в абзацах, которое не получается при простой дубликации "Здесь ваш текст.. Здесь ваш текст.. Здесь ваш текст.." Многие программы электронной вёрстки и редакторы HTML используют Lorem Ipsum в качестве текста по умолчанию, так что поиск по ключевым словам "lorem ipsum" сразу показывает, как много веб-страниц всё ещё дожидаются своего настоящего рождения. За прошедшие годы текст Lorem Ipsum получил много версий. Некоторые версии появились по ошибке, некоторые - намеренно (например, юмористические варианты).',
      rating: 1,
      structure: {
        walls: [
          {
            size: [0.5, 5, 50],
            position: [-25, 2, 0],
            mass: 0,
          },
          {
            size: [0.5, 5, 50],
            position: [25, 2, 0],
            mass: 0,
          },
          {
            size: [50, 5, 0.5],
            position: [0, 2, 25],
            mass: 0,
          },
          {
            size: [50, 5, 0.5],
            position: [0, 2, -25],
            mass: 0,
          },
          {
            size: [40, 5, 0.5],
            position: [-5, 2, 0],
            mass: 0,
          },
          {
            size: [0.5, 5, 20],
            position: [15, 2, 0],
            mass: 0,
          },
          {
            size: [0.5, 5, 15],
            position: [0, 2, 17.5],
            mass: 0,
          },
        ],
        endPoint: {
          position: [-15, 0, 15],
        },
      },
    },
    {
      name: 'Лабиринт',
      desciption:
        'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться.',
      rating: 4,
      structure: {
        walls: [
          {
            size: [0.5, 5, 50],
            position: [-25, 2, 0],
            mass: 0,
          },
          {
            size: [0.5, 5, 50],
            position: [25, 2, 0],
            mass: 0,
          },
          {
            size: [50, 5, 0.5],
            position: [0, 2, 25],
            mass: 0,
          },
          {
            size: [50, 5, 0.5],
            position: [0, 2, -25],
            mass: 0,
          },
          {
            size: [20, 5, 0.5],
            position: [5, 2, 15],
            mass: 0,
          },
          {
            size: [10, 5, 0.5],
            position: [-10, 2, -5],
            mass: 0,
          },
          {
            size: [0.5, 5, 30],
            position: [15, 2, 0],
            mass: 0,
          },
          {
            size: [0.5, 5, 20],
            position: [-15, 2, 5],
            mass: 0,
          },
          {
            size: [0.5, 5, 20],
            position: [5, 2, -15],
            mass: 0,
          },
          {
            size: [0.5, 5, 40],
            position: [-5, 2, -5],
            mass: 0,
          },
        ],
        endPoint: {
          position: [-15, 0, -15],
        },
      },
    },
    {
      name: 'Сложная',
      desciption:
        'Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться.',
      rating: 5,
      structure: {
        walls: [
          {
            size: [0.5, 5, 50],
            position: [-25, 2, 0],
            mass: 0,
          },
          {
            size: [0.5, 5, 50],
            position: [25, 2, 0],
            mass: 0,
          },
          {
            size: [50, 5, 0.5],
            position: [0, 2, 25],
            mass: 0,
          },
          {
            size: [50, 5, 0.5],
            position: [0, 2, -25],
            mass: 0,
          },
          {
            size: [30, 5, 0.5],
            position: [10, 2, 15],
            mass: 0,
          },
          {
            size: [30, 5, 0.5],
            position: [0, 2, -5],
            mass: 0,
          },
          {
            size: [0.5, 5, 30],
            position: [15, 2, -10],
            mass: 0,
          },
          {
            size: [0.5, 5, 30],
            position: [-15, 2, 0],
            mass: 0,
          },
          {
            size: [0.5, 5, 10],
            position: [5, 2, 10],
            mass: 0,
          },
        ],
        endPoint: {
          position: [20, 0, -20],
        },
      },
    },
  ]

  @State()
  selectedMap = this.maps[0]

  @Mutation()
  setSelectionMap(map: Map) {
    this.selectedMap = map
  }
}
