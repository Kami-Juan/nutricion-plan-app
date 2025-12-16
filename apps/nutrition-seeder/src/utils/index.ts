import fs from "node:fs";
import path from "node:path";

export const getFiles = (dirSource: string) => {
  const files: string[] = [];

  fs.readdirSync(dirSource).forEach((item) => {
    const itemPath = path.join(dirSource, item);

    if (fs.statSync(itemPath).isDirectory()) {
      files.push(...getFiles(itemPath));
    } else {
      files.push(itemPath);
    }
  });

  return files;
};

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));
