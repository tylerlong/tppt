import { run } from 'shell-commands';
import { ensure } from './utils';

export const base = async () => {
  await run(`
    python3 -m venv venv
    source venv/bin/activate
    pip install --upgrade pip
  `);

  ensure('.gitignore', 'venv/');
  ensure('.ackrc', '--ignore-dir=venv');
};
