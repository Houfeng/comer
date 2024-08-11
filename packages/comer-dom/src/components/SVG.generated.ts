import { ElementComponent as EC } from "../DOMComponent";

/**
 * SVG Tag: a
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/a
 * @see https://developer.mozilla.org/docs/Web/API/SVGAElement
 */
export class SVGAnchor extends EC<SVGAElement, SVGElementEventMap> {
  readonly type = "SVG:a"
}

/**
 * SVG Tag: animate
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/animate
 * @see https://developer.mozilla.org/docs/Web/API/SVGAnimateElement
 */
export class Animate extends EC<SVGAnimateElement, SVGElementEventMap> {
  readonly type = "SVG:animate"
}

/**
 * SVG Tag: animateMotion
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/animateMotion
 * @see https://developer.mozilla.org/docs/Web/API/SVGAnimateMotionElement
 */
export class AnimateMotion extends EC<SVGAnimateMotionElement, SVGElementEventMap> {
  readonly type = "SVG:animateMotion"
}

/**
 * SVG Tag: animateTransform
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/animateTransform
 * @see https://developer.mozilla.org/docs/Web/API/SVGAnimateTransformElement
 */
export class AnimateTransform extends EC<SVGAnimateTransformElement, SVGElementEventMap> {
  readonly type = "SVG:animateTransform"
}

/**
 * SVG Tag: circle
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/circle
 * @see https://developer.mozilla.org/docs/Web/API/SVGCircleElement
 */
export class Circle extends EC<SVGCircleElement, SVGElementEventMap> {
  readonly type = "SVG:circle"
}

/**
 * SVG Tag: clipPath
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/clipPath
 * @see https://developer.mozilla.org/docs/Web/API/SVGClipPathElement
 */
export class ClipPath extends EC<SVGClipPathElement, SVGElementEventMap> {
  readonly type = "SVG:clipPath"
}

/**
 * SVG Tag: defs
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/defs
 * @see https://developer.mozilla.org/docs/Web/API/SVGDefsElement
 */
export class Defs extends EC<SVGDefsElement, SVGElementEventMap> {
  readonly type = "SVG:defs"
}

/**
 * SVG Tag: desc
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/desc
 * @see https://developer.mozilla.org/docs/Web/API/SVGDescElement
 */
export class Desc extends EC<SVGDescElement, SVGElementEventMap> {
  readonly type = "SVG:desc"
}

/**
 * SVG Tag: ellipse
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/ellipse
 * @see https://developer.mozilla.org/docs/Web/API/SVGEllipseElement
 */
export class Ellipse extends EC<SVGEllipseElement, SVGElementEventMap> {
  readonly type = "SVG:ellipse"
}

/**
 * SVG Tag: feBlend
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feBlend
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEBlendElement
 */
export class FEBlend extends EC<SVGFEBlendElement, SVGElementEventMap> {
  readonly type = "SVG:feBlend"
}

/**
 * SVG Tag: feColorMatrix
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feColorMatrix
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEColorMatrixElement
 */
export class FEColorMatrix extends EC<SVGFEColorMatrixElement, SVGElementEventMap> {
  readonly type = "SVG:feColorMatrix"
}

/**
 * SVG Tag: feComponentTransfer
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feComponentTransfer
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEComponentTransferElement
 */
export class FEComponentTransfer extends EC<SVGFEComponentTransferElement, SVGElementEventMap> {
  readonly type = "SVG:feComponentTransfer"
}

/**
 * SVG Tag: feComposite
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feComposite
 * @see https://developer.mozilla.org/docs/Web/API/SVGFECompositeElement
 */
export class FEComposite extends EC<SVGFECompositeElement, SVGElementEventMap> {
  readonly type = "SVG:feComposite"
}

/**
 * SVG Tag: feConvolveMatrix
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feConvolveMatrix
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEConvolveMatrixElement
 */
export class FEConvolveMatrix extends EC<SVGFEConvolveMatrixElement, SVGElementEventMap> {
  readonly type = "SVG:feConvolveMatrix"
}

/**
 * SVG Tag: feDiffuseLighting
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feDiffuseLighting
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEDiffuseLightingElement
 */
export class FEDiffuseLighting extends EC<SVGFEDiffuseLightingElement, SVGElementEventMap> {
  readonly type = "SVG:feDiffuseLighting"
}

/**
 * SVG Tag: feDisplacementMap
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feDisplacementMap
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEDisplacementMapElement
 */
export class FEDisplacementMap extends EC<SVGFEDisplacementMapElement, SVGElementEventMap> {
  readonly type = "SVG:feDisplacementMap"
}

/**
 * SVG Tag: feDistantLight
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feDistantLight
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEDistantLightElement
 */
export class FEDistantLight extends EC<SVGFEDistantLightElement, SVGElementEventMap> {
  readonly type = "SVG:feDistantLight"
}

/**
 * SVG Tag: feDropShadow
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feDropShadow
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEDropShadowElement
 */
export class FEDropShadow extends EC<SVGFEDropShadowElement, SVGElementEventMap> {
  readonly type = "SVG:feDropShadow"
}

/**
 * SVG Tag: feFlood
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feFlood
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEFloodElement
 */
export class FEFlood extends EC<SVGFEFloodElement, SVGElementEventMap> {
  readonly type = "SVG:feFlood"
}

/**
 * SVG Tag: feFuncA
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feFuncA
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEFuncAElement
 */
export class FEFuncA extends EC<SVGFEFuncAElement, SVGElementEventMap> {
  readonly type = "SVG:feFuncA"
}

/**
 * SVG Tag: feFuncB
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feFuncB
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEFuncBElement
 */
export class FEFuncB extends EC<SVGFEFuncBElement, SVGElementEventMap> {
  readonly type = "SVG:feFuncB"
}

/**
 * SVG Tag: feFuncG
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feFuncG
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEFuncGElement
 */
export class FEFuncG extends EC<SVGFEFuncGElement, SVGElementEventMap> {
  readonly type = "SVG:feFuncG"
}

/**
 * SVG Tag: feFuncR
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feFuncR
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEFuncRElement
 */
export class FEFuncR extends EC<SVGFEFuncRElement, SVGElementEventMap> {
  readonly type = "SVG:feFuncR"
}

/**
 * SVG Tag: feGaussianBlur
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feGaussianBlur
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEGaussianBlurElement
 */
export class FEGaussianBlur extends EC<SVGFEGaussianBlurElement, SVGElementEventMap> {
  readonly type = "SVG:feGaussianBlur"
}

/**
 * SVG Tag: feImage
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feImage
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEImageElement
 */
export class FEImage extends EC<SVGFEImageElement, SVGElementEventMap> {
  readonly type = "SVG:feImage"
}

/**
 * SVG Tag: feMerge
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feMerge
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEMergeElement
 */
export class FEMerge extends EC<SVGFEMergeElement, SVGElementEventMap> {
  readonly type = "SVG:feMerge"
}

/**
 * SVG Tag: feMergeNode
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feMergeNode
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEMergeNodeElement
 */
export class FEMergeNode extends EC<SVGFEMergeNodeElement, SVGElementEventMap> {
  readonly type = "SVG:feMergeNode"
}

/**
 * SVG Tag: feMorphology
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feMorphology
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEMorphologyElement
 */
export class FEMorphology extends EC<SVGFEMorphologyElement, SVGElementEventMap> {
  readonly type = "SVG:feMorphology"
}

/**
 * SVG Tag: feOffset
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feOffset
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEOffsetElement
 */
export class FEOffset extends EC<SVGFEOffsetElement, SVGElementEventMap> {
  readonly type = "SVG:feOffset"
}

/**
 * SVG Tag: fePointLight
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/fePointLight
 * @see https://developer.mozilla.org/docs/Web/API/SVGFEPointLightElement
 */
export class FEPointLight extends EC<SVGFEPointLightElement, SVGElementEventMap> {
  readonly type = "SVG:fePointLight"
}

/**
 * SVG Tag: feSpecularLighting
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feSpecularLighting
 * @see https://developer.mozilla.org/docs/Web/API/SVGFESpecularLightingElement
 */
export class FESpecularLighting extends EC<SVGFESpecularLightingElement, SVGElementEventMap> {
  readonly type = "SVG:feSpecularLighting"
}

/**
 * SVG Tag: feSpotLight
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feSpotLight
 * @see https://developer.mozilla.org/docs/Web/API/SVGFESpotLightElement
 */
export class FESpotLight extends EC<SVGFESpotLightElement, SVGElementEventMap> {
  readonly type = "SVG:feSpotLight"
}

/**
 * SVG Tag: feTile
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feTile
 * @see https://developer.mozilla.org/docs/Web/API/SVGFETileElement
 */
export class FETile extends EC<SVGFETileElement, SVGElementEventMap> {
  readonly type = "SVG:feTile"
}

/**
 * SVG Tag: feTurbulence
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/feTurbulence
 * @see https://developer.mozilla.org/docs/Web/API/SVGFETurbulenceElement
 */
export class FETurbulence extends EC<SVGFETurbulenceElement, SVGElementEventMap> {
  readonly type = "SVG:feTurbulence"
}

/**
 * SVG Tag: filter
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/filter
 * @see https://developer.mozilla.org/docs/Web/API/SVGFilterElement
 */
export class Filter extends EC<SVGFilterElement, SVGElementEventMap> {
  readonly type = "SVG:filter"
}

/**
 * SVG Tag: foreignObject
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/foreignObject
 * @see https://developer.mozilla.org/docs/Web/API/SVGForeignObjectElement
 */
export class ForeignObject extends EC<SVGForeignObjectElement, SVGElementEventMap> {
  readonly type = "SVG:foreignObject"
}

/**
 * SVG Tag: g
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/g
 * @see https://developer.mozilla.org/docs/Web/API/SVGGElement
 */
export class G extends EC<SVGGElement, SVGElementEventMap> {
  readonly type = "SVG:g"
}

/**
 * SVG Tag: image
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/image
 * @see https://developer.mozilla.org/docs/Web/API/SVGImageElement
 */
export class Image extends EC<SVGImageElement, SVGElementEventMap> {
  readonly type = "SVG:image"
}

/**
 * SVG Tag: line
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/line
 * @see https://developer.mozilla.org/docs/Web/API/SVGLineElement
 */
export class Line extends EC<SVGLineElement, SVGElementEventMap> {
  readonly type = "SVG:line"
}

/**
 * SVG Tag: linearGradient
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/linearGradient
 * @see https://developer.mozilla.org/docs/Web/API/SVGLinearGradientElement
 */
export class LinearGradient extends EC<SVGLinearGradientElement, SVGElementEventMap> {
  readonly type = "SVG:linearGradient"
}

/**
 * SVG Tag: marker
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/marker
 * @see https://developer.mozilla.org/docs/Web/API/SVGMarkerElement
 */
export class Marker extends EC<SVGMarkerElement, SVGElementEventMap> {
  readonly type = "SVG:marker"
}

/**
 * SVG Tag: mask
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/mask
 * @see https://developer.mozilla.org/docs/Web/API/SVGMaskElement
 */
export class Mask extends EC<SVGMaskElement, SVGElementEventMap> {
  readonly type = "SVG:mask"
}

/**
 * SVG Tag: metadata
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/metadata
 * @see https://developer.mozilla.org/docs/Web/API/SVGMetadataElement
 */
export class Metadata extends EC<SVGMetadataElement, SVGElementEventMap> {
  readonly type = "SVG:metadata"
}

/**
 * SVG Tag: mpath
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/mpath
 * @see https://developer.mozilla.org/docs/Web/API/SVGMPathElement
 */
export class MPath extends EC<SVGMPathElement, SVGElementEventMap> {
  readonly type = "SVG:mpath"
}

/**
 * SVG Tag: path
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/path
 * @see https://developer.mozilla.org/docs/Web/API/SVGPathElement
 */
export class Path extends EC<SVGPathElement, SVGElementEventMap> {
  readonly type = "SVG:path"
}

/**
 * SVG Tag: pattern
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/pattern
 * @see https://developer.mozilla.org/docs/Web/API/SVGPatternElement
 */
export class Pattern extends EC<SVGPatternElement, SVGElementEventMap> {
  readonly type = "SVG:pattern"
}

/**
 * SVG Tag: polygon
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/polygon
 * @see https://developer.mozilla.org/docs/Web/API/SVGPolygonElement
 */
export class Polygon extends EC<SVGPolygonElement, SVGElementEventMap> {
  readonly type = "SVG:polygon"
}

/**
 * SVG Tag: polyline
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/polyline
 * @see https://developer.mozilla.org/docs/Web/API/SVGPolylineElement
 */
export class Polyline extends EC<SVGPolylineElement, SVGElementEventMap> {
  readonly type = "SVG:polyline"
}

/**
 * SVG Tag: radialGradient
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/radialGradient
 * @see https://developer.mozilla.org/docs/Web/API/SVGRadialGradientElement
 */
export class RadialGradient extends EC<SVGRadialGradientElement, SVGElementEventMap> {
  readonly type = "SVG:radialGradient"
}

/**
 * SVG Tag: rect
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/rect
 * @see https://developer.mozilla.org/docs/Web/API/SVGRectElement
 */
export class Rect extends EC<SVGRectElement, SVGElementEventMap> {
  readonly type = "SVG:rect"
}

/**
 * SVG Tag: script
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/script
 * @see https://developer.mozilla.org/docs/Web/API/SVGScriptElement
 */
export class SVGScript extends EC<SVGScriptElement, SVGElementEventMap> {
  readonly type = "SVG:script"
}

/**
 * SVG Tag: set
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/set
 * @see https://developer.mozilla.org/docs/Web/API/SVGSetElement
 */
export class Set extends EC<SVGSetElement, SVGElementEventMap> {
  readonly type = "SVG:set"
}

/**
 * SVG Tag: stop
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/stop
 * @see https://developer.mozilla.org/docs/Web/API/SVGStopElement
 */
export class Stop extends EC<SVGStopElement, SVGElementEventMap> {
  readonly type = "SVG:stop"
}

/**
 * SVG Tag: style
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/style
 * @see https://developer.mozilla.org/docs/Web/API/SVGStyleElement
 */
export class SVGStyle extends EC<SVGStyleElement, SVGElementEventMap> {
  readonly type = "SVG:style"
}

/**
 * SVG Tag: svg
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/svg
 * @see https://developer.mozilla.org/docs/Web/API/SVGSVGElement
 */
export class SVG extends EC<SVGSVGElement, SVGElementEventMap> {
  readonly type = "SVG:svg"
}

/**
 * SVG Tag: switch
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/switch
 * @see https://developer.mozilla.org/docs/Web/API/SVGSwitchElement
 */
export class Switch extends EC<SVGSwitchElement, SVGElementEventMap> {
  readonly type = "SVG:switch"
}

/**
 * SVG Tag: symbol
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/symbol
 * @see https://developer.mozilla.org/docs/Web/API/SVGSymbolElement
 */
export class Symbol extends EC<SVGSymbolElement, SVGElementEventMap> {
  readonly type = "SVG:symbol"
}

/**
 * SVG Tag: text
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/text
 * @see https://developer.mozilla.org/docs/Web/API/SVGTextElement
 */
export class SVGText extends EC<SVGTextElement, SVGElementEventMap> {
  readonly type = "SVG:text"
}

/**
 * SVG Tag: textPath
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/textPath
 * @see https://developer.mozilla.org/docs/Web/API/SVGTextPathElement
 */
export class TextPath extends EC<SVGTextPathElement, SVGElementEventMap> {
  readonly type = "SVG:textPath"
}

/**
 * SVG Tag: title
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/title
 * @see https://developer.mozilla.org/docs/Web/API/SVGTitleElement
 */
export class SVGTitle extends EC<SVGTitleElement, SVGElementEventMap> {
  readonly type = "SVG:title"
}

/**
 * SVG Tag: tspan
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/tspan
 * @see https://developer.mozilla.org/docs/Web/API/SVGTSpanElement
 */
export class TSpan extends EC<SVGTSpanElement, SVGElementEventMap> {
  readonly type = "SVG:tspan"
}

/**
 * SVG Tag: use
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/use
 * @see https://developer.mozilla.org/docs/Web/API/SVGUseElement
 */
export class Use extends EC<SVGUseElement, SVGElementEventMap> {
  readonly type = "SVG:use"
}

/**
 * SVG Tag: view
 * @see https://developer.mozilla.org/docs/Web/SVG/Element/view
 * @see https://developer.mozilla.org/docs/Web/API/SVGViewElement
 */
export class View extends EC<SVGViewElement, SVGElementEventMap> {
  readonly type = "SVG:view"
}
