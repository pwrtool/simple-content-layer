import matter from "gray-matter";
import { ContentFile } from "./parse";

export type ContentRoute = {
  route: string;
  content: string;
  frontmatter: object;
  outline: Header[];
  extension?: string;
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

export function getRoute(filepath: string): string {
  if (filepath.at(0) === "/") {
    filepath = filepath.slice(0);
  }

  const len = filepath.length;
  if (filepath.at(len - 1) === "/") {
    filepath = filepath.substring(0, len - 1);
  }

  const split = filepath.split("/");
  if (split[split.length - 1] === "index") {
    split.pop();
  }

  let route = split.join("/");

  if (route.at(0) !== "/") {
    route = "/" + route;
  }

  return route;
}

export function getContentRoutes(files: ContentFile[]): ContentRoute[] {
  const routes: ContentRoute[] = [];
  for (const file of files) {
    const route: ContentRoute = {
      route: "",
      content: "",
      outline: [],
      frontmatter: {},
    };

    const { content, frontmatter } = splitFrontmatter(file.data);
    route.frontmatter = frontmatter;
    route.content = content;

    route.route = getRoute(file.path);
    route.extension = file.extension;
    route.outline = getHeaders(content);

    routes.push(route);
  }

  return routes;
}
