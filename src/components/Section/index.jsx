import { cn } from "@/lib/utils";
import { forwardRef } from "react";

function Section({ children, className }, ref) {
  return (
    <section ref={ref} className={cn("w-screen h-screen", className)}>
      {children}
    </section>
  );
}

export default forwardRef(Section);
