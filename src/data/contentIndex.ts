import { brandbookData } from './brandbookData'
import type { BrandbookPage } from '../types'

export type PageLookup = {
  sectionTitle: string
  sectionSlug: string
  page: BrandbookPage
  index: number
  total: number
  previous?: { title: string; path: string }
  next?: { title: string; path: string }
}

const flatPages = brandbookData.sections.flatMap((section) =>
  section.pages.map((page) => ({
    sectionTitle: section.title,
    sectionSlug: section.slug,
    page,
    path: `/${section.slug}/${page.slug}`,
  })),
)

export const findPage = (sectionSlug: string, pageSlug: string): PageLookup | null => {
  const index = flatPages.findIndex(
    (item) => item.sectionSlug === sectionSlug && item.page.slug === pageSlug,
  )

  if (index === -1) {
    return null
  }

  const current = flatPages[index]
  const previous = flatPages[index - 1]
  const next = flatPages[index + 1]

  return {
    sectionTitle: current.sectionTitle,
    sectionSlug: current.sectionSlug,
    page: current.page,
    index,
    total: flatPages.length,
    previous: previous
      ? {
          title: previous.page.title,
          path: previous.path,
        }
      : undefined,
    next: next
      ? {
          title: next.page.title,
          path: next.path,
        }
      : undefined,
  }
}

export const navigationItems = brandbookData.sections.map((section) => ({
  ...section,
  pages: section.pages.map((page) => ({
    ...page,
    path: `/${section.slug}/${page.slug}`,
  })),
}))
