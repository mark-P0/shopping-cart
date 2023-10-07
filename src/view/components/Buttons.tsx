import { ComponentProps, ReactNode } from "react";
import { C } from "../../utilities.ts";

const baseCls = C(
  "transition enabled:hover:invert",
  "bg-black text-white disabled:opacity-25"
);

export function TextButton(props: { text: string } & ComponentProps<"button">) {
  const { text, ...attrs } = props;
  const { className } = attrs;

  const cls = C(
    baseCls,
    "px-3 py-2 uppercase font-bold tracking-widest",
    className
  );
  return (
    <button type="button" {...attrs} className={cls}>
      {text}
    </button>
  );
}

export function IconButton(
  props: { icon: ReactNode } & ComponentProps<"button">
) {
  const { icon, ...attrs } = props;
  const { className } = attrs;

  const cls = C(baseCls, "aspect-square rounded-full p-2", className);
  return (
    <button type="button" {...props} className={cls}>
      {icon}
    </button>
  );
}
