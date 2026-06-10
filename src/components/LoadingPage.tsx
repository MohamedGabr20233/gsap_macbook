import { useState, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import { preloadAllVideos } from "../utils/videoTextureCache";

const modelsToLoad = ["/models/macbook.glb", "/models/Macbook-16.glb", "/models/Macbook-14.glb"];

const LoadingPage = ({ children }: { children: React.ReactNode }) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadAssets = async () => {
      // Preload all 3D models using Drei / React Three Fiber cache
      modelsToLoad.forEach((model) => {
        useGLTF.preload(model);
      });

      // Preload all videos into the permanent cache
      // Unlike the old approach, these videos stay in memory
      // and the Macbook model reuses them instead of creating fresh ones
      await preloadAllVideos();

      // Small delay to make the loader feel smoother
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    };

    loadAssets();
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-white text-3xl uppercase">Loading...</h1>

          <div className="w-40 h-1 bg-dark-200 rounded-full overflow-hidden">
            <div className="h-full w-full bg-white animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default LoadingPage;
