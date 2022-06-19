import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import styles from './style.module.css'

interface ButtonProps {
  imgSrc: string
  whenClick: () => void
  alt?: string
  text?: string
  disabled?: boolean
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

  @Prop()
  disabled?: ButtonProps['disabled']

  render() {
    return (
      <button
        class={[styles.button, this.disabled && styles.disabled]}
        onClick={this.whenClick}
        type="button"
        disabled={Boolean(this.disabled)}
      >
        {this.text}

        {this.imgSrc && (
          <img
            src={require(`../../static/${this.imgSrc}.svg`)}
            alt={this.alt}
          />
        )}
      </button>
    )
  }
}
