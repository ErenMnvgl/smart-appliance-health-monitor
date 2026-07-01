"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { useTransform, motion } from "framer-motion";

export default function ImageSequenceScroll({ scrollProgress }: { scrollProgress: any }) {
  const frameCount = 277;
  const folderPath = "/sequence";
  const prefix = "ezgif-frame-";
  const extension = "jpg";

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const lastDrawnFrame = useRef<number>(-1);
  const rafId = useRef<number>(0);
  const pendingFrame = useRef<number>(0);
  const [loaded, setLoaded] = useState(false);

  const currentIndex = useTransform(scrollProgress, [0, 1], [1, frameCount]);

  const drawCover = useCallback((ctx: CanvasRenderingContext2D, img: HTMLImageElement, cw: number, ch: number) => {
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const imgRatio = iw / ih;
    const canvasRatio = cw / ch;

    let sx = 0, sy = 0, sw = iw, sh = ih;

    if (imgRatio > canvasRatio) {
      sw = ih * canvasRatio;
      sx = (iw - sw) / 2;
    } else {
      sh = iw / canvasRatio;
      sy = (ih - sh) / 2;
    }

    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, cw, ch);
  }, []);

  useEffect(() => {
    let loadedCount = 0;
    const imgArray: HTMLImageElement[] = [];

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      const formattedNum = i.toString().padStart(3, "0");
      img.src = `${folderPath}/${prefix}${formattedNum}.${extension}`;
      img.decoding = "async";
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };
      imgArray.push(img);
    }
    imagesRef.current = imgArray;
  }, [frameCount, folderPath, prefix, extension]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      lastDrawnFrame.current = -1;
    };

    resize();
    window.addEventListener("resize", resize);
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    if (!loaded) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const firstImg = imagesRef.current[0];
    if (firstImg) {
      drawCover(ctx, firstImg, canvas.width, canvas.height);
      lastDrawnFrame.current = 0;
    }

    const drawFrame = () => {
      const frameIndex = pendingFrame.current;
      if (frameIndex === lastDrawnFrame.current) {
        rafId.current = 0;
        return;
      }

      const img = imagesRef.current[frameIndex];
      if (img && img.complete) {
        drawCover(ctx, img, canvas.width, canvas.height);
        lastDrawnFrame.current = frameIndex;
      }
      rafId.current = 0;
    };

    const unsubscribe = currentIndex.on("change", (latest: number) => {
      pendingFrame.current = Math.min(Math.max(1, Math.floor(latest)), frameCount) - 1;
      if (!rafId.current) {
        rafId.current = requestAnimationFrame(drawFrame);
      }
    });

    return () => {
      unsubscribe();
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [loaded, currentIndex, frameCount, drawCover]);

  return (
    <div className="fixed inset-0 w-full h-screen bg-black z-0 pointer-events-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-70 mix-blend-screen"
        style={{ willChange: "transform", imageRendering: "auto" }}
      />
      <div className="absolute inset-0 bg-black/40" />
    </div>
  );
}
