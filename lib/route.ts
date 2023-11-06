import * as matter from "gray-matter";

export type ContentRoute = {
  route: string;
  content: string;
  frontmatter: object;
  outline: Header[];
};

export type Header = {
  text: string;
  level: number;
};

export function getHeaders(content: string): Header[] {
  const headers: Header[] = [];
  const lines = content.split("\n");

  for (const line of lines) {
    const match = line.match(/^(#+)\s+(.*)$/);
    if (match) {
      const level = match[1].length;
      const text = match[2];
      headers.push({
        text,
        level,
      });
    }
  }

  return headers;
}

export function splitFrontmatter(data: string): {
  frontmatter: object;
  content: string;
} {
  const result = matter(data);

  return {
    frontmatter: result.data,
    content: result.content,
  };
}
