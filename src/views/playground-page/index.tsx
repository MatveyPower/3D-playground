import Vue from "vue";
import Component from "vue-class-component";
import { Canvas3d } from "../../components";

@Component
export class PlaygroundPage extends Vue {
  render() {
    return <Canvas3d />;
  }
}
