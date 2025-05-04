import { useState, useRef } from "react";

export const useTouchNavigation = (
  nextImage: () => void,
  prevImage: () => void,
  startProgress: () => void,
  stopProgress: () => void
) => {
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchEndX, setTouchEndX] = useState(0);
  const lastTapRef = useRef(0);
  const swipeDetectedRef = useRef(false);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
    stopProgress();
    swipeDetectedRef.current = false;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEndX(e.touches[0].clientX);
    swipeDetectedRef.current = true;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const delta = touchStartX - touchEndX;

    if (swipeDetectedRef.current && Math.abs(delta) > 50) {
      if (delta > 0) nextImage();
      else prevImage();
      startProgress();
    } else {
      const now = Date.now();
      if (now - lastTapRef.current < 300) return;
      lastTapRef.current = now;

      const touch = e.changedTouches[0];
      const screenWidth = window.innerWidth;
      if (touch.clientX < screenWidth / 2) {
        prevImage();
      } else {
        nextImage();
      }
      startProgress();
    }
  };

  return { handleTouchStart, handleTouchMove, handleTouchEnd };
};
