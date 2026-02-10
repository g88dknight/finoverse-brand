import type { BrandbookData, BrandbookPage } from '../types'

const sectionSlug = 'finoverse-brand'

const introFigmaLinks = [
  'https://www.figma.com/design/wP9siAztyluvs8cnSkacHT/Finoverse-2025?node-id=63-30&t=0jjJ7Ivh0uL7JXc9-1',
  'https://www.figma.com/design/2DcfIc8sk4kN86PcLWGzs9/Finoverse-AI-Branding?node-id=73-2&t=JJqlf4Y6EPyfWLlU-1',
  'https://www.figma.com/design/Mi5DxhIgYnzRGxZnp2GPVh/Finoverse-Group?node-id=0-1&t=6FYIdcGHzYz5yLc9-1',
]

function figmaFileNameFromUrl(url: string): string {
  try {
    const pathnameParts = new URL(url).pathname.split('/').filter(Boolean)
    const designIndex = pathnameParts.indexOf('design')
    const rawName = designIndex >= 0 ? pathnameParts[designIndex + 2] : pathnameParts[pathnameParts.length - 1]

    if (!rawName) {
      return 'Figma file'
    }

    return decodeURIComponent(rawName).replace(/-/g, ' ').trim()
  } catch {
    return 'Figma file'
  }
}

type SubBrandConfig = {
  key: 'events' | 'ai' | 'ventures'
  title: string
  description: string
  colorSet: Array<{ name: string; hex: string; role: string }>
  illustrationDirection: string
  graphicDirection: string
}

function createSubBrandPages(config: SubBrandConfig): BrandbookPage[] {
  return [
    {
      id: `${config.key}-overview`,
      title: config.title,
      slug: config.key,
      navLevel: 0,
      blocks: [
        {
          type: 'hero',
          title: config.title,
          description: config.description,
        },
        {
          type: 'textColumns',
          title: 'How This Sub-Brand Works',
          columns: [
            {
              title: 'Role',
              body: `Use ${config.title} where this business line is the primary owner of the message.`,
            },
            {
              title: 'Relationship to master brand',
              body: 'Lockups, spacing, and typography inherit from the Finoverse master rules.',
            },
            {
              title: 'Channel priority',
              body: 'Apply these rules first in launch pages, social posts, one-pagers, and event assets.',
            },
          ],
        },
        {
          type: 'ruleCards',
          title: 'System Principles',
          cards: [
            {
              title: 'Consistent',
              body: 'Same structural rules across every sub-brand to reduce execution drift.',
            },
            {
              title: 'Distinctive',
              body: 'Each sub-brand has controlled visual accents for quick recognition.',
            },
            {
              title: 'Scalable',
              body: 'The same tokens should work from social tile to keynote stage.',
            },
          ],
        },
      ],
    },
    {
      id: `${config.key}-colors`,
      title: 'Colors',
      slug: `${config.key}-colors`,
      navLevel: 1,
      blocks: [
        {
          type: 'hero',
          title: `${config.title} Colors`,
          description: 'Use these colors as the only approved palette for this sub-brand.',
        },
        {
          type: 'swatches',
          title: 'Core Palette',
          description: 'The first two colors are primary. The rest are neutral support tones.',
          swatches: config.colorSet,
        },
        {
          type: 'downloadList',
          title: 'Color Resources',
          items: [
            {
              name: 'Color Palette Export',
              description: 'ASE palette for design tools and production handoff.',
              format: 'ASE',
              file: '/downloads/color-palette.ase',
            },
          ],
        },
      ],
    },
    {
      id: `${config.key}-illustration`,
      title: 'Illustration',
      slug: `${config.key}-illustration`,
      navLevel: 1,
      blocks: [
        {
          type: 'hero',
          title: `${config.title} Illustration`,
          description: config.illustrationDirection,
        },
        {
          type: 'gallery',
          title: 'Reference Direction',
          items: [
            {
              src: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1400&q=80',
              alt: 'Abstract visual composition',
            },
            {
              src: 'https://images.unsplash.com/photo-1545239351-1141bd82e8a6?auto=format&fit=crop&w=1400&q=80',
              alt: 'Illustrative geometric style',
            },
          ],
        },
        {
          type: 'doDont',
          title: 'Illustration Rules',
          items: [
            {
              kind: 'do',
              title: 'Use one dominant focal shape',
              text: 'Composition should remain readable at thumbnail size.',
            },
            {
              kind: 'dont',
              title: 'Avoid dense micro-details',
              text: 'Overly intricate artwork weakens clarity in digital placements.',
            },
          ],
        },
      ],
    },
    {
      id: `${config.key}-graphic-elements`,
      title: 'Graphic elements',
      slug: `${config.key}-graphic-elements`,
      navLevel: 1,
      blocks: [
        {
          type: 'hero',
          title: `${config.title} Graphic Elements`,
          description: config.graphicDirection,
        },
        {
          type: 'imageShowcase',
          src: '/downloads/shape-kit.svg',
          alt: `${config.title} graphic elements kit`,
          caption: 'Use approved primitives only. Keep scale and spacing intentional.',
          compact: true,
        },
        {
          type: 'steps',
          title: 'Implementation Steps',
          steps: [
            {
              title: '01. Start from kit',
              body: 'Choose only approved primitives and lock their proportions.',
            },
            {
              title: '02. Build hierarchy',
              body: 'Place one hero element first, then add support elements.',
            },
            {
              title: '03. Preserve whitespace',
              body: 'Leave generous breathing room around key elements and text.',
            },
          ],
        },
      ],
    },
    {
      id: `${config.key}-resources`,
      title: 'Resources',
      slug: `${config.key}-resources`,
      navLevel: 1,
      blocks: [
        {
          type: 'hero',
          title: `${config.title} Resources`,
          description: 'Download approved source files and implementation references for this sub-brand.',
        },
        {
          type: 'downloadList',
          title: 'Resource Pack',
          items: [
            {
              name: 'Logo and Lockup Pack',
              description: 'Primary vector lockups for this sub-brand.',
              format: 'SVG',
              file: '/downloads/logo-pack.svg',
            },
            {
              name: 'Graphic Elements Kit',
              description: 'Reusable graphic primitives and layout helpers.',
              format: 'SVG',
              file: '/downloads/shape-kit.svg',
            },
            {
              name: 'Usage Rulesheet',
              description: 'Text-based checklist for fast QA before publishing.',
              format: 'TXT',
              file: '/downloads/co-brand-template.txt',
            },
          ],
        },
      ],
    },
  ]
}

const subBrandPages = [
  ...createSubBrandPages({
    key: 'events',
    title: 'Finoverse Events',
    description: 'The Events sub-brand is built for keynotes, summits, and community moments. It should feel energetic, premium, and globally consistent.',
    colorSet: [
      { name: 'Event Coral', hex: '#FF5E57', role: 'Hero accent for stage moments and announcements' },
      { name: 'Event Indigo', hex: '#3D4BFF', role: 'Depth and contrast for dark backgrounds' },
      { name: 'Cloud', hex: '#F4F5F8', role: 'Large neutral layout fields' },
      { name: 'Ink', hex: '#0D1020', role: 'Primary typography and mark applications' },
    ],
    illustrationDirection: 'Illustrations should feel cinematic and kinetic, with bold diagonals and expressive directional flow.',
    graphicDirection: 'Graphic elements should support stage readability at distance while preserving digital clarity.',
  }),
  ...createSubBrandPages({
    key: 'ai',
    title: 'Finoverse AI',
    description: 'Finoverse AI communicates intelligence that feels practical and human. Visual language should be precise, calm, and trustworthy.',
    colorSet: [
      { name: 'AI Cyan', hex: '#29D3FF', role: 'Primary accent for model and product touchpoints' },
      { name: 'AI Violet', hex: '#7766FF', role: 'Secondary gradient anchor and interactive emphasis' },
      { name: 'Mist', hex: '#EEF2F7', role: 'Surface backgrounds and card structure' },
      { name: 'Graphite', hex: '#121826', role: 'Primary text and dark UI fields' },
    ],
    illustrationDirection: 'Illustrations should use structured geometry, subtle depth, and clean signal pathways.',
    graphicDirection: 'Graphic primitives should suggest data flow, modularity, and high confidence in decision-making.',
  }),
  ...createSubBrandPages({
    key: 'ventures',
    title: 'Finoverse Ventures',
    description: 'Finoverse Ventures represents long-horizon bets and strategic growth. Tone is bold, optimistic, and clear about value creation.',
    colorSet: [
      { name: 'Venture Green', hex: '#17C964', role: 'Growth accents and opportunity highlights' },
      { name: 'Venture Blue', hex: '#1E6BFF', role: 'Primary digital framing and confidence layer' },
      { name: 'Stone', hex: '#F3F3F1', role: 'Neutral canvas for editorial layouts' },
      { name: 'Carbon', hex: '#111111', role: 'Core typography and structural contrast' },
    ],
    illustrationDirection: 'Illustrations should feel optimistic and directional, with clear momentum and strategic framing.',
    graphicDirection: 'Graphic elements should be sparse and modular, emphasizing structure over decoration.',
  }),
]

export const brandbookData: BrandbookData = {
  brandName: 'Finoverse Brand',
  logoMark: '/assets/logo.svg',
  sections: [
    {
      id: 'finoverse-brand',
      title: 'Finoverse Brand',
      slug: sectionSlug,
      pages: [
        {
          id: 'introduction',
          title: 'Introduction',
          slug: 'introduction',
          navLevel: 0,
          blocks: [
            {
              type: 'hero',
              title: 'Finoverse Brand System',
              description:
                'This brandbook is a living system for product, marketing, and partnerships. Every rule is structured for fast execution and consistent quality.',
            },
            {
              type: 'quickLinks',
              title: '',
              items: introFigmaLinks.map((url) => ({
                name: figmaFileNameFromUrl(url),
                description: 'Figma file',
                url,
                platform: 'figma',
              })),
            },
            {
              type: 'quote',
              text: 'Build clarity first. Distinction follows.',
              author: 'Finoverse Brand Team',
            },
          ],
        },
        {
          id: 'brand-tone',
          title: 'Brand Tone',
          slug: 'brand-tone',
          navLevel: 0,
          blocks: [
            {
              type: 'hero',
              title: 'Brand Tone',
              description:
                'Our tone is clear, direct, and confident. We explain complex ideas in plain language without losing depth.',
            },
            {
              type: 'ruleCards',
              title: 'Tone Pillars',
              cards: [
                {
                  title: 'Clear',
                  body: 'Lead with intent in the first sentence. Avoid jargon where simple words can work.',
                },
                {
                  title: 'Grounded',
                  body: 'Back claims with practical outcomes and concrete examples.',
                },
                {
                  title: 'Forward',
                  body: 'Speak with momentum and direction while staying realistic.',
                },
              ],
            },
            {
              type: 'doDont',
              title: 'Writing Rules',
              items: [
                {
                  kind: 'do',
                  title: 'Use active voice and specific verbs',
                  text: 'Write with ownership and decisive language in headlines and CTAs.',
                },
                {
                  kind: 'dont',
                  title: 'Avoid vague superlatives',
                  text: 'Do not use “world-class” or “best-in-class” without evidence.',
                },
              ],
            },
          ],
        },
        {
          id: 'logo',
          title: 'Logo',
          slug: 'logo',
          navLevel: 0,
          blocks: [
            {
              type: 'hero',
              title: 'Logo',
              description:
                'Finoverse logo system includes a primary lockup and a star icon. Use approved color variants only and preserve contrast in every placement.',
            },
            {
              type: 'imageShowcase',
              src: '/assets/logos/finoverse-logo-original.svg',
              alt: 'Finoverse logo original variant',
              background: '#f5f3ef',
              caption: 'Primary lockup (Original). Use as default on light backgrounds.',
            },
            {
              type: 'logoVariants',
              title: 'Logo Color Variants',
              description:
                'Hover any variant to see download action. Click the variant card to download the exact SVG file.',
              variants: [
                {
                  name: 'Original',
                  src: '/assets/logos/finoverse-logo-original.svg',
                  file: '/assets/logos/finoverse-logo-original.svg',
                  background: '#f6f3ef',
                  note: 'Default for light surfaces.',
                },
                {
                  name: 'Original White',
                  src: '/assets/logos/finoverse-logo-original-white.svg',
                  file: '/assets/logos/finoverse-logo-original-white.svg',
                  background: '#0b0b0f',
                  note: 'Default for dark surfaces.',
                },
                {
                  name: 'Black',
                  src: '/assets/logos/finoverse-logo-black.svg',
                  file: '/assets/logos/finoverse-logo-black.svg',
                  background: '#f2f2f2',
                  note: 'Monochrome dark reproduction.',
                },
                {
                  name: 'White',
                  src: '/assets/logos/finoverse-logo-white.svg',
                  file: '/assets/logos/finoverse-logo-white.svg',
                  background: '#151515',
                  note: 'Monochrome light reproduction.',
                },
                {
                  name: 'Coral Red',
                  src: '/assets/logos/finoverse-logo-coral-red.svg',
                  file: '/assets/logos/finoverse-logo-coral-red.svg',
                  background: '#fff3f0',
                  note: 'Use for emphasis and campaign moments.',
                },
              ],
            },
            {
              type: 'logoVariants',
              title: 'Brand Icon',
              description: 'Standalone icon variant for app icons, avatars, and compact placements.',
              variants: [
                {
                  name: 'Star Icon Coral Red',
                  src: '/assets/logos/star-icon-coral-red.svg',
                  file: '/assets/logos/star-icon-coral-red.svg',
                  background: '#fff3f0',
                  note: 'Preferred icon variant for compact surfaces.',
                },
              ],
            },
            {
              type: 'steps',
              title: 'Usage Basics',
              steps: [
                {
                  title: '01. Keep clear space',
                  body: 'Maintain at least 2x padding around the full lockup footprint.',
                },
                {
                  title: '02. Preserve ratio',
                  body: 'Never stretch, skew, rotate, or alter relative scale of symbol and wordmark.',
                },
                {
                  title: '03. Use approved variants only',
                  body: 'Select only from Original, Original White, Black, White, Coral Red, or the approved Star Icon.',
                },
              ],
            },
            {
              type: 'downloadList',
              title: 'Logo Downloads',
              items: [
                {
                  name: 'All Finoverse Logo Variants',
                  description: 'ZIP archive containing all logo color variants and the star icon.',
                  format: 'ZIP',
                  file: '/downloads/finoverse-logo-variants.zip',
                },
              ],
            },
          ],
        },
        {
          id: 'colors',
          title: 'Colors',
          slug: 'colors',
          navLevel: 0,
          blocks: [
            {
              type: 'hero',
              title: 'Colors',
              description:
                'Primary and extended brand palette for digital and print use. Hover any color card and copy HEX directly from the overlay.',
            },
            {
              type: 'brandColorPalette',
              title: 'Primary Colors',
              description:
                'Core palette from the master brand system. Use these as default identity colors across product, marketing, and materials.',
              colors: [
                {
                  name: 'Coral Red',
                  pantone: '1787 C',
                  cmyk: '0/92/68/0',
                  rgb: '249/53/73',
                  hex: '#F93549',
                },
                {
                  name: 'Sea Blue',
                  pantone: '0921 C',
                  cmyk: '39/0/18/0',
                  rgb: '138/237/226',
                  hex: '#8AEDE2',
                },
                {
                  name: 'Calm Blue',
                  pantone: '307 C',
                  cmyk: '100/50/19/3',
                  rgb: '0/105/167',
                  hex: '#0069A7',
                },
                {
                  name: 'Dark Night',
                  pantone: '2965 C',
                  cmyk: '100/83/44/48',
                  rgb: '4/39/68',
                  hex: '#042744',
                },
              ],
            },
            {
              type: 'brandColorPalette',
              title: 'Brand Colors',
              description:
                'Extended brand colors from the provided brand color board. Use as accents while preserving hierarchy of the primary palette.',
              colors: [
                {
                  name: 'Coral Red',
                  pantone: '1787 C',
                  cmyk: '0/92/68/0',
                  rgb: '249/53/73',
                  hex: '#F93549',
                },
                {
                  name: 'Violet',
                  pantone: '2592 C',
                  cmyk: '51/89/0/0',
                  rgb: '158/40/181',
                  hex: '#9E28B5',
                },
                {
                  name: 'Calm Blue',
                  pantone: '307 C',
                  cmyk: '100/50/19/3',
                  rgb: '0/105/167',
                  hex: '#0069A7',
                },
                {
                  name: 'Sea Blue',
                  cmyk: '38/0/18/0',
                  rgb: '138/237/226',
                  hex: '#8AEDE2',
                },
                {
                  name: 'Orange',
                  cmyk: '0/50/100/0',
                  rgb: '255/147/0',
                  hex: '#FF9300',
                },
                {
                  name: 'Dark Night',
                  cmyk: '100/83/44/48',
                  rgb: '4/39/68',
                  hex: '#042744',
                },
                {
                  name: 'Sky Blue',
                  cmyk: '50/6/0/0',
                  rgb: '102/199/255',
                  hex: '#66C7FF',
                },
              ],
            },
          ],
        },
        {
          id: 'typography',
          title: 'Typography',
          slug: 'typography',
          navLevel: 0,
          blocks: [
            {
              type: 'hero',
              title: 'Typography',
              description:
                'Geist is the official Finoverse brand typeface. Use a clear heading hierarchy, balanced line lengths, and consistent spacing across all touchpoints.',
            },
            {
              type: 'textColumns',
              title: 'Typography Foundation',
              columns: [
                {
                  title: 'Primary Typeface',
                  body: 'Geist is used for all interfaces, presentations, and marketing layouts.',
                },
                {
                  title: 'Weights',
                  body: 'Use 400 for body, 500 for UI labels, and 600-700 for headings and emphasis.',
                },
                {
                  title: 'Line Height',
                  body: 'Headings should be compact. Body text should remain open for readability and scanning.',
                },
              ],
            },
            {
              type: 'downloadList',
              title: 'Font Download',
              items: [
                {
                  name: 'Geist Font Family',
                  description: 'Official Geist source files (ZIP) from the Vercel Geist repository.',
                  format: 'ZIP',
                  file: 'https://codeload.github.com/vercel/geist-font/zip/refs/heads/main',
                },
              ],
            },
            {
              type: 'typeScale',
              title: 'Headings & Sizes',
              description: 'Use this scale as the default hierarchy for product, marketing, and documents.',
              samples: [
                {
                  label: 'Display / 80 / Semibold',
                  preview: 'Finoverse Brand System',
                  styleToken: 'font-family: Geist; font-weight: 600; font-size: 80px; line-height: 0.95',
                  previewClassName: 'text-4xl font-semibold md:text-7xl lg:text-[80px] lg:leading-[0.95]',
                },
                {
                  label: 'H1 / 56 / Semibold',
                  preview: 'Section Heading',
                  styleToken: 'font-family: Geist; font-weight: 600; font-size: 56px; line-height: 1.02',
                  previewClassName: 'text-3xl font-semibold md:text-5xl lg:text-[56px] lg:leading-[1.02]',
                },
                {
                  label: 'H2 / 40 / Semibold',
                  preview: 'Supporting Heading',
                  styleToken: 'font-family: Geist; font-weight: 600; font-size: 40px; line-height: 1.08',
                  previewClassName: 'text-2xl font-semibold md:text-4xl lg:text-[40px] lg:leading-[1.08]',
                },
                {
                  label: 'H3 / 32 / Semibold',
                  preview: 'Module Heading',
                  styleToken: 'font-family: Geist; font-weight: 600; font-size: 32px; line-height: 1.1',
                  previewClassName: 'text-2xl font-semibold md:text-3xl lg:text-[32px] lg:leading-[1.1]',
                },
                {
                  label: 'Body L / 24 / Regular',
                  preview: 'Readable body copy for primary statements and high-emphasis narrative blocks.',
                  styleToken: 'font-family: Geist; font-weight: 400; font-size: 24px; line-height: 1.25',
                  previewClassName: 'text-xl font-normal md:text-2xl lg:text-[24px] lg:leading-[1.25]',
                },
                {
                  label: 'Body M / 18 / Regular',
                  preview: 'Default paragraph size for guidelines and long-form explanatory text.',
                  styleToken: 'font-family: Geist; font-weight: 400; font-size: 18px; line-height: 1.45',
                  previewClassName: 'text-base font-normal md:text-lg lg:text-[18px] lg:leading-[1.45]',
                },
                {
                  label: 'UI Label / 14 / Medium',
                  preview: 'Navigation Label',
                  styleToken: 'font-family: Geist; font-weight: 500; font-size: 14px; line-height: 1.35',
                  previewClassName: 'text-sm font-medium md:text-[14px] md:leading-[1.35]',
                },
                {
                  label: 'Caption / 12 / Regular',
                  preview: 'Metadata and helper text',
                  styleToken: 'font-family: Geist; font-weight: 400; font-size: 12px; line-height: 1.4',
                  previewClassName: 'text-xs font-normal leading-[1.4]',
                },
              ],
            },
            {
              type: 'steps',
              title: 'Heading Rules',
              steps: [
                {
                  title: '01. Use one clear heading level per block',
                  body: 'Do not skip hierarchy. Start with H1, then H2/H3 in descending structure.',
                },
                {
                  title: '02. Keep line length controlled',
                  body: 'Aim for 40-72 characters on body copy for comfortable reading.',
                },
                {
                  title: '03. Keep spacing consistent',
                  body: 'Preserve predictable vertical rhythm between heading, text, and components.',
                },
              ],
            },
          ],
        },
        ...subBrandPages,
        {
          id: 'motion',
          title: 'Motion',
          slug: 'motion',
          navLevel: 0,
          blocks: [
            {
              type: 'hero',
              title: 'Motion',
              description: 'Motion should guide attention and reinforce hierarchy, never distract from content intent.',
            },
            {
              type: 'video',
              title: 'Motion Preview',
              description: 'Reference speed and cadence for major transitions.',
              src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4',
            },
            {
              type: 'steps',
              title: 'Motion Principles',
              steps: [
                {
                  title: '01. Keep transitions short',
                  body: 'Default duration should stay within 160ms-320ms for UI interactions.',
                },
                {
                  title: '02. Animate meaningfully',
                  body: 'Use motion to explain state change, hierarchy, or continuity.',
                },
                {
                  title: '03. Respect user settings',
                  body: 'Always support reduced-motion alternatives.',
                },
              ],
            },
          ],
        },
        {
          id: 'social-media',
          title: 'Social Media',
          slug: 'social-media',
          navLevel: 0,
          blocks: [
            {
              type: 'hero',
              title: 'Social Media',
              description: 'Social creative should be instantly recognizable, high-contrast, and optimized for rapid scanning.',
            },
            {
              type: 'gallery',
              title: 'Post Direction',
              items: [
                {
                  src: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=1400&q=80',
                  alt: 'Social content frame example',
                },
                {
                  src: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?auto=format&fit=crop&w=1400&q=80',
                  alt: 'Platform feed composition',
                },
              ],
            },
            {
              type: 'doDont',
              title: 'Channel Rules',
              items: [
                {
                  kind: 'do',
                  title: 'Lead with one message per frame',
                  text: 'Each post should communicate a single claim or CTA.',
                },
                {
                  kind: 'dont',
                  title: 'Avoid overloaded captions',
                  text: 'Use short line lengths and one clear CTA in each post.',
                },
              ],
            },
          ],
        },
        {
          id: 'documents',
          title: 'Documents',
          slug: 'documents',
          navLevel: 0,
          blocks: [
            {
              type: 'hero',
              title: 'Documents',
              description:
                'Business docs, proposals, and reports should reflect the same typography, spacing, and tone as digital channels.',
            },
            {
              type: 'textColumns',
              title: 'Document Framework',
              columns: [
                {
                  title: 'Structure',
                  body: 'Use consistent heading levels, clear section separators, and generous margins.',
                },
                {
                  title: 'Voice',
                  body: 'Write with concise sentences and data-backed conclusions.',
                },
                {
                  title: 'Assets',
                  body: 'Use only approved charts, icons, and logo lockups from this portal.',
                },
              ],
            },
            {
              type: 'downloadList',
              title: 'Document Resources',
              items: [
                {
                  name: 'Typography Guide',
                  description: 'Document-safe hierarchy and paragraph rules.',
                  format: 'TXT',
                  file: '/downloads/typography-guide.txt',
                },
                {
                  name: 'Brand Checklist',
                  description: 'Pre-publish checklist for decks and long-form docs.',
                  format: 'TXT',
                  file: '/downloads/co-brand-template.txt',
                },
                {
                  name: 'Motion Token Notes',
                  description: 'Transition and timing values for slide exports.',
                  format: 'TXT',
                  file: '/downloads/motion-presets.txt',
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}

export const firstPagePath = `/${sectionSlug}/introduction`
