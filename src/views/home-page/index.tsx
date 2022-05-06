import { DraggableWrapper } from '@/components'
import Vue from 'vue'
import Component from 'vue-class-component'

import styles from './style.module.css'

@Component
export class HomePage extends Vue {
  render() {
    return (
      <div>
        <h1 class={styles.heading}>home!</h1>
        <DraggableWrapper
          style={{
            width: '536px',
          }}
        />
      </div>
    )
  }
}
