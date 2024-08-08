import { Renderer } from "comer";
import { DOMAdapter } from "./DOMAdapter";

export type * from "./DOMTypes";

export * from "./DOMAdapter";
export * from "./DOMComponent";

export * from "./components/HTML.generated";
export * from "./components/SVG.generated";
export * from "./components/MathML.generated";

export const renderer = new Renderer(new DOMAdapter());
