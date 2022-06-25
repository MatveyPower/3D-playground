import { Button, DraggableItem, MapCard, TopMenu } from '@/components'
import { DefaultLayout } from '@/components'
import { DraggableItemEnum } from '@/components/draggable-item'
import { Icon } from '@/components/icon'
import { Input } from '@/components/input'
import Vue from 'vue'
import Component from 'vue-class-component'

import styles from './style.module.css'

@Component({
  template: 'default',
})
export class EducationPage extends Vue {
  render() {
    return (
      <DefaultLayout class={styles.pageWrapper}>
        <div class={styles.rootWrapper}>
          <div class={styles.title}>Обучение</div>
          <div class={styles.video}></div>
          <div class={styles.tichBlock}>
            <div class={styles.tichTitle}>Как начать?</div>
            <div class={styles.tichDescription}>
              <div class={styles.tichNumber}>1</div>
              <div class={styles.tichText}>
                Для начала вам нужно выбрать карту для прохождения. Карта -
                своего рода уровень, который вам необходимо пройти написав
                алгорим для робота. Для выбора карты перейдите на страницу
                списка карт, щелкнув по иконке с картой в главном меню
              </div>
              <div class={styles.tichExample}>
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
              </div>
            </div>

            <div class={styles.tichDescription}>
              <div class={styles.tichNumber}>2</div>
              <div class={styles.tichText}>
                На этой странице вам необходимо выбрать карту для прохождения из
                списка, для начала лучше выбрать карту “Стандартная”, нажав на
                нее.
              </div>
              <div class={styles.tichExample}>
                <MapCard
                  class={styles.mapCardExample}
                  name="Стандартная"
                  desciption="Давно выяснено, что при оценке дизайна и композиции читаемый текст мешает сосредоточиться."
                  rating="3"
                />
              </div>
            </div>

            <div class={styles.tichDescription}>
              <div class={styles.tichNumber}>3</div>
              <div class={styles.tichText}>
                Когда карта выбрана, ее можно запустить справо в блоке выбранной
                карты, нажав на кнопку “Запустить карту”
              </div>
              <div class={styles.tichExample}>
                <Button
                  class={styles.buttonStartMapExample}
                  text="Запустить карту"
                />
              </div>
            </div>

            <div class={styles.tichDescription}>
              <div class={styles.tichNumber}>4</div>
              <div class={styles.tichText}>
                Вы находитесь на странице для программирования робота и можете
                собрать свой первый алгоритм!
              </div>
            </div>
          </div>

          <div class={styles.tichBlock}>
            <div class={styles.tichTitle}>Как собрать первую программу?</div>
            <div class={styles.tichDescription}>
              <div class={styles.tichNumber}>1</div>
              <div class={styles.tichText}>
                Для того чтобы начать собирать свой первый алгорим вам
                необходимо добавить начальный блок кода. Для этого в среде
                разарботки программы нажмите на кнопку “Добавить блок”
              </div>
              <div class={styles.tichExample}>
                <Button
                  text="Добавить блок"
                  class={styles.addBlockButtonExample}
                />
              </div>
            </div>

            <div class={styles.tichDescription}>
              <div class={styles.tichNumberEmpty}></div>
              <div class={styles.tichText}>
                <div class={styles.textTitle}>Блоки кода</div>
                Части алгоритма из которых строиться программа и которые
                поочередно выполняет робот. Существует два типа блоков кода:
              </div>
            </div>

            <div class={styles.tichDescription}>
              <div class={styles.tichNumberEmpty}></div>
              <div class={styles.tichText}>
                Блок действия. Самый популярный блок кода. Дает команду роботу
                на выполнение действия.
              </div>
              <div class={styles.tichExample}>
                <DraggableItem
                  whenClick={() => null}
                  item={{
                    name: 'Если',
                    id: '-1',
                    type: DraggableItemEnum.action,
                  }}
                  id={'-1'}
                />
              </div>
            </div>

            <div class={styles.tichDescription}>
              <div class={styles.tichNumberEmpty}></div>
              <div class={styles.tichText}>
                Блок условия. Дает выполнить вложенные блоки, только в том
                случае, если условие выполняется.
              </div>
              <div class={styles.tichExample}>
                <DraggableItem
                  whenClick={() => null}
                  item={{
                    name: 'Если',
                    id: '-1',
                    type: DraggableItemEnum.if,
                  }}
                  id={'-1'}
                />
              </div>
            </div>

            <div class={styles.tichDescription}>
              <div class={styles.tichNumberEmpty}></div>
              <div class={styles.tichText}>
                Блок цикла. Выполняет вложенные блоки указанное количество раз.
              </div>
              <div class={styles.tichExample}>
                <DraggableItem
                  whenClick={() => null}
                  item={{
                    name: 'Если',
                    id: '-1',
                    type: DraggableItemEnum.circle,
                  }}
                  id={'-1'}
                />
              </div>
            </div>
          </div>
        </div>
      </DefaultLayout>
    )
  }
}
