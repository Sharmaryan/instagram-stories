import React from "react";
import classNames from "classnames";
import { ArrowButtonProps } from "./ArrowButton.types";

const ArrowButton: React.FC<ArrowButtonProps> = ({
  direction = "left",
  onClick,
  className,
  variant = "scroll",
  ...props 
}) => {
  const isLeft = direction === "left";
  const svgPath = isLeft ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7";
  const svgClassName = classNames(
    {
      "h-6 w-6": variant === "carousel",
      "h-5 w-5": variant === "scroll",
    },
    "text-blue-400"
  );

  const buttonClasses = classNames(
    "absolute",
    "transform",
    "-translate-y-1/2",
    "z-10",
    "rounded-full",
    "p-2",
    "bg-white",
    "cursor-pointer",
    className,

    {
      "left-0 top-10 shadow-md": variant === "scroll" && isLeft,
      "right-0 top-10 shadow-md": variant === "scroll" && !isLeft,
      "left-4 text-white text-2xl top-1/2 bg-black bg-opacity-50":
        variant === "carousel" && isLeft,
      "right-4 text-white text-2xl top-1/2 bg-black bg-opacity-50":
        variant === "carousel" && !isLeft,
    }
  );

  return (
    <button className={buttonClasses} onClick={onClick} {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className={svgClassName}
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={svgPath}
        />
      </svg>
    </button>
  );
};

export default ArrowButton;
