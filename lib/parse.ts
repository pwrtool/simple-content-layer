import { Filesystem } from "./reader.ts";

type ContentFile = {
  filename: string;
  extension: string;
  content: string;
  frontmatter: object;
};

export function parseFilesInDirectory(filesystem: Filesystem): ContentFile[] { }
