import { beforeEach, describe, expect, it, vi } from 'vitest'
import { evalProp, pickValue, setValue, cn } from './utils'

describe('evalProp', () => {
    const resolver = vi.fn()

    beforeEach(() => {
        resolver.mockReset()
        resolver.mockImplementation(({ arg1 }: { arg1: number }) => `result-${arg1}`)
    })

    it('should be defined', () => {
        expect(evalProp).toBeDefined()
    })

    it('should return the value if it is not a function', () => {
        const value = "test";
        expect(evalProp(value)).toBe(value);
    })

    it('should return the result of the function if the value is a function', () => {
        expect(evalProp(resolver, { arg1: '1' })).toBe('result-1')
    })
})

describe('pickValue', () => {
    it('should be defined', () => {
        expect(pickValue).toBeDefined()
    })
    it("should return the correct value when keyString is 'a.b.c'", () => {
        const obj = { a: { b: { c: "value" } } };
        const keyString = "a.b.c";
        const value = pickValue(obj, keyString);
        expect(value).toEqual("value");
    });

    it("should return undefined when the corresponding value is undefined", () => {
        const obj = { a: { b: { c: undefined } } };
        const keyString = "a.b.c";
        const value = pickValue(obj, keyString);
        expect(value).toBeUndefined();
    });

    it("should return the correct value when keyString is 'a.0.c'", () => {
        const obj = { a: [{ c: "value" }] };
        const keyString = "a.0.c";
        const value = pickValue(obj, keyString);
        expect(value).toEqual("value");
    });

    it("should return undefined when the keyString is 'a.1.c' and 'a' is undefined", () => {
        const obj = { b: [{ 1: { c: "value" } }] };
        const keyString = "a.1.c";
        const value = pickValue(obj, keyString);
        expect(value).toBeUndefined();
    });

    it("should return undefined when the keyString is 'a.1.c' and '1' is undefined", () => {
        const obj = { a: [] };
        const keyString = "a.1.c";
        const value = pickValue(obj, keyString);
        expect(value).toBeUndefined();
    });

    it("should return undefined when the keyString is 'a.b.c.d' and 'c' is undefined", () => {
        const obj = { a: { b: { c: undefined } } };
        const keyString = "a.b.c.d";
        const value = pickValue(obj, keyString);
        expect(value).toBeUndefined();
    });

})
describe('setValue', () => {
    it('should be defined', () => {
        expect(setValue).toBeDefined()
    })
    it("should set value correctly", () => {
        const obj = { a: { b: { c: 1 } } };
        const keyString = "a.b.d";
        const value = 2;
        const result = setValue(obj, keyString, value);
        expect(result.a.b.d).toEqual(value);
    });

    it("should create new key when key not exist", () => {
        const obj = {};
        const keyString = "a.b.c";
        const value = 1;
        const result = setValue(obj, keyString, value);
        expect(result.a.b.c).toEqual(value);
    });

    it("should replace value when key is number", () => {
        const obj = { a: { 0: 1 } };
        const keyString = "a.0";
        const value = 2;
        const result = setValue(obj, keyString, value);
        expect(result.a[0]).toEqual(value);
    });

    it("should create array when keyString contains index", () => {
        const obj = {};
        const keyString = "a.0.b";
        const value = 1;
        const result = setValue(obj, keyString, value);
        expect(result.a[0].b).toEqual(value);
    });

    it("should create array when keyString contains index and dot", () => {
        const obj = {};
        const keyString = "a.0.b.0";
        const value = 1;
        const result = setValue(obj, keyString, value);
        expect(result.a[0].b[0]).toEqual(value);
    });

    it("should create array when keyString contains index and dot", () => {
        const obj = {};
        const keyString = "a.0.b.0";
        const value = 1;
        const result = setValue(obj, keyString, value);
        expect(result.a[0].b[0]).toEqual(value);
    });

    it("should create nested array when keyString contains index and dot", () => {
        const obj = {};
        const keyString = "a.0.b.0.c.0";
        const value = 1;
        const result = setValue(obj, keyString, value);
        expect(result.a[0].b[0].c[0]).toEqual(value);
    });
})
describe('cn', () => {
    it('should be defined', () => {
        expect(cn).toBeDefined()
    })
    it("should return correct class name", () => {
        const gen = cn("group", "group:hover", "lg");
        expect(gen).toBe("group group:hover lg");
    });

    it("should return correct class name with null value", () => {
        const gen = cn("group", null, "lg");
        expect(gen).toBe("group lg");
    });

    it("should return correct class name with undefined value", () => {
        const gen = cn("group", undefined, "lg");
        expect(gen).toBe("group lg");
    });

    it("should return correct class name with null and undefined value", () => {
        const gen = cn("group", null, undefined, "lg");
        expect(gen).toBe("group lg");
    });

    it("should return correct class name with special charactors", () => {
        const gen = cn("group:$%^&*()", null, undefined, "lg");
        expect(gen).toBe("group:$%^&*() lg");
    });

    it("should return correct class name with space", () => {
        const gen = cn("group", "   ", null, undefined, "lg");
        expect(gen).toBe("group lg");
    });

})
