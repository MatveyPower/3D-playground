import { EducationPage } from '@/views/education-page'
import { LoginPage } from '@/views/login-page'
import { PersonsPage } from '@/views/persons-page'
import { RegistrationPage } from '@/views/registration-page'
import { RouteConfig } from 'vue-router'
import { HomePage, PlaygroundPage, MapsPage, ProfilePage } from '../views'

export const routes: Array<RouteConfig> = [
  { path: '/', component: HomePage },
  { path: '/playground', component: PlaygroundPage },
  { path: '/maps', component: MapsPage },
  { path: '/login', component: LoginPage },
  { path: '/registration', component: RegistrationPage },
  { path: '/education', component: EducationPage },
  { path: '/profile', component: ProfilePage },
  { path: '/persons', component: PersonsPage },
]
