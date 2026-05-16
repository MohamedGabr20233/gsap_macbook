import { PresentationControls } from "@react-three/drei";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import * as THREE from "three";

import MacbookModel16 from "../models/Macbook-16";
import MacbookModel14 from "../models/Macbook-14";

interface PropType {
  scale: number;
  isMobile: boolean;
}

const ANIMATION_DURATION = 1;
const OFFSET_DISTANCE = 5;

const setModelOpacity = (group: THREE.Group | null, opacity: number, animate = true) => {
  if (!group) return;

  group.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      child.material.transparent = true;

      if (animate) {
        gsap.to(child.material, {
          opacity,
          duration: ANIMATION_DURATION,
        });
      } else {
        child.material.opacity = opacity;
      }
    }
  });
};
const moveModel = (group: THREE.Group | null, x: number, animate = true) => {
  if (!group) return;

  if (animate) {
    gsap.to(group.position, {
      x,
      duration: ANIMATION_DURATION,
    });
  } else {
    group.position.x = x;
  }
};

const ModelSwitcher = ({ scale, isMobile }: PropType) => {
  const smallMacbookRef = useRef<THREE.Group | null>(null);
  const largeMacbookRef = useRef<THREE.Group | null>(null);
  const SCALE_LARGE_DESKTOP = 0.08;
  const SCALE_LARGE_MOBILE = 0.05;
  const isFirstRun = useRef(true);

  const showLargeMacbook = scale === SCALE_LARGE_DESKTOP || scale === SCALE_LARGE_MOBILE;

  useGSAP(() => {
    const animate = !isFirstRun.current;

    if (showLargeMacbook) {
      moveModel(smallMacbookRef.current, -OFFSET_DISTANCE, animate);
      moveModel(largeMacbookRef.current, 0, animate);

      setModelOpacity(smallMacbookRef.current, 0, animate);
      setModelOpacity(largeMacbookRef.current, 1, animate);
    } else {
      moveModel(smallMacbookRef.current, 0, animate);
      moveModel(largeMacbookRef.current, OFFSET_DISTANCE, animate);

      setModelOpacity(smallMacbookRef.current, 1, animate);
      setModelOpacity(largeMacbookRef.current, 0, animate);
    }

    isFirstRun.current = false;
  }, [scale]);

  const controlConfig = {
    snap: true,
    speed: 2,
    zoom: 1,
    polar: [-Math.PI, Math.PI] as [number, number],
    config: {
      mass: 1,
      tension: 0,
      friction: 236,
    },
  };

  return (
    <>
      <PresentationControls {...controlConfig}>
        <group ref={smallMacbookRef}>
          <MacbookModel14 scale={isMobile ? 0.03 : 0.06} />
        </group>
      </PresentationControls>

      <PresentationControls {...controlConfig}>
        <group ref={largeMacbookRef}>
          <MacbookModel16 scale={isMobile ? 0.05 : 0.08} />
        </group>
      </PresentationControls>
    </>
  );
};

export default ModelSwitcher;
