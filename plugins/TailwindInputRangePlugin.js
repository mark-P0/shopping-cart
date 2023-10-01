import colors from "tailwindcss/colors";
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette";
import toColorValue from "tailwindcss/lib/util/toColorValue";
import plugin from "tailwindcss/plugin";

/** https://github.com/tailwindlabs/tailwindcss-forms/blob/master/src/index.js#L8 */
function resolveColor(color, opacityVariableName) {
  return color.replace("<alpha-value>", `var(${opacityVariableName}, 1)`);
}

/**
 * `@tailwindcss/forms` does not support `input[type=range]`
 *
 * Found CSS generator on https://www.smashingmagazine.com/2021/12/create-custom-range-input-consistent-browsers/
 *
 * - https://range-input-css.netlify.app/
 * - https://github.com/adoxography/tailwind-scrollbar
 */
const inputRangePlugin = plugin(({ addBase, theme, matchUtilities }) => {
  /* Resets */
  {
    /** https://github.com/tailwindlabs/tailwindcss-forms/blob/master/src/index.js#L221 */
    const focusOutline = {
      outline: "2px solid transparent",
      "outline-offset": "2px",
      "--tw-ring-inset": "var(--tw-empty,/*!*/ /*!*/)",
      "--tw-ring-offset-width": "2px",
      "--tw-ring-offset-color": "#fff",
      "--tw-ring-color": resolveColor(
        theme("colors.blue.600", colors.blue[600]),
        "--tw-ring-opacity"
      ),
      "--tw-ring-offset-shadow": `var(--tw-ring-inset) 0 0 0 var(--tw-ring-offset-width) var(--tw-ring-offset-color)`,
      "--tw-ring-shadow": `var(--tw-ring-inset) 0 0 0 calc(2px + var(--tw-ring-offset-width)) var(--tw-ring-color)`,
      "box-shadow": `var(--tw-ring-offset-shadow), var(--tw-ring-shadow), var(--tw-shadow)`,
    };

    const commonResets = {
      'input[type="range"]': {
        "-webkit-appearance": "none",
        appearance: "none",
        background: "transparent",
        cursor: "pointer",
        // width: "25rem",
      },
      'input[type="range"]:focus': {
        outline: "none",
      },
    };
    const chromiumResets = {
      'input[type="range"]::-webkit-slider-runnable-track': {
        "background-color": "var(--range-track-color)",
        "border-radius": "0.5rem",
        height: "0.5rem",
      },
      'input[type="range"]::-webkit-slider-thumb': {
        "-webkit-appearance": "none", // Override default look
        appearance: "none",
        "margin-top": "-0.25rem", // Centers thumb on the track
        "background-color": "var(--range-thumb-color)",
        "border-radius": "0.5rem",
        height: "1rem",
        width: "1rem",
      },
      'input[type="range"]:focus::-webkit-slider-thumb': {
        ...focusOutline,
      },
    };
    const firefoxResets = {
      'input[type="range"]::-moz-range-track': {
        "background-color": "var(--range-track-color)",
        "border-radius": "0.5rem",
        height: "0.5rem",
      },
      'input[type="range"]::-moz-range-thumb': {
        "background-color": "var(--range-thumb-color)",
        border: "none", // Removes extra border that FF applies
        // "border-radius": "0.5rem",
        height: "1rem",
        width: "1rem",
      },
      'input[type="range"]:focus::-moz-range-thumb': {
        ...focusOutline,
      },
    };

    addBase({ ...commonResets, ...chromiumResets, ...firefoxResets });
  }

  /* Color utilities */
  {
    const themeColors = flattenColorPalette(theme("colors"));
    const colors = Object.fromEntries(
      Object.entries(themeColors).map(([k, v]) => [k, toColorValue(v)])
    );

    matchUtilities(
      {
        "range-thumb": (value) => ({
          "--range-thumb-color": `${toColorValue(value)} !important`,
        }),
      },
      { values: colors, type: "color" }
    );
    matchUtilities(
      {
        "range-track": (value) => ({
          "--range-track-color": `${toColorValue(value)} !important`,
        }),
      },
      { values: colors, type: "color" }
    );
  }

  /* Size utilities */
  {
    /* ... */
  }

  /* Border utilities */
  {
    /* ... */
  }

  /* Border color utilities */
  {
    /* ... */
  }

  /* Border radius utilities */
  {
    /* ... */
  }
});

export default inputRangePlugin;
