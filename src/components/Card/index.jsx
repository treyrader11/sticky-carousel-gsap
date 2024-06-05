import { cn } from "@/lib/utils";
import Image from "next/image";
import { forwardRef } from "react";

const imageProps = {
  alt: "card image",
  fill: true,
  sizes: {},
  priority: true,
};

function Card({ className, src }, ref) {
  return (
    <div
      // ref={ref}
      style={{ transform: "translate3d(-50%, -50%, 0)" }}
      className={cn(
        "absolute",
        "top-1/2",
        "left-1/2",
        "w-[1000px]",
        "h-[700px]",
        "img",
        
        "transform",
        className
      )}
    >
      <Image
        className={cn("size-full object-cover")}
        src={`/images/${src}`}
        {...imageProps}
      />
    </div>
  );
}

export default forwardRef(Card);
