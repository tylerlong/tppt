import { run } from 'shell-commands';
import { Yellow } from 'color-loggers';

import { ensure } from './utils';

export const base = async () => {
  ensure(
    '.gitignore',
    `
.venv/
__pycache__/
.pytest_cache/
.ruff_cache/
`,
  );
  ensure(
    '.ackrc',
    `
--ignore-dir=.venv
--ignore-dir=__pycache__
--ignore-dir=.pytest_cache
--ignore-dir=.ruff_cache
`,
  );
  ensure(
    'README.md',
    `
# Untitled App

## Manage dependencies

### Upgrade all

\`\`\`zsh
pip-compile --upgrade
\`\`\`

### Add/remove a dependency

Edit \`requirements.in\` and run the following command:

\`\`\`zsh
pip-compile && pip-sync
\`\`\`
`,
  );
  ensure(
    'requirements.in',
    `
pip-tools
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
    python3 -m venv .venv
    source .venv/bin/activate
    pip install --upgrade pip pip-tools
    pip-compile && pip-sync
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

  // All VSCode settings about Python
  ensure(
    '.vscode/settings.json',
    `
{
  "[python]": {
    "editor.tabSize": 4,
    "editor.formatOnSave": true,
    "editor.codeActionsOnSave": {
      "source.fixAll": "explicit",
      "source.organizeImports": "explicit"
    },
    "editor.defaultFormatter": "charliermarsh.ruff"
  },
  "python.analysis.autoImportCompletions": true,
  "python.analysis.autoFormatStrings": true,
  "python.analysis.completeFunctionParens": true,
  "python.analysis.inlayHints.callArgumentNames": "all",
  "python.analysis.inlayHints.functionReturnTypes": true,
  "python.analysis.inlayHints.pytestParameters": true,
  "python.analysis.inlayHints.variableTypes": true,
  "python.analysis.typeCheckingMode": "basic",
  "python.analysis.userFileIndexingLimit": -1,
  "python.testing.pytestArgs": [
    "-s", "."
  ],
  "python.testing.unittestEnabled": false,
  "python.testing.pytestEnabled": true,
  "editor.inlayHints.enabled": "offUnlessPressed"
}
    `,
  );

  await run('ruff format');

  const important = new Yellow('❗️[IMPORTANT]: ');
  important.log("Don't forget to run `source .venv/bin/activate`");
};
