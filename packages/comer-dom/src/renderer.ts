import { Renderer } from "comer";
import { DOMAdapter } from "./DOMAdapter";

export const renderer = new Renderer(new DOMAdapter());