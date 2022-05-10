import * as THREE from 'three'

export function initRenderer(container) {
  const renderer = new THREE.WebGLRenderer()

  renderer.shadowMap.enabled = true
  renderer.shadowMap.type = THREE.PCFSoftShadowMap
  renderer.setSize(
    container.clientWidth - 16 * 2,
    container.clientHeight - 16 * 2
  )
  container.appendChild(renderer.domElement)
  renderer.shadowMap.enabled = true

  return renderer
}
