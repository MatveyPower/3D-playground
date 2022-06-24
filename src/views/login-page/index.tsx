import { Button } from '@/components'
import { DefaultLayout } from '@/components'
import { Input } from '@/components/input'
import Vue from 'vue'
import Component from 'vue-class-component'

import styles from './style.module.css'

@Component({
  template: 'default',
})
export class LoginPage extends Vue {
  login = ''
  password = ''

  render() {
    return (
      <DefaultLayout class={styles.pageWrapper}>
        <div class={styles.form}>
          <p class={styles.title}>Войти</p>

          <div class={styles.inputsWrapper}>
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
          </div>

          <div class={styles.buttons}>
            <div
              class={styles.registrationLink}
              onClick={() => this.$router.push('/registration')}
            >
              Регистрация
            </div>

            <Button text="Войти" class={styles.loginButton} />
          </div>
        </div>
      </DefaultLayout>
    )
  }
}
