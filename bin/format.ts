import prettier from 'prettier';
import * as fs from 'fs/promises';
import { join, resolve, relative } from 'path';
import { langs } from '../config/prism';

const ROOT = resolve('.');
const PFILE = join(ROOT, '.prettierrc');
const isBAIL = process.argv.includes('--bail');

const MD = /\.md$/;
const YAML = /^\s*(---[^]+(?:---\r?\n))/;

const options: prettier.Options = JSON.parse(
  await fs.readFile(PFILE, 'utf8')
);

// Prism languages to ignore
const Ignores = new Set(['txt', 'bash', 'sh', 'rust', 'ruby', 'python', 'toml']);

// Prism language -> prettier parser
export const Parsers: Record<string, prettier.BuiltInParserName> = {
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

interface Metadata {
  file: string;
  lang: string;
  content?: string;
}

let errors = 0;
function toError(msg: string, meta: Metadata): void {
  errors++;

  msg += '\n~> file: ' + relative(ROOT, meta.file);
  msg += '\n~> language: ' + meta.lang;
  if (meta.content) {
    msg += '\n~> code: ';
    meta.content.split(/\r?\n/g).forEach(txt => {
      msg += '\n\t' + txt;
    });
  }
  console.error('\n\n' + msg);
}

function format(code: string, lang: string) {
  let parser = Parsers[lang] || 'babel';
  return prettier.format(code, { ...options, parser });
}

async function walk(dir: string): Promise<void> {
  let files = await fs.readdir(dir);

  await Promise.all(
    files.map(fname => {
      let absolute = join(dir, fname);
      if (fname === 'node_modules') return;
      if (MD.test(fname)) return run(absolute);
      return fs.stat(absolute).then(stats => {
        if (stats.isDirectory()) return walk(absolute);
      });
    })
  );
}

async function run(file: string): Promise<void> {
  let last = 0;
  let output = '';
  let match: RegExpExecArray | null;
  let input = await fs.readFile(file, 'utf8');
  let BACKTICKS = /^( +)?([`]{3})([A-Za-z]+?)\n([^]+?)(\2)/gm;

  while (match = BACKTICKS.exec(input)) {
    let [full, lead, open, hint, inner, close] = match;

    let current = match.index;
    output += input.substring(last, current);

    lead = lead || '';
    hint = hint || 'txt';
    let lang = (langs[hint] || hint).toLowerCase();

    if (Ignores.has(lang)) {
      last = current + full.length;
      output += full;
      continue;
    }

    let isYAML = YAML.exec(inner);
    let frontmatter = isYAML && isYAML[1] || '';

    if (frontmatter.length) {
      inner = inner.substring(frontmatter.length);
    }

    try {
      var pretty = format(inner, lang).trimEnd();
    } catch (err) {
      toError('Error formatting code snippet!', { file, lang, content: inner });
      if (isBAIL) throw err;
      return console.error(err.stack || err);
    }

    console.log({ full, lead, open, hint, inner, close, pretty });

    output += lead + '```' + lang + '\n';

    if (lead.length > 0) {
      (frontmatter + pretty).split(/\r?\n/g).forEach(line => {
        output += lead + line + '\n';
      });
    } else {
      output += frontmatter + pretty + '\n';
    }

    output += lead + '```';

    last = current + full.length;
  }

  if (last && last < input.length) {
    output += input.substring(last);
  } else if (last < 1) {
    output = input;
  }

  try {
    output = format(output, 'mdx');
  } catch (err) {
    toError('Error w/ final MDX format!', { file, lang: 'mdx' });
    if (isBAIL) throw err;
    return console.error(err.stack || err);
  }

  await fs.writeFile(file, output);
  console.log('~> ok', file);
}

// resolved from project root
const input = resolve('content');

walk(input).then(() => {
  if (errors > 0) {
    console.error('\n\nFinished with %d error(s)\n\n', errors);
    process.exit(1);
  }
}).catch(err => {
  console.error(err.stack || err);
  process.exit(1);
});
