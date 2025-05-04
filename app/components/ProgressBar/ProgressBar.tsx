import { storiesMock } from "../StoriesSection/StoriesSection.mock";
import { ProgressBarProps } from "./ProgressBar.types";

export const ProgressBar = ({
  activeStory,
  currentImageIndex,
  progress,
}: ProgressBarProps) => {
  return (
    <>
      {activeStory && (
        <div className="flex gap-1 p-2 px-3">
          {storiesMock[0][activeStory].images.map((_, index) => (
            <div key={index} className="h-1 flex-1 bg-gray-600 rounded-full" data-testid="story-progress-bar">
              <div
                className={`h-full rounded-full ${
                  index < currentImageIndex
                    ? "bg-white"
                    : index === currentImageIndex
                    ? "bg-white"
                    : "bg-gray-600"
                }`}
                style={{
                  width:
                    index === currentImageIndex
                      ? `${progress}%`
                      : index < currentImageIndex
                      ? "100%"
                      : "0%",
                  transition:
                    index === currentImageIndex ? "width 0.1s linear" : "none",
                }}
              />
            </div>
          ))}
        </div>
      )}

      <style jsx>{`
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </>
  );
};
