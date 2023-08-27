/**
 * Combine class string arguments into a single space-delimited string.
 * Allows for breaking down class strings into composable pieces.
 *
 * **Truthy/Falsy values are simply ignored.** They are accepted to
 * support the conditional shorthand pattern. Think of the packages
 * [`clsx`](https://www.npmjs.com/package/clsx) <!-- cspell:disable-line -->
 * and [`classnames`](https://www.npmjs.com/package/classnames).
 *
 * If supported, CSS services (e.g. Tailwind's VSCode extension)
 * can be configured to be enabled within calls to this helper.
 *
 * Example:
 * ```js
 * const classes = C(
 *  'cls1 cls2 cls3',
 *  'annotated classes', // A comment explaining this class bit
 *  C(
 *    'group',
 *    'related',
 *    // 'classes', // Classes can be easily disabled for testing
 *  ),
 *  // `&&` evaluates to the right class strings if the left condition
 *  // is truthy; otherwise, it will evaluate to `false`
 *  // and will be silently ignored.
 *  shouldUseTheseClasses && 'classes to be conditionally used'
 *  true && 'use these classes',
 *  false && 'do-not use classes',
 *  null && 'these classes will NOT be used',
 *  undefined && 'NEITHER will these classes',
 * )
 * ```
 */
export function C(...classes: (string | boolean | null | undefined)[]): string {
  /**
   * Type Predicate pattern
   *
   * https://www.typescriptlang.org/docs/handbook/2/narrowing.html#using-type-predicates
   */
  const strings = classes.filter(
    (cls): cls is string => typeof cls === "string"
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

export type Empty = Record<never, never>;
