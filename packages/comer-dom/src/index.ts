import { Renderer } from 'comer';
import { DOMAdapter } from './DOMAdapter';

export type * from './DOMTypes';

export * from './DOMAdapter';
export * from './DOMComponents';

export const renderer = new Renderer(new DOMAdapter());