"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger, ScrollToPlugin } from "gsap/all";
import { panelsData } from "./panels";
import { cn } from "@/lib/utils";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const StickyCards = () => {
  const [activeSlide, setActiveSlide] = useState(1);
  const [totalSlides, setTotalSlides] = useState(0);
  const [panelIndexes, setPanelIndexes] = useState({ next: 2, prev: 0 });

  const panelsRef = useRef(null);

  const updateUI = (indexNext, indexPrev) => {
    setPanelIndexes({ next: indexNext, prev: indexPrev });
  };

  const goToPanel = (thePanel) => {
    const panels = panelsRef.current;
    gsap.to(panels, {
      ease: "power4.inOut",
      duration: 0.55,
      scrollTo: {
        y: "#panel_" + thePanel,
        autoKill: false,
      },
    });
  };

  useEffect(() => {
    const panels = panelsRef.current;
    const sections = gsap.utils.toArray(".panel");
    setTotalSlides(sections.length);

    sections.forEach((eachPanel, index) => {
      const realIndex = index + 1;

      ScrollTrigger.create({
        scroller: panels,
        trigger: eachPanel,
        start: "top 50%",
        end: "top bottom",
        onLeave: () => {
          setActiveSlide(realIndex);
          const indexNext = realIndex + 1;
          const indexPrev = realIndex - 1;
          updateUI(indexNext, indexPrev);
        },
        onLeaveBack: () => {
          setActiveSlide(realIndex - 1);
          const indexNext = realIndex;
          const indexPrev = realIndex - 2;
          updateUI(indexNext, indexPrev);
        },
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  const panelDown = () => {
    if (panelIndexes.next <= totalSlides) {
      goToPanel(panelIndexes.next);
    }
  };

  const panelUp = () => {
    if (panelIndexes.prev >= 1) {
      goToPanel(panelIndexes.prev);
    }
  };

  return (
    <div>
      <div
        className={cn(
          "controls",
          "fixed",
          "bottom-10",
          "right-40",
          "z-[2]",
          "text-3xl",
          "flex",
          "flex-wrap",
          "disabled:opacity-50"
        )}
      >
        <a
          onClick={panelUp}
          className={cn(
            "up",
            "block",
            "size-9",
            "leading-9",
            "rounded-[36px]",
            "text-center",
            "bg-[rgba(0,0,0,0.0)]",
            "-mr-2",
            "cursor-pointer",
            { disabled: panelIndexes.prev < 1 }
          )}
        >
          &uarr;
        </a>
        <a
          className={cn(
            "down",
            "block",
            "size-9",
            "leading-9",
            "rounded-[36px]",
            "text-center",
            "bg-[rgba(0,0,0,0.0)]",
            "cursor-pointer",
            { disabled: panelIndexes.next > totalSlides }
          )}
          onClick={panelDown}
        >
          &darr;
        </a>
      </div>

      <span
        className={cn(
          "note",
          "fixed",
          "bottom-10",
          "right-[calc(20px_+_120px)]",
          "z-[2]"
        )}
      >
        <span className="activeSlide">{activeSlide}</span> /
        <span className="slideTotal">{totalSlides}</span>
      </span>

      <div
        style={{ scrollSnapType: "y mandatory" }}
        className={cn("panels overflow-scroll h-screen w-full")}
        id="panelContainer"
        ref={panelsRef}
      >
        {panelsData.map((panel, i) => (
          <Panel
            key={i}
            className={panel.class}
            index={i}
            id={`panel_${i + 1}`}
            src={`/images/${panel.src}`}
            title={panel.title}
          />
        ))}
      </div>
    </div>
  );
};

const imgProps = {
  alt: "",
  style: { objectPosition: "center center" },
  className: cn(
    "absolute",
    "top-0",
    "left-0",
    "w-full",
    "h-screen",
    "center",
    "z-[1]",
    // "object-fit"
  ),
  width: 100,
  height: 100,
  priority: true,
};

function Panel({ className, title, id, src, index }) {
  return (
    <div
      className={cn(
        "panel",
        "shadow-xl",
        "shadow-red-500",
        "w-full",
        "h-screen",
        "bg-[rgba(0,0,0,0.25)]",
        "flex",
        "justify-center",
        "bg-[#1d1e22]",
        className
      )}
      id={id}
    >
      <div className={cn("clip", "sticky", "h-0", "w-full", "top-0", "mb-0")}>
        <h2
          className={cn(
            "absolute",
            "top-0",
            "m-0",
            "p-[calc(100vh_-_64px) 50px 0]",
            "z-[3]",
            "left-0"
          )}
        >
          <a
            className={cn(
              "text-white",
              "cursor-pointer",
              "transition-all",
              "duration-[2500]",
              "ease-linear"
            )}
          >
            {title}
          </a>
        </h2>
        <span
          className={cn(
            "tint",
            "block",
            "absolute",
            "top-0",
            "left-0",
            "bg-[rgba(0,0,0,0.1)]",
            "w-screen",
            "h-screen",
            "z-[2]",
            "pointer-events-none"
          )}
        />

        {index === 0 ? (
          <div
            className={cn(
              "video_clip",
              "absolute",
              "top-0",
              "left-0",
              "w-full",
              "h-screen",
              "z-[1]",
              "pointer-events-none",
              "overflow-hidden"
            )}
          >
            <iframe
              className={cn(
                "z-[1]",
                "border-0",
                "w-screen",
                "h-[56.25vw]",
                "min-h-full",
                "min-w-[177.77vh]",
                "absolute",
                "top-1/2",
                "left-1/2",
                "-translate-x-1/2",
                "-translate-y-1/2"
              )}
              src={src}
              allow="autoplay;"
            />
          </div>
        ) : (
          <Image {...imgProps} src={src} />
        )}
      </div>
    </div>
  );
}

export default StickyCards;
