import Image from "next/image";
import { StoryProps } from "./Story.types";
import { storiesMock } from "../StoriesSection/StoriesSection.mock";
import { ProgressBar } from "../ProgressBar/ProgressBar";
import classNames from "classnames";
import ArrowButton from "../ArrowButton/ArrowButton";

export const Story = ({
  handleStoryClick,
  handleTouchStart,
  handleTouchMove,
  handleTouchEnd,
  activeStory,
  currentImageIndex,
  progress,
  closeStory,
  showLeftNavArrow,
  showRightNavArrow,
  prevImage,
  nextImage,
  storyDirection,
}: StoryProps & { storyDirection: "next" | "prev" | null }) => {
  const noMobileDevice =
    !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    );
  return (
    activeStory && (
      <div
        className={classNames(
          "fixed inset-0 bg-black z-50 flex flex-col max-w-[375px]",
          "transition-transform duration-300 ease-in-out",
          storyDirection ? "animate-zoom-in" : ""
        )}
        onClick={(e) => {
          if (noMobileDevice) handleStoryClick(e);
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        tabIndex={0}
        role="button"
        key={activeStory}
        data-testid="story-viewer"
      >
        <ProgressBar
          activeStory={activeStory}
          currentImageIndex={currentImageIndex}
          progress={progress}
        />

        <button
          className="absolute top-4 right-4 bg-white rounded-full py-1 px-2.5 text-blue-300 text-2xl z-10 cursor-pointer"
          onClick={(e) => {
            e.stopPropagation();
            if (noMobileDevice) {
              closeStory();
            }
          }}
          onTouchStart={(e) => {
            e.stopPropagation();
            closeStory();
          }}
          data-testid='story-close-button'
        >
          ✕
        </button>
        {showLeftNavArrow && (
          <ArrowButton
            className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10 text-white text-2xl bg-black bg-opacity-50 rounded-full p-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (noMobileDevice) prevImage();
            }}
            variant="carousel"
            data-testid="story-prev-arrow"
          />
        )}

        {showRightNavArrow && (
          <ArrowButton
            direction="right"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 z-10 text-white text-2xl bg-black bg-opacity-50 rounded-full p-2 cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              if (noMobileDevice) nextImage();
            }}
            variant="carousel"
            data-testid="story-next-arrow"
          />
        )}

        <div className="flex-1 relative overflow-hidden">
          <div key={activeStory} className="absolute inset-0">
            <Image
              src={storiesMock[0][activeStory].images[currentImageIndex].src}
              alt={storiesMock[0][activeStory].images[currentImageIndex].alt}
              layout="fill"
              objectFit="contain"
              className="select-none"
              draggable={false}
              priority
              data-testid="story-image"
            />
          </div>
        </div>

        <div className="absolute top-4 left-4 flex items-center z-10">
          <div
            className="relative h-8 w-8 rounded-full mr-2"
            data-testid="story-profile-image-container"
          >
            <Image
              src={storiesMock[0][activeStory].profile.src}
              alt={storiesMock[0][activeStory].profile.alt}
              data-testid="story-profile-image"
              className="object-cover rounded-full"
              priority
              fill
            />
          </div>

          <span
            className="text-white font-semibold capitalize"
            data-testid="story-profile-name"
          >
            {activeStory.toLowerCase()}
          </span>
        </div>
      </div>
    )
  );
};
