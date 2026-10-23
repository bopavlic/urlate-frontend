import { defineConfig } from "vitest/config";

// Unit tests for pure helpers. Async Server Components aren't supported by Vitest;
// pages are checked against the running stack instead.
export default defineConfig({
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
