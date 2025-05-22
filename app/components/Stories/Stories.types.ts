import { RefObject } from "react"

export enum Direction {
    LEFT = 'left',
    RIGHT = 'right'
}

export interface StoriesProps {
    showLeftArrow: boolean
    showRightArrow: boolean
    storiesContainerRef: RefObject<HTMLDivElement | null>
    openStory: (person: string) => void
    scroll: (direction: Direction) => void
}