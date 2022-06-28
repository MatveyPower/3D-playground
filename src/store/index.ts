import Vue from 'vue'
import Vuex from 'vuex'
import { createVuexStore } from 'vuex-simple'

import { Module } from 'vuex-simple'
import { GameModule } from './modules/game'
import { MapsModule } from './modules/maps'
import { UserModule } from './modules/user'

Vue.use(Vuex)

export class MyStore {
  @Module()
  public game = new GameModule()

  @Module()
  public maps = new MapsModule()

  @Module()
  public user = new UserModule()
}

const instance = new MyStore()

export default createVuexStore(instance, {
  strict: false,
  modules: {},
  plugins: [],
})
