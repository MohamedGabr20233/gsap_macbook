import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import StudioLights from "./three/StudioLights";
import { features } from "../constants";
import clsx from "clsx";
import { Suspense, useRef } from "react";
import { Html } from "@react-three/drei";
import MacbookModel from "./models/Macbook";
import { useMediaQuery } from "react-responsive";
import useMacBookStore from "../store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

// to create modal 3d u always will need a group
const ModelScroll = () => {
  const groupRef = useRef<THREE.Group>(null!);
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const { setTexture } = useMacBookStore();
  const currentTexture = useRef("/videos/feature-1.mp4");

  const changeTexture = (nextTexture: string) => {
    if (currentTexture.current === nextTexture) return;

    currentTexture.current = nextTexture;
    setTexture(nextTexture);
  };

  // now for the GSAP magic

  useGSAP(() => {
    // 3D MODEL ROTATION ANIMATION
    // first timeline
    const modelTimeline = gsap.timeline({
      scrollTrigger: {
        // as soon as the canvas get into the view
        trigger: "#f-canvas",
        start: "top  top",
        end: "+=2000",
        scrub: 1,
        pin: true,
      },
    });

    // SYNC THE FEATURE CONTENT
    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#f-canvas",
        start: "top  center",
        end: "+=2000",
        scrub: 1,
      },
    });

    // 3D SPIN
    if (groupRef.current) {
      // if the groupRef is available, we can animate the rotation of the model
      modelTimeline.to(groupRef.current.rotation, {
        y: Math.PI * 2, // rotate 360 degrees
        ease: "power1.inOut",
      });
    }

    // CONTENT & TEXTURE SYNC
    // call function to call an additional function
    timeline
      .call(() => changeTexture("/videos/feature-1.mp4"))
      .to(".box1", { opacity: 1, y: 0 })

      .call(() => changeTexture("/videos/feature-2.mp4"))
      .to(".box2", { opacity: 1, y: 0 })

      .call(() => changeTexture("/videos/feature-3.mp4"))
      .to(".box3", { opacity: 1, y: 0 })

      .call(() => changeTexture("/videos/feature-4.mp4"))
      .to(".box4", { opacity: 1, y: 0 })

      .call(() => changeTexture("/videos/feature-5.mp4"))
      .to(".box5", { opacity: 1, y: 10 });
  }, []);

  return (
    <group ref={groupRef}>
      {/*   display loading using suspense*/}
      <Suspense
        fallback={
          <Html>
            <h1 className="text-white text-3xl uppercase"> Loading... </h1>
          </Html>
        }
      >
        <MacbookModel scale={isMobile ? 0.08 : 0.1} position={[0, -1, 0]} />
      </Suspense>
    </group>
  );
};

const Features = () => {
  return (
    <section id="features" className="">
      <h2>See it all in a new light.</h2>
      <Canvas
        id="f-canvas"
        camera={{
          position: [0, 2, 4],
        }}
      >
        <StudioLights />
        <ambientLight intensity={0.5} />
        {/* 3D MODEL */}

        <ModelScroll />
      </Canvas>
      <div className="absolute inset-0">
        {features.map((feature, index) => (
          <div key={index} className={clsx("box", `box${index + 1}`, feature.styles)}>
            <img src={feature.icon} alt={feature.highlight} />
            <p>
              <span className="text-white"> {feature.highlight}</span>
              {feature.text}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
