"use client";

import { useRef, useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";

export default function ImageSequenceScroll({ scrollProgress }: { scrollProgress: any }) {
  const frameCount = 277;
  const folderPath = "/sequence";
  const prefix = "ezgif-frame-";
  const extension = "jpg";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Map 0 -> 1 progress to 1 -> 277 frames
  const currentIndex = useTransform(scrollProgress, [0, 1], [1, frameCount]);

  useEffect(() => {
    // Preload images
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      // Format number to 3 digits (e.g., 001, 042)
      const formattedNum = i.toString().padStart(3, "0");
      img.src = `${folderPath}/${prefix}${formattedNum}.${extension}`;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };
      imgArray.push(img);
    }
    setImages(imgArray);
  }, [frameCount, folderPath, prefix, extension]);

  useEffect(() => {
    if (!loaded || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Draw initial frame
    const img = images[0];
    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

    // Subscribe to scroll changes to draw corresponding frame
    const unsubscribe = currentIndex.on("change", (latest) => {
      const frameIndex = Math.min(Math.max(1, Math.floor(latest)), frameCount) - 1;
      const currentImage = images[frameIndex];
      if (currentImage && ctx) {
        // Clear and draw
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(currentImage, 0, 0, canvas.width, canvas.height);
      }
    });

    return () => unsubscribe();
  }, [loaded, images, currentIndex, frameCount]);

  // The background opacity scales down slightly at the very end when the footer appears
  const opacity = useTransform(scrollProgress, [0, 0.9, 1], [1, 1, 0.2]);

  return (
    <motion.div style={{ opacity }} className="fixed inset-0 w-full h-screen bg-black z-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        width={1920}
        height={1080}
        className="w-full h-full object-cover opacity-70 mix-blend-screen"
      />
      {/* Dynamic Overlay gradient to darken the background slightly so text is always readable */}
      <div className="absolute inset-0 bg-black/40" />
    </motion.div>
  );
}
