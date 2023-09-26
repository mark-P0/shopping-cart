import { Context, RefObject, useContext } from "react";

/**
 * Suggested by ESLint instead of `{}`
 *
 * https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492
 */
export type Empty = Record<never, never>;

/**
 * Wrapper for context pattern where the default value is `null`
 *
 * https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context#without-default-context-value
 *
 * Used like `useNullableContext({ YourContext })`
 * to automatically get a `'YourContext'` label
 */
export function useNullableContext<T>(
  labelledContext: Record<string, Context<T | null>>
): T {
  const entries = Object.entries(labelledContext);
  if (entries.length > 1) {
    throw new Error("Possible improper use of custom context hook");
  }
  const [label, context] = entries[0];

  const provision = useContext(context);
  if (provision === null) {
    throw new Error(`${label} not provided`);
  }
  return provision;
}

export function accessNullableRef<T>(
  labelledRef: Record<string, RefObject<T>>
): T {
  const entries = Object.entries(labelledRef);
  if (entries.length > 1) {
    throw new Error("Possible improper use of ref wrapper");
  }
  const [label, ref] = entries[0];

  const current = ref.current;
  if (current === null) {
    throw new Error(`${label} reference does not exist`);
  }
  return current;
}

// cspell:words clsx
/**
 * Build class strings _a la_ `clsx` and `classnames`
 *
 * Custom function to avoid another dependency...
 */
export function C(...classes: Array<string | boolean | null | undefined>) {
  const strings = classes.filter(
    (value): value is string => typeof value === "string"
  );
  return strings.join(" ");
}

/**
 * https://stackoverflow.com/q/951021
 */
export function sleep(seconds: number) {
  return new Promise<void>((resolve) => setTimeout(resolve, seconds * 1000));
}

const PriceFormatter = {
  compact: Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    notation: "compact",
  }),
  standard: Intl.NumberFormat(undefined, {
    style: "currency",
    currency: "USD",
    notation: "standard",
  }),
} as const;
type PriceFormat = keyof typeof PriceFormatter;
export function formatPrice(format: PriceFormat, price: number): string {
  return PriceFormatter[format].format(price);
}

export function sum(...numbers: number[]): number {
  let result = 0;
  for (const num of numbers) result += num;
  return result;
}
