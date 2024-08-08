import { DOMComponent } from "../DOMComponent";

export class SvgA extends DOMComponent<SVGAElement, {}, SvgA> {
  type = "a:svg";
}
export class Animate extends DOMComponent<SVGAnimateElement, {}, Animate> {
  type = "animate:svg";
}
export class AnimateMotion extends DOMComponent<
  SVGAnimateMotionElement,
  {},
  AnimateMotion
> {
  type = "animateMotion:svg";
}
export class AnimateTransform extends DOMComponent<
  SVGAnimateTransformElement,
  {},
  AnimateTransform
> {
  type = "animateTransform:svg";
}
export class Circle extends DOMComponent<SVGCircleElement, {}, Circle> {
  type = "circle:svg";
}
export class ClipPath extends DOMComponent<SVGClipPathElement, {}, ClipPath> {
  type = "clipPath:svg";
}
export class Defs extends DOMComponent<SVGDefsElement, {}, Defs> {
  type = "defs:svg";
}
export class Desc extends DOMComponent<SVGDescElement, {}, Desc> {
  type = "desc:svg";
}
export class Ellipse extends DOMComponent<SVGEllipseElement, {}, Ellipse> {
  type = "ellipse:svg";
}
export class FEBlend extends DOMComponent<SVGFEBlendElement, {}, FEBlend> {
  type = "feBlend:svg";
}
export class FEColorMatrix extends DOMComponent<
  SVGFEColorMatrixElement,
  {},
  FEColorMatrix
> {
  type = "feColorMatrix:svg";
}
export class FEComponentTransfer extends DOMComponent<
  SVGFEComponentTransferElement,
  {},
  FEComponentTransfer
> {
  type = "feComponentTransfer:svg";
}
export class FEComposite extends DOMComponent<
  SVGFECompositeElement,
  {},
  FEComposite
> {
  type = "feComposite:svg";
}
export class FEConvolveMatrix extends DOMComponent<
  SVGFEConvolveMatrixElement,
  {},
  FEConvolveMatrix
> {
  type = "feConvolveMatrix:svg";
}
export class FEDiffuseLighting extends DOMComponent<
  SVGFEDiffuseLightingElement,
  {},
  FEDiffuseLighting
> {
  type = "feDiffuseLighting:svg";
}
export class FEDisplacementMap extends DOMComponent<
  SVGFEDisplacementMapElement,
  {},
  FEDisplacementMap
> {
  type = "feDisplacementMap:svg";
}
export class FEDistantLight extends DOMComponent<
  SVGFEDistantLightElement,
  {},
  FEDistantLight
> {
  type = "feDistantLight:svg";
}
export class FEDropShadow extends DOMComponent<
  SVGFEDropShadowElement,
  {},
  FEDropShadow
> {
  type = "feDropShadow:svg";
}
export class FEFlood extends DOMComponent<SVGFEFloodElement, {}, FEFlood> {
  type = "feFlood:svg";
}
export class FEFuncA extends DOMComponent<SVGFEFuncAElement, {}, FEFuncA> {
  type = "feFuncA:svg";
}
export class FEFuncB extends DOMComponent<SVGFEFuncBElement, {}, FEFuncB> {
  type = "feFuncB:svg";
}
export class FEFuncG extends DOMComponent<SVGFEFuncGElement, {}, FEFuncG> {
  type = "feFuncG:svg";
}
export class FEFuncR extends DOMComponent<SVGFEFuncRElement, {}, FEFuncR> {
  type = "feFuncR:svg";
}
export class FEGaussianBlur extends DOMComponent<
  SVGFEGaussianBlurElement,
  {},
  FEGaussianBlur
> {
  type = "feGaussianBlur:svg";
}
export class FEImage extends DOMComponent<SVGFEImageElement, {}, FEImage> {
  type = "feImage:svg";
}
export class FEMerge extends DOMComponent<SVGFEMergeElement, {}, FEMerge> {
  type = "feMerge:svg";
}
export class FEMergeNode extends DOMComponent<
  SVGFEMergeNodeElement,
  {},
  FEMergeNode
> {
  type = "feMergeNode:svg";
}
export class FEMorphology extends DOMComponent<
  SVGFEMorphologyElement,
  {},
  FEMorphology
> {
  type = "feMorphology:svg";
}
export class FEOffset extends DOMComponent<SVGFEOffsetElement, {}, FEOffset> {
  type = "feOffset:svg";
}
export class FEPointLight extends DOMComponent<
  SVGFEPointLightElement,
  {},
  FEPointLight
> {
  type = "fePointLight:svg";
}
export class FESpecularLighting extends DOMComponent<
  SVGFESpecularLightingElement,
  {},
  FESpecularLighting
> {
  type = "feSpecularLighting:svg";
}
export class FESpotLight extends DOMComponent<
  SVGFESpotLightElement,
  {},
  FESpotLight
> {
  type = "feSpotLight:svg";
}
export class FETile extends DOMComponent<SVGFETileElement, {}, FETile> {
  type = "feTile:svg";
}
export class FETurbulence extends DOMComponent<
  SVGFETurbulenceElement,
  {},
  FETurbulence
> {
  type = "feTurbulence:svg";
}
export class Filter extends DOMComponent<SVGFilterElement, {}, Filter> {
  type = "filter:svg";
}
export class ForeignObject extends DOMComponent<
  SVGForeignObjectElement,
  {},
  ForeignObject
> {
  type = "foreignObject:svg";
}
export class G extends DOMComponent<SVGGElement, {}, G> {
  type = "g:svg";
}
export class Image extends DOMComponent<SVGImageElement, {}, Image> {
  type = "image:svg";
}
export class Line extends DOMComponent<SVGLineElement, {}, Line> {
  type = "line:svg";
}
export class LinearGradient extends DOMComponent<
  SVGLinearGradientElement,
  {},
  LinearGradient
> {
  type = "linearGradient:svg";
}
export class Marker extends DOMComponent<SVGMarkerElement, {}, Marker> {
  type = "marker:svg";
}
export class Mask extends DOMComponent<SVGMaskElement, {}, Mask> {
  type = "mask:svg";
}
export class Metadata extends DOMComponent<SVGMetadataElement, {}, Metadata> {
  type = "metadata:svg";
}
export class MPath extends DOMComponent<SVGMPathElement, {}, MPath> {
  type = "mpath:svg";
}
export class Path extends DOMComponent<SVGPathElement, {}, Path> {
  type = "path:svg";
}
export class Pattern extends DOMComponent<SVGPatternElement, {}, Pattern> {
  type = "pattern:svg";
}
export class Polygon extends DOMComponent<SVGPolygonElement, {}, Polygon> {
  type = "polygon:svg";
}
export class Polyline extends DOMComponent<SVGPolylineElement, {}, Polyline> {
  type = "polyline:svg";
}
export class RadialGradient extends DOMComponent<
  SVGRadialGradientElement,
  {},
  RadialGradient
> {
  type = "radialGradient:svg";
}
export class Rect extends DOMComponent<SVGRectElement, {}, Rect> {
  type = "rect:svg";
}
export class SvgScript extends DOMComponent<SVGScriptElement, {}, SvgScript> {
  type = "script:svg";
}
export class Set extends DOMComponent<SVGSetElement, {}, Set> {
  type = "set:svg";
}
export class Stop extends DOMComponent<SVGStopElement, {}, Stop> {
  type = "stop:svg";
}
export class SvgStyle extends DOMComponent<SVGStyleElement, {}, SvgStyle> {
  type = "style:svg";
}
export class SVG extends DOMComponent<SVGSVGElement, {}, SVG> {
  type = "svg:svg";
}
export class Switch extends DOMComponent<SVGSwitchElement, {}, Switch> {
  type = "switch:svg";
}
export class Symbol extends DOMComponent<SVGSymbolElement, {}, Symbol> {
  type = "symbol:svg";
}
export class SvgText extends DOMComponent<SVGTextElement, {}, SvgText> {
  type = "text:svg";
}
export class TextPath extends DOMComponent<SVGTextPathElement, {}, TextPath> {
  type = "textPath:svg";
}
export class SvgTitle extends DOMComponent<SVGTitleElement, {}, SvgTitle> {
  type = "title:svg";
}
export class TSpan extends DOMComponent<SVGTSpanElement, {}, TSpan> {
  type = "tspan:svg";
}
export class Use extends DOMComponent<SVGUseElement, {}, Use> {
  type = "use:svg";
}
export class View extends DOMComponent<SVGViewElement, {}, View> {
  type = "view:svg";
}
