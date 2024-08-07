import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { dirname } from 'path';

// create the file only if it doesn't exist
export const ensure = (filePath: string, content: string) => {
  if (existsSync(filePath)) {
    return;
  }
  mkdirSync(dirname(filePath), { recursive: true });
  writeFileSync(filePath, content.trim() + '\n');
};
