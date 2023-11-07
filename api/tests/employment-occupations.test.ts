import { expect, test } from "bun:test";
import handler from "../src/handler";

test("Good response", async () => {
  const request = new Request("http://localhost:8787/Employment/EscoOccupations_v1.0", {
    method: "POST",
    body: JSON.stringify({}),
  });
  const response = await handler.fetch(request);
  expect(response.status).toBe(200);
  const responseData = await response.json();
  expect(responseData.occupations).toBeInstanceOf(Array);
  expect(responseData.occupations.length).toBeGreaterThan(0);
  expect(responseData.occupations[0]).toHaveProperty("escoCode");
});

test("Good filtered response", async () => {
  const request = new Request("http://localhost:8787/Employment/EscoOccupations_v1.0", {
    method: "POST",
    body: JSON.stringify({
      offset: 0,
      limit: 1,
    }),
  });
  const response = await handler.fetch(request);
  expect(response.status).toBe(200);
  const responseData = await response.json();
  expect(responseData.occupations).toBeInstanceOf(Array);
  expect(responseData.occupations.length).toBe(1);
});
