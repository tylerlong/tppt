import { run } from 'shell-commands';
import { Red } from 'color-loggers';

import { ensure } from './utils';

export const base = async () => {
  ensure(
    '.gitignore',
    `venv/
__pycache__/`,
  );
  ensure(
    '.ackrc',
    `--ignore-dir=venv
--ignore-dir=__pycache__`,
  );
  ensure('README.md', '# Untitled App');
  await run(`
    python3 -m venv venv
    source venv/bin/activate
    pip install --upgrade pip
    pip install pytest
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

  const important = new Red('[IMPORTANT]: ');
  important.log('Remember to activate the virtual environment with `source venv/bin/activate`');
};
