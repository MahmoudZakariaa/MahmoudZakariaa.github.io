// src/content.test.ts
import { describe, it, expect } from "vitest";
import { content } from "./content";

describe("content", () => {
  it("includes required external links and logos", () => {
    expect(content.person.name).toBe("Mahmoud Zakaria");
    expect(content.projects[0].href).toBe("https://azbgulf.com/home");
    expect(content.projects[0].logoSrc).toBe("/logos/agc.png");
    expect(content.projects[1].href).toBe(
      "https://pharma-link.runasp.net/client/home",
    );
    expect(content.projects[1].logoSrc).toBe("/logos/pharmalink.png");
    expect(content.projects).toHaveLength(2);
    expect(content.experience[0].href).toBe("https://envnt.sa/");
    expect(content.experience[0].logoSrc).toBe("/logos/envnt.svg");
    expect(content.experience[1].href).toBe("https://iti.gov.eg/");
    expect(content.experience[1].logoSrc).toBe("/logos/iti.png");
    expect(content.skills.some((g) => g.items.includes("OutSystems Platform"))).toBe(
      true,
    );
    expect(content.about.aiSentence.length).toBeGreaterThan(20);
    expect(content.courses.map((c) => c.title)).toEqual([
      "OutSystems Platform",
      "Agentic AI Training",
      "AI Fluency: Framework & Foundations",
      "Claude in Action & Claude 101",
    ]);
    expect(JSON.stringify(content).toLowerCase()).not.toContain("certification");
    expect(content.techLogos.some((l) => l.name === "React" || l.name === "Node.js")).toBe(
      false,
    );
    expect(
      content.skills.some((g) =>
        g.items.some((item) => item === "React" || item === "Node.js"),
      ),
    ).toBe(false);
  });
});
