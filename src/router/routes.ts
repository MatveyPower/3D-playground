import { LoginPage } from '@/views/login-page'
import { RegistrationPage } from '@/views/registration-page'
import { RouteConfig } from 'vue-router'
import { HomePage, PlaygroundPage, MapsPage } from '../views'

export const routes: Array<RouteConfig> = [
  { path: '/', component: HomePage },
  { path: '/playground', component: PlaygroundPage },
  { path: '/maps', component: MapsPage },
  { path: '/login', component: LoginPage },
  { path: '/registration', component: RegistrationPage },
]
