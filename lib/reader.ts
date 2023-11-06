import fs from "node:fs";

export interface Filesystem {
  files: string[];
  read(filepath: string): string | null;
  exists(filepath: string): boolean;
}

export class LocalDirectory implements Filesystem {
  files: string[] = [];

  constructor(directory: string) {
    this.files = recursivelyReadDir(directory);
  }

  read(filepath: string): string | null {
    if (fs.existsSync(filepath)) {
      return fs.readFileSync(filepath, "utf8");
    } else {
      return null;
    }
  }

  exists(filepath: string): boolean {
    return this.files.includes(filepath);
  }
}

function recursivelyReadDir(directory: string): string[] {
  const files = fs.readdirSync(directory);
  const results: string[] = [];

  for (const file of files) {
    const filepath = `${directory}/${file}`;

    if (fs.statSync(filepath).isDirectory()) {
      results.push(...recursivelyReadDir(filepath));
    } else {
      results.push(filepath);
    }
  }

  return results;
}
