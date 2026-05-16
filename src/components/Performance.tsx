import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { useMediaQuery } from "react-responsive";

import { performanceImages, performanceImgPositions } from "../constants/index.js";

type PerformanceImagePosition = {
  id: string;
  left?: number;
  right?: number;
  bottom?: number;
  transform?: string;
};

const Performance = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  const sectionRef = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const sectionEl = sectionRef.current;
      if (!sectionEl) return;

      // Animate the paragraph when it enters the screen
      gsap.fromTo(
        ".content p",
        {
          opacity: 0,
          y: 10,
        },
        {
          opacity: 1,
          y: 0,
          ease: "power1.out",
          scrollTrigger: {
            trigger: ".content p",
            start: "top bottom",
            end: "top center",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      // Stop here on mobile/tablet
      if (isMobile) return;

      // Timeline for moving the images while scrolling
      const tl = gsap.timeline({
        defaults: {
          duration: 2,
          ease: "power1.inOut",
          overwrite: "auto",
        },
        scrollTrigger: {
          trigger: sectionEl,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
          invalidateOnRefresh: true,
        },
      });

      // Move each image to its final position
      (performanceImgPositions as PerformanceImagePosition[]).forEach((item) => {
        if (item.id === "p5") return;

        const selector = `.${item.id}`;

        const vars: gsap.TweenVars = {};

        if (typeof item.left === "number") {
          vars.left = `${item.left}%`;
        }

        if (typeof item.right === "number") {
          vars.right = `${item.right}%`;
        }

        if (typeof item.bottom === "number") {
          vars.bottom = `${item.bottom}%`;
        }

        if (item.transform) {
          vars.transform = item.transform;
        }

        tl.to(selector, vars, 0);
      });
    },
    {
      scope: sectionRef,
      dependencies: [isMobile],
    },
  );

  return (
    <section id="performance" ref={sectionRef}>
      <h2>Next-level graphics performance. Game on.</h2>

      <div className="wrapper">
        {performanceImages.map((item, index) => (
          <img key={index} src={item.src} className={item.id} alt={item.id} />
        ))}
      </div>

      <div className="content">
        <p>
          Run graphics-intensive workflows with a responsiveness that keeps up with your imagination. The M4 family of chips features a GPU with a second-generation hardware-accelerated ray tracing
          engine that renders images faster, so <span className="text-white">gaming feels more immersive and realistic than ever.</span> And Dynamic Caching optimizes fast on-chip memory to
          dramatically increase average GPU utilization — driving a huge performance boost for the most demanding pro apps and games.
        </p>
      </div>
    </section>
  );
};

export default Performance;
