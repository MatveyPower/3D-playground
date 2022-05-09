import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { Button } from '@/components'

import styles from './style.module.css'

@Component
export class TopMenu extends Vue {
  render() {
    return (
      <div class={styles.buttonsWrapper}>
        <Button whenClick={() => this.$router.push('/')} imgSrc={'home-icon'} />

        <Button
          whenClick={() => this.$router.push('/playground')}
          imgSrc={'maps-icon'}
        />

        <Button
          whenClick={() => this.$router.push('/settings')}
          imgSrc={'settings-icon'}
        />
      </div>
    )
  }
}
