import { Context, useContext } from "react";

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
) {
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

export function formatPrice(
  price: number,
  options: Intl.NumberFormatOptions = {
    style: "currency",
    currency: "USD",
    notation: "compact",
  }
): string {
  return new Intl.NumberFormat(undefined, options).format(price);
}
