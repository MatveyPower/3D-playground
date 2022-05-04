import { RouteConfig } from 'vue-router'
import { HomePage, PlaygroundPage } from '../views'

export const routes: Array<RouteConfig> = [
  { path: '/', component: HomePage },
  { path: '/playground', component: PlaygroundPage },
]
