import Vue, { VNode } from 'vue'

declare global {
  namespace JSX {
    interface Element extends VNode {}
    interface ElementClass extends Vue {}

    interface ElementAttributesProperty {
      // eslint-disable-next-line
      $props: {}
    }
    interface IntrinsicElements {
      [elem: string]: any
    }
  }
}
