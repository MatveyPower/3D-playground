import * as THREE from 'three'
import { DraggableItemEnum } from '@/components/draggable-item'
import { Position } from '@/components/draggable-wrapper'
import { map } from 'lodash'

let END_GAME = false

export function runEngineLoop(
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  scene,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  camera,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  renderer,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  world,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  controls,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  vehicleMesh,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  vehicleBody,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  vehicle,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  endPoint,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  sensorsMesh,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  wallsArr,
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  store
) {
  let DOING_NOW = false

  let FORWARD = false
  let BACK = false
  let RIGHT = false
  let LEFT = false

  let SENSOR_FORWARD = false
  let SENSOR_BACK = false
  let SENSOR_RIGHT = false
  let SENSOR_LEFT = false

  let TIME = 0
  const TICK_BY_SECOND = 75

  let STOP_BLOCK = 0
  let STOP_TURN_BLOCK = 0

  let programmIsStart = false

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  let PROGRAM = []

  animate()

  function animate() {
    const PLAY = store.game.play
    const REMOVE = store.game.removeCanvas

    if (REMOVE) {
      scene = null
      camera = null
      renderer = null
      world = null
      controls = null
      vehicleMesh = null
      vehicleBody = null
      vehicle = null
      endPoint = null
      sensorsMesh = null
      wallsArr = null
      PROGRAM = []
      END_GAME = false

      store.game.stopProgram()

      return
    }

    requestAnimationFrame(animate)
    controls.update()
    // stats.update()

    //Всё что связанно с cannon js
    world.step(1 / 60)
    // update the chassis position
    vehicleMesh.position.copy(vehicleBody.position)
    vehicleMesh.quaternion.copy(vehicleBody.quaternion)

    const END_POINT_X = endPoint?.position?.[0] ?? -1000
    const END_POINT_Z = endPoint?.position?.[2] ?? -1000
    const VEHICLE_POSITION = vehicle.chassisBody.position

    if (PLAY) {
      const t = 0
      // if (!programmIsStart) {
      //   store.game.setCmdMessage({
      //     status: 'green',
      //     message: 'Старт программы',
      //   })
      // }

      vehicle.setBrake(t, 0)
      vehicle.setBrake(t, 1)
      vehicle.setBrake(t, 2)
      vehicle.setBrake(t, 3)
      if (PROGRAM.length === 0) {
        PROGRAM = [...store.game.programBlocks]
      }
      TIME += 1
      programmIsStart = true
    } else {
      vehicle.applyEngineForce(0, 2)
      vehicle.applyEngineForce(0, 3)
      const t = 10

      vehicle.setBrake(t, 0)
      vehicle.setBrake(t, 1)
      vehicle.setBrake(t, 2)
      vehicle.setBrake(t, 3)
      if (programmIsStart) {
        store.game.setCmdMessage({
          status: 'red',
          message: 'Стоп',
        })
        programmIsStart = false
      }
    }

    if (
      Math.abs(VEHICLE_POSITION.x - END_POINT_X) < 1 &&
      Math.abs(VEHICLE_POSITION.z - END_POINT_Z) < 1 &&
      !END_GAME
    ) {
      END_GAME = true
      store.game.setMapPassed()
      store.game.stopProgram()
    }

    SENSOR_FORWARD = false
    SENSOR_BACK = false
    SENSOR_RIGHT = false
    SENSOR_LEFT = false

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    wallsArr.forEach((wall) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      sensorsMesh.forEach((sensor, index) => {
        if (checkTouching(sensor, wall)) {
          switch (index) {
            case 0:
              SENSOR_FORWARD = true
              break

            case 1:
              SENSOR_BACK = true
              break

            case 2:
              SENSOR_RIGHT = true
              break

            case 3:
              SENSOR_LEFT = true
              break

            default:
              break
          }
        }
      })
    })

    if (!DOING_NOW && PROGRAM.length > 0 && PLAY && store.game.cmdMessage) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      const block = PROGRAM.shift()
      store.game.setActiveBlock(block)

      DOING_NOW = true

      // forward = 'forward',
      // back = 'back',
      // right = 'right',
      // left = 'left',

      if (block.type === DraggableItemEnum.action) {
        switch (block.action) {
          case 'forward':
            FORWARD = true
            STOP_BLOCK = Math.ceil(block.duration * TICK_BY_SECOND) + TIME
            break

          case 'back':
            BACK = true
            STOP_BLOCK = Math.ceil(block.duration * TICK_BY_SECOND) + TIME
            break

          case 'right':
            RIGHT = true
            DOING_NOW = false
            STOP_TURN_BLOCK = Math.ceil(block.duration * TICK_BY_SECOND) + TIME
            break

          case 'left':
            LEFT = true
            DOING_NOW = false
            STOP_TURN_BLOCK = Math.ceil(block.duration * TICK_BY_SECOND) + TIME
            break

          default:
            break
        }
      } else if (block.type === DraggableItemEnum.if) {
        switch (block.position) {
          case Position.front:
            if (SENSOR_FORWARD) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              PROGRAM = [...block.insertedBlock, ...PROGRAM]
              DOING_NOW = false
            }
            break

          case Position.behind:
            if (SENSOR_BACK) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              PROGRAM = [...block.insertedBlock, ...PROGRAM]
              DOING_NOW = false
            }
            break

          case Position.right:
            if (SENSOR_RIGHT) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              PROGRAM = [...block.insertedBlock, ...PROGRAM]
              DOING_NOW = false
            }
            break

          case Position.left:
            if (SENSOR_LEFT) {
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-expect-error
              PROGRAM = [...block.insertedBlock, ...PROGRAM]
              DOING_NOW = false
            }
            break

          default:
            break
        }
      }
    }

    const t = 0

    vehicle.setBrake(t, 0)
    vehicle.setBrake(t, 1)
    vehicle.setBrake(t, 2)
    vehicle.setBrake(t, 3)

    if (STOP_BLOCK === TIME) {
      DOING_NOW = false

      FORWARD = false
      BACK = false

      // STOP_BLOCK = 5 + TIME
    }

    if (STOP_TURN_BLOCK === TIME) {
      RIGHT = false
      LEFT = false
    }

    if ((!FORWARD && !BACK) || !PLAY) {
      vehicle.applyEngineForce(0, 2)
      vehicle.applyEngineForce(0, 3)
      const t = 10

      vehicle.setBrake(t, 0)
      vehicle.setBrake(t, 1)
      vehicle.setBrake(t, 2)
      vehicle.setBrake(t, 3)
    }

    if ((!RIGHT && !LEFT) || !PLAY) {
      vehicle.setSteeringValue(0, 2)
      vehicle.setSteeringValue(0, 3)
    }

    const speed = 200
    const r = 100

    if (FORWARD) {
      let actualSpeed = speed

      if (RIGHT || LEFT) {
        actualSpeed *= 1
      }

      vehicle.applyEngineForce(actualSpeed * -1, 2)
      vehicle.applyEngineForce(actualSpeed * -1, 3)
    }

    if (BACK) {
      let actualSpeed = speed

      if (RIGHT || LEFT) {
        actualSpeed *= 1
      }

      vehicle.applyEngineForce(actualSpeed, 2)
      vehicle.applyEngineForce(actualSpeed, 3)
    }

    if (RIGHT) {
      vehicle.setSteeringValue(r, 2)
      vehicle.setSteeringValue(r, 3)
    }

    if (LEFT) {
      vehicle.setSteeringValue(r * -1, 2)
      vehicle.setSteeringValue(r * -1, 3)
    }

    //camera

    // camera.position.x = box.position.x + 0
    // camera.position.y = box.position.y + 10
    // camera.position.z = box.position.z - 5;

    // camera.quaternion.copy(box.quaternion)

    // camera.rotateY(180 * Math.PI / 180)
    // camera.rotateX(-45 * Math.PI / 180)
    // cannonDebugRenderer.update(); // Update - CannonDebugRenderer

    //Конец всё что связанно с cannon js

    // stats.begin()
    renderer.render(scene, camera)
    // stats.end()
  }
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
function checkTouching(_a, d) {
  // const p = v.chassisBody.position
  // const q = v.chassisBody.quaternion
  // const sensorGeometry = new THREE.BoxGeometry(2, 2, 2)
  // const sensorMaterial = new THREE.MeshBasicMaterial({
  //   color: 0xffff00,
  //   side: THREE.DoubleSide,
  // })
  // const sensorMesh = new THREE.Mesh(sensorGeometry, sensorMaterial)
  // sensorMesh.quaternion.copy(q)
  // sensorMesh.position.set(p.x, p.y, p.z + 10)
  // const a = sensorMesh
  const target = new THREE.Vector3()
  _a.getWorldPosition(target)
  const a = {
    position: target,
    geometry: _a.geometry,
  }
  const b1 = a.position.y - a.geometry.parameters.height / 2
  const t1 = a.position.y + a.geometry.parameters.height / 2
  const r1 = a.position.x + a.geometry.parameters.width / 2
  const l1 = a.position.x - a.geometry.parameters.width / 2
  const f1 = a.position.z - a.geometry.parameters.depth / 2
  const B1 = a.position.z + a.geometry.parameters.depth / 2
  const b2 = d.position.y - d.geometry.parameters.height / 2
  const t2 = d.position.y + d.geometry.parameters.height / 2
  const r2 = d.position.x + d.geometry.parameters.width / 2
  const l2 = d.position.x - d.geometry.parameters.width / 2
  const f2 = d.position.z - d.geometry.parameters.depth / 2
  const B2 = d.position.z + d.geometry.parameters.depth / 2
  if (t1 < b2 || r1 < l2 || b1 > t2 || l1 > r2 || f1 > B2 || B1 < f2) {
    return false
  }
  return true
}
