import { func } from "comer";
import { DOMEventProps } from "../DOMTypes";
import { DOMComponent } from "../DOMComponent";

export class Svg extends DOMComponent<
  SVGElement,
  Partial<DOMEventProps<SVGElementEventMap>>,
  Svg
> {
  type = "svg";
}
export const svg = func(Svg);

export class G extends DOMComponent<
  SVGGElement,
  Partial<DOMEventProps<SVGElementEventMap>>,
  G
> {
  type = "g";
}
export const g = func(G);

export class Image extends DOMComponent<
  SVGImageElement,
  Partial<DOMEventProps<SVGElementEventMap>>,
  Image
> {
  type = "image";
}
export const image = func(Image);

export class SvgText extends DOMComponent<
  SVGTextElement,
  Partial<DOMEventProps<SVGElementEventMap>>,
  SvgText
> {
  type = "text";
}
export const svgText = func(SvgText);
export const sText = func(SvgText);

export class TSpan extends DOMComponent<
  SVGTSpanElement,
  Partial<DOMEventProps<SVGElementEventMap>>,
  TSpan
> {
  type = "tspan";
}
export const tspan = func(TSpan);
