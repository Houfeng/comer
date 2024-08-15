import { observable } from "comer";

@observable
export class ElementModel {
  inspecting = false;

  toggleInspecting() {
    this.inspecting = !this.inspecting;
  }
}
