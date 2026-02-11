export type Swatch = {
  name: string
  hex: string
  role: string
}

export type DownloadAsset = {
  name: string
  description: string
  format: string
  file: string
}

export type GalleryItem = {
  src: string
  alt: string
  caption?: string
}

export type LogoVariant = {
  name: string
  src: string
  file: string
  background?: string
  note?: string
}

export type QuickLinkItem = {
  name: string
  description?: string
  url: string
  platform?: 'figma'
}

export type BrandColorSpec = {
  name: string
  hex: string
  rgb: string
  cmyk: string
  pantone?: string
  role?: string
}

export type IconKey =
  | 'users'
  | 'sparkles'
  | 'network'
  | 'handshake'
  | 'rocket'
  | 'shield'
  | 'globe'
  | 'layers'
  | 'briefcase'
  | 'chart'
  | 'book'
  | 'palette'
  | 'type'
  | 'play'
  | 'camera'

export type ContentBlock =
  | {
      type: 'hero'
      eyebrow?: string
      title: string
      description: string
    }
  | {
      type: 'imageShowcase'
      src: string
      alt: string
      caption?: string
      background?: string
      compact?: boolean
    }
  | {
      type: 'textColumns'
      title?: string
      columns: Array<{
        title?: string
        body: string
        copyText?: string
      }>
    }
  | {
      type: 'steps'
      title: string
      steps: Array<{
        title: string
        body: string
      }>
    }
  | {
      type: 'ruleCards'
      title: string
      cards: Array<{
        title: string
        body: string
      }>
    }
  | {
      type: 'iconCards'
      title: string
      description?: string
      cards: Array<{
        icon: IconKey
        title: string
        body: string
      }>
    }
  | {
      type: 'statStrip'
      title?: string
      stats: Array<{
        label: string
        value: string
        note?: string
      }>
    }
  | {
      type: 'swatches'
      title: string
      description?: string
      swatches: Swatch[]
    }
  | {
      type: 'typeScale'
      title: string
      description?: string
      samples: Array<{
        label: string
        preview: string
        styleToken: string
        previewClassName?: string
      }>
    }
  | {
      type: 'doDont'
      title: string
      items: Array<{
        kind: 'do' | 'dont'
        title: string
        text: string
      }>
    }
  | {
      type: 'gallery'
      title?: string
      items: GalleryItem[]
    }
  | {
      type: 'video'
      title: string
      description?: string
      src: string
      poster?: string
    }
  | {
      type: 'downloadList'
      title: string
      items: DownloadAsset[]
    }
  | {
      type: 'quickLinks'
      title: string
      items: QuickLinkItem[]
    }
  | {
      type: 'brandColorPalette'
      title: string
      description?: string
      colors: BrandColorSpec[]
    }
  | {
      type: 'logoVariants'
      title: string
      description?: string
      variants: LogoVariant[]
    }
  | {
      type: 'quote'
      text: string
      author?: string
    }

export type BrandbookPage = {
  id: string
  title: string
  slug: string
  navLevel?: 0 | 1
  blocks: ContentBlock[]
}

export type BrandbookSection = {
  id: string
  title: string
  slug: string
  pages: BrandbookPage[]
}

export type BrandbookData = {
  brandName: string
  logoMark: string
  sections: BrandbookSection[]
}
