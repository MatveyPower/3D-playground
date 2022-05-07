import { Mutation, State } from 'vuex-simple'

export class GameModule {
  @State()
  play = false

  @Mutation()
  startProgram() {
    this.play = true
  }

  @Mutation()
  stopProgram() {
    this.play = false
  }
}
