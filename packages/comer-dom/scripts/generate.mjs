import { EOL } from 'os';
import { writeFileSync } from 'fs';
import { toCamelCase } from 'ntils';
import { HTMLElementTagNameMap } from './tags/HTML.tags.mjs';
import { SVGElementTagNameMap } from './tags/SVG.tags.mjs';
import { MathMLElementTagNameMap } from './tags/MathML.tags.mjs';

function generateCode(define) {
  const [options, map] = define;
  const { ns, takeName, defaultEvents } = options;
  const lines = Object.entries(map).map(([tagInfo, genericInfo]) => {
    const [tag, alias] = tagInfo.split(':');
    const [element, events = defaultEvents] = genericInfo.split(',')
    const name = alias || takeName(tag, element) || toCamelCase(tag, 1);
    const type = ns ? `${ns}:${tag}` : tag;
    return [
      `/**`,
      ` * ${ns || 'HTML'} Tag: ${tag}`,
      ` * @see https://developer.mozilla.org/docs/Web/${ns || 'HTML'}/Element/${tag}`,
      ` * @see https://developer.mozilla.org/docs/Web/API/${element}`,
      ` * @class`,
      ` * @sealed`,
      ` */`,
      `export class ${name} extends EC<${element}, ${events}> {`,
      `  static readonly type = "${type}";`,
      `}`,
      ``
    ];
  });
  lines.unshift(`import { ElementComponent as EC } from "../DOMComponent";${EOL}`);
  return lines.flat(2).join(`${EOL}`);
}

// HTML
writeFileSync(
  `${import.meta.dirname}/../src/components/HTML.generated.ts`,
  generateCode(HTMLElementTagNameMap)
);

// SVG
writeFileSync(
  `${import.meta.dirname}/../src/components/SVG.generated.ts`,
  generateCode(SVGElementTagNameMap)
);

// MathML
writeFileSync(
  `${import.meta.dirname}/../src/components/MathML.generated.ts`,
  generateCode(MathMLElementTagNameMap)
);