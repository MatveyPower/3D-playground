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
export class RegistrationPage extends Vue {
  userName = ''
  login = ''
  password = ''
  repeatPassword = ''

  errorMessage = ''

  store = useModule<MyStore>(this.$store)

  async mounted() {
    await this.store?.user.getAllUsers()
  }

  validateData() {
    this.errorMessage = ''
    const users = this.store?.user.users

    const regExpPassword = /^[a-zA-Z0-9]+/g
    const regExpMail = new RegExp(
      '([A-zА-я])+([0-9-_+.])*([A-zА-я0-9-_+.])*@([A-zА-я])+([0-9-_+.])*([A-zА-я0-9-_+.])*[.]([A-zА-я])+'
    )

    if (this.userName === '') {
      this.errorMessage = 'Введите имя пользователя'
    } else if (this.userName.length < 4) {
      this.errorMessage =
        'Длина имени пользователя должнабыть больше чем 3 символа'
    } else if (this.login === '') {
      this.errorMessage = 'Введите логин'
    } else if (!regExpMail.test(this.login)) {
      this.errorMessage = 'Используйте электронную почту для логина'
    } else if (this.password === '') {
      this.errorMessage = 'Введите пароль'
    } else if (this.password !== this.repeatPassword) {
      this.errorMessage = 'Введеные пароли не совпадают'
    } else if (!regExpPassword.test(this.password)) {
      this.errorMessage =
        'Пароль должен содержать хотя бы одну цифру, хотябы по одной латинской букве в нижнем и верхнем регистре'
    } else if (this.password.length < 6) {
      this.errorMessage = 'Пароль должен быть длиной минимум в 6 символов'
    } else if (users?.some((user: any) => user.name === this.userName)) {
      this.errorMessage = 'Пользователь с таким именем уже зарегистрирован'
    }
  }

  registration() {
    this.validateData()

    if (this.errorMessage === '') {
      this.store?.user.registration({
        id: String(new Date()),
        name: this.userName,
        login: this.login,
        password: this.password,
        passedMaps: [],
        algoritms: [],
        rating: 0,
        type: 'user',
      })

      setTimeout(() => {
        this.$router.push('/profile')
      }, 10)
    }
  }

  get hasError() {
    return this.errorMessage !== ''
  }

  render() {
    return (
      <DefaultLayout class={styles.pageWrapper}>
        <div class={styles.form}>
          <p class={styles.title}>Регистрация</p>

          <div class={styles.inputsWrapper}>
            <Input
              class={styles.input}
              value={this.userName}
              placeholder="Имя пользователя"
              whenChange={(v: string) => {
                this.errorMessage = ''
                this.userName = v
              }}
            />

            <Input
              class={styles.input}
              value={this.login}
              placeholder="Логин"
              whenChange={(v: string) => {
                this.errorMessage = ''
                this.login = v
              }}
            />

            <Input
              type="password"
              class={styles.input}
              value={this.password}
              placeholder="Пароль"
              whenChange={(v: string) => {
                this.errorMessage = ''
                this.password = v
              }}
            />

            <Input
              type="password"
              class={styles.input}
              value={this.repeatPassword}
              placeholder="Повторите пароль"
              whenChange={(v: string) => {
                this.errorMessage = ''
                this.repeatPassword = v
              }}
            />
          </div>

          <div class={styles.errorMes}>{this.errorMessage}</div>

          <div class={styles.buttons}>
            <Button
              text="Зарегистрироваться"
              class={[styles.regButton, this.hasError && styles.isDisabled]}
              disable={this.hasError}
              whenClick={() => (!this.hasError ? this.registration() : null)}
            />

            <div
              class={styles.registrationLink}
              onClick={() => this.$router.push('/login')}
            >
              На страницу авторизации
            </div>
          </div>
        </div>
      </DefaultLayout>
    )
  }
}
