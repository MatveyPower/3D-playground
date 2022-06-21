import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import styles from './style.module.css'

interface IconProps {
  imgSrc: string
  whenClick: (item: any) => void
}

@Component
export class Icon extends Vue {
  @Prop()
  imgSrc: IconProps['imgSrc']

  @Prop()
  whenClick: IconProps['whenClick']

  render() {
    return (
      <img
        onClick={this.whenClick}
        class={styles.icon}
        src={require(`../../static/${this.imgSrc}.svg`)}
      />
    )
  }
}
