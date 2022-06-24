import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { VNode } from 'vue/types/umd'

import styles from './style.module.css'

interface IconProps {
  svg: VNode
  whenClick: (item: any) => void
}

@Component
export class Icon extends Vue {
  @Prop()
  svg: IconProps['svg']

  @Prop()
  whenClick: IconProps['whenClick']

  render() {
    return (
      <div class={styles.root} onclick={this.whenClick}>
        {this.svg}
      </div>
    )
  }
}
