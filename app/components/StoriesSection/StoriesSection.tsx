"use client";

import { useRef, useEffect, act } from "react";
import { storiesMock } from "./StoriesSection.mock";
import { Stories } from "../Stories/Stories";
import { Direction } from "../Stories/Stories.types";
import { useStoriesController } from "../../hooks/useStoriesController";
import { useScrollArrows } from "../../hooks/useScrollArrows";
import { useTouchNavigation } from "../../hooks/useTouchNavigation";
import { useStoryKeyboardNavigation } from "../../hooks/useStoryKeyboardNavigation";
import dynamic from "next/dynamic";
const Story = dynamic(() => import("../Story/Story").then((mod) => mod.Story), {
  ssr: false,
  loading: () => <div className="fixed inset-0 bg-black" />,
});

export const peoples = Object.keys(storiesMock[0]);

export const StoriesSection = () => {
  const {
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
  } = useStoriesController();

  const storiesContainerRef = useRef<HTMLDivElement>(null);

  const { showLeftArrow, showRightArrow } =
    useScrollArrows(storiesContainerRef);

  const { handleTouchStart, handleTouchMove, handleTouchEnd } =
    useTouchNavigation(nextImage, prevImage, startProgress, stopProgress);

  useStoryKeyboardNavigation(activeStory, nextImage, prevImage, closeStory);

  useEffect(() => {
    if (activeStory) startProgress();
    return stopProgress;
  }, [activeStory, currentImageIndex]);

  const scroll = (direction: Direction) => {
    if (!storiesContainerRef.current) return;
    const scrollAmount = direction === Direction.LEFT ? -150 : 150;
    storiesContainerRef.current.scrollBy({
      left: scrollAmount,
      behavior: "smooth",
    });
  };

  const handleStoryClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!storiesContainerRef.current) return;
    const rect = storiesContainerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    if (clickX < width / 3) prevImage();
    else if (clickX > (2 * width) / 3) nextImage();
  };

  const showLeftNavArrow =
    activeStory && (currentImageIndex > 0 || peoples.indexOf(activeStory) > 0);

  const showRightNavArrow =
    activeStory &&
    (currentImageIndex < storiesMock[0][activeStory].images.length - 1 ||
      peoples.indexOf(activeStory) < peoples.length - 1);

  return (
    <div className="relative">
      <h1 className="pl-5 font-bold text-3xl text-blue-400">Storygram</h1>

      <Stories
        showLeftArrow={showLeftArrow}
        showRightArrow={showRightArrow}
        storiesContainerRef={storiesContainerRef}
        openStory={openStory}
        scroll={scroll}
      />

      {activeStory && (
        <Story
          handleStoryClick={handleStoryClick}
          handleTouchStart={handleTouchStart}
          handleTouchMove={handleTouchMove}
          handleTouchEnd={handleTouchEnd}
          activeStory={activeStory}
          currentImageIndex={currentImageIndex}
          progress={progress}
          closeStory={closeStory}
          showLeftNavArrow={showLeftNavArrow}
          showRightNavArrow={showRightNavArrow}
          prevImage={prevImage}
          nextImage={nextImage}
          storyDirection={storyDirection}
        />
      )}
    </div>
  );
};
