import { MyStore } from '@/store'
import { MapStructure } from '@/store/modules/maps'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { directive } from 'vue/types/umd'
import { useModule } from 'vuex-simple'
//@ts-expect-error  // eslint-disable-next-line
import { init3DRenderer } from '../../3Dengine'

import styles from './style.module.css'

@Component
export class Canvas3d extends Vue {
  @Prop()
  map: MapStructure

  @Watch('map', { immediate: true, deep: true })
  updatePlayground() {
    console.log('aaaaa')
    this.container = this.$refs.container as HTMLElement
    this.container.innerHTML = ''
    this.renderer = init3DRenderer(this.container, this.store, this.map || [])
  }

  mounted() {
    this.container = this.$refs.container as HTMLElement
    this.renderer = init3DRenderer(this.container, this.store, this.map || [])
  }
  container: HTMLElement = this.$refs.container as HTMLElement
  renderer = null
  fullScreen = false

  store = useModule<MyStore>(this.$store)

  defaultStyle = {
    width: '620px',
    height: '400px',
  }

  style = this.defaultStyle

  openFullScreen() {
    this.fullScreen = true
    this.style = {
      width: '1100px',
      height: '800px',
    }
    this.container = this.$refs.container as HTMLElement
    this.updateRenderer()
  }

  closeFullScreen() {
    this.fullScreen = false
    this.style = this.defaultStyle
    this.container = this.$refs.container as HTMLElement
    this.updateRenderer()
  }

  updateRenderer() {
    if (this.renderer) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      this.renderer.setSize(
        parseInt(this.style.width) - 16 * 2,
        parseInt(this.style.height) - 16 * 2
      )
    }
  }

  render() {
    return (
      <div class={this.fullScreen && styles.popupBG}>
        <div ref="container" style={this.style} class={styles.container}>
          {/* {this.fullScreen && <div class={styles.blackBlock}></div>} */}
          {!this.fullScreen ? (
            <img
              onClick={this.openFullScreen}
              src={require('../../static/fullScreen.svg')}
              alt="open full-screen button"
              width="32"
              height="32"
              class={styles.fullScreenBtn}
            />
          ) : (
            <img
              onClick={this.closeFullScreen}
              src={require('../../static/close.svg')}
              alt="close full-screen button"
              width="32"
              height="32"
              class={styles.fullScreenBtn}
            />
          )}
        </div>
      </div>
    )
  }
}
