import { DraggableItemEnum } from '@/components/draggable-item'
import { Map } from './maps'

import { Mutation, State, Action, Getter } from 'vuex-simple'

export type cmdMsg = { status: 'green' | 'orange' | 'red'; message: string }
const USERS_LOCALSTORAGE_KEY = 'users'
const USER_LOCALSTORAGE_KEY = 'user'

export class UserModule {
  @State()
  user = localStorage.getItem(USER_LOCALSTORAGE_KEY)
    ? JSON.parse(localStorage.getItem(USER_LOCALSTORAGE_KEY) || '')
    : null

  @State()
  users = localStorage.getItem(USERS_LOCALSTORAGE_KEY)
    ? JSON.parse(localStorage.getItem(USERS_LOCALSTORAGE_KEY) || '')
    : []

  @Action()
  getAllUsers() {
    this.users =
      JSON.parse(localStorage.getItem(USERS_LOCALSTORAGE_KEY) || '[]') || []
  }

  @Action()
  async registration(user: any) {
    await this.getAllUsers()
    const users = this.users
    users.push(user)
    this.updateUsers(users)
    this.setUser(user)
  }

  @Mutation()
  setUser(user: any) {
    this.user = user
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(user))
  }

  @Mutation()
  setUserAlogritms(algoritm: any) {
    this.user = {
      ...this.user,
      algoritms: this.user?.algoritms?.length
        ? [...this.user.algoritms, ...algoritm]
        : [...algoritm],
    }
    localStorage.setItem(USER_LOCALSTORAGE_KEY, JSON.stringify(this.user))
    this.updateUser(this.user)
  }

  updateUser(newUser: any) {
    const id = newUser.id
    if (this.user.id === id) {
      this.setUser(newUser)
    }
    const newUsers = this.users.map((user: { id: number }) => {
      if (user.id === id) {
        return newUser
      } else {
        return user
      }
    })
    this.users = [...newUsers]
    this.updateUsers(newUsers)
  }

  @Mutation()
  updateUsers(users: any) {
    localStorage.setItem(USERS_LOCALSTORAGE_KEY, JSON.stringify(users))
  }

  deleteUser(user: any) {
    const users = JSON.parse(localStorage.getItem(USERS_LOCALSTORAGE_KEY)!)
    const userId = users.findIndex((item: any) => item.login === user.login)
    const newUsers = [...users.slice(0, userId), ...users.slice(userId + 1)]
    this.users = [...newUsers]
    this.updateUsers(newUsers)
  }
}
