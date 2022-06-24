import * as THREE from 'three'

import { initCamera } from './entities/camera'
import { initRenderer } from './engine-settings/renderer'
import { initLight } from './entities/light'
import { initWorld } from './engine-settings/world'

import { createArea } from './entities/area'
import { createMap } from './entities/map'
import { createCar } from './entities/car'

import { runEngineLoop } from './controllers/engine-loop'
import { initButtonControls } from './controllers/button-controls'

export function init3DRenderer(container, store, MAP) {
  //THREE JS
  const scene = new THREE.Scene()
  const renderer = initRenderer(container)
  const { camera, controls } = initCamera(renderer, container)

  initLight(scene)

  //CANNON JS
  const world = initWorld()

  createArea(scene, world)

  const wallsArr = createMap(scene, world, MAP)

  // const helper = new THREE.DirectionalLightHelper(light);
  // scene.add(helper);

  //stats
  // const stats = Stats()
  // container.appendChild(stats.dom)

  const { vehicle, vehicleBody, vehicleMesh, sensorsMesh } = createCar(
    scene,
    world
  )

  runEngineLoop(
    scene,
    camera,
    renderer,
    world,
    controls,
    vehicleMesh,
    vehicleBody,
    vehicle,
    MAP.endPoint,
    sensorsMesh,
    wallsArr,
    store
  )

  initButtonControls(vehicle)

  // CannonDebugRenderer
  // const cannonDebugRenderer = new CannonDebugRenderer(scene, world);
  return renderer
}
