import { cn } from "@/lib/utils";
import { forwardRef } from "react";

function Hero({ style }, ref) {
  return (
    <h1
      style={style}
      ref={ref}
      className={cn(
        // "pinned",
        "absolute",
        "w-full",
        "top-1/2",
        "left-1/2",
        "-translate-x-1/2",
        "-translate-y-1/2",
        "text-center",
        "-tracking-[8px]",
        "leading-[90%]",
        "z-[50]"
      )}
    >
      Sculpted Zen <br />
      Playground
    </h1>
  );
}

export function Logo() {
  return (
    <div
      className={cn(
        "logo",
        "absolute",
        "top-0",
        "text-2xl",
        "z-[2]",
        "p-8",
        "-translate-x-1/2"
      )}
    >
      <a href="#">Flow Canvas</a>
    </div>
  );
}

export default forwardRef(Hero);
