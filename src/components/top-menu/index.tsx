import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import styles from './style.module.css'

@Component
export class TopMenu extends Vue {
  render() {
    return (
      <div class={styles.buttonsWrapper}>
        <button
          class={styles.button}
          onClick={() => this.$router.push('/')}
          type="button"
        >
          <img
            src={require('../../static/home-icon.svg')}
            alt="Страница игры"
          />
        </button>

        <button
          class={styles.button}
          onClick={() => this.$router.push('/playground')}
          type="button"
        >
          <img src={require('../../static/maps-icon.svg')} alt="Карты" />
        </button>

        <button
          class={styles.button}
          onClick={() => this.$router.push('/settings')}
          type="button"
        >
          <img
            src={require('../../static/settings-icon.svg')}
            alt="Настройки"
          />
        </button>
      </div>
    )
  }
}
