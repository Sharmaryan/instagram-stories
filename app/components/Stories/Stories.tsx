import React, { useState } from "react";
import { peoples } from "../StoriesSection/StoriesSection";
import { storiesMock } from "../StoriesSection/StoriesSection.mock";
import Image from "next/image";
import { Direction, StoriesProps } from "./Stories.types";
import ArrowButton from "../ArrowButton/ArrowButton";
import classNames from "classnames";

export const Stories = ({
  showLeftArrow,
  showRightArrow,
  storiesContainerRef,
  openStory,
  scroll,
}: StoriesProps) => {
  const [loadingStory, setLoadingStory] = useState<string | null>(null);
  const btnStyles =
    "absolute top-1/2 transform -translate-y-1/2 z-10 bg-white rounded-full p-2 shadow-md";

  const handleStoryClick = (person: string) => {
    setLoadingStory(person);
    setTimeout(() => {
      openStory(person);
      setLoadingStory(null);
    }, 500);
  };

  return (
    <div className="relative">
      {showLeftArrow && (
        <ArrowButton
          onClick={() => scroll(Direction.LEFT)}
          className={classNames(btnStyles, "left-0")}
          data-testid="left-arrow"
        />
      )}

      <div
        ref={storiesContainerRef}
        className="flex gap-4 overflow-x-auto py-2 px-4 hide-scrollbar"
        data-testid="stories-container" 
      >
        {peoples.map((person) => {
          const profile = storiesMock[0][person].profile;
          const isLoading = loadingStory === person;

          return (
            <button
              key={person}
              data-testid={`story-button-${person}`}
              className="flex flex-col items-center flex-shrink-0 cursor-pointer"
              onClick={() => handleStoryClick(person)}
              disabled={isLoading}
            >
              <div className="h-16 w-16 rounded-full p-0.5 bg-gradient-to-tr from-yellow-400 to-blue-400">
                <div className="p-0.5 relative h-14 w-14 top-0.5 left-0.5">
                  {isLoading ? (
                    <div
                      className="h-full w-full rounded-full bg-white flex items-center justify-center"
                      data-testid="story-spinner"
                    >
                      <div className="w-6 h-6 border-2 border-t-transparent border-blue-400 rounded-full animate-spin" />
                    </div>
                  ) : (
                    <Image
                      src={profile.src}
                      alt={profile.alt}
                      fill
                      className="rounded-full object-cover"
                    />
                  )}
                </div>
              </div>
              <p
                className="text-center text-xs capitalize font-medium mt-1"
                data-testid="story-name"
              >
                {person.length > 8 ? `${person.substring(0, 8)}..` : person}
              </p>
            </button>
          );
        })}
      </div>

      {showRightArrow && (
        <ArrowButton
          direction="right"
          onClick={() => scroll(Direction.RIGHT)}
          className={classNames(btnStyles, "right-0")}
          data-testid="right-arrow"
        />
      )}
    </div>
  );
};
