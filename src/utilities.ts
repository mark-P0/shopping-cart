import { Context, Dispatch, SetStateAction, useContext } from "react";

/**
 * Suggested by ESLint instead of `{}`
 *
 * https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492
 */
export type Empty = Record<never, never>;

/**
 * Return type of React's `useState`,
 *
 * Attempt at `ReturnType<typeof useState<T>>` but no `undefined`
 */
export type State<T> = [T, Dispatch<SetStateAction<T>>];

/**
 * Wrapper for context pattern where the default value is `null`
 *
 * https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context#without-default-context-value
 */
export function useNullableContext<T>(ctx: Context<T | null>) {
  const providedValues = useContext(ctx);
  if (providedValues === null) {
    throw new Error(`${ctx} not provided`);
  }
  return providedValues;
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
