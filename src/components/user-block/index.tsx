import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'

import { Button } from '@/components'

import styles from './style.module.css'

interface userBlockProps {
  imgSrc: string
  whenClick: () => void
  whenOut: () => void
}

@Component
export class UserBlock extends Vue {
  @Prop()
  imgSrc: userBlockProps['imgSrc']

  @Prop()
  whenClick: userBlockProps['whenClick']

  @Prop()
  whenOut: userBlockProps['whenOut']

  @Prop()
  user?: any

  dropdownIsOpen = false

  renderUser() {
    return (
      <div>
        {this.imgSrc ? (
          <img
            class={styles.img}
            src={require(`../../static/${this.imgSrc}.svg`)}
            alt={'user avatar'}
          />
        ) : (
          <div class={styles.user}>
            {this.user.login}
            <div class={styles.userImg}>
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 13.875C14.6924 13.875 16.875 11.6924 16.875 9C16.875 6.30761 14.6924 4.125 12 4.125C9.30761 4.125 7.125 6.30761 7.125 9C7.125 11.6924 9.30761 13.875 12 13.875Z"
                  stroke="#9B9B9B"
                  stroke-width="2.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <path
                  d="M4.125 21.375C4.125 17.625 7.125 13.875 12 13.875C16.875 13.875 19.875 17.625 19.875 21.375"
                  stroke="#9B9B9B"
                  stroke-width="2.25"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
            </div>
            <div
              class={styles.shevron}
              onclick={() => {
                this.dropdownIsOpen = !this.dropdownIsOpen
              }}
            >
              {this.dropdownIsOpen ? (
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11.7359 6.73232C11.5667 6.90372 11.3373 7 11.098 7C10.8588 7 10.6294 6.90372 10.4602 6.73232L5.99455 2.2068L1.52889 6.73232C1.35874 6.89886 1.13086 6.99101 0.894314 6.98893C0.657772 6.98684 0.4315 6.89069 0.264234 6.72118C0.0969668 6.55167 0.00208956 6.32237 3.44125e-05 6.08266C-0.00202169 5.84294 0.0889102 5.612 0.253245 5.43957L5.35673 0.267679C5.52591 0.0962838 5.75533 -5.45926e-07 5.99455 -5.25013e-07C6.23377 -5.041e-07 6.4632 0.0962839 6.63238 0.267679L11.7359 5.43958C11.905 5.61102 12 5.84352 12 6.08595C12 6.32837 11.905 6.56087 11.7359 6.73232Z"
                    fill="#9B9B9B"
                  />
                </svg>
              ) : (
                <svg
                  width="12"
                  height="7"
                  viewBox="0 0 12 7"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M0.264138 0.267679C0.433317 0.0962844 0.662742 0 0.901961 0C1.14118 0 1.37061 0.0962844 1.53978 0.267679L6.00545 4.7932L10.4711 0.267679C10.6413 0.101142 10.8691 0.00899045 11.1057 0.0110735C11.3422 0.0131565 11.5685 0.109307 11.7358 0.278816C11.903 0.448325 11.9979 0.677629 12 0.917342C12.002 1.15705 11.9111 1.388 11.7468 1.56042L6.64327 6.73232C6.47409 6.90372 6.24467 7 6.00545 7C5.76623 7 5.5368 6.90372 5.36762 6.73232L0.264138 1.56042C0.0950107 1.38898 0 1.15648 0 0.914052C0 0.671626 0.0950107 0.439126 0.264138 0.267679Z"
                    fill="#9B9B9B"
                  />
                </svg>
              )}
            </div>
          </div>
        )}
        {this.dropdownIsOpen && this.renderDropdown()}
      </div>
    )
  }

  renderButtonLogin() {
    return (
      <Button
        class={styles.buttonLogin}
        text={'Войти'}
        whenClick={this.whenClick}
      />
    )
  }

  renderDropdown() {
    return (
      <div class={styles.dropdown}>
        <div
          class={styles.dropdownItem}
          onclick={() => this.$router.push('/profile')}
        >
          Личный кабинет
        </div>
        <div
          class={styles.dropdownItem}
          onclick={() => {
            this.whenOut()
            this.$router.push('/')
          }}
        >
          Выйти
        </div>
      </div>
    )
  }

  render() {
    return (
      <div class={styles.root}>
        {this.user ? this.renderUser() : this.renderButtonLogin()}
      </div>
    )
  }
}
