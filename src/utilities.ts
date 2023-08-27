/**
 * Suggested by ESLint instead of `{}`
 *
 * https://github.com/typescript-eslint/typescript-eslint/issues/2063#issuecomment-675156492
 */
export type Empty = Record<never, never>;

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
