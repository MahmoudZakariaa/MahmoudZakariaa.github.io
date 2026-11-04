import { describe, it, expect } from "vitest";
import { encodeFormBody } from "./encodeFormBody";

describe("encodeFormBody", () => {
  it("encodes Netlify contact fields including form-name", () => {
    const body = encodeFormBody({
      "form-name": "contact",
      name: "Ada Lovelace",
      email: "ada@example.com",
      message: "Hello & thanks",
      "bot-field": "",
    });
    expect(body).toContain("form-name=contact");
    expect(body).toContain("name=Ada%20Lovelace");
    expect(body).toContain("email=ada%40example.com");
    expect(body).toContain("message=Hello%20%26%20thanks");
    expect(body).toContain("bot-field=");
  });
});
