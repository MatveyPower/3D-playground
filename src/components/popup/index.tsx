import Vue, { VNode } from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import styles from './style.module.css'

interface PopupProps {
  content: VNode
}

@Component
export class Popup extends Vue {
  @Prop()
  content: PopupProps['content']

  render() {
    return (
      <div class={styles.popupRoot}>
        <div class={styles.popupBody}>{this.content}</div>
      </div>
    )
  }
}
