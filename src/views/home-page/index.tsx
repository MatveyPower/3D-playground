import { Button } from '@/components'
import { DefaultLayout } from '@/components/default-layout'
import Vue from 'vue'
import Component from 'vue-class-component'

import styles from './style.module.css'

@Component({
  template: 'default',
})
export class HomePage extends Vue {
  render() {
    return (
      <DefaultLayout>
        <div class={styles.page}>
          <div class={styles.title}>Программирование робота</div>
          <div class={styles.description}>
            Начни прямо сейчас программировать робота и проходить карты
          </div>
          <Button
            class={styles.buttonStart}
            whenClick={() => this.$router.push('/playground')}
            text={'Начать'}
          />
        </div>
      </DefaultLayout>
    )
  }
}
