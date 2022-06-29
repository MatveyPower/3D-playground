import Vue from 'vue'
import { Component } from 'vue-property-decorator'

import { UserBlock } from '@/components'

import styles from './style.module.css'
import { Icon } from '../icon'

import { MyStore } from '@/store'

import { useModule } from 'vuex-simple'

@Component
export class TopMenu extends Vue {
  store = useModule<MyStore>(this.$store)

  render() {
    return (
      <div class={styles.root}>
        <div class={styles.buttonsWrapper}>
          <div class={styles.logo} onclick={() => this.$router.push('/')}>
            <svg
              width="87"
              height="46"
              viewBox="0 0 87 46"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M1.316 41.5V31.7H5.348C6.216 31.7 6.958 31.84 7.574 32.12C8.19933 32.4 8.68 32.8013 9.016 33.324C9.352 33.8467 9.52 34.4673 9.52 35.186C9.52 35.9047 9.352 36.5253 9.016 37.048C8.68 37.5613 8.19933 37.958 7.574 38.238C6.958 38.5087 6.216 38.644 5.348 38.644H2.324L3.136 37.818V41.5H1.316ZM7.728 41.5L5.25 37.944H7.196L9.688 41.5H7.728ZM3.136 38.014L2.324 37.146H5.264C6.06667 37.146 6.66867 36.9733 7.07 36.628C7.48067 36.2827 7.686 35.802 7.686 35.186C7.686 34.5607 7.48067 34.08 7.07 33.744C6.66867 33.408 6.06667 33.24 5.264 33.24H2.324L3.136 32.344V38.014ZM16.1482 41.64C15.3829 41.64 14.6782 41.514 14.0342 41.262C13.3902 41.01 12.8302 40.66 12.3542 40.212C11.8782 39.7547 11.5096 39.2227 11.2482 38.616C10.9869 38 10.8562 37.328 10.8562 36.6C10.8562 35.872 10.9869 35.2047 11.2482 34.598C11.5096 33.982 11.8782 33.45 12.3542 33.002C12.8302 32.5447 13.3902 32.19 14.0342 31.938C14.6782 31.686 15.3782 31.56 16.1342 31.56C16.8996 31.56 17.5996 31.686 18.2342 31.938C18.8782 32.19 19.4382 32.5447 19.9142 33.002C20.3902 33.45 20.7589 33.982 21.0202 34.598C21.2816 35.2047 21.4122 35.872 21.4122 36.6C21.4122 37.328 21.2816 38 21.0202 38.616C20.7589 39.232 20.3902 39.764 19.9142 40.212C19.4382 40.66 18.8782 41.01 18.2342 41.262C17.5996 41.514 16.9042 41.64 16.1482 41.64ZM16.1342 40.044C16.6289 40.044 17.0862 39.96 17.5062 39.792C17.9262 39.624 18.2902 39.386 18.5982 39.078C18.9062 38.7607 19.1442 38.3967 19.3122 37.986C19.4896 37.566 19.5782 37.104 19.5782 36.6C19.5782 36.096 19.4896 35.6387 19.3122 35.228C19.1442 34.808 18.9062 34.444 18.5982 34.136C18.2902 33.8187 17.9262 33.576 17.5062 33.408C17.0862 33.24 16.6289 33.156 16.1342 33.156C15.6396 33.156 15.1822 33.24 14.7622 33.408C14.3516 33.576 13.9876 33.8187 13.6702 34.136C13.3622 34.444 13.1196 34.808 12.9422 35.228C12.7742 35.6387 12.6902 36.096 12.6902 36.6C12.6902 37.0947 12.7742 37.552 12.9422 37.972C13.1196 38.392 13.3622 38.7607 13.6702 39.078C13.9782 39.386 14.3422 39.624 14.7622 39.792C15.1822 39.96 15.6396 40.044 16.1342 40.044ZM23.3414 41.5V31.7H27.9334C29.1094 31.7 30.0054 31.9333 30.6214 32.4C31.2374 32.8573 31.5454 33.4733 31.5454 34.248C31.5454 34.7707 31.4241 35.2187 31.1814 35.592C30.9387 35.956 30.6121 36.2407 30.2014 36.446C29.8001 36.642 29.3614 36.74 28.8854 36.74L29.1374 36.236C29.6881 36.236 30.1827 36.3387 30.6214 36.544C31.0601 36.74 31.4054 37.0293 31.6574 37.412C31.9187 37.7947 32.0494 38.2707 32.0494 38.84C32.0494 39.68 31.7274 40.3333 31.0834 40.8C30.4394 41.2667 29.4827 41.5 28.2134 41.5H23.3414ZM25.1614 40.072H28.1014C28.7827 40.072 29.3054 39.96 29.6694 39.736C30.0334 39.512 30.2154 39.1527 30.2154 38.658C30.2154 38.1727 30.0334 37.818 29.6694 37.594C29.3054 37.3607 28.7827 37.244 28.1014 37.244H25.0214V35.83H27.7374C28.3721 35.83 28.8574 35.718 29.1934 35.494C29.5387 35.27 29.7114 34.934 29.7114 34.486C29.7114 34.0287 29.5387 33.688 29.1934 33.464C28.8574 33.24 28.3721 33.128 27.7374 33.128H25.1614V40.072ZM38.5838 41.64C37.8184 41.64 37.1138 41.514 36.4698 41.262C35.8258 41.01 35.2658 40.66 34.7898 40.212C34.3138 39.7547 33.9451 39.2227 33.6838 38.616C33.4224 38 33.2918 37.328 33.2918 36.6C33.2918 35.872 33.4224 35.2047 33.6838 34.598C33.9451 33.982 34.3138 33.45 34.7898 33.002C35.2658 32.5447 35.8258 32.19 36.4698 31.938C37.1138 31.686 37.8138 31.56 38.5698 31.56C39.3351 31.56 40.0351 31.686 40.6698 31.938C41.3138 32.19 41.8738 32.5447 42.3498 33.002C42.8258 33.45 43.1944 33.982 43.4558 34.598C43.7171 35.2047 43.8478 35.872 43.8478 36.6C43.8478 37.328 43.7171 38 43.4558 38.616C43.1944 39.232 42.8258 39.764 42.3498 40.212C41.8738 40.66 41.3138 41.01 40.6698 41.262C40.0351 41.514 39.3398 41.64 38.5838 41.64ZM38.5698 40.044C39.0644 40.044 39.5218 39.96 39.9418 39.792C40.3618 39.624 40.7258 39.386 41.0338 39.078C41.3418 38.7607 41.5798 38.3967 41.7478 37.986C41.9251 37.566 42.0138 37.104 42.0138 36.6C42.0138 36.096 41.9251 35.6387 41.7478 35.228C41.5798 34.808 41.3418 34.444 41.0338 34.136C40.7258 33.8187 40.3618 33.576 39.9418 33.408C39.5218 33.24 39.0644 33.156 38.5698 33.156C38.0751 33.156 37.6178 33.24 37.1978 33.408C36.7871 33.576 36.4231 33.8187 36.1058 34.136C35.7978 34.444 35.5551 34.808 35.3778 35.228C35.2098 35.6387 35.1258 36.096 35.1258 36.6C35.1258 37.0947 35.2098 37.552 35.3778 37.972C35.5551 38.392 35.7978 38.7607 36.1058 39.078C36.4138 39.386 36.7778 39.624 37.1978 39.792C37.6178 39.96 38.0751 40.044 38.5698 40.044ZM50.3129 41.64C49.5663 41.64 48.8709 41.5187 48.2269 41.276C47.5923 41.024 47.0369 40.674 46.5609 40.226C46.0943 39.7687 45.7303 39.232 45.4689 38.616C45.2076 38 45.0769 37.328 45.0769 36.6C45.0769 35.872 45.2076 35.2 45.4689 34.584C45.7303 33.968 46.0989 33.436 46.5749 32.988C47.0509 32.5307 47.6063 32.1807 48.2409 31.938C48.8756 31.686 49.5709 31.56 50.3269 31.56C51.1296 31.56 51.8623 31.7 52.5249 31.98C53.1876 32.2507 53.7476 32.6567 54.2049 33.198L53.0289 34.304C52.6743 33.9213 52.2776 33.6367 51.8389 33.45C51.4003 33.254 50.9243 33.156 50.4109 33.156C49.8976 33.156 49.4263 33.24 48.9969 33.408C48.5769 33.576 48.2083 33.814 47.8909 34.122C47.5829 34.43 47.3403 34.794 47.1629 35.214C46.9949 35.634 46.9109 36.096 46.9109 36.6C46.9109 37.104 46.9949 37.566 47.1629 37.986C47.3403 38.406 47.5829 38.77 47.8909 39.078C48.2083 39.386 48.5769 39.624 48.9969 39.792C49.4263 39.96 49.8976 40.044 50.4109 40.044C50.9243 40.044 51.4003 39.9507 51.8389 39.764C52.2776 39.568 52.6743 39.274 53.0289 38.882L54.2049 40.002C53.7476 40.534 53.1876 40.94 52.5249 41.22C51.8623 41.5 51.1249 41.64 50.3129 41.64ZM60.3357 41.64C59.5704 41.64 58.8657 41.514 58.2217 41.262C57.5777 41.01 57.0177 40.66 56.5417 40.212C56.0657 39.7547 55.6971 39.2227 55.4357 38.616C55.1744 38 55.0437 37.328 55.0437 36.6C55.0437 35.872 55.1744 35.2047 55.4357 34.598C55.6971 33.982 56.0657 33.45 56.5417 33.002C57.0177 32.5447 57.5777 32.19 58.2217 31.938C58.8657 31.686 59.5657 31.56 60.3217 31.56C61.0871 31.56 61.7871 31.686 62.4217 31.938C63.0657 32.19 63.6257 32.5447 64.1017 33.002C64.5777 33.45 64.9464 33.982 65.2077 34.598C65.4691 35.2047 65.5997 35.872 65.5997 36.6C65.5997 37.328 65.4691 38 65.2077 38.616C64.9464 39.232 64.5777 39.764 64.1017 40.212C63.6257 40.66 63.0657 41.01 62.4217 41.262C61.7871 41.514 61.0917 41.64 60.3357 41.64ZM60.3217 40.044C60.8164 40.044 61.2737 39.96 61.6937 39.792C62.1137 39.624 62.4777 39.386 62.7857 39.078C63.0937 38.7607 63.3317 38.3967 63.4997 37.986C63.6771 37.566 63.7657 37.104 63.7657 36.6C63.7657 36.096 63.6771 35.6387 63.4997 35.228C63.3317 34.808 63.0937 34.444 62.7857 34.136C62.4777 33.8187 62.1137 33.576 61.6937 33.408C61.2737 33.24 60.8164 33.156 60.3217 33.156C59.8271 33.156 59.3697 33.24 58.9497 33.408C58.5391 33.576 58.1751 33.8187 57.8577 34.136C57.5497 34.444 57.3071 34.808 57.1297 35.228C56.9617 35.6387 56.8777 36.096 56.8777 36.6C56.8777 37.0947 56.9617 37.552 57.1297 37.972C57.3071 38.392 57.5497 38.7607 57.8577 39.078C58.1657 39.386 58.5297 39.624 58.9497 39.792C59.3697 39.96 59.8271 40.044 60.3217 40.044ZM67.5289 41.5V31.7H71.8129C72.8769 31.7 73.8102 31.9053 74.6129 32.316C75.4156 32.7267 76.0409 33.296 76.4889 34.024C76.9369 34.752 77.1609 35.6107 77.1609 36.6C77.1609 37.58 76.9369 38.4387 76.4889 39.176C76.0409 39.904 75.4156 40.4733 74.6129 40.884C73.8102 41.2947 72.8769 41.5 71.8129 41.5H67.5289ZM69.3489 39.96H71.7289C72.4662 39.96 73.1009 39.82 73.6329 39.54C74.1742 39.26 74.5896 38.868 74.8789 38.364C75.1776 37.86 75.3269 37.272 75.3269 36.6C75.3269 35.9187 75.1776 35.3307 74.8789 34.836C74.5896 34.332 74.1742 33.94 73.6329 33.66C73.1009 33.38 72.4662 33.24 71.7289 33.24H69.3489V39.96ZM80.7753 35.774H85.6473V37.272H80.7753V35.774ZM80.9153 39.974H86.4453V41.5H79.0953V31.7H86.2493V33.226H80.9153V39.974Z"
                fill="#FA8E2C"
              />
              <path
                d="M22 23C20 23 17.8333 28.6667 17 31.5L20 33.5C20 33.5 25 26.5 25 25.5C25 24.5 24.5 23 22 23Z"
                stroke="#FA8E2C"
                stroke-width="2"
              />
              <path
                d="M36.5219 32.3655L36.5221 32.3661L38.3236 32.4331L40.1252 32.5C40.1252 32.5 40.6485 25.4823 40.1251 24.6302C39.6017 23.7781 38.3905 22.7617 36.2603 24.0703C34.5563 25.117 35.749 29.5151 36.5219 32.3655Z"
                stroke="#FA8E2C"
                stroke-width="2"
              />
              <path
                d="M51.2863 25.168C50.3718 26.9466 54.4206 31.4646 56.5593 33.5013L59.7098 31.7478C59.7098 31.7478 55.7707 24.1004 54.8814 23.6431C53.9921 23.1858 52.4294 22.9446 51.2863 25.168Z"
                stroke="#FA8E2C"
                stroke-width="2"
              />
              <path
                d="M59 21L61.5 19.5V17M59 21V24L56.4286 25.5M59 21H16M16 21V24.5C16.9025 25.0415 18.0388 25.7233 19 26.3M16 21L10.5 19.5V9.5L16 7.5H31.5M61.5 17V14.5L45.5 7.5H43M61.5 17L47.5 15.5L43 13V7.5M43 7.5H31.5M31.5 11V13.5M27 11V13.5M22 11V13.5M31.5 7.5V0.5M24 27.5H35.5M40.5 27.5H51.5"
                stroke="#FA8E2C"
                stroke-width="2"
              />
            </svg>
          </div>

          <Icon
            svg={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M22.1835 11.8359L12.5296 2.18907C12.4601 2.11942 12.3776 2.06417 12.2867 2.02647C12.1958 1.98877 12.0983 1.96936 11.9999 1.96936C11.9015 1.96936 11.8041 1.98877 11.7132 2.02647C11.6223 2.06417 11.5398 2.11942 11.4703 2.18907L1.81636 11.8359C1.53511 12.1172 1.37573 12.4992 1.37573 12.8977C1.37573 13.725 2.04839 14.3977 2.87573 14.3977H3.89292V21.2813C3.89292 21.6961 4.22807 22.0313 4.64292 22.0313H10.4999V16.7813H13.1249V22.0313H19.357C19.7718 22.0313 20.107 21.6961 20.107 21.2813V14.3977H21.1242C21.5226 14.3977 21.9046 14.2406 22.1859 13.957C22.7695 13.3711 22.7695 12.4219 22.1835 11.8359V11.8359Z" />
              </svg>
            }
            whenClick={() => this.$router.push('/')}
          />

          <Icon
            svg={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9 6.88196L2 3.38196V16.618L9 20.118L15 17.118L22 20.618V7.38196L15 3.88196L9 6.88196ZM15 15L9 18V8.99996L15 5.99996V15Z" />
              </svg>
            }
            whenClick={() => this.$router.push('/maps')}
          />

          <Icon
            svg={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M13.8199 22H10.1799C9.95182 22 9.73059 21.9221 9.55289 21.7792C9.37518 21.6362 9.25169 21.4368 9.20288 21.214L8.79588 19.33C8.25294 19.0921 7.73812 18.7946 7.26088 18.443L5.42388 19.028C5.20645 19.0973 4.97183 19.0902 4.759 19.0078C4.54617 18.9254 4.36794 18.7727 4.25388 18.575L2.42988 15.424C2.31703 15.2261 2.27467 14.9958 2.30973 14.7708C2.34479 14.5457 2.45519 14.3392 2.62288 14.185L4.04788 12.885C3.98308 12.2961 3.98308 11.7019 4.04788 11.113L2.62288 9.816C2.45496 9.66177 2.3444 9.45507 2.30933 9.22978C2.27427 9.00449 2.31677 8.77397 2.42988 8.576L4.24988 5.423C4.36394 5.22532 4.54218 5.07259 4.755 4.99019C4.96783 4.90778 5.20245 4.90066 5.41988 4.97L7.25688 5.555C7.50088 5.375 7.75488 5.207 8.01688 5.055C8.26988 4.913 8.52988 4.784 8.79588 4.669L9.20388 2.787C9.25246 2.5642 9.37572 2.36469 9.55323 2.22155C9.73074 2.07841 9.95185 2.00024 10.1799 2H13.8199C14.0479 2.00024 14.269 2.07841 14.4465 2.22155C14.6241 2.36469 14.7473 2.5642 14.7959 2.787L15.2079 4.67C15.7501 4.90927 16.2648 5.20668 16.7429 5.557L18.5809 4.972C18.7982 4.90292 19.0326 4.91017 19.2452 4.99256C19.4578 5.07495 19.6359 5.22753 19.7499 5.425L21.5699 8.578C21.8019 8.985 21.7219 9.5 21.3769 9.817L19.9519 11.117C20.0167 11.7059 20.0167 12.3001 19.9519 12.889L21.3769 14.189C21.7219 14.507 21.8019 15.021 21.5699 15.428L19.7499 18.581C19.6358 18.7787 19.4576 18.9314 19.2448 19.0138C19.0319 19.0962 18.7973 19.1033 18.5799 19.034L16.7429 18.449C16.266 18.8003 15.7515 19.0975 15.2089 19.335L14.7959 21.214C14.7471 21.4366 14.6238 21.6359 14.4463 21.7788C14.2688 21.9218 14.0478 21.9998 13.8199 22V22ZM11.9959 8C10.935 8 9.9176 8.42143 9.16746 9.17157C8.41731 9.92172 7.99588 10.9391 7.99588 12C7.99588 13.0609 8.41731 14.0783 9.16746 14.8284C9.9176 15.5786 10.935 16 11.9959 16C13.0568 16 14.0742 15.5786 14.8243 14.8284C15.5745 14.0783 15.9959 13.0609 15.9959 12C15.9959 10.9391 15.5745 9.92172 14.8243 9.17157C14.0742 8.42143 13.0568 8 11.9959 8V8Z" />
              </svg>
            }
            whenClick={() => this.$router.push('/settings')}
          />

          <Icon
            svg={
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 2C6.486 2 2 6.486 2 12C2 17.514 6.486 22 12 22C17.514 22 22 17.514 22 12C22 6.486 17.514 2 12 2ZM13 17H11V11H13V17ZM13 9H11V7H13V9Z" />
              </svg>
            }
            whenClick={() => this.$router.push('/info')}
          />

          {this.store?.user.user.type === 'teacher' && (
            <Icon
              svg={
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M4.5 21C4.5 21 3 21 3 19.5C3 18 4.5 13.5 12 13.5C19.5 13.5 21 18 21 19.5C21 21 19.5 21 19.5 21H4.5ZM12 12C13.1935 12 14.3381 11.5259 15.182 10.682C16.0259 9.83807 16.5 8.69347 16.5 7.5C16.5 6.30653 16.0259 5.16193 15.182 4.31802C14.3381 3.47411 13.1935 3 12 3C10.8065 3 9.66193 3.47411 8.81802 4.31802C7.97411 5.16193 7.5 6.30653 7.5 7.5C7.5 8.69347 7.97411 9.83807 8.81802 10.682C9.66193 11.5259 10.8065 12 12 12V12Z" />
                </svg>
              }
              whenClick={() => this.$router.push('/persons')}
            />
          )}
        </div>

        <UserBlock
          user={this.store?.user.user}
          whenClick={() => this.$router.push('/login')}
          whenOut={() => this.store?.user.setUser(null)}
        />
      </div>
    )
  }
}
