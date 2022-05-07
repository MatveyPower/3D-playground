import { MyStore } from '@/store'
import Vue from 'vue'
import Component from 'vue-class-component'
import { useModule } from 'vuex-simple'
//@ts-expect-error  // eslint-disable-next-line
import { init3DRenderer } from '../../3Dengine'

@Component
export class Canvas3d extends Vue {
  mounted() {
    const container = this.$refs.container

    init3DRenderer(container, this.store)
  }

  store = useModule<MyStore>(this.$store)

  render() {
    return (
      <div>
        <div
          ref="container"
          style={{
            width: '1000px',
            height: '800px',
          }}
        ></div>
        <button onClick={() => this.store?.game.startProgram()}>start</button>
        <button onClick={() => this.store?.game.stopProgram()}>stop</button>
      </div>
    )
  }
}
