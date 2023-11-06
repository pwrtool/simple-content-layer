import { describe, expect, it } from "bun:test";
import { parseFilesInDirectory, ContentFile } from "../lib/parse.ts";
import { Filesystem } from "../lib/reader.ts";

describe("parseFilesInDirectory", () => {
  it("returns an empty array when there are no files", () => {
    const filesystem: Filesystem = {
      files: [],
      read: () => null,
      exists: () => false,
    };

    const result = parseFilesInDirectory(filesystem);

    expect(result).toEqual([]);
  });
  it("returns an array of ContentFiles when there are files", () => {
    const filesystem: Filesystem = {
      files: ["./test.md", "./hello.mdx"],
      read: () => "test",
      exists: () => true,
    };
    const result = parseFilesInDirectory(filesystem);
    const expected: ContentFile[] = [
      {
        path: "test",
        extension: "md",
        data: "test",
      },
      {
        path: "hello",
        extension: "mdx",
        data: "test",
      },
    ];

    expect(result).toEqual(expected);
  });
  it("deals with deep directories", () => {
    const filesystem: Filesystem = {
      files: ["./test.md", "./hello.mdx", "./deep/nested/test.md"],
      read: () => "test",
      exists: () => true,
    };
    const result = parseFilesInDirectory(filesystem);

    expect(result).toEqual([
      {
        path: "test",
        extension: "md",
        data: "test",
      },
      {
        path: "hello",
        extension: "mdx",
        data: "test",
      },
      {
        path: "deep/nested/test",
        extension: "md",
        data: "test",
      },
    ]);
  });
  it("rejects files with extensions not in the allowedExtensions array", () => {
    const filesystem: Filesystem = {
      files: ["test.md", "./hello.mdx", "./hello.txt"],
      read: () => "test",
      exists: () => true,
    };

    const result = parseFilesInDirectory(filesystem);
    const expected = [
      {
        path: "test",
        extension: "md",
        data: "test",
      },
      {
        path: "hello",
        extension: "mdx",
        data: "test",
      },
    ];

    expect(result).toEqual(expected);
  });
});
