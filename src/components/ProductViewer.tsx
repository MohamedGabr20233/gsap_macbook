import useMacBookStore from "../store"
import {clsx} from 'clsx';
import { Canvas } from '@react-three/fiber';
import { Box } from "@react-three/drei";

 const ProductViewer = () => {
    const {color , scale , setColor , setScale} = useMacBookStore()

  return (
    <section id="product-viewer">
        <h2>Take a closer look.</h2>

        <div className="controls">
            <p className="info">MacBookPro {scale === 0.06 ? "14\"" : "16\""} in {color === "#adb5bd" ? "Silver" : "Space Black"}</p>
            <div className="flex-center gap-5 mt-5">
                <div className="color-control">
                    <div onClick={()=>setColor('#adb5bd')} 
                    className={clsx("bg-neutral-300" , color ==="#adb5bd" && "active")}/>
                    <div onClick={()=>setColor('#2e2c2e')}
                     className={clsx("bg-neutral-900" , color ==="#2e2c2e" && "active")}/>
                </div>

                <div className="size-control">
                    <div onClick={()=>{setScale(0.06)}}
                        className={clsx(scale === 0.06 ?'bg-white text-black' : 'bg-transparent text-white') }
                        >
                            <p>14"</p>
                            </div>
                     <div onClick={()=>{setScale(0.08)}}
                        className={clsx(scale === 0.08 ?'bg-white text-black' : 'bg-transparent text-white') }
                        >
                            <p>16"</p>
                            </div>
                </div>
            </div>
        </div>

        <p className="text-white text-4xl">Render Canvas </p>

    <Canvas id="canvas" 

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
    fov: 75,

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
         {/*
         //* <Box position={[X,Y,Z (close or far] }  
         //* scale={scale*10} >
         //* material-color={color} *fill color*
        
         /> */}

        <Box position={[0,0,0]} scale={scale*10} material-color={color}></Box>
    </Canvas>
       
    </section>
  )
}

export default ProductViewer