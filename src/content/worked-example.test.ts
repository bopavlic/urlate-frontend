import { describe, expect, it } from "vitest";
import { exampleEntries, exampleTotals } from "./worked-example";

describe("the worked example from the brief", () => {
  it("adds up to 20 minutes for the brother, 2 for you, 18 owed", () => {
    expect(exampleTotals(exampleEntries)).toEqual({ brother: 20, you: 2, owed: 18 });
  });
});
