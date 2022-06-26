import Vue from 'vue'
import { Component, Prop, Watch } from 'vue-property-decorator'

import styles from './style.module.css'

interface ButtonProps {
  value: string
  placeholder?: string
  whenChange: (v: string) => void
}

@Component
export class Input extends Vue {
  @Prop()
  value: ButtonProps['value']

  @Prop()
  placeholder?: ButtonProps['placeholder']

  @Prop()
  whenChange: ButtonProps['whenChange']

  whenChangeHandler(e: InputEvent) {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const v = e.target?.value || ''
    this.whenChange(v)
  }

  render() {
    return (
      <div class={styles.root}>
        <input
          type="text"
          class={styles.nativeInput}
          placeholder={this.placeholder}
          onChange={this.whenChangeHandler}
          value={this.value}
        />
      </div>
    )
  }
}
