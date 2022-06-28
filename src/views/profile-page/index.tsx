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
export class ProfilePage extends Vue {
  store = useModule<MyStore>(this.$store)

  get user() {
    return this.store?.user.user as {
      name: string
      login: string
      rating: number
      passedMaps: []
    }
  }

  render() {
    return (
      <DefaultLayout>
        <div class={styles.root}>
          {this.user ? (
            <div class={styles.profileBlock}>
              <div class={styles.mainInformation}>
                <div class={styles.avatar}>
                  <svg
                    width="129"
                    height="129"
                    viewBox="0 0 129 129"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M64.5 70.5C78.8594 70.5 90.5 58.8594 90.5 44.5C90.5 30.1406 78.8594 18.5 64.5 18.5C50.1406 18.5 38.5 30.1406 38.5 44.5C38.5 58.8594 50.1406 70.5 64.5 70.5Z"
                      stroke="#9B9B9B"
                      stroke-width="16"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M22.5 110.5C22.5 90.5 38.5 70.5 64.5 70.5C90.5 70.5 106.5 90.5 106.5 110.5"
                      stroke="#9B9B9B"
                      stroke-width="16"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </div>
                <div class={styles.informationWrapper}>
                  <div class={styles.name}>{this.user?.name}</div>
                  <div class={styles.login}>{this.user?.login}</div>
                </div>
              </div>

              <div class={styles.counters}>
                <div class={styles.rating}>
                  <div class={styles.ratingNumber}>{this.user?.rating}</div>
                  <div class={styles.ratingText}>Общий рейтинг</div>
                </div>

                <div clss={styles.mapsCounter}>
                  <div class={styles.mapsCounterNumber}>
                    {this.user?.passedMaps?.length}
                  </div>
                  <div class={styles.mapsCounterText}>Пройдено карт</div>
                </div>
              </div>
            </div>
          ) : (
            this.$router.push('/login')
          )}
        </div>
      </DefaultLayout>
    )
  }
}
