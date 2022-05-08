import Vue from 'vue'
import { Component } from 'vue-property-decorator'
import { TopMenu } from '../top-menu'
import styles from './style.module.css'

@Component
export class DefaultLayout extends Vue {
  render() {
    return (
      <div class={styles.defaultPageWrapper}>
        <TopMenu />

        {this.$slots.default}

        <div class={styles.footer}>
          <div class={styles.footerText}>Московский Политех</div>
        </div>
      </div>
    )
  }
}
