import { describe, it, test, expect } from "bun:test";
import { ContentFile } from "../lib/parse.ts";
import {
  getHeaders,
  getRoute,
  getContentRoutes,
  ContentRoute,
} from "../lib/route.ts";

const example1 = `
Hello World
`;
const example2 = `
# Big header
lost of content is between headers.

This could include:
- Lists
- Ordered lists
- Images
- Links

## Here's a smaller header
more content

### Wow! They can go that small!
some more content on how small this header is

#### This is getting ridiculous
I think we should stop now

##### I'm not sure if this is even a header anymore
If you're past a level 5 header, it doesn't count
`;

describe("getHeaders", () => {
  it("returns an empty array when there are no headers", () => {
    const result = getHeaders(example1);

    expect(result).toEqual([]);
  });
  it("returns an array of headers when there are headers", () => {
    const result = getHeaders(example2);
    expect(result).toEqual([
      {
        text: "Big header",
        level: 1,
      },
      {
        text: "Here's a smaller header",
        level: 2,
      },
      {
        text: "Wow! They can go that small!",
        level: 3,
      },
      {
        text: "This is getting ridiculous",
        level: 4,
      },
      {
        text: "I'm not sure if this is even a header anymore",
        level: 5,
      },
    ]);
  });
});

test("getRoute", () => {
  const tests = [
    {
      input: "docs/index",
      output: "/docs",
    },
    {
      input: "/docs/hello/index",
      output: "/docs/hello",
    },
    {
      input: "docs/user/",
      output: "/docs/user",
    },
    {
      input: "/hello/world",
      output: "/hello/world",
    },
  ];

  for (const { input, output } of tests) {
    expect(getRoute(input)).toEqual(output);
  }
});

// write test for getContentRoute assuming an e2e environment
const exampleFile1 = `
# Hello World
`;
const exampleFile2 = `
# Hello World
This is some more content
## Another header
`;
const exampleFile3 = `---
title: Hello World
weight: 4
---
test`;
const exampleFile4 = `
test
`;
describe("getContentRoutes", () => {
  it("turns the files into routes", () => {
    const input: ContentFile[] = [
      {
        path: "docs/index",
        extension: "md",
        data: exampleFile1,
      },
      {
        path: "docs/hello/index",
        extension: "md",
        data: exampleFile2,
      },
      {
        path: "docs/user/",
        extension: "md",
        data: exampleFile3,
      },
      {
        path: "/hello/world",
        extension: "md",
        data: exampleFile4,
      },
    ];
    const output = getContentRoutes(input);
    const expected: ContentRoute[] = [
      {
        route: "/docs",
        frontmatter: {},
        extension: "md",
        outline: [
          {
            text: "Hello World",
            level: 1,
          },
        ],
        content: "\n# Hello World\n",
      },
      {
        route: "/docs/hello",
        extension: "md",
        frontmatter: {},
        outline: [
          {
            text: "Hello World",
            level: 1,
          },
          {
            text: "Another header",
            level: 2,
          },
        ],
        content: exampleFile2,
      },
      {
        route: "/docs/user",
        extension: "md",
        content: "test",
        outline: [],
        frontmatter: {
          title: "Hello World",
          weight: 4,
        },
      },
      {
        route: "/hello/world",
        extension: "md",
        frontmatter: {},
        outline: [],
        content: exampleFile4,
      },
    ];
    expect(output).toEqual(expected);
  });
});
