import { ContentRoute, Header } from "./route";

export type OutputFile = {
  content: string;
  outline: Header[];
  extension: string;
  frontmatter: object;
};

export function getOutputFiles(
  routes: ContentRoute[],
): Map<string, OutputFile> {
  const outputFiles = new Map<string, OutputFile>();

  for (const route of routes) {
    const key = route.route.replace("/", ">") + ".json";
    outputFiles.set(key, {
      content: route.content,
      outline: route.outline,
      extension: route.extension ?? "md",
      frontmatter: route.frontmatter,
    });
  }

  return outputFiles;
}

type ListItem = {
  route: string;
  frontmatter: object;
  outline: Header[];
};

export type ListFile = ListItem[];

export function getListFile(routes: ContentRoute[]): ListFile {
  const listFile: ListFile = [];
  for (const route of routes) {
    const listItem: ListItem = {
      route: route.route,
      frontmatter: route.frontmatter,
      outline: route.outline,
    };
    listFile.push(listItem);
  }

  return listFile;
}
