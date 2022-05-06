import Vue from 'vue'
import Component from 'vue-class-component'
import { Canvas3d, DraggableWrapper } from '../../components'

@Component({
  components: {
    Canvas3d,
  },
})
export class PlaygroundPage extends Vue {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <DraggableWrapper
          style={{
            width: '536px',
          }}
        />
        <Canvas-3d />
      </div>
    )
  }
}
