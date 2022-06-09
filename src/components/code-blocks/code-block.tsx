import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { DraggableItemComponentsParts } from '../draggable-item'
import styles from './style.module.css'

interface CodeBlockProps {
  showDescription?: boolean
  whenMouseOver?: () => void
  whenMouseOut?: () => void
  whenClick?: (item: any) => void
}

@Component
export class CodeBlock extends Vue {
  @Prop({
    default: false,
  })
  showDescription?: CodeBlockProps['showDescription']

  @Prop({
    default: () => () => ({}),
  })
  whenMouseOver?: CodeBlockProps['whenMouseOver']

  @Prop({
    default: () => () => ({}),
  })
  whenMouseOut?: CodeBlockProps['whenMouseOut']

  @Prop({
    default: () => () => ({}),
  })
  whenClick?: CodeBlockProps['whenClick']

  renderContent() {
    return <div />
  }

  renderDescription() {
    return <div />
  }

  blockStyle: Record<'block' | 'rhombus', string[] | []> = {
    block: [],
    rhombus: [],
  }

  render() {
    return (
      <div
        onClick={this.whenClick}
        onMouseenter={this.whenMouseOver}
        onMouseleave={this.whenMouseOut}
        class={[styles.dragItem, styles.block, ...this.blockStyle.block]}
      >
        {this.showDescription ? this.renderDescription() : this.renderContent()}

        <div class={[styles.rectangle, ...this.blockStyle.rhombus]}></div>
      </div>
    )
  }
}
