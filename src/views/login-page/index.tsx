import { Button } from '@/components'
import { DefaultLayout } from '@/components'
import { Input } from '@/components/input'
import Vue from 'vue'
import Component from 'vue-class-component'

import { MyStore } from '@/store'

import { useModule } from 'vuex-simple'

import styles from './style.module.css'

@Component({
  template: 'default',
})
export class LoginPage extends Vue {
  login = ''
  password = ''

  errorMessage = ''

  store = useModule<MyStore>(this.$store)

  async mounted() {
    await this.store?.user.getAllUsers()
  }

  gologin() {
    const users = this.store?.user.users
    if (this.login === '') {
      this.errorMessage = 'Введите логин'
      return
    }
    if (this.password === '') {
      this.errorMessage = 'Введите пароль'
      return
    }

    const user = users?.filter((user: any) => {
      return user.login === this.login && user.password === this.password
    })[0]
    if (user) {
      this.store?.user.setUser(user)
      this.$router.push('/profile')
    } else {
      this.errorMessage = 'Неверный логин или пароль'
    }
  }

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
              type="password"
              value={this.password}
              placeholder="Пароль"
              whenChange={(v: string) => (this.password = v)}
            />
          </div>

          <div class={styles.errorMes}>{this.errorMessage}</div>

          <div class={styles.buttons}>
            <div
              class={styles.registrationLink}
              onClick={() => this.$router.push('/registration')}
            >
              Регистрация
            </div>

            <Button
              text="Войти"
              class={styles.loginButton}
              whenClick={() => this.gologin()}
            />
          </div>
        </div>
      </DefaultLayout>
    )
  }
}
