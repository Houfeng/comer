import { ElementComponent as EC } from "../DOMComponent";

/**
 * SVG Tag: a
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/a
 * @see https://developer.mozilla.org/docs/Web/API/SVGAElement
 * @class
 * @sealed
 */
export class SVGAnchor extends EC<SVGAElement, SVGElementEventMap> {
  static readonly type = "SVG:a";
}

/**
 * SVG Tag: animate
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/animate
 * @see https://developer.mozilla.org/docs/Web/API/SVGAnimateElement
 * @class
 * @sealed
 */
export class Animate extends EC<SVGAnimateElement, SVGElementEventMap> {
  static readonly type = "SVG:animate";
}

/**
 * SVG Tag: animateMotion
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/animateMotion
 * @see https://developer.mozilla.org/docs/Web/API/SVGAnimateMotionElement
 * @class
 * @sealed
 */
export class AnimateMotion extends EC<
  SVGAnimateMotionElement,
  SVGElementEventMap
> {
  static readonly type = "SVG:animateMotion";
}

/**
 * SVG Tag: animateTransform
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/animateTransform
 * @see https://developer.mozilla.org/docs/Web/API/SVGAnimateTransformElement
 * @class
 * @sealed
 */
export class AnimateTransform extends EC<
  SVGAnimateTransformElement,
  SVGElementEventMap
> {
  static readonly type = "SVG:animateTransform";
}

/**
 * SVG Tag: circle
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/circle
 * @see https://developer.mozilla.org/docs/Web/API/SVGCircleElement
 * @class
 * @sealed
 */
export class Circle extends EC<SVGCircleElement, SVGElementEventMap> {
  static readonly type = "SVG:circle";
}

/**
 * SVG Tag: clipPath
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/clipPath
 * @see https://developer.mozilla.org/docs/Web/API/SVGClipPathElement
 * @class
 * @sealed
 */
export class ClipPath extends EC<SVGClipPathElement, SVGElementEventMap> {
  static readonly type = "SVG:clipPath";
}

/**
 * SVG Tag: defs
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/defs
 * @see https://developer.mozilla.org/docs/Web/API/SVGDefsElement
 * @class
 * @sealed
 */
export class Defs extends EC<SVGDefsElement, SVGElementEventMap> {
  static readonly type = "SVG:defs";
}

/**
 * SVG Tag: desc
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/desc
 * @see https://developer.mozilla.org/docs/Web/API/SVGDescElement
 * @class
 * @sealed
 */
export class Desc extends EC<SVGDescElement, SVGElementEventMap> {
  static readonly type = "SVG:desc";
}

/**
 * SVG Tag: ellipse
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/ellipse
 * @see https://developer.mozilla.org/docs/Web/API/SVGEllipseElement
 * @class
 * @sealed
 */
export class Ellipse extends EC<SVGEllipseElement, SVGElementEventMap> {
  static readonly type = "SVG:ellipse";
}

/**
 * SVG Tag: feBlend
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feBlend
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEBlendElement
 * @class
 * @sealed
 */
export class FEBlend extends EC<SVGFEBlendElement, SVGElementEventMap> {
  static readonly type = "SVG:feBlend";
}

/**
 * SVG Tag: feColorMatrix
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feColorMatrix
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEColorMatrixElement
 * @class
 * @sealed
 */
export class FEColorMatrix extends EC<
  SVGFEColorMatrixElement,
  SVGElementEventMap
> {
  static readonly type = "SVG:feColorMatrix";
}

/**
 * SVG Tag: feComponentTransfer
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feComponentTransfer
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEComponentTransferElement
 * @class
 * @sealed
 */
export class FEComponentTransfer extends EC<
  SVGFEComponentTransferElement,
  SVGElementEventMap
> {
  static readonly type = "SVG:feComponentTransfer";
}

/**
 * SVG Tag: feComposite
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feComposite
 * @see https://developer.mozilla.org/docs/Web/API/SVGFECompositeElement
 * @class
 * @sealed
 */
export class FEComposite extends EC<SVGFECompositeElement, SVGElementEventMap> {
  static readonly type = "SVG:feComposite";
}

/**
 * SVG Tag: feConvolveMatrix
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feConvolveMatrix
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEConvolveMatrixElement
 * @class
 * @sealed
 */
export class FEConvolveMatrix extends EC<
  SVGFEConvolveMatrixElement,
  SVGElementEventMap
> {
  static readonly type = "SVG:feConvolveMatrix";
}

/**
 * SVG Tag: feDiffuseLighting
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feDiffuseLighting
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEDiffuseLightingElement
 * @class
 * @sealed
 */
export class FEDiffuseLighting extends EC<
  SVGFEDiffuseLightingElement,
  SVGElementEventMap
> {
  static readonly type = "SVG:feDiffuseLighting";
}

/**
 * SVG Tag: feDisplacementMap
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feDisplacementMap
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEDisplacementMapElement
 * @class
 * @sealed
 */
export class FEDisplacementMap extends EC<
  SVGFEDisplacementMapElement,
  SVGElementEventMap
> {
  static readonly type = "SVG:feDisplacementMap";
}

/**
 * SVG Tag: feDistantLight
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feDistantLight
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEDistantLightElement
 * @class
 * @sealed
 */
export class FEDistantLight extends EC<
  SVGFEDistantLightElement,
  SVGElementEventMap
> {
  static readonly type = "SVG:feDistantLight";
}

/**
 * SVG Tag: feDropShadow
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feDropShadow
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEDropShadowElement
 * @class
 * @sealed
 */
export class FEDropShadow extends EC<
  SVGFEDropShadowElement,
  SVGElementEventMap
> {
  static readonly type = "SVG:feDropShadow";
}

/**
 * SVG Tag: feFlood
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feFlood
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEFloodElement
 * @class
 * @sealed
 */
export class FEFlood extends EC<SVGFEFloodElement, SVGElementEventMap> {
  static readonly type = "SVG:feFlood";
}

/**
 * SVG Tag: feFuncA
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feFuncA
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEFuncAElement
 * @class
 * @sealed
 */
export class FEFuncA extends EC<SVGFEFuncAElement, SVGElementEventMap> {
  static readonly type = "SVG:feFuncA";
}

/**
 * SVG Tag: feFuncB
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feFuncB
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEFuncBElement
 * @class
 * @sealed
 */
export class FEFuncB extends EC<SVGFEFuncBElement, SVGElementEventMap> {
  static readonly type = "SVG:feFuncB";
}

/**
 * SVG Tag: feFuncG
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feFuncG
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEFuncGElement
 * @class
 * @sealed
 */
export class FEFuncG extends EC<SVGFEFuncGElement, SVGElementEventMap> {
  static readonly type = "SVG:feFuncG";
}

/**
 * SVG Tag: feFuncR
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feFuncR
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEFuncRElement
 * @class
 * @sealed
 */
export class FEFuncR extends EC<SVGFEFuncRElement, SVGElementEventMap> {
  static readonly type = "SVG:feFuncR";
}

/**
 * SVG Tag: feGaussianBlur
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feGaussianBlur
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEGaussianBlurElement
 * @class
 * @sealed
 */
export class FEGaussianBlur extends EC<
  SVGFEGaussianBlurElement,
  SVGElementEventMap
> {
  static readonly type = "SVG:feGaussianBlur";
}

/**
 * SVG Tag: feImage
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feImage
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEImageElement
 * @class
 * @sealed
 */
export class FEImage extends EC<SVGFEImageElement, SVGElementEventMap> {
  static readonly type = "SVG:feImage";
}

/**
 * SVG Tag: feMerge
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feMerge
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEMergeElement
 * @class
 * @sealed
 */
export class FEMerge extends EC<SVGFEMergeElement, SVGElementEventMap> {
  static readonly type = "SVG:feMerge";
}

/**
 * SVG Tag: feMergeNode
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feMergeNode
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEMergeNodeElement
 * @class
 * @sealed
 */
export class FEMergeNode extends EC<SVGFEMergeNodeElement, SVGElementEventMap> {
  static readonly type = "SVG:feMergeNode";
}

/**
 * SVG Tag: feMorphology
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feMorphology
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEMorphologyElement
 * @class
 * @sealed
 */
export class FEMorphology extends EC<
  SVGFEMorphologyElement,
  SVGElementEventMap
> {
  static readonly type = "SVG:feMorphology";
}

/**
 * SVG Tag: feOffset
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feOffset
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEOffsetElement
 * @class
 * @sealed
 */
export class FEOffset extends EC<SVGFEOffsetElement, SVGElementEventMap> {
  static readonly type = "SVG:feOffset";
}

/**
 * SVG Tag: fePointLight
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/fePointLight
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEPointLightElement
 * @class
 * @sealed
 */
export class FEPointLight extends EC<
  SVGFEPointLightElement,
  SVGElementEventMap
> {
  static readonly type = "SVG:fePointLight";
}

/**
 * SVG Tag: feSpecularLighting
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feSpecularLighting
 * @see https://developer.mozilla.org/docs/Web/API/SVGFESpecularLightingElement
 * @class
 * @sealed
 */
export class FESpecularLighting extends EC<
  SVGFESpecularLightingElement,
  SVGElementEventMap
> {
  static readonly type = "SVG:feSpecularLighting";
}

/**
 * SVG Tag: feSpotLight
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feSpotLight
 * @see https://developer.mozilla.org/docs/Web/API/SVGFESpotLightElement
 * @class
 * @sealed
 */
export class FESpotLight extends EC<SVGFESpotLightElement, SVGElementEventMap> {
  static readonly type = "SVG:feSpotLight";
}

/**
 * SVG Tag: feTile
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feTile
 * @see https://developer.mozilla.org/docs/Web/API/SVGFETileElement
 * @class
 * @sealed
 */
export class FETile extends EC<SVGFETileElement, SVGElementEventMap> {
  static readonly type = "SVG:feTile";
}

/**
 * SVG Tag: feTurbulence
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feTurbulence
 * @see https://developer.mozilla.org/docs/Web/API/SVGFETurbulenceElement
 * @class
 * @sealed
 */
export class FETurbulence extends EC<
  SVGFETurbulenceElement,
  SVGElementEventMap
> {
  static readonly type = "SVG:feTurbulence";
}

/**
 * SVG Tag: filter
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/filter
 * @see https://developer.mozilla.org/docs/Web/API/SVGFilterElement
 * @class
 * @sealed
 */
export class Filter extends EC<SVGFilterElement, SVGElementEventMap> {
  static readonly type = "SVG:filter";
}

/**
 * SVG Tag: foreignObject
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/foreignObject
 * @see https://developer.mozilla.org/docs/Web/API/SVGForeignObjectElement
 * @class
 * @sealed
 */
export class ForeignObject extends EC<
  SVGForeignObjectElement,
  SVGElementEventMap
> {
  static readonly type = "SVG:foreignObject";
}

/**
 * SVG Tag: g
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/g
 * @see https://developer.mozilla.org/docs/Web/API/SVGGElement
 * @class
 * @sealed
 */
export class G extends EC<SVGGElement, SVGElementEventMap> {
  static readonly type = "SVG:g";
}

/**
 * SVG Tag: image
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/image
 * @see https://developer.mozilla.org/docs/Web/API/SVGImageElement
 * @class
 * @sealed
 */
export class Image extends EC<SVGImageElement, SVGElementEventMap> {
  static readonly type = "SVG:image";
}

/**
 * SVG Tag: line
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/line
 * @see https://developer.mozilla.org/docs/Web/API/SVGLineElement
 * @class
 * @sealed
 */
export class Line extends EC<SVGLineElement, SVGElementEventMap> {
  static readonly type = "SVG:line";
}

/**
 * SVG Tag: linearGradient
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/linearGradient
 * @see https://developer.mozilla.org/docs/Web/API/SVGLinearGradientElement
 * @class
 * @sealed
 */
export class LinearGradient extends EC<
  SVGLinearGradientElement,
  SVGElementEventMap
> {
  static readonly type = "SVG:linearGradient";
}

/**
 * SVG Tag: marker
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/marker
 * @see https://developer.mozilla.org/docs/Web/API/SVGMarkerElement
 * @class
 * @sealed
 */
export class Marker extends EC<SVGMarkerElement, SVGElementEventMap> {
  static readonly type = "SVG:marker";
}

/**
 * SVG Tag: mask
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/mask
 * @see https://developer.mozilla.org/docs/Web/API/SVGMaskElement
 * @class
 * @sealed
 */
export class Mask extends EC<SVGMaskElement, SVGElementEventMap> {
  static readonly type = "SVG:mask";
}

/**
 * SVG Tag: metadata
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/metadata
 * @see https://developer.mozilla.org/docs/Web/API/SVGMetadataElement
 * @class
 * @sealed
 */
export class Metadata extends EC<SVGMetadataElement, SVGElementEventMap> {
  static readonly type = "SVG:metadata";
}

/**
 * SVG Tag: mpath
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/mpath
 * @see https://developer.mozilla.org/docs/Web/API/SVGMPathElement
 * @class
 * @sealed
 */
export class MPath extends EC<SVGMPathElement, SVGElementEventMap> {
  static readonly type = "SVG:mpath";
}

/**
 * SVG Tag: path
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/path
 * @see https://developer.mozilla.org/docs/Web/API/SVGPathElement
 * @class
 * @sealed
 */
export class Path extends EC<SVGPathElement, SVGElementEventMap> {
  static readonly type = "SVG:path";
}

/**
 * SVG Tag: pattern
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/pattern
 * @see https://developer.mozilla.org/docs/Web/API/SVGPatternElement
 * @class
 * @sealed
 */
export class Pattern extends EC<SVGPatternElement, SVGElementEventMap> {
  static readonly type = "SVG:pattern";
}

/**
 * SVG Tag: polygon
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/polygon
 * @see https://developer.mozilla.org/docs/Web/API/SVGPolygonElement
 * @class
 * @sealed
 */
export class Polygon extends EC<SVGPolygonElement, SVGElementEventMap> {
  static readonly type = "SVG:polygon";
}

/**
 * SVG Tag: polyline
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/polyline
 * @see https://developer.mozilla.org/docs/Web/API/SVGPolylineElement
 * @class
 * @sealed
 */
export class Polyline extends EC<SVGPolylineElement, SVGElementEventMap> {
  static readonly type = "SVG:polyline";
}

/**
 * SVG Tag: radialGradient
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/radialGradient
 * @see https://developer.mozilla.org/docs/Web/API/SVGRadialGradientElement
 * @class
 * @sealed
 */
export class RadialGradient extends EC<
  SVGRadialGradientElement,
  SVGElementEventMap
> {
  static readonly type = "SVG:radialGradient";
}

/**
 * SVG Tag: rect
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/rect
 * @see https://developer.mozilla.org/docs/Web/API/SVGRectElement
 * @class
 * @sealed
 */
export class Rect extends EC<SVGRectElement, SVGElementEventMap> {
  static readonly type = "SVG:rect";
}

/**
 * SVG Tag: script
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/script
 * @see https://developer.mozilla.org/docs/Web/API/SVGScriptElement
 * @class
 * @sealed
 */
export class SVGScript extends EC<SVGScriptElement, SVGElementEventMap> {
  static readonly type = "SVG:script";
}

/**
 * SVG Tag: set
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/set
 * @see https://developer.mozilla.org/docs/Web/API/SVGSetElement
 * @class
 * @sealed
 */
export class Set extends EC<SVGSetElement, SVGElementEventMap> {
  static readonly type = "SVG:set";
}

/**
 * SVG Tag: stop
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/stop
 * @see https://developer.mozilla.org/docs/Web/API/SVGStopElement
 * @class
 * @sealed
 */
export class Stop extends EC<SVGStopElement, SVGElementEventMap> {
  static readonly type = "SVG:stop";
}

/**
 * SVG Tag: style
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/style
 * @see https://developer.mozilla.org/docs/Web/API/SVGStyleElement
 * @class
 * @sealed
 */
export class SVGStyle extends EC<SVGStyleElement, SVGElementEventMap> {
  static readonly type = "SVG:style";
}

/**
 * SVG Tag: svg
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/svg
 * @see https://developer.mozilla.org/docs/Web/API/SVGSVGElement
 * @class
 * @sealed
 */
export class SVG extends EC<SVGSVGElement, SVGElementEventMap> {
  static readonly type = "SVG:svg";
}

/**
 * SVG Tag: switch
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/switch
 * @see https://developer.mozilla.org/docs/Web/API/SVGSwitchElement
 * @class
 * @sealed
 */
export class Switch extends EC<SVGSwitchElement, SVGElementEventMap> {
  static readonly type = "SVG:switch";
}

/**
 * SVG Tag: symbol
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/symbol
 * @see https://developer.mozilla.org/docs/Web/API/SVGSymbolElement
 * @class
 * @sealed
 */
export class Symbol extends EC<SVGSymbolElement, SVGElementEventMap> {
  static readonly type = "SVG:symbol";
}

/**
 * SVG Tag: text
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/text
 * @see https://developer.mozilla.org/docs/Web/API/SVGTextElement
 * @class
 * @sealed
 */
export class SVGText extends EC<SVGTextElement, SVGElementEventMap> {
  static readonly type = "SVG:text";
}

/**
 * SVG Tag: textPath
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/textPath
 * @see https://developer.mozilla.org/docs/Web/API/SVGTextPathElement
 * @class
 * @sealed
 */
export class TextPath extends EC<SVGTextPathElement, SVGElementEventMap> {
  static readonly type = "SVG:textPath";
}

/**
 * SVG Tag: title
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/title
 * @see https://developer.mozilla.org/docs/Web/API/SVGTitleElement
 * @class
 * @sealed
 */
export class SVGTitle extends EC<SVGTitleElement, SVGElementEventMap> {
  static readonly type = "SVG:title";
}

/**
 * SVG Tag: tspan
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/tspan
 * @see https://developer.mozilla.org/docs/Web/API/SVGTSpanElement
 * @class
 * @sealed
 */
export class TSpan extends EC<SVGTSpanElement, SVGElementEventMap> {
  static readonly type = "SVG:tspan";
}

/**
 * SVG Tag: use
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/use
 * @see https://developer.mozilla.org/docs/Web/API/SVGUseElement
 * @class
 * @sealed
 */
export class Use extends EC<SVGUseElement, SVGElementEventMap> {
  static readonly type = "SVG:use";
}

/**
 * SVG Tag: view
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/view
 * @see https://developer.mozilla.org/docs/Web/API/SVGViewElement
 * @class
 * @sealed
 */
export class View extends EC<SVGViewElement, SVGElementEventMap> {
  static readonly type = "SVG:view";
}
