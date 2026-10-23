import { describe, expect, it } from "vitest";
import { faqs } from "./faq";

describe("faqs", () => {
  it("asks each question once and answers it in plain text", () => {
    const questions = faqs.map((faq) => faq.question);
    expect(new Set(questions).size).toBe(questions.length);
    for (const faq of faqs) {
      expect(faq.question.endsWith("?")).toBe(true);
      // Plain text: the answers also go into FAQPage structured data.
      expect(faq.answer).not.toMatch(/[<>*_[\]]/);
      expect(faq.answer.length).toBeGreaterThan(20);
    }
  });
});
