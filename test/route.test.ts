import { describe, it, expect } from "bun:test";
import { getHeaders, Header } from "../lib/route.ts";

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
