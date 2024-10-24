import { ComponentConstructor } from "comer";
import { type Properties } from "csstype";

// types ----------------------------------------------------------------------

export type BasicStyle = Properties;

export type StyleExtends = { $extends?: string | string[] };

export type NestedStyleK = `${string}&${string}`;
export type NestedStyleV = Record<NestedStyleK, BasicStyle> & BasicStyle;

export type NestedStyle = Record<NestedStyleK, NestedStyleV> &
  NestedStyleV &
  StyleExtends;

export type KeyFrameStyle = Partial<
  Record<"from" | "to" | `${string}%`, BasicStyle>
>;

// Utils based on string ------------------------------------------------------

/** @internal */
export function toInlineStyle(style: BasicStyle): string {
  return Object.entries(style)
    .map(([key, value]: [string, string]) => {
      return `${key.replace(/([A-Z])/g, "-$1")}: ${value}`;
    })
    .join(";");
}

// Utils based on DOM ---------------------------------------------------------

const styleElement = document.createElement("style");
document.head.append(styleElement);
const sheet = styleElement.sheet;

// function destroyRules(rules: CSSRule[]) {
//   const allRules: CSSRule[] = [].slice.call(sheet?.cssRules);
//   rules.forEach((rule) => sheet?.deleteRule(allRules.indexOf(rule)));
// }

function createRule<T extends CSSRule>(ruleText: string): T | undefined {
  if (!sheet) return;
  const index = sheet.insertRule(ruleText || "", sheet.cssRules.length);
  return sheet.cssRules[index] as T;
}

const Owner = { id: 0 };

// class ----------------------------------------------------------------------

function isObject(value: unknown): value is object {
  return !!value && typeof value === "object";
}

function createStyleRules(
  selector: string,
  style: NestedStyle,
): CSSStyleRule[] {
  const rule = createRule<CSSStyleRule>(`${selector}{}`);
  if (!rule) return [];
  const rules: CSSStyleRule[] = [rule];
  const styleMap = rule.style as Record<string, any>;
  Object.entries(style).forEach(([key, value]) => {
    if (isObject(value) && key.indexOf("&") > -1) {
      rules.push(
        ...selector
          .split(",")
          .map((it) =>
            createStyleRules(key.replace(/&/g, it), value as NestedStyle),
          )
          .flat(),
      );
    } else if (!isObject(value)) {
      styleMap[key] = value;
    }
  });
  return rules;
}

/**
 * Define a style that supports cascading nesting and return its name,
 * which can be used for the className of the component
 */
export const StyleClass = ((style) => {
  if (!style) return "";
  const { $extends = "" } = style;
  const normalizeEx = Array.isArray($extends) ? $extends.join(" ") : $extends;
  const className = `c${Owner.id++}`;
  createStyleRules(`.${className}`, style);
  return `${normalizeEx} ${className}`.trim();
}) as {
  new (style: NestedStyle): string;
  (Style: NestedStyle): string;
};

// keyframe -------------------------------------------------------------------

function createKeyframesRule(name: string, style: KeyFrameStyle) {
  const rule = createRule<CSSKeyframesRule>(`@keyframes ${name} {}`);
  if (!rule) return;
  Object.entries(style).forEach(([frameName, frameStyle]) => {
    if (!frameStyle) return;
    rule.appendRule(`${frameName} {}`);
    const frame = rule.cssRules.item(rule.cssRules.length - 1) as CSSStyleRule;
    Object.entries(frameStyle).forEach(([key, value]) => {
      const styleMap = frame.style as Record<string, any>;
      styleMap[key] = value;
    });
  });
  return rule;
}

/**
 * Define a Keyframe style and return its name,
 * which can be referenced in other style sheets
 */
export const KeyFrame = ((style) => {
  const name = `_k${Owner.id++}`;
  createKeyframesRule(name, style);
  return name;
}) as {
  new (style: KeyFrameStyle): string;
  (Style: KeyFrameStyle): string;
};

// Styled HOC -----------------------------------------------------------------

/**
 * Create high-level components with additional styles
 * from the original components
 */
export function styled<
  T extends ComponentConstructor<any, any>,
  S extends Required<InstanceType<T>["props"]> extends { className: string }
    ? NestedStyle
    : never,
  // mask S full match NestedStyle
  SS = S extends NestedStyle ? NestedStyle : never,
>(target: T, style: S & SS) {
  const StyledSuper = target as ComponentConstructor<any, any>;
  const styledClassName = StyleClass(style);
  class StyledWrapper extends StyledSuper {
    static normalizeProps(
      props: InstanceType<T>["props"],
    ): InstanceType<T>["props"] {
      const { className: originClassName = "", ...otherProps } = props || {};
      const className = `${styledClassName} ${originClassName}`.trim();
      const composedProps = { ...otherProps, className };
      return super.normalizeProps
        ? super.normalizeProps(composedProps)
        : composedProps;
    }
    // className of Wrapper component
    static get className() {
      return styledClassName;
    }
  }
  Object.defineProperty(StyledWrapper, "name", { value: target.name });
  return StyledWrapper as T & { readonly className: string };
}
