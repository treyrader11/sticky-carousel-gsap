import { cn } from "@/lib/utils";
import React, { forwardRef } from "react";

const Box = forwardRef((_, ref) => {
  return (
    <div ref={ref} className={cn("size-[100px]", "rounded bg-emerald-400")} />
  );
});

const Circle = forwardRef((_, ref) => {
  return (
    <div ref={ref} className={cn("size-[100px]", "rounded-full bg-pink-400")} />
  );
});

export { Box, Circle };
