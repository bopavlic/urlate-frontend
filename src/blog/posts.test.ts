import { describe, expect, it } from "vitest";
import { formatPostDate, getPost, posts } from "./posts";

describe("posts", () => {
  it("are listed newest first", () => {
    const dates = posts.map((post) => post.date);
    expect(dates).toEqual([...dates].sort().reverse());
  });

  it("have unique, URL-safe slugs and a title and description each", () => {
    const slugs = posts.map((post) => post.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    for (const post of posts) {
      expect(post.slug).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
      expect(post.title.length).toBeGreaterThan(0);
      // Search results cut descriptions at around 160 characters.
      expect(post.description.length).toBeLessThanOrEqual(160);
    }
  });
});

describe("getPost", () => {
  it("finds a post by slug, and nothing for an unknown one", () => {
    const first = posts[0]!;
    expect(getPost(first.slug)).toBe(first);
    expect(getPost("nope")).toBeUndefined();
  });
});

describe("formatPostDate", () => {
  it("reads like a date, not a timestamp", () => {
    expect(formatPostDate("2026-10-20")).toBe("20 October 2026");
  });
});
