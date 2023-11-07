import { expect, test } from "bun:test";
import handler from "../src/index";

test("Good response", async () => {
  const request = new Request("http://localhost:8787/occupations");
  const response = await handler.fetch(request);
  expect(response.status).toBe(200);
  const occupations = await response.json();
  expect(occupations).toBeInstanceOf(Array);
  expect(occupations.length).toBeGreaterThan(0);
  expect(occupations[0]).toHaveProperty("uri");
});

test("Good filtered response", async () => {
  const request = new Request("http://localhost:8787/occupations?offset=0&limit=1");
  const response = await handler.fetch(request);
  expect(response.status).toBe(200);
  const occupations = await response.json();
  expect(occupations).toBeInstanceOf(Array);
  expect(occupations.length).toBe(1);
});
