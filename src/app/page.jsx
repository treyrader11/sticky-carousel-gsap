"use client";

import { useRef } from "react";
import StickyCards from "@/components/StickyCards ";

export default function Home() {
  const container = useRef();

  return (
    <main ref={container}>
      <StickyCards />
    </main>
  );
}
