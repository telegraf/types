/**
 * Type tests for `@telegraf/types`, written against 7.1.0 (Bot API 7.1).
 *
 * Conventions:
 * - Each file in this folder tests one public subpath and imports from that subpath only:
 *   `message.ts` imports `../message.ts`. `methods.ts` also imports the result types it asserts, which the other
 *   subpaths declare. `index.ts` tests the root entry, `telegraf.ts` the constructs telegraf 4.16.3 builds on the
 *   package.
 * - Every test is an exported `const`, `function` or `type`, so a compile error names the test.
 * - `type X = Assert<Equal<A, B>>` asserts that `A` and `B` are identical, not merely assignable.
 * - A value annotated with a type asserts that the type accepts a realistic payload.
 * - The "Required fields" section of each file pins the fields 7.1.0 requires, taken from the published 7.1.0
 *   declarations: a field may be added, but one that code reads may not become optional or disappear.
 * - `// @ts-expect-error — <reason>` marks the single line the types must reject. An unused directive is itself a
 *   compile error, so a rejection that stops happening fails the suite.
 * - The suite passes when `tsc -p test/tsconfig.json` exits with 0. Nothing here runs.
 */

/** Identity equality: unlike mutual assignability, it tells `any` from other types and readonly from mutable fields. */
export type Equal<A, B> = (<T>() => T extends A ? 1 : 2) extends <T>() => T extends B ? 1 : 2 ? true : false;

export type Assert<T extends true> = T;

/** `true` when `A` is assignable to `B`. */
export type Extends<A, B> = [A] extends [B] ? true : false;

/**
 * The keys of `T` that can't be omitted. `Extends<"a" | "b", RequiredKeys<T>>` asserts that `a` and `b` stay
 * required, which code reading `T` relies on, while letting `T` gain fields.
 */
export type RequiredKeys<T> = { [K in keyof T]-?: {} extends Pick<T, K> ? never : K }[keyof T];

/**
 * `expectType<Expected>()(value)` compiles only when the type of `value` is exactly `Expected`.
 * A function's inferred return type drops union members that are subtypes of others (`VenueMessage` of
 * `LocationMessage`), so narrowing to such a union is checked on the narrowed value itself.
 */
export declare function expectType<Expected>(): <Actual>(
	value: Actual,
	...mismatch: Equal<Actual, Expected> extends true ? [] : [expected: Expected]
) => void;
