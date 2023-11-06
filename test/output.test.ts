import { describe, expect, it } from "bun:test";
import { getOutputFiles } from "../lib/output";

describe("getOutputFiles", () => {
  it("turns the routes into output files", () => {
    const input = [
      {
        route: "/docs",
        content: "hello world",
        outline: [],
        frontmatter: {},
      },
      {
        route: "/docs/hello",
        content: "hello world",
        outline: [],
        frontmatter: {},
      },
    ];
    const output = getOutputFiles(input);
    const expected = new Map([
      [
        "docs.json",
        {
          content: "hello world",
          outline: [],
          extension: "md",
          frontmatter: {},
        },
      ],
      [
        "docs>hello.json",
        {
          content: "hello world",
          outline: [],
          extension: "md",
          frontmatter: {},
        },
      ],
    ]);
    expect(output).toEqual(expected);
  });
});
