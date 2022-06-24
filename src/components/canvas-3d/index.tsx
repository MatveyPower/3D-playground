import { MyStore } from '@/store'
import { MapStructure } from '@/store/modules/maps'
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop, Watch } from 'vue-property-decorator'
import { directive } from 'vue/types/umd'
import { useModule } from 'vuex-simple'
//@ts-expect-error  // eslint-disable-next-line
import { init3DRenderer } from '../../3Dengine'
// import gif from

import styles from './style.module.css'

@Component
export class Canvas3d extends Vue {
  @Prop()
  map: MapStructure

  @Watch('map', { immediate: true, deep: true })
  updatePlayground() {
    this.store?.game.removeProgram()

    const imgLoading = document.createElement('img')
    imgLoading.src = require('@/static/loading.gif')
    imgLoading.style.margin = '50px 150px 0 150px'

    this.container = this.$refs.container as HTMLElement
    if (!this.container) {
      this.store?.game.stopRemoveProgram()
      return
    }
    const canvas = this.container?.children?.[1]
    if (canvas) {
      this.container.removeChild(canvas)
    }

    this.container.appendChild(imgLoading)

    setTimeout(() => {
      this.store?.game.stopRemoveProgram()

      const img = this.container.children[1]
      this.container.removeChild(img)
    }, 2000)

    setTimeout(() => {
      this.renderer = init3DRenderer(this.container, this.store, this.map || [])
    }, 2010)
  }

  mounted() {
    this.container = this.$refs.container as HTMLElement
    console.log(this.container)
    this.renderer = init3DRenderer(this.container, this.store, this.map || [])
    console.log(this.renderer)
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
            <svg
              onClick={this.openFullScreen}
              class={styles.fullScreenBtn}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M4 3C3.73478 3 3.48043 3.10536 3.29289 3.29289C3.10536 3.48043 3 3.73478 3 4V7.228C3 7.62582 2.84196 8.00736 2.56066 8.28866C2.27936 8.56996 1.89782 8.728 1.5 8.728C1.10218 8.728 0.720644 8.56996 0.43934 8.28866C0.158035 8.00736 8.38353e-09 7.62582 0 7.228V4C0 2.93913 0.421427 1.92172 1.17157 1.17157C1.92172 0.421427 2.93913 0 4 0H7.228C7.62582 8.38353e-09 8.00736 0.158035 8.28866 0.43934C8.56996 0.720644 8.728 1.10218 8.728 1.5C8.728 1.89782 8.56996 2.27936 8.28866 2.56066C8.00736 2.84196 7.62582 3 7.228 3H4ZM15.272 1.5C15.272 1.10218 15.43 0.720644 15.7113 0.43934C15.9926 0.158035 16.3742 0 16.772 0H20C21.0609 0 22.0783 0.421427 22.8284 1.17157C23.5786 1.92172 24 2.93913 24 4V7.228C24 7.62582 23.842 8.00736 23.5607 8.28866C23.2794 8.56996 22.8978 8.728 22.5 8.728C22.1022 8.728 21.7206 8.56996 21.4393 8.28866C21.158 8.00736 21 7.62582 21 7.228V4C21 3.73478 20.8946 3.48043 20.7071 3.29289C20.5196 3.10536 20.2652 3 20 3H16.772C16.3742 3 15.9926 2.84196 15.7113 2.56066C15.43 2.27936 15.272 1.89782 15.272 1.5ZM1.5 15.272C1.89782 15.272 2.27936 15.43 2.56066 15.7113C2.84196 15.9926 3 16.3742 3 16.772V20C3 20.2652 3.10536 20.5196 3.29289 20.7071C3.48043 20.8946 3.73478 21 4 21H7.228C7.62582 21 8.00736 21.158 8.28866 21.4393C8.56996 21.7206 8.728 22.1022 8.728 22.5C8.728 22.8978 8.56996 23.2794 8.28866 23.5607C8.00736 23.842 7.62582 24 7.228 24H4C2.93913 24 1.92172 23.5786 1.17157 22.8284C0.421427 22.0783 0 21.0609 0 20V16.772C0 16.3742 0.158035 15.9926 0.43934 15.7113C0.720644 15.43 1.10218 15.272 1.5 15.272V15.272ZM22.5 15.272C22.8978 15.272 23.2794 15.43 23.5607 15.7113C23.842 15.9926 24 16.3742 24 16.772V20C24 21.0609 23.5786 22.0783 22.8284 22.8284C22.0783 23.5786 21.0609 24 20 24H16.772C16.3742 24 15.9926 23.842 15.7113 23.5607C15.43 23.2794 15.272 22.8978 15.272 22.5C15.272 22.1022 15.43 21.7206 15.7113 21.4393C15.9926 21.158 16.3742 21 16.772 21H20C20.2652 21 20.5196 20.8946 20.7071 20.7071C20.8946 20.5196 21 20.2652 21 20V16.772C21 16.3742 21.158 15.9926 21.4393 15.7113C21.7206 15.43 22.1022 15.272 22.5 15.272V15.272Z" />
            </svg>
          ) : (
            <svg
              onClick={this.closeFullScreen}
              class={styles.fullScreenBtn}
              width="24"
              height="24"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M23.4684 0.549793C23.3 0.381037 23.1 0.247152 22.8797 0.155803C22.6595 0.0644534 22.4235 0.0174326 22.185 0.0174326C21.9466 0.0174326 21.7106 0.0644534 21.4903 0.155803C21.2701 0.247152 21.0701 0.381037 20.9017 0.549793L12 9.43326L3.09833 0.531589C2.92979 0.363054 2.72972 0.229365 2.50951 0.138155C2.28931 0.0469448 2.0533 1.7758e-09 1.81496 0C1.57662 -1.7758e-09 1.3406 0.0469448 1.1204 0.138155C0.900203 0.229365 0.700123 0.363054 0.531589 0.531589C0.363054 0.700123 0.229365 0.900203 0.138155 1.1204C0.0469448 1.3406 -1.7758e-09 1.57662 0 1.81496C1.7758e-09 2.0533 0.0469448 2.28931 0.138155 2.50951C0.229365 2.72972 0.363054 2.92979 0.531589 3.09833L9.43326 12L0.531589 20.9017C0.363054 21.0702 0.229365 21.2703 0.138155 21.4905C0.0469448 21.7107 0 21.9467 0 22.185C0 22.4234 0.0469448 22.6594 0.138155 22.8796C0.229365 23.0998 0.363054 23.2999 0.531589 23.4684C0.700123 23.6369 0.900203 23.7706 1.1204 23.8618C1.3406 23.9531 1.57662 24 1.81496 24C2.0533 24 2.28931 23.9531 2.50951 23.8618C2.72972 23.7706 2.92979 23.6369 3.09833 23.4684L12 14.5667L20.9017 23.4684C21.0702 23.6369 21.2703 23.7706 21.4905 23.8618C21.7107 23.9531 21.9467 24 22.185 24C22.4234 24 22.6594 23.9531 22.8796 23.8618C23.0998 23.7706 23.2999 23.6369 23.4684 23.4684C23.6369 23.2999 23.7706 23.0998 23.8618 22.8796C23.9531 22.6594 24 22.4234 24 22.185C24 21.9467 23.9531 21.7107 23.8618 21.4905C23.7706 21.2703 23.6369 21.0702 23.4684 20.9017L14.5667 12L23.4684 3.09833C24.1602 2.40658 24.1602 1.24154 23.4684 0.549793V0.549793Z" />
            </svg>
          )}
        </div>
      </div>
    )
  }
}
