import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import styles from './style.module.css'

@Component
export class CodeBlock extends Vue {
  renderContent() {
    return <div />
  }

  blockStyle: Record<'block' | 'rhombus', string[] | [null]> = {
    block: [],
    rhombus: [],
  }

  render() {
    return (
      <div class={[styles.dragItem, styles.block, ...this.blockStyle.block]}>
        {this.renderContent()}
        <div class={[styles.rectangle, ...this.blockStyle.rhombus]}></div>
      </div>
    )
  }
}
