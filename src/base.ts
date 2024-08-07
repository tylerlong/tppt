import { run } from 'shell-commands';
import { Yellow } from 'color-loggers';

import { ensure } from './utils';

export const base = async () => {
  ensure(
    '.gitignore',
    `
venv/
__pycache__/
.pytest_cache/
.ruff_cache/
`,
  );
  ensure(
    '.ackrc',
    `
--ignore-dir=venv
--ignore-dir=__pycache__
--ignore_dir=.pytest_cache
--ignore_dir=.ruff_cache
`,
  );
  ensure('README.md', '# Untitled App');
  ensure(
    'requirements.txt',
    `
pytest
ruff
`,
  );
  ensure(
    'ruff.toml',
    `
[format]
quote-style = "single"
    `,
  );
  await run(`
    python3 -m venv venv
    source venv/bin/activate
    pip install --upgrade pip
    pip install -r requirements.txt
  `);
  ensure(
    'index.py',
    `
def add(a: int, b: int) -> int:
    return a + b
    `,
  );
  ensure(
    'test_index.py',
    `
from index import add


def test_add():
    assert add(1, 2) == 3
    `,
  );

  await run('ruff format');

  const important = new Yellow('❗️[IMPORTANT]: ');
  important.log("Don't forget to run `source venv/bin/activate`");
};
