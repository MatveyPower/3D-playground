import { Button, Popup } from '@/components'
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

  get isAdmin() {
    return this.store?.user.user.type === 'admin'
  }

  get isTeacher() {
    return this.store?.user.user.type === 'teacher'
  }

  get allUsers() {
    return this.store?.user.users || []
  }

  get usersArr() {
    return this.isTeacher
      ? this.allUsers.filter((user: any) => user.type === 'user')
      : this.allUsers.filter((user: any) => user.type !== 'admin')
  }

  makeTeacher(user: any) {
    this.store?.user.updateUser({
      ...user,
      type: 'teacher',
    })
  }

  deleteUser(user: any) {
    this.store?.user.deleteUser(user)
  }

  activePassedMaps = null

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
                <div class={styles.tableCell}>
                  {user.name} {user.type === 'teacher' ? '(Учитель)' : ''}
                </div>
                <div class={styles.tableCell}>{user.login}</div>
                <div class={styles.tableCell}>{user.rating}</div>
                <div class={styles.tableCell}>
                  {this.isAdmin ? (
                    <div class={styles.adminButtons}>
                      <Button
                        class={styles.actionButton}
                        text={'Сделать учителем'}
                        whenClick={() => this.makeTeacher(user)}
                      />
                      <Button
                        class={styles.actionButton}
                        text={'Удалить'}
                        whenClick={() => this.deleteUser(user)}
                      />
                    </div>
                  ) : (
                    <Button
                      class={styles.actionButton}
                      text={'Посмотреть результаты'}
                      whenClick={() =>
                        (this.activePassedMaps = user.passedMaps)
                      }
                    />
                  )}
                </div>
              </div>
            ))}
          </div>
          {this.activePassedMaps !== null && (
            <Popup
              content={
                <div class={styles.popupBody}>
                  <div class={styles.table}>
                    {(this.activePassedMaps as [])?.length > 0 && (
                      <div class={[styles.tableRow, styles.tableHeadRow]}>
                        <div class={styles.tableCell}>Название карты</div>
                        <div class={styles.tableCell}>Статус</div>
                        <div class={styles.tableCell}>Действия</div>
                      </div>
                    )}
                    {(this.activePassedMaps as [])?.length > 0 ? (
                      (this.activePassedMaps as []).map((map: any) => (
                        <div class={styles.tableRow}>
                          <div class={styles.tableCell}>{map.map}</div>
                          <div class={styles.tableCell}>Пройдена</div>
                          <div class={styles.tableCell}>
                            <Button
                              class={styles.actionButton}
                              text={'Посмотреть алгоритм'}
                              whenClick={() => {
                                this.activePassedMaps = null

                                if (this.store?.game && this.store.maps) {
                                  this.store.maps.setSelectionMap(
                                    this.store.maps.maps.find(
                                      (m) => m.name === map.map
                                    ) || this.store.maps.maps[0]
                                  )
                                  const code = [...map.codeBlocks]
                                  console.log('code', code)
                                  this.store.game.setCodeBlocks(code)
                                  this.$router.push('/playground')
                                }
                              }}
                            />
                          </div>
                        </div>
                      ))
                    ) : (
                      <div class={styles.emptyPassedMaps}>
                        У пользователя нет пройденых карт
                      </div>
                    )}
                  </div>
                  <Button
                    class={[styles.actionButton, styles.backButton]}
                    text={'назад'}
                    whenClick={() => (this.activePassedMaps = null)}
                  />
                </div>
              }
            />
          )}
        </div>
      </DefaultLayout>
    )
  }
}
