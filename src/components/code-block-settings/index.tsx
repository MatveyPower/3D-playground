import Vue, { VNode } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Button } from '../button'

import { DraggableItemEnum } from '../draggable-item'

export type SettingsType = keyof Pick<typeof DraggableItemEnum, 'action' | 'if'>

interface CodeBlockSettingsProps {
  type: SettingsType
}

@Component
export class CodeBlockSettings extends Vue {
  @Prop()
  type: CodeBlockSettingsProps['type']

  open = false

  renderActionsByType(): VNode {
    return (
      <Button
        whenClick={() => {
          console.log('ddddd')
        }}
        imgSrc={'code-block-settings'}
      />
    )
  }

  renderActionSettings(): VNode {
    return <div></div>
  }

  renderIfSettings(): VNode {
    return <div></div>
  }

  render(): VNode {
    return this.renderActionsByType()
  }
}
