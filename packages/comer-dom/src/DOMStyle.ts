import { type Properties } from "csstype";
import { isNull, isObject, toSplitCase } from "ntils";

// types ----------------------------------------------------------------------

export type BasicStyle = Properties<string | 0, string | 0>;

export type NestedStyleK = `${string}&${string}`;
export type NestedStyleV = Record<NestedStyleK, BasicStyle> & BasicStyle;

export type NestedStyle = Record<NestedStyleK, NestedStyleV> & NestedStyleV;

export type KeyFrameStyle = Partial<
  Record<"from" | "to" | `${string}%`, BasicStyle>
>;

// common ---------------------------------------------------------------------

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
  if (isNull(index)) return;
  return sheet.cssRules[index] as T;
}

const Owner = { id: 0 };

// class ----------------------------------------------------------------------

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
  const className = `c${Owner.id++}`;
  createStyleRules(`.${className}`, style);
  return className;
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

// inline style ---------------------------------------------------------------

/** @internal */
export function toInlineStyle(style: BasicStyle): string {
  return Object.entries(style)
    .map(([key, value]: [string, string]) => {
      return `${toSplitCase(key)}: ${value}`;
    })
    .join(";");
}
