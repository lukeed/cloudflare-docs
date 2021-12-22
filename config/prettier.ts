import { resolve } from 'path';
import { readFileSync } from 'fs';
import prettier from 'prettier';

import type { BuiltInParserName, Options } from 'prettier';

// NOTE: resolved from project root
const config = resolve('.prettierrc');
const options: Options = JSON.parse(readFileSync(config, 'utf8'));

// prism languages to ignore
export const Ignores = new Set(['txt', 'bash', 'sh', 'rust', 'ruby', 'python', 'toml']);

// prism lang -> prettier parser
export const Parsers: Record<string, BuiltInParserName> = {
  js: 'babel',
  javascript: 'babel',

  mdx: 'mdx',
  markdown: 'mdx',

  json: 'json',
  json5: 'json5',

  ts: 'typescript',
  typescript: 'typescript',

  gql: 'graphql',
  graphql: 'graphql',

  xml: 'html',
  html: 'html',
  svelte: 'html',
  vue: 'vue',

  yaml: 'yaml',
  yml: 'yaml',
};

export function format(code: string, lang: string): string {
  if (Ignores.has(lang)) return code;
  let parser = Parsers[lang] || 'babel';
  return prettier.format(code, { ...options, parser });
}
