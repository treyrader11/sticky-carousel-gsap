"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import Card from "@/components/Card";
import Hero, { Logo } from "@/components/Hero";
import Footer from "@/components/Footer";
import Section from "@/components/Section";
import { data } from "@/lib/data";
import { cn } from "@/lib/utils";

export default function Cards() {
  return (
    <>
      <Logo />
      <Section className={cn("hero pinned")}>
        <Hero />
      </Section>

      {data.map((item, i) => {
        const isLastItem = i === data.length - 1;
        return (
          <Section
            className={cn("card", isLastItem ? "scroll" : "pinned")}
            key={i}
          >
            <Card {...item} />
          </Section>
        );
      })}

      <Section
        className={cn(
          "footer",
          "w-full",
          "h-[50vh]",
          "flex",
          "items-center",
          "justify-center"
        )}
      >
        <Footer />
      </Section>
    </>
  );
}
