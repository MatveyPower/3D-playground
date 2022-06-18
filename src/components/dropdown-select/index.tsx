import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Action } from '../draggable-wrapper'
import styles from './style.module.css'

interface DropdownSelectProps {
  options: string[]
  whenClick: (option: string) => void
  selected: string
  values: any
}

@Component
export class DropdownSelect extends Vue {
  @Prop()
  options: DropdownSelectProps['options']

  @Prop()
  whenClick: DropdownSelectProps['whenClick']

  @Prop()
  selected: DropdownSelectProps['selected']

  @Prop()
  values: DropdownSelectProps['selected']

  render() {
    return (
      <div class={styles.customSelect}>
        <select
          onChange={(item: any) =>
            this.whenClick?.(item.target.selectedOptions[0].value)
          }
          class={styles.select}
        >
          {this.options.map((opt, index) => {
            return (
              <option
                value={opt}
                selected={this.selected === opt ? true : false}
              >
                {this.values[opt as any]}
              </option>
            )
          })}
        </select>
      </div>
    )
  }
}
