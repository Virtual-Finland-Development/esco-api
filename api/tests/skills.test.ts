import { expect, test } from "bun:test";
import handler from "../src/index";

test("Good response", async () => {
  const request = new Request("http://localhost:8787/skills");
  const response = await handler.fetch(request);
  expect(response.status).toBe(200);
  const skills = await response.json();
  expect(skills).toBeInstanceOf(Array);
  expect(skills.length).toBeGreaterThan(0);
  expect(skills[0]).toHaveProperty("uri");
});

test("Good filtered response", async () => {
  const request = new Request("http://localhost:8787/skills?offset=0&limit=1&locales=fi,en");
  const response = await handler.fetch(request);
  expect(response.status).toBe(200);
  const skills = await response.json();
  expect(skills).toBeInstanceOf(Array);
  expect(skills.length).toBe(1);
  expect(skills[0]).toHaveProperty("prefLabel");
  expect(skills[0].prefLabel.fi).toBeDefined();
  expect(skills[0].prefLabel.en).toBeDefined();
  expect(skills[0].prefLabel.sv).not.toBeDefined();
});
