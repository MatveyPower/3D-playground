import Vue from 'vue'
import Component from 'vue-class-component'

import styles from './main.module.css'

@Component({
  name: 'App',
})
export default class App extends Vue {
  render() {
    return (
      <div id="app" class={styles.fonts}>
        <router-view></router-view>
      </div>
    )
  }
}
