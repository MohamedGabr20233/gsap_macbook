import * as THREE from "three";

// This Map is a "storage room" for videos
// Key = video file path (like "/videos/feature-1.mp4")
// Value = a Three.js VideoTexture (which wraps a <video> element)
const cache = new Map<string, THREE.VideoTexture>();

// Pre-loads ONE video, returns a Promise so we know when it's ready
function preloadOne(src: string): Promise<void> {
  return new Promise((resolve) => {
    // If we already have this video in cache, skip
    if (cache.has(src)) {
      resolve();
      return;
    }

    // Create a hidden <video> element in memory (not added to the page)
    const video = document.createElement("video");
    video.src = src;
    video.muted = true;
    video.playsInline = true;
    video.preload = "auto";
    video.loop = true;

    // Wrap the <video> element in a Three.js VideoTexture so it can be
    // used as a material on a 3D model's screen
    const texture = new THREE.VideoTexture(video);

    // Store in cache so other components can find it later
    cache.set(src, texture);

    let settled = false;
    const finish = () => {
      if (settled) return;
      settled = true;
      window.clearTimeout(timeoutId);
      video.play().catch(() => {});
      resolve();
    };

    const timeoutId = window.setTimeout(finish, 5000);

    // When the video has loaded enough to play, start playing it
    // This way, by the time the user scrolls to Features, all videos
    // are already playing in the background
    video.onloadeddata = finish;
    video.oncanplaythrough = finish;

    // If the video fails (e.g. file not found), don't block the app
    video.onerror = finish;

    video.load();
  });
}

// All video paths used in the app
const allPaths = [
  "/videos/hero.mp4",
  "/videos/feature-1.mp4",
  "/videos/feature-2.mp4",
  "/videos/feature-3.mp4",
  "/videos/feature-4.mp4",
  "/videos/feature-5.mp4",
];

// Pre-loads ALL videos and waits for them to be ready
export async function preloadAllVideos(): Promise<void> {
  await Promise.all(allPaths.map(preloadOne));
}

// Retrieves a cached VideoTexture by its path
// Returns undefined if the video hasn't been preloaded yet
export function getVideoTexture(src: string): THREE.VideoTexture | undefined {
  return cache.get(src);
}
