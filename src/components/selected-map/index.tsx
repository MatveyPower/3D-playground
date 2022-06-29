import Vue from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { Canvas3d } from '../canvas-3d'
import { Button } from '../button'
import { MapCard } from '../map-card'
import { Map } from '@/store/modules/maps'

import styles from './style.module.css'

interface ButtonProps {
  selectedMap: Map
  passed?: boolean
}

@Component
export class SelectedMap extends Vue {
  @Prop()
  selectedMap: ButtonProps['selectedMap']

  @Prop()
  passed: ButtonProps['passed']

  render() {
    return (
      <div class={styles.root}>
        <Canvas3d
          map={this.selectedMap.structure}
          customStyle={styles.playground}
          class={styles.playgroundWrapper}
        />
        <MapCard
          passed={this.passed}
          class={styles.mapCard}
          name={this.selectedMap.name}
          desciption={this.selectedMap.desciption}
          rating={this.selectedMap.rating}
        />
        <Button
          class={styles.buttonsStart}
          whenClick={() => this.$router.push('/playground')}
          text={'Запустить карту'}
        />
      </div>
    )
  }
}
