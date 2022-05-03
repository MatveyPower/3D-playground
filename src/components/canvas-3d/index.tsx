import Vue from "vue";
import Component from "vue-class-component";
//@ts-expect-error  // eslint-disable-next-line
import { init3DRenderer } from "../../3Dengine";

@Component
export class Canvas3d extends Vue {
  mounted() {
    const container = this.$refs.container;

    init3DRenderer(container);
  }

  render() {
    return (
      <div
        ref="container"
        style={{
          width: "1000px",
          height: "800px",
        }}
      ></div>
    );
  }
}
