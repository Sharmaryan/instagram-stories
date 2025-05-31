export interface StoryProps {
    closeStory: () => void
    handleTouchStart: (e: React.TouchEvent) => void
    handleTouchMove: (e: React.TouchEvent) => void
    handleStoryClick: (e: React.MouseEvent<HTMLDivElement>) => void
    handleTouchEnd: (e: React.TouchEvent) => void
    activeStory: string | null
    currentImageIndex: number
    progress: number
}