import type { BrandColorSpec, BrandbookData, BrandbookPage } from '../types'

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

const networkPrimaryColors: BrandColorSpec[] = [
  {
    name: 'Burgundy Red',
    cmyk: '0/75/50/52',
    rgb: '122/31/61',
    hex: '#7A1F3D',
    role: 'Master color for Finoverse Network',
  },
  {
    name: 'Coral Red',
    pantone: '1787 C',
    cmyk: '0/92/68/0',
    rgb: '249/53/73',
    hex: '#F93549',
    role: 'Primary color for Finoverse Events',
  },
  {
    name: 'Samantha Blue',
    cmyk: '84/17/0/0',
    rgb: '41/211/255',
    hex: '#29D3FF',
    role: 'Primary color for Finoverse AI',
  },
  {
    name: 'Tiffany Blue',
    cmyk: '95/0/3/27',
    rgb: '10/186/181',
    hex: '#0ABAB5',
    role: 'Primary color for Finoverse Ventures',
  },
]

const extendedNetworkColors: BrandColorSpec[] = [
  {
    name: 'Calm Blue',
    pantone: '307 C',
    cmyk: '100/50/19/3',
    rgb: '0/105/167',
    hex: '#0069A7',
    role: 'Support blue for digital depth and trust',
  },
  {
    name: 'Sea Blue',
    pantone: '0921 C',
    cmyk: '39/0/18/0',
    rgb: '138/237/226',
    hex: '#8AEDE2',
    role: 'Support accent for lightweight highlights',
  },
  {
    name: 'Violet',
    pantone: '2592 C',
    cmyk: '51/89/0/0',
    rgb: '158/40/181',
    hex: '#9E28B5',
    role: 'Secondary accent for campaign moments',
  },
  {
    name: 'Orange',
    cmyk: '0/50/100/0',
    rgb: '255/147/0',
    hex: '#FF9300',
    role: 'Utility accent for emphasis and CTA moments',
  },
  {
    name: 'Dark Night',
    pantone: '2965 C',
    cmyk: '100/83/44/48',
    rgb: '4/39/68',
    hex: '#042744',
    role: 'Primary dark tone for typography and surfaces',
  },
  {
    name: 'Sky Blue',
    cmyk: '50/6/0/0',
    rgb: '102/199/255',
    hex: '#66C7FF',
    role: 'Support highlight for bright layouts',
  },
  {
    name: 'Cloud',
    cmyk: '2/1/0/3',
    rgb: '244/245/248',
    hex: '#F4F5F8',
    role: 'Neutral light background tone',
  },
  {
    name: 'Stone',
    cmyk: '0/0/1/5',
    rgb: '243/243/241',
    hex: '#F3F3F1',
    role: 'Neutral editorial background tone',
  },
]

type SubBrandConfig = {
  key: 'events' | 'ai' | 'ventures'
  title: string
  description: string
  vision: string
  roleInNetwork: string
  poweredBy: string
  keyExamples: Array<{ title: string; body: string }>
  executionFocus: Array<{ title: string; body: string }>
  colorSet: BrandColorSpec[]
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
          title: 'Brand Positioning',
          columns: [
            {
              title: 'Vision',
              body: config.vision,
            },
            {
              title: 'Role in the Network',
              body: config.roleInNetwork,
            },
            {
              title: 'Powered by',
              body: config.poweredBy,
            },
          ],
        },
        {
          type: 'ruleCards',
          title: 'Execution Focus',
          cards: config.executionFocus,
        },
        {
          type: 'steps',
          title: 'Key Examples from Creative Brief',
          steps: config.keyExamples,
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
          description:
            'Use this palette as the approved color system for this sub-brand. Hover and copy any value in Pantone, CMYK, RGB, HEX, or full profile format.',
        },
        {
          type: 'brandColorPalette',
          title: 'Core Palette',
          description: 'Primary color first, followed by support and neutral tones for consistent production.',
          colors: config.colorSet,
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
    description: 'Where social experiences meet business. Finoverse Events builds the next generation of events and trusted offline networks.',
    vision: 'We build the next generation of events and offline networks.',
    roleInNetwork:
      'A dedicated space for professionals to build high-trust relationships and drive transformative change through curated in-person experiences.',
    poweredBy: 'Powered by Finoverse AI and Samantha to make every handshake count.',
    keyExamples: [
      {
        title: 'HKFTW',
        body: 'Flagship event format built for global tech leaders and curated high-trust relationships.',
      },
      {
        title: 'Genesis Festival',
        body: 'Community-led flagship experience where social energy meets business outcomes.',
      },
      {
        title: 'Web3 Afterparties',
        body: 'The "Un-Conference" format for informal but high-value peer-to-peer conversations.',
      },
      {
        title: 'Project X WEEK',
        body: 'Offline AI deployment to coordinate complex city-wide event operations at scale.',
      },
    ],
    executionFocus: [
      {
        title: 'High-trust relationships',
        body: 'Design every event touchpoint to move from introductions to trusted partnerships.',
      },
      {
        title: 'Transformative outcomes',
        body: 'Prioritize measurable collaboration opportunities, not just attendance volume.',
      },
      {
        title: 'Community-led experiences',
        body: 'Keep formats social-first while maintaining clear business relevance.',
      },
    ],
    colorSet: [
      {
        name: 'Coral Red',
        pantone: '1787 C',
        cmyk: '0/92/68/0',
        rgb: '249/53/73',
        hex: '#F93549',
        role: 'Primary sub-brand color for Events',
      },
      {
        name: 'Burgundy Red',
        cmyk: '0/75/50/52',
        rgb: '122/31/61',
        hex: '#7A1F3D',
        role: 'Secondary depth tone from the master network identity',
      },
      {
        name: 'Dark Night',
        cmyk: '100/83/44/48',
        rgb: '4/39/68',
        hex: '#042744',
        role: 'Dark base for typography and contrast surfaces',
      },
      {
        name: 'Cloud',
        cmyk: '2/1/0/3',
        rgb: '244/245/248',
        hex: '#F4F5F8',
        role: 'Light neutral for large layout areas',
      },
    ],
    illustrationDirection: 'Illustrations should feel cinematic and kinetic, with bold diagonals and expressive directional flow.',
    graphicDirection: 'Graphic elements should support stage readability at distance while preserving digital clarity.',
  }),
  ...createSubBrandPages({
    key: 'ai',
    title: 'Finoverse AI',
    description: 'For the future of professional connections. Finoverse AI is the quiet engine behind event experiences and community intelligence.',
    vision: 'Finoverse AI powers event experiences, handling most transactions so teams can focus on high-trust relationship building.',
    roleInNetwork:
      'Samantha sits at the core of the AI initiative as a community host for the future of professional connections.',
    poweredBy: 'Events-to-users matching, smart itineraries, and roundtable placement workflows.',
    keyExamples: [
      {
        title: 'Events-to-users tool',
        body: 'Hyper-personalized connection engine focused on high-value matches and context-aware introductions.',
      },
      {
        title: 'Smart itineraries',
        body: 'Adaptive scheduling support that helps attendees navigate high-impact opportunities.',
      },
      {
        title: 'Roundtable placement',
        body: 'AI-assisted participant placement to maximize relevance and conversation quality.',
      },
      {
        title: 'Samantha AI Community Host',
        body: 'AI host model for the next era of professional connections and continuity after events.',
      },
    ],
    executionFocus: [
      {
        title: 'Quiet infrastructure',
        body: 'Keep AI present in outcomes, not noisy in communication.',
      },
      {
        title: 'Personalized relevance',
        body: 'Every recommendation should increase trust, context, and practical value.',
      },
      {
        title: 'Operational reliability',
        body: 'AI workflows must remain transparent, practical, and event-ready.',
      },
    ],
    colorSet: [
      {
        name: 'Samantha Blue',
        cmyk: '84/17/0/0',
        rgb: '41/211/255',
        hex: '#29D3FF',
        role: 'Primary sub-brand color for Finoverse AI',
      },
      {
        name: 'Sea Blue',
        cmyk: '39/0/18/0',
        rgb: '138/237/226',
        hex: '#8AEDE2',
        role: 'Secondary support accent for AI-led interactions',
      },
      {
        name: 'Dark Night',
        cmyk: '100/83/44/48',
        rgb: '4/39/68',
        hex: '#042744',
        role: 'Dark foundation for contrast and readability',
      },
      {
        name: 'Cloud',
        cmyk: '2/1/0/3',
        rgb: '244/245/248',
        hex: '#F4F5F8',
        role: 'Light base for product and content surfaces',
      },
    ],
    illustrationDirection: 'Illustrations should use structured geometry, subtle depth, and clean signal pathways.',
    graphicDirection: 'Graphic primitives should suggest data flow, modularity, and high confidence in decision-making.',
  }),
  ...createSubBrandPages({
    key: 'ventures',
    title: 'Finoverse Ventures',
    description: 'Bridging tech and capital. Finoverse Ventures operates at the intersection of innovation and investment.',
    vision:
      'Finoverse Ventures acts as an active accelerator where community-driven deal flow meets market access and smart money.',
    roleInNetwork: 'Go-to-Market partner for tech startups scaling in Asia and beyond.',
    poweredBy: 'Genesis Programme, deal-flow brokerage, and advisory partnerships for market entry and scaling.',
    keyExamples: [
      {
        title: 'Genesis Programme',
        body: 'Program-level support connecting founders with the right operators, partners, and investors.',
      },
      {
        title: 'Venture Opportunities',
        body: 'Deal-flow brokerage and strategic introductions across the broader Finoverse network.',
      },
      {
        title: 'Go-to-Market partnerships',
        body: 'Advisory support for launch, market-entry planning, and scaling in Asia and beyond.',
      },
      {
        title: 'Smart money access',
        body: 'Capital support paired with practical distribution and execution pathways.',
      },
    ],
    executionFocus: [
      {
        title: 'Tech-capital bridge',
        body: 'Translate product momentum into real business traction and investor readiness.',
      },
      {
        title: 'Community-driven deal flow',
        body: 'Use network intelligence and trust to improve connection quality.',
      },
      {
        title: 'Go-to-Market acceleration',
        body: 'Pair advisory support with execution frameworks for measurable growth.',
      },
    ],
    colorSet: [
      {
        name: 'Tiffany Blue',
        cmyk: '95/0/3/27',
        rgb: '10/186/181',
        hex: '#0ABAB5',
        role: 'Primary sub-brand color for Finoverse Ventures',
      },
      {
        name: 'Calm Blue',
        cmyk: '100/50/19/3',
        rgb: '0/105/167',
        hex: '#0069A7',
        role: 'Support color for structured venture communication',
      },
      {
        name: 'Dark Night',
        cmyk: '100/83/44/48',
        rgb: '4/39/68',
        hex: '#042744',
        role: 'Core dark tone for typography and interface hierarchy',
      },
      {
        name: 'Stone',
        cmyk: '0/0/1/5',
        rgb: '243/243/241',
        hex: '#F3F3F1',
        role: 'Neutral background for editorial and investment narratives',
      },
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
              title: 'Finoverse Network',
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
                "We do not just host events. We lead a global AI-powered tech network that bridges innovation and capital.",
            },
            {
              type: 'textColumns',
              title: 'Core Brand Values',
              columns: [
                {
                  title: 'People',
                  body: 'Bring next-generation tech leaders together and build the leading trusted offline global tech network.',
                },
                {
                  title: 'Impact',
                  body: 'Drive real business value by redefining connections and bridging future tech with capital.',
                },
                {
                  title: 'Experience',
                  body: 'Set new standards for events through AI-powered, decentralized, and community-led execution.',
                },
              ],
            },
            {
              type: 'ruleCards',
              title: 'Brand Tone and Feel',
              cards: [
                {
                  title: 'Visionary',
                  body: 'Speak about next-generation events and networks, always connecting innovation and capital with a clear AI-led direction.',
                },
                {
                  title: 'Relatable',
                  body: 'Stay accessible and friendly while remaining tech-forward to support real conversations and high-trust relationships.',
                },
                {
                  title: 'Collaborative',
                  body: 'Frame Finoverse as a trusted partner and community network, not as a distant authority.',
                },
              ],
            },
            {
              type: 'doDont',
              title: 'Vocabulary Direction',
              items: [
                {
                  kind: 'do',
                  title: 'Keywords to use',
                  text: 'Trusted Partner, Global Tech Network, Global Trusted Offline Network, Collaborative, Next Generation, Peer-to-peer, Connections, High-impact, Personalized, Synergy, Community, AI-powered, Innovate, Transform, Redefine, Curated, Future-proof.',
                },
                {
                  kind: 'dont',
                  title: 'Words to avoid',
                  text: 'Ecosystem, Disruption, Revolutionary, Cutting-Edge.',
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
                'Primary and supporting palette for Finoverse Network and its three key brands. Hover a color profile and copy Pantone, CMYK, RGB, HEX, or the full profile.',
            },
            {
              type: 'brandColorPalette',
              title: 'Network and Sub-Brand Colors',
              description:
                'Master brand color plus the assigned color identities for Events, AI, and Ventures from the creative brief.',
              colors: networkPrimaryColors,
            },
            {
              type: 'brandColorPalette',
              title: 'Supporting Colors',
              description:
                'Use these tones for hierarchy, contrast, and production flexibility while preserving the network/sub-brand color hierarchy.',
              colors: extendedNetworkColors,
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
