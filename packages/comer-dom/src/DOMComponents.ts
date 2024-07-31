import { HostComponent } from "comer";
import { DOMProps } from "./DOMTypes";

export class Div extends HostComponent<DOMProps<HTMLDivElement>> {
  protected type = 'div';
}

export class Span extends HostComponent<DOMProps<HTMLSpanElement>> {
  protected type = 'Span';
}

export const s = new Span({
  onClick: (event: MouseEvent) => {
    console.log(event);
  }
});