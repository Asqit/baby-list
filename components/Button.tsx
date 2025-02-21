import { JSX } from "preact";
import { IS_BROWSER } from "$fresh/runtime.ts";
import { clsx } from "@nick/clsx";

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={clsx(
        "rounded-lg px-4 py-2 hover:contrast-75 transition-colors",
        props.class,
        props.className,
      )}
      {...props}
      disabled={!IS_BROWSER || props.disabled}
    />
  );
}
