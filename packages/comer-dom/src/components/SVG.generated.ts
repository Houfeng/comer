import { DOMEventProps } from "../DOMTypes";
import { DOMComponent } from "../DOMComponent";

export class Svg extends DOMComponent<
  SVGElement,
  Partial<DOMEventProps<SVGElementEventMap>>,
  Svg
> {
  type = "svg";
}

export class G extends DOMComponent<
  SVGGElement,
  Partial<DOMEventProps<SVGElementEventMap>>,
  G
> {
  type = "g";
}

export class Image extends DOMComponent<
  SVGImageElement,
  Partial<DOMEventProps<SVGElementEventMap>>,
  Image
> {
  type = "image";
}

export class SvgText extends DOMComponent<
  SVGTextElement,
  Partial<DOMEventProps<SVGElementEventMap>>,
  SvgText
> {
  type = "text";
}

export class TSpan extends DOMComponent<
  SVGTSpanElement,
  Partial<DOMEventProps<SVGElementEventMap>>,
  TSpan
> {
  type = "tspan";
}
