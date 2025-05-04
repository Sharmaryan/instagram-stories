import { useState, useEffect, useRef, useCallback } from "react";
import { storiesMock } from "../components/StoriesSection/StoriesSection.mock";

export const peoples = Object.keys(storiesMock[0]);

export const useStoriesController = () => {
  const [activeStory, setActiveStory] = useState<string | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [previousStory, setPreviousStory] = useState<string | null>(null);
  const [storyDirection, setStoryDirection] = useState<"next" | "prev" | null>(null);
  const progressInterval = useRef<NodeJS.Timeout | null>(null);

  const stopProgress = () => {
    if (progressInterval.current) {
      clearInterval(progressInterval.current);
      progressInterval.current = null;
    }
  };

  const nextImage = useCallback(() => {
    if (!activeStory) return;

    const storyImages = storiesMock[0][activeStory].images;
    setCurrentImageIndex((prev) => {
      if (prev >= storyImages.length - 1) {
        const currentPersonIndex = peoples.indexOf(activeStory);
        if (currentPersonIndex < peoples.length - 1) {
          const nextPerson = peoples[currentPersonIndex + 1];
          setStoryDirection("next");
          setPreviousStory(activeStory);
          setActiveStory(nextPerson);
          return 0;
        } else {
          closeStory();
          return 0;
        }
      }
      return prev + 1;
    });
  }, [activeStory])

  const prevImage = useCallback(() => {
    if (!activeStory) return;

    setCurrentImageIndex((prev) => {
      if (prev <= 0) {
        const currentPersonIndex = peoples.indexOf(activeStory);
        if (currentPersonIndex > 0) {
          const prevPerson = peoples[currentPersonIndex - 1];
          setStoryDirection("prev");
          setPreviousStory(activeStory);
          setActiveStory(prevPerson);
          const prevPersonImages = storiesMock[0][prevPerson].images;
          return prevPersonImages.length - 1;
        }
        return 0;
      }
      return prev - 1;
    });
  }, [activeStory])


  const startProgress = () => {
    stopProgress();
    setProgress(0);

    const startTime = Date.now();
    const duration = 5000;

    progressInterval.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        nextImage();
      }
    }, 50);
  };

  const openStory = (person: string) => {
    setActiveStory(person);
    setCurrentImageIndex(0);
    setProgress(0);
    startProgress();
    document.body.style.overflow = "hidden";
  };

  const closeStory = () => {
    setActiveStory(null);
    stopProgress();
    document.body.style.overflow = "auto";
  };

  useEffect(() => {
    return () => stopProgress();
  }, []);

  return {
    activeStory,
    currentImageIndex,
    progress,
    startProgress,
    stopProgress,
    nextImage,
    prevImage,
    openStory,
    closeStory,
    storyDirection,
    previousStory,
  };
};
