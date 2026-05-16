import useMacBookStore from "../store";
import { clsx } from "clsx";
import { Canvas } from "@react-three/fiber";
// import { Box, OrbitControls } from "@react-three/drei";
// import { OrbitControls } from "@react-three/drei";
// import MacbookModel16 from "./models/Macbook-16";
import StudioLights from "./three/StudioLights";
import ModelSwitcher from "./three/ModelSwitcher";
import { useMediaQuery } from "react-responsive";

const ProductViewer = () => {
  const { color, scale, setColor, setScale } = useMacBookStore();
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <section id="product-viewer">
      <h2>Take a closer look.</h2>

      <div className="controls">
        <p className="info">
          MacBookPro {scale === 0.06 ? '14"' : '16"'} in {color === "#adb5bd" ? "Silver" : "Space Black"}
        </p>
        <div className="flex-center gap-5 mt-5">
          <div className="color-control">
            <div onClick={() => setColor("#adb5bd")} className={clsx("bg-neutral-300", color === "#adb5bd" && "active")} />
            <div onClick={() => setColor("#2e2c2e")} className={clsx("bg-neutral-900", color === "#2e2c2e" && "active")} />
          </div>

          <div className="size-control">
            <div
              onClick={() => {
                setScale(0.06);
              }}
              className={clsx(scale === 0.06 ? "bg-white text-black" : "bg-transparent text-white")}
            >
              <p>14"</p>
            </div>
            <div
              onClick={() => {
                setScale(0.08);
              }}
              className={clsx(scale === 0.08 ? "bg-white text-black" : "bg-transparent text-white")}
            >
              <p>16"</p>
            </div>
          </div>
        </div>
      </div>

      <p className="text-white text-4xl">Render Canvas </p>

      <Canvas
        id="canvas"
        camera={{
          // position: [x, y, z]
          // x => left(-) / right(+)
          // y => down(-) / up(+)
          // z => closer(smaller) / farther(larger)
          // example: [0, 2, 5] = centered, slightly above, pulled back
          position: [0, 2, 5],

          // fov = Field Of View (camera zoom / how wide the scene looks)
          // smaller value = zoomed in (telephoto feel)
          // larger value = zoomed out (wide-angle feel)
          // common values: 45 - 75
          // default is usually 75
          fov: 50,

          // near = closest distance the camera can see
          // objects closer than this get clipped/disappear
          // keep this as small as possible but not TOO tiny
          // too small can hurt render precision
          near: 0.1,

          // far = maximum visible distance
          // objects farther than this disappear
          // larger far = bigger visible world but less depth precision
          far: 1000,
        }}
      >
        {/* {/*
        1-
        // ? to interact with the model we can use OrbitControls from drei
        *
        <OrbitControls
          //* OrbitControls allows you to move the element inside the canvas element through the mouse

          // disable zooming
          enableZoom={false}
          // make the element rotate in smoother way
          // enableDamping={false} //*=> default is true

          // make the element enable to move across the canvas
          enablePan={false}
          // make the element enable to rotate
          // enableRotate={false} //*=> default is true

          // make the element rotate in reverse direction to the mouse movement
          // reverseOrbit

          // make the element rotate automatically without mouse movement in horizontal direction
          // autoRotate
        /> */}

        {/*
        2-
        // ? we need to have light to observe the element 
        //! that is not enough
         <ambientLight
          // the light color
          color={color}
          // intensity of the light
          intensity={0.5}
        /> */}

        {/*
          3-
          // ? we need to create custom light to make the element look more realistic and have shadows
          */}
        <StudioLights />

        {/* <MacbookModel16 scale={0.06} position={[0, 0, 0]} /> */}

        <ModelSwitcher scale={isMobile ? scale - 0.03 : scale} isMobile={isMobile} />
      </Canvas>
    </section>
  );
};

export default ProductViewer;

/* //* Notes:
- Canvas is the main component that sets up the 3D rendering context. It creates a WebGL canvas where you can render 3D objects and scenes.
- To start rendering our 3D Models we will need to use external package called //todo gltfjsx 
- 1) move into the models director cd /public/models
- 2) run the command //* npx gltfjsx macbook-14.glb -T

*/
