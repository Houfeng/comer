import { EOL } from 'os';
import { writeFileSync } from 'fs';
import { toCamelCase } from 'ntils';
import { HTMLElementTagNameMap } from './tags/HTML.tags.mjs';
import { SVGElementTagNameMap } from './tags/SVG.tags.mjs';
import { MathMLElementTagNameMap } from './tags/MathML.tags.mjs';

function generateCode(define) {
  const [ns, map, takeName] = define;
  const lines = Object.entries(map).map(([tagInfo, element]) => {
    const [tag, alias] = tagInfo.split(':');
    const name = alias || takeName(tag,element) || toCamelCase(tag, 1);
    const type = ns ? `${tag}:${ns}` : tag;
    return `export class ${name} extends DOMComponent<${element}, {}, ${name}> { type="${type}" }`;
  });
  lines.unshift(`import { DOMComponent } from "../DOMComponent";${EOL}`);
  return lines.join(`${EOL}`);
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