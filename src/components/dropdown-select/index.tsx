import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import styles from './style.module.css'

@Component
export class DropdownSelect extends Vue {
  render() {
    return (
      <select class={styles.select}>
        <option value="value1" selected>
          Значение 1
        </option>
        <option value="value2">Значение 2</option>
        <option value="value3">Значение 3</option>
      </select>
    )
  }
}
