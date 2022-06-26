import { Button } from '@/components'
import { DefaultLayout } from '@/components'
import { Input } from '@/components/input'
import Vue from 'vue'
import Component from 'vue-class-component'

import styles from './style.module.css'

@Component({
  template: 'default',
})
export class RegistrationPage extends Vue {
  userName = ''
  login = ''
  password = ''
  repeatPassword = ''

  render() {
    return (
      <DefaultLayout class={styles.pageWrapper}>
        <div class={styles.form}>
          <p class={styles.title}>Регистрация</p>

          <div class={styles.inputsWrapper}>
            <Input
              class={styles.input}
              value={this.login}
              placeholder="Имя пользователя"
              whenChange={(v: string) => (this.userName = v)}
            />

            <Input
              class={styles.input}
              value={this.login}
              placeholder="Логин"
              whenChange={(v: string) => (this.login = v)}
            />

            <Input
              class={styles.input}
              value={this.password}
              placeholder="Пароль"
              whenChange={(v: string) => (this.password = v)}
            />

            <Input
              class={styles.input}
              value={this.password}
              placeholder="Повторите пароль"
              whenChange={(v: string) => (this.repeatPassword = v)}
            />
          </div>

          <div class={styles.buttons}>
            <Button
              text="Зарегистрироваться"
              class={styles.regButton}
              whenClick={() => false}
            />

            <Button
              text="Войти через Google"
              imgSrc={'googleLogo'}
              class={styles.googleButton}
              whenClick={() => false}
            />
          </div>
        </div>
      </DefaultLayout>
    )
  }
}
