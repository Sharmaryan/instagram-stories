export interface ArrowButtonProps {
    direction?: "left" | "right";
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
    className?: string;
    variant?: "scroll" | "carousel";
}