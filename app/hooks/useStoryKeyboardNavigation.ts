import { useEffect } from "react";

export const useStoryKeyboardNavigation = (
  activeStory: string | null,
  nextImage: () => void,
  prevImage: () => void,
  closeStory: () => void
) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeStory) return;
      if (e.key === "Escape") closeStory();
      else if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft") prevImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeStory, nextImage, prevImage, closeStory]);
};
