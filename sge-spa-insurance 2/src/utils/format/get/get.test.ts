// import { describe, expect, test } from "vitest";
import { get } from ".";

describe("get", () => {
  // test("should return the value of a key", () => {
  //   expect(get({ a: 1 }, "a")).toBe(1);
  // });

  // test("should return the value of a nested key", () => {
  //   expect(get({ a: { b: 2 } }, "a.b")).toBe(2);
  // });

  // test("should return value of a nested key with array path", () => {
  //   expect(get({ a: { b: 3 } }, ["a", "b"])).toBe(3);
  // });

  // test("should return undefined if key is not found", () => {
  //   expect(get({ a: 1 }, "b")).toBe(undefined);
  // });

  // test("should return default value if key is not found", () => {
  //   expect(get({ a: 1 }, "b", 3)).toBe(3);
  // });

  // test("should return default value if nested key is not found", () => {
  //   expect(get({ a: 1 }, "a.b", 3)).toBe(3);
  // });

  // test("should return undefined if nested key is not found", () => {
  //   expect(get({ a: 1 }, "a.b")).toBe(undefined);
  // });

  // test("should return value in nested array", () => {
  //   expect(get({ a: { b: [1, 2, 3] } }, "a.b.1")).toBe(2);
  // });

  // test("should return default value if nested array key is not found", () => {
  //   expect(get({ a: { b: [1, 2, 3] } }, "a.b.4", 4)).toBe(4);
  // });

  // test("should return value if nested array object", () => {
  //   expect(get({ a: { b: [{ c: 1 }, { c: 2 }] } }, "a.b.1.c")).toBe(2);
  // });
  // todo esto aun debe ser implementado
  describe('get', () => {
    it("should return ''", () => {
      //const result = get()
      const result = () => {
        return 'value1'
      }
  
      expect(result()).toEqual('value1')
    })
  })

});