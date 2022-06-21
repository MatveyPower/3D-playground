import Vue, { VNode } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Button } from '../button'

import { DraggableItemEnum } from '../draggable-item'
import { Icon } from '../icon'

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
      <Icon
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
