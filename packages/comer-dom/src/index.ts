import { Renderer } from "comer";
import { DOMAdapter } from "./DOMAdapter";

export * from "./DOMAdapter";
export * from "./DOMComponent";
export * from "./DOMEvent";
export * from "./DOMStyle";

export * from "./components/HTML.generated";
export * from "./components/SVG.generated";
export * from "./components/MathML.generated";

export const renderer = new Renderer(new DOMAdapter());
