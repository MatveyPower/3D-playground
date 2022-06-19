import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

import styles from './style.module.css'

interface ControlButtonsProps {
  whenClickRestart: () => void
  whenClickPlay: () => void
  whenClickStop: () => void
}

@Component
export class ControlButtons extends Vue {
  @Prop()
  whenClickRestart: ControlButtonsProps['whenClickRestart']

  @Prop()
  whenClickPlay: ControlButtonsProps['whenClickPlay']

  @Prop()
  whenClickStop: ControlButtonsProps['whenClickStop']

  render() {
    return (
      <div class={styles.root}>
        <svg
          class={styles.icon}
          onclick={this.whenClickRestart}
          width="25"
          height="24"
          viewBox="0 0 25 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12.5 5V3.21C12.5 2.76 11.96 2.54 11.65 2.86L8.85 5.65C8.65 5.85 8.65 6.16 8.85 6.36L11.64 9.15C11.96 9.46 12.5 9.24 12.5 8.79V7C15.81 7 18.5 9.69 18.5 13C18.5 15.72 16.67 18.02 14.19 18.75C13.77 18.87 13.5 19.27 13.5 19.7C13.5 20.35 14.12 20.86 14.75 20.67C16.409 20.1853 17.8661 19.1758 18.9028 17.7929C19.9395 16.4101 20.4999 14.7283 20.5 13C20.5 8.58 16.92 5 12.5 5ZM6.5 13C6.5 11.66 6.94 10.42 7.69 9.41C7.99 9.01 7.95 8.46 7.6 8.1C7.18 7.68 6.46 7.72 6.1 8.2C5.32397 9.23316 4.81005 10.4391 4.60231 11.7144C4.39456 12.9898 4.49919 14.2965 4.90721 15.5225C5.31523 16.7486 6.01448 17.8574 6.94502 18.7539C7.87556 19.6504 9.00962 20.3079 10.25 20.67C10.88 20.86 11.5 20.35 11.5 19.7C11.5 19.27 11.23 18.87 10.81 18.75C8.33 18.02 6.5 15.72 6.5 13Z" />
        </svg>

        <svg
          class={styles.icon}
          onclick={this.whenClickPlay}
          width="25"
          height="24"
          viewBox="0 0 25 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.894 13.0455L8.3495 18.5835C7.5395 19.053 6.5 18.4845 6.5 17.538V6.462C6.5 5.517 7.538 4.947 8.3495 5.418L17.894 10.956C18.0783 11.0612 18.2314 11.2132 18.3379 11.3967C18.4445 11.5802 18.5006 11.7886 18.5006 12.0008C18.5006 12.2129 18.4445 12.4213 18.3379 12.6048C18.2314 12.7883 18.0783 12.9403 17.894 13.0455Z" />
        </svg>

        <svg
          class={styles.icon}
          onclick={this.whenClickStop}
          width="25"
          height="24"
          viewBox="0 0 25 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M8 5.25H17C17.5967 5.25 18.169 5.48705 18.591 5.90901C19.0129 6.33097 19.25 6.90326 19.25 7.5V16.5C19.25 17.0967 19.0129 17.669 18.591 18.091C18.169 18.5129 17.5967 18.75 17 18.75H8C7.40326 18.75 6.83097 18.5129 6.40901 18.091C5.98705 17.669 5.75 17.0967 5.75 16.5V7.5C5.75 6.90326 5.98705 6.33097 6.40901 5.90901C6.83097 5.48705 7.40326 5.25 8 5.25Z" />
        </svg>
      </div>
    )
  }
}
