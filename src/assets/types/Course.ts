import { Lesson } from "./Lesson"

export type Course = {
    containsLockedLessons?: boolean,
    description: string,
    duration?: number,
    id?: string,
    launchDate?: string,
    lessons: Lesson [],
    lessonsCount?: number;
    meta?: {
      courseVideoPreview: {
        duration: number,
        link: string,
        previewImageLink: string,
        skills: string [],
        slug: string
      }
    },
    previewImageLink?: string,
    rating?: number,
    status?: string,
    tags?: string [],
    title: string
  }