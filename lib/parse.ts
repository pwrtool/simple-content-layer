import { Filesystem } from "./reader.ts";

export type ContentFile = {
  path: string;
  extension: string;
  data: string;
};

export function parseFilesInDirectory(
  filesystem: Filesystem,
  allowedExtensions = ["md", "mdx"],
): ContentFile[] {
  const files = filesystem.files;
  const results: ContentFile[] = [];

  for (const file of files) {
    let path = file.replace(/^\.\//, "");

    const pathParts = path.split(".");
    const extension = pathParts.pop();
    path = pathParts.join(".");

    if (!extension || !allowedExtensions.includes(extension)) {
      continue;
    }
    const data = filesystem.read(file);
    if (data) {
      results.push({
        path: path,
        extension: extension || "",
        data,
      });
    }
  }

  return results;
}
