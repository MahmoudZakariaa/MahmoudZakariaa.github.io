// src/content.test.ts
import { describe, it, expect } from "vitest";
import { content } from "./content";

describe("content", () => {
  it("includes required external links and logos", () => {
    expect(content.person.name).toBe("Mahmoud Zakaria");
    expect(content.projects[0].href).toBe("https://azbgulf.com/home");
    expect(content.projects[0].logoSrc).toBe("/logos/agc.png");
    expect(content.projects[1].href).toBe(
      "https://github.com/MahmoudZakariaa/PharmaLink-Angular",
    );
    expect(content.projects[1].logoSrc).toBe("/logos/pharmalink.png");
    expect(content.experience[0].href).toBe("https://envnt.sa/");
    expect(content.experience[0].logoSrc).toBe("/logos/envnt.svg");
    expect(content.experience[1].href).toBe("https://iti.gov.eg/");
    expect(content.experience[1].logoSrc).toBe("/logos/iti.png");
    expect(content.about.aiSentence.length).toBeGreaterThan(20);
  });
});
