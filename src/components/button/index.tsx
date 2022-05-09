import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import styles from './style.module.css'

interface ButtonProps {
  imgSrc: string
  whenClick: () => void
  alt?: string
  text?: string
}

@Component
export class Button extends Vue {
  @Prop()
  imgSrc: ButtonProps['imgSrc']

  @Prop()
  whenClick: ButtonProps['whenClick']

  @Prop()
  alt?: ButtonProps['alt']

  @Prop()
  text?: ButtonProps['text']

  render() {
    console.log(this.imgSrc)

    return (
      <button class={styles.button} onClick={this.whenClick} type="button">
        {this.text ? this.text : undefined}

        {this.imgSrc ? (
          <img
            src={require(`../../static/${this.imgSrc}.svg`)}
            alt={this.alt}
          />
        ) : undefined}
      </button>
    )
  }
}
