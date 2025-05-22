export interface ImageType {
    src: string;
    alt: string;
};

export interface StoryItem {
    images: ImageType[];
    profile: ImageType;
};

export interface StoriesMock {
    [key: string]: StoryItem
};