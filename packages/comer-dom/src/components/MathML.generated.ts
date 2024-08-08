import { DOMComponent } from "../DOMComponent";

export class MAction extends DOMComponent<MathMLElement, {}, MAction> {
  type = "maction:math";
}
export class MAth extends DOMComponent<MathMLElement, {}, MAth> {
  type = "math:math";
}
export class MError extends DOMComponent<MathMLElement, {}, MError> {
  type = "merror:math";
}
export class MFrac extends DOMComponent<MathMLElement, {}, MFrac> {
  type = "mfrac:math";
}
export class MI extends DOMComponent<MathMLElement, {}, MI> {
  type = "mi:math";
}
export class MMultiscripts extends DOMComponent<
  MathMLElement,
  {},
  MMultiscripts
> {
  type = "mmultiscripts:math";
}
export class MN extends DOMComponent<MathMLElement, {}, MN> {
  type = "mn:math";
}
export class MO extends DOMComponent<MathMLElement, {}, MO> {
  type = "mo:math";
}
export class MOver extends DOMComponent<MathMLElement, {}, MOver> {
  type = "mover:math";
}
export class MPadded extends DOMComponent<MathMLElement, {}, MPadded> {
  type = "mpadded:math";
}
export class MPhantom extends DOMComponent<MathMLElement, {}, MPhantom> {
  type = "mphantom:math";
}
export class MPrescripts extends DOMComponent<MathMLElement, {}, MPrescripts> {
  type = "mprescripts:math";
}
export class MRoot extends DOMComponent<MathMLElement, {}, MRoot> {
  type = "mroot:math";
}
export class MRow extends DOMComponent<MathMLElement, {}, MRow> {
  type = "mrow:math";
}
export class MS extends DOMComponent<MathMLElement, {}, MS> {
  type = "ms:math";
}
export class MSpace extends DOMComponent<MathMLElement, {}, MSpace> {
  type = "mspace:math";
}
export class MSqrt extends DOMComponent<MathMLElement, {}, MSqrt> {
  type = "msqrt:math";
}
export class MStyle extends DOMComponent<MathMLElement, {}, MStyle> {
  type = "mstyle:math";
}
export class MSub extends DOMComponent<MathMLElement, {}, MSub> {
  type = "msub:math";
}
export class MSubsup extends DOMComponent<MathMLElement, {}, MSubsup> {
  type = "msubsup:math";
}
export class MSup extends DOMComponent<MathMLElement, {}, MSup> {
  type = "msup:math";
}
export class MTable extends DOMComponent<MathMLElement, {}, MTable> {
  type = "mtable:math";
}
export class MTd extends DOMComponent<MathMLElement, {}, MTd> {
  type = "mtd:math";
}
export class MText extends DOMComponent<MathMLElement, {}, MText> {
  type = "mtext:math";
}
export class MTr extends DOMComponent<MathMLElement, {}, MTr> {
  type = "mtr:math";
}
export class MUnder extends DOMComponent<MathMLElement, {}, MUnder> {
  type = "munder:math";
}
export class MUnderover extends DOMComponent<MathMLElement, {}, MUnderover> {
  type = "munderover:math";
}
export class MEmantics extends DOMComponent<MathMLElement, {}, MEmantics> {
  type = "semantics:math";
}
