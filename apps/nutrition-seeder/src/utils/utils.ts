import path from 'path';
import fs from 'fs';

export const getFiles = (dirSource: string) => {
  const files: string[] = [];
  const items = fs.readdirSync(dirSource);

  items.forEach((item) => {
    const itemPath = path.join(dirSource, item);

    if (fs.statSync(itemPath).isDirectory()) {
      files.push(...getFiles(itemPath));
    } else {
      files.push(itemPath);
    }
  });

  return files;
};
