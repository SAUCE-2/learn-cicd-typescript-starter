import { describe, expect, test } from "vitest";
import { getAPIKey } from "../api/auth.js";

describe("getAPIKey", () => {
  test("returns null when the authorization header is missing", () => {
    expect(getAPIKey({})).toBeNull();
  });

  test("returns null when the authorization header is empty", () => {
    expect(getAPIKey({ authorization: "" })).toBeNull();
  });

  test("returns null when the key is missing", () => {
    expect(getAPIKey({ authorization: "ApiKey" })).toBeNull();
  });

  test("returns null for an unsupported auth scheme", () => {
    expect(getAPIKey({ authorization: "Bearer secret" })).toBeNull();
  });

  test("treats the auth scheme as case-sensitive", () => {
    expect(getAPIKey({ authorization: "apikey secret" })).toBeNull();
  });

  test("returns the API key for a valid header", () => {
    expect(getAPIKey({ authorization: "ApiKey secret" })).toBe("secret");
  });
});
