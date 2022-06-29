import { Button } from '@/components'
import { DefaultLayout } from '@/components'
import Vue from 'vue'
import Component from 'vue-class-component'

import styles from './style.module.css'

import { MyStore } from '@/store'

import { useModule } from 'vuex-simple'

@Component({
  template: 'default',
})
export class PersonsPage extends Vue {
  store = useModule<MyStore>(this.$store)

  get isTeacher() {
    return this.store?.user.user.type === 'teacher'
  }

  get allUsers() {
    return this.store?.user.users || []
  }

  get usersArr() {
    return this.allUsers.filter((user: any) => user.type === 'user')
  }

  activePassedMaps = []

  render() {
    return (
      <DefaultLayout>
        <div class={styles.root}>
          <h1 class={styles.title}>Ученики</h1>
          <div class={styles.table}>
            <div class={[styles.tableRow, styles.tableHeadRow]}>
              <div class={styles.tableCell}>Имя пользователя</div>
              <div class={styles.tableCell}>Электронная почта</div>
              <div class={styles.tableCell}>Рейтинг</div>
              <div class={styles.tableCell}>Действия</div>
            </div>
            {this.usersArr.map((user: any) => (
              <div class={styles.tableRow}>
                <div class={styles.tableCell}>{user.name}</div>
                <div class={styles.tableCell}>{user.login}</div>
                <div class={styles.tableCell}>{user.rating}</div>
                <div class={styles.tableCell}>
                  <Button
                    class={styles.actionButton}
                    text={'Посмотреть результаты'}
                    whenClick={() => (this.activePassedMaps = user.passedMaps)}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </DefaultLayout>
    )
  }
}
