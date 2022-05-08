import { DraggableItemEnum } from '@/components/draggable-item'

// let END_GAME = false

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
  store
) {
  const PROGRAM = store.game.programBlocks
  let DOING_NOW = false

  let FORWARD = false

  animate()

  function animate() {
    requestAnimationFrame(animate)
    controls.update()
    // stats.update()

    //Всё что связанно с cannon js
    world.step(1 / 60)
    // update the chassis position
    vehicleMesh.position.copy(vehicleBody.position)
    vehicleMesh.quaternion.copy(vehicleBody.quaternion)

    // const END_POINT_X = endPoint.position[0]
    // const END_POINT_Z = endPoint.position[2]
    // const VEHICLE_POSITION = vehicle.chassisBody.position

    // if (
    //   Math.abs(VEHICLE_POSITION.x - END_POINT_X) < 1 &&
    //   Math.abs(VEHICLE_POSITION.z - END_POINT_Z) < 1 &&
    //   !END_GAME
    // ) {
    //   END_GAME = true
    //   alert('Карта пройдена!')
    // }

    // if (store.game.play) {
    //   vehicle.applyEngineForce(400, 2)
    //   vehicle.applyEngineForce(400, 3)
    //   vehicle.setSteeringValue(200, 2)
    //   vehicle.setSteeringValue(200, 3)
    // } else {
    //   vehicle.applyEngineForce(0, 2)
    //   vehicle.applyEngineForce(0, 3)
    //   vehicle.setSteeringValue(0, 2)
    //   vehicle.setSteeringValue(0, 3)
    // }

    if (!DOING_NOW) {
      const block = PROGRAM.shift()
      DOING_NOW = true

      if (block.type === DraggableItemEnum.action) {
        if (block.action === 'forward') {
          FORWARD = true
          setTimeout(() => {
            FORWARD = false
          }, block.duration * 1000)
        }
      }
    }

    if (FORWARD) {
      vehicle.applyEngineForce(-100, 2)
      vehicle.applyEngineForce(-100, 3)
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
