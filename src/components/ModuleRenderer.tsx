import { useState } from 'react'
import type { ContentBlock } from '@/types'
import { Check, Copy, Download, ExternalLink, Figma } from 'lucide-react'
import { CopyButton } from '@/components/CopyButton'
import FaultyTerminal from '@/components/FaultyTerminal'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

type ModuleRendererProps = {
  block: ContentBlock
  introHeroBackground?: boolean
  centeredLayout?: boolean
  introHeroVideoSrc?: string
  introHeroMode?: 'video' | 'faultyTerminal'
}

export function ModuleRenderer({
  block,
  introHeroBackground = false,
  centeredLayout = false,
  introHeroVideoSrc = '/assets/intro-hero.mp4',
  introHeroMode = 'video',
}: ModuleRendererProps) {
  const [copiedVariant, setCopiedVariant] = useState<string | null>(null)
  const [copiedColor, setCopiedColor] = useState<string | null>(null)

  const copyTextToClipboard = async (value: string) => {
    try {
      await navigator.clipboard.writeText(value)
      return true
    } catch {
      try {
        const textarea = document.createElement('textarea')
        textarea.value = value
        textarea.style.position = 'fixed'
        textarea.style.opacity = '0'
        document.body.appendChild(textarea)
        textarea.focus()
        textarea.select()
        const success = document.execCommand('copy')
        textarea.remove()
        return success
      } catch {
        return false
      }
    }
  }

  const triggerSvgDownload = (file: string) => {
    const anchor = document.createElement('a')
    anchor.href = file
    anchor.download = ''
    document.body.appendChild(anchor)
    anchor.click()
    anchor.remove()
  }

  const copySvgToClipboard = async (file: string, variantName: string) => {
    try {
      const response = await fetch(file)
      const svgContent = await response.text()
      const copied = await copyTextToClipboard(svgContent)

      if (copied) {
        setCopiedVariant(variantName)
        window.setTimeout(() => {
          setCopiedVariant((current) => (current === variantName ? null : current))
        }, 1600)
      }
    } catch {
      // no-op: clipboard may be unavailable in non-secure contexts
    }
  }

  const copyHexToClipboard = async (hex: string) => {
    const copied = await copyTextToClipboard(hex)

    if (!copied) {
      return
    }

    setCopiedColor(hex)
    window.setTimeout(() => {
      setCopiedColor((current) => (current === hex ? null : current))
    }, 1300)
  }

  switch (block.type) {
    case 'hero':
      if (introHeroBackground) {
        return (
          <section className="intro-hero-section relative left-1/2 right-1/2 -mx-[50vw] w-screen min-h-[100svh] overflow-hidden">
            <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
              {introHeroMode === 'faultyTerminal' ? (
                <FaultyTerminal
                  scale={1.5}
                  gridMul={[2, 1]}
                  digitSize={1.9}
                  timeScale={0.5}
                  pause={false}
                  scanlineIntensity={0.5}
                  glitchAmount={1}
                  flickerAmount={1}
                  noiseAmp={1}
                  chromaticAberration={0}
                  dither={0}
                  curvature={0.1}
                  tint="#A7EF9E"
                  mouseReact
                  mouseStrength={0.5}
                  pageLoadAnimation
                  brightness={0.5}
                />
              ) : (
                <video className="intro-hero-bg-video" autoPlay muted loop playsInline>
                  <source src={introHeroVideoSrc} type="video/mp4" />
                </video>
              )}
              <div className="intro-hero-bg-vignette" />
            </div>

            <div className="relative z-10 mx-auto flex min-h-[100svh] w-full max-w-7xl items-center justify-center px-6 py-20 md:px-12 lg:px-16">
              <div className="space-y-8 text-center md:space-y-10">
                {block.eyebrow ? (
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-white/70">
                    {block.eyebrow}
                  </p>
                ) : null}
                <h1 className="mx-auto max-w-6xl text-balance text-6xl font-semibold leading-[0.9] tracking-[-0.055em] text-white md:text-8xl lg:text-[112px] lg:leading-[0.9]">
                  {block.title}
                </h1>
                <p className="mx-auto max-w-5xl text-balance text-2xl leading-[1.18] tracking-[-0.02em] text-white/90 md:text-4xl lg:text-5xl">
                  {block.description}
                </p>
              </div>
            </div>
          </section>
        )
      }

      return (
        <section className="space-y-6 py-10 text-center md:space-y-10 md:py-24">
          {block.eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              {block.eyebrow}
            </p>
          ) : null}
          <h1 className="mx-auto max-w-5xl text-balance text-5xl font-semibold leading-[0.95] tracking-[-0.05em] md:text-7xl lg:text-8xl">
            {block.title}
          </h1>
          <p className="mx-auto max-w-5xl text-balance text-2xl leading-[1.18] tracking-[-0.02em] text-foreground/90 md:text-4xl lg:text-5xl">
            {block.description}
          </p>
        </section>
      )

    case 'imageShowcase':
      return (
        <section className={`space-y-4 ${centeredLayout ? 'mx-auto max-w-6xl' : ''}`}>
          <div className="overflow-hidden rounded-xl border border-border/80">
            {block.background ? (
              <div
                className={`flex items-center justify-center p-8 md:p-12 ${
                  block.compact ? 'min-h-[340px] md:min-h-[420px]' : 'min-h-[360px] md:min-h-[460px]'
                }`}
                style={{ background: block.background }}
              >
                <img
                  className={`h-auto w-full max-w-[860px] object-contain ${
                    block.compact ? 'max-h-[340px]' : 'max-h-[280px] md:max-h-[320px]'
                  }`}
                  src={block.src}
                  alt={block.alt}
                  loading="lazy"
                />
              </div>
            ) : (
              <img
                className={`w-full ${block.compact ? 'max-h-[560px] object-contain' : ''}`}
                src={block.src}
                alt={block.alt}
                loading="lazy"
              />
            )}
          </div>
          {block.caption ? <p className={`text-sm text-muted-foreground ${centeredLayout ? 'mx-auto max-w-3xl text-center' : ''}`}>{block.caption}</p> : null}
        </section>
      )

    case 'textColumns':
      return (
        <section className={`space-y-8 pt-14 md:pt-20 ${centeredLayout ? 'mx-auto max-w-6xl' : ''}`}>
          <SectionTitle title={block.title} centered={centeredLayout} />
          <div className={`grid gap-0 border-t border-border/70 ${gridByCount(block.columns.length)} ${centeredLayout ? 'mx-auto max-w-5xl' : ''}`}>
            {block.columns.map((column) => (
              <Card
                key={column.title ?? column.body.slice(0, 24)}
                className="rounded-none border-0 border-b border-r border-border/60 bg-transparent shadow-none"
              >
                <CardContent className="space-y-4 px-5 py-6 md:px-6 md:py-7">
                  {column.title ? <h3 className="text-2xl font-semibold tracking-[-0.02em]">{column.title}</h3> : null}
                  <p className="text-base leading-7 text-muted-foreground">{column.body}</p>
                  {column.copyText ? <CopyButton text={column.copyText} /> : null}
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )

    case 'steps':
      return (
        <section className={`space-y-8 pt-14 md:pt-20 ${centeredLayout ? 'mx-auto max-w-6xl' : ''}`}>
          <SectionTitle title={block.title} centered={centeredLayout} />
          <div className={`grid gap-0 border-t border-border/70 ${centeredLayout ? 'mx-auto max-w-5xl md:grid-cols-2' : 'md:grid-cols-2'}`}>
            {block.steps.map((step) => (
              <Card
                key={step.title}
                className="rounded-none border-0 border-b border-r border-border/60 bg-transparent shadow-none"
              >
                <CardContent className="space-y-3 px-5 py-6 md:px-6 md:py-7">
                  <h3 className="text-2xl font-semibold tracking-[-0.02em]">{step.title}</h3>
                  <p className="text-base leading-7 text-muted-foreground">{step.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )

    case 'ruleCards':
      return (
        <section className={`space-y-8 pt-14 md:pt-20 ${centeredLayout ? 'mx-auto max-w-6xl' : ''}`}>
          <SectionTitle title={block.title} centered={centeredLayout} />
          <div className={`grid gap-0 border-t border-border/70 md:grid-cols-3 ${centeredLayout ? 'mx-auto max-w-5xl' : ''}`}>
            {block.cards.map((card) => (
              <Card
                key={card.title}
                className="rounded-none border-0 border-b border-r border-border/60 bg-transparent shadow-none"
              >
                <CardContent className="space-y-3 px-5 py-6 md:px-6 md:py-7">
                  <h3 className="text-2xl font-semibold tracking-[-0.02em]">{card.title}</h3>
                  <p className="text-base leading-7 text-muted-foreground">{card.body}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )

    case 'swatches':
      return (
        <section className={`space-y-8 pt-14 md:pt-20 ${centeredLayout ? 'mx-auto max-w-6xl' : ''}`}>
          <SectionTitle title={block.title} centered={centeredLayout} />
          {block.description ? <p className={`text-base leading-7 text-muted-foreground ${centeredLayout ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>{block.description}</p> : null}
          <div className={`grid gap-0 border-t border-border/70 md:grid-cols-2 ${centeredLayout ? 'mx-auto max-w-5xl' : ''}`}>
            {block.swatches.map((swatch) => (
              <Card
                key={swatch.hex}
                className="rounded-none border-0 border-b border-r border-border/60 bg-transparent shadow-none"
              >
                <CardContent className="space-y-4 px-5 py-6 md:px-6 md:py-7">
                  <div className="aspect-[4/2] w-full rounded-lg border border-border/70" style={{ background: swatch.hex }} />
                  <h3 className="text-2xl font-semibold tracking-[-0.02em]">{swatch.name}</h3>
                  <p className="text-base leading-7 text-muted-foreground">{swatch.role}</p>
                  <div className="flex items-center justify-between gap-4">
                    <code className="font-mono text-xs text-foreground">{swatch.hex}</code>
                    <CopyButton text={swatch.hex} label="Copy" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )

    case 'typeScale':
      return (
        <section className={`space-y-8 pt-14 md:pt-20 ${centeredLayout ? 'mx-auto max-w-6xl' : ''}`}>
          <SectionTitle title={block.title} centered={centeredLayout} />
          {block.description ? <p className={`text-base leading-7 text-muted-foreground ${centeredLayout ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>{block.description}</p> : null}
          <div className={`space-y-0 border-t border-border/70 ${centeredLayout ? 'mx-auto max-w-5xl' : ''}`}>
            {block.samples.map((sample) => (
              <Card
                key={sample.label}
                className="rounded-none border-0 border-b border-border/60 bg-transparent shadow-none"
              >
                <CardContent className="flex flex-col items-start justify-between gap-5 px-5 py-6 md:flex-row md:items-center md:px-6 md:py-7">
                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.1em] text-muted-foreground">{sample.label}</p>
                    <p className={`tracking-[-0.02em] ${sample.previewClassName ?? 'text-2xl font-semibold md:text-4xl'}`}>
                      {sample.preview}
                    </p>
                  </div>
                  <CopyButton text={sample.styleToken} label="Copy token" />
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )

    case 'doDont':
      return (
        <section className={`space-y-8 pt-14 md:pt-20 ${centeredLayout ? 'mx-auto max-w-6xl' : ''}`}>
          <SectionTitle title={block.title} centered={centeredLayout} />
          <div className={`grid gap-0 border-t border-border/70 md:grid-cols-2 ${centeredLayout ? 'mx-auto max-w-5xl' : ''}`}>
            {block.items.map((item) => (
              <Card
                key={`${item.kind}-${item.title}`}
                className="rounded-none border-0 border-b border-r border-border/60 bg-transparent shadow-none"
              >
                <CardContent className="space-y-3 px-5 py-6 md:px-6 md:py-7">
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.1em] ${
                      item.kind === 'do' ? 'text-emerald-400 dark:text-emerald-300' : 'text-rose-400 dark:text-rose-300'
                    }`}
                  >
                    {item.kind === 'do' ? 'Do' : 'Do not'}
                  </p>
                  <h3 className="text-2xl font-semibold tracking-[-0.02em]">{item.title}</h3>
                  <p className="text-base leading-7 text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )

    case 'gallery':
      return (
        <section className={`space-y-8 pt-14 md:pt-20 ${centeredLayout ? 'mx-auto max-w-6xl' : ''}`}>
          <SectionTitle title={block.title} centered={centeredLayout} />
          <div className={`grid gap-0 border-t border-border/70 md:grid-cols-2 ${centeredLayout ? 'mx-auto max-w-5xl' : ''}`}>
            {block.items.map((item) => (
              <figure key={item.src} className="space-y-3 border-b border-r border-border/60 px-5 py-6 md:px-6 md:py-7">
                <img
                  src={item.src}
                  alt={item.alt}
                  loading="lazy"
                  className="aspect-[16/10] w-full rounded-lg border border-border/60 object-cover"
                />
                {item.caption ? <figcaption className="text-sm text-muted-foreground">{item.caption}</figcaption> : null}
              </figure>
            ))}
          </div>
        </section>
      )

    case 'video':
      return (
        <section className={`space-y-8 pt-14 md:pt-20 ${centeredLayout ? 'mx-auto max-w-6xl' : ''}`}>
          <SectionTitle title={block.title} centered={centeredLayout} />
          {block.description ? <p className={`text-base leading-7 text-muted-foreground ${centeredLayout ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>{block.description}</p> : null}
          <div className={`overflow-hidden rounded-lg border border-border/70 ${centeredLayout ? 'mx-auto max-w-5xl' : ''}`}>
            <video controls playsInline loop poster={block.poster} className="w-full">
              <source src={block.src} type="video/mp4" />
            </video>
          </div>
        </section>
      )

    case 'downloadList':
      return (
        <section className={`space-y-8 pt-14 md:pt-20 ${centeredLayout ? 'mx-auto max-w-5xl' : ''}`}>
          <SectionTitle title={block.title} centered={centeredLayout} />
          <div className={`space-y-0 border-t border-border/70 ${centeredLayout ? 'mx-auto max-w-4xl' : ''}`}>
            {block.items.map((item) => (
              <Card
                key={item.name}
                className="rounded-none border-0 border-b border-border/60 bg-transparent shadow-none"
              >
                <CardContent className="flex flex-col items-start justify-between gap-5 px-5 py-6 md:flex-row md:items-center md:px-6 md:py-7">
                  <div className="space-y-2">
                    <h3 className="text-2xl font-semibold tracking-[-0.02em]">{item.name}</h3>
                    <p className="text-base leading-7 text-muted-foreground">{item.description}</p>
                  </div>
                  <Button
                    asChild
                    variant="outline"
                    size="sm"
                    className="h-9 rounded-full border-border/80 bg-transparent px-4 text-xs font-medium text-foreground shadow-none hover:bg-muted/30"
                  >
                    <a
                      href={item.file}
                      {...(item.file.startsWith('http')
                        ? { target: '_blank', rel: 'noreferrer' }
                        : { download: true })}
                    >
                      Download {item.format}
                    </a>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>
      )

    case 'quickLinks':
      return (
        <section className={`space-y-6 ${block.title ? 'pt-14 md:pt-20' : 'pt-4 md:pt-6'} ${centeredLayout ? 'mx-auto max-w-6xl' : ''}`}>
          <SectionTitle title={block.title} centered={centeredLayout} />
          <div className={`grid gap-4 md:grid-cols-2 xl:grid-cols-3 ${centeredLayout ? 'mx-auto w-full max-w-5xl' : ''}`}>
            {block.items.map((item) => (
              <a
                key={`${item.name}-${item.url}`}
                href={item.url}
                target="_blank"
                rel="noreferrer"
                className="group relative rounded-2xl border border-white/15 bg-black/[0.04] p-4 transition-colors hover:bg-black/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:bg-white/[0.02] dark:hover:bg-white/[0.06]"
              >
                <div className="absolute right-4 top-4">
                  <ExternalLink size={18} className="text-muted-foreground transition-colors group-hover:text-foreground" />
                </div>
                <div className="space-y-5">
                  <Figma size={18} className="text-foreground/95" />
                  <div className="space-y-1.5">
                    <h3 className="text-[20px] font-semibold leading-[1.2] tracking-[-0.03em]">{item.name}</h3>
                    {item.description ? <p className="text-[14px] leading-[1.3] text-muted-foreground">{item.description}</p> : null}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </section>
      )

    case 'brandColorPalette':
      return (
        <section className={`space-y-8 pt-14 md:pt-20 ${centeredLayout ? 'mx-auto max-w-6xl' : ''}`}>
          <SectionTitle title={block.title} centered={centeredLayout} />
          {block.description ? (
            <p className={`text-base leading-7 text-muted-foreground ${centeredLayout ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
              {block.description}
            </p>
          ) : null}
          <div className={`grid gap-0 border-t border-border/70 md:grid-cols-2 ${centeredLayout ? 'mx-auto max-w-5xl' : ''}`}>
            {block.colors.map((color) => {
              const isCopied = copiedColor === color.hex
              const textToneClassName = readableTextClassName(color.hex)

              return (
                <article
                  key={`${color.name}-${color.hex}`}
                  className="group relative overflow-hidden border-b border-r border-border/60"
                >
                  <div
                    className={`relative min-h-[280px] px-5 py-6 md:min-h-[320px] md:px-6 md:py-7 ${textToneClassName}`}
                    style={{ backgroundColor: color.hex }}
                    role="button"
                    tabIndex={0}
                    title={`Copy ${color.hex}`}
                    onClick={() => void copyHexToClipboard(color.hex)}
                    onKeyDown={(event) => {
                      if (event.key === 'Enter' || event.key === ' ') {
                        event.preventDefault()
                        void copyHexToClipboard(color.hex)
                      }
                    }}
                  >
                    <div className="space-y-3 text-sm leading-tight md:text-base">
                      {color.pantone ? (
                        <p className="text-xs font-semibold uppercase tracking-[0.08em] md:text-sm">
                          Pantone <span className="ml-1 normal-case font-medium">{color.pantone}</span>
                        </p>
                      ) : null}
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] md:text-sm">
                        CMYK <span className="ml-1 normal-case font-medium">{color.cmyk}</span>
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] md:text-sm">
                        RGB <span className="ml-1 normal-case font-medium">{color.rgb}</span>
                      </p>
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] md:text-sm">
                        HEX <span className="ml-1 normal-case font-medium">{color.hex}</span>
                      </p>
                    </div>

                    <p className="pointer-events-none absolute bottom-6 left-5 right-5 text-4xl font-medium tracking-[-0.03em] md:bottom-7 md:left-6 md:right-6 md:text-5xl">
                      {color.name}
                    </p>

                    <div className="pointer-events-none absolute inset-0 bg-black/30 opacity-0 transition-opacity duration-200 md:group-hover:opacity-100 md:group-focus-within:opacity-100" />

                    <div className="absolute right-4 top-4 opacity-100 transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100 md:group-focus-within:opacity-100">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-black/45 px-3 py-1.5 text-xs font-medium text-white backdrop-blur-[2px]"
                        onClick={(event) => {
                          event.preventDefault()
                          event.stopPropagation()
                          void copyHexToClipboard(color.hex)
                        }}
                      >
                        {isCopied ? <Check size={14} /> : <Copy size={14} />}
                        {isCopied ? 'Copied' : 'Copy HEX'}
                      </button>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>
        </section>
      )

    case 'logoVariants':
      return (
        <section className={`space-y-8 pt-14 md:pt-20 ${centeredLayout ? 'mx-auto max-w-6xl' : ''}`}>
          <SectionTitle title={block.title} centered={centeredLayout} />
          {block.description ? (
            <p className={`text-base leading-7 text-muted-foreground ${centeredLayout ? 'mx-auto max-w-3xl text-center' : 'max-w-3xl'}`}>
              {block.description}
            </p>
          ) : null}
          <div className={`grid gap-0 border-t border-border/70 ${centeredLayout ? 'mx-auto max-w-5xl md:grid-cols-2' : 'md:grid-cols-2'}`}>
            {block.variants.map((variant) => {
              const isCopied = copiedVariant === variant.name

              return (
                <div
                  key={variant.name}
                  className="group border-b border-r border-border/60 px-5 py-6 md:px-6 md:py-7"
                >
                  <figure className="space-y-4">
                    <div
                      className="relative flex aspect-[16/8] cursor-pointer items-center justify-center overflow-hidden rounded-lg border border-border/60 p-6"
                      style={{ background: variant.background ?? 'transparent' }}
                      onClick={() => triggerSvgDownload(variant.file)}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault()
                          triggerSvgDownload(variant.file)
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      title={`Download ${variant.name}`}
                    >
                      <img
                        src={variant.src}
                        alt={variant.name}
                        className="h-full max-h-20 w-auto max-w-full object-contain transition duration-200 group-hover:scale-[1.015] group-hover:blur-[2.5px]"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 flex items-center justify-center bg-black/48 opacity-0 transition-opacity duration-200 group-hover:opacity-100">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-black/45 px-3 py-1.5 text-xs font-medium text-white"
                            onClick={(event) => {
                              event.preventDefault()
                              event.stopPropagation()
                              triggerSvgDownload(variant.file)
                            }}
                          >
                            <Download size={14} />
                            Download SVG
                          </button>
                          <button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-full border border-white/35 bg-black/45 px-3 py-1.5 text-xs font-medium text-white"
                            onClick={(event) => {
                              event.preventDefault()
                              event.stopPropagation()
                              void copySvgToClipboard(variant.file, variant.name)
                            }}
                          >
                            {isCopied ? <Check size={14} /> : <Copy size={14} />}
                            {isCopied ? 'Copied' : 'Copy SVG'}
                          </button>
                        </div>
                      </div>
                    </div>
                    <figcaption className="space-y-1">
                      <p className="text-base font-medium tracking-[-0.01em] text-foreground">{variant.name}</p>
                      {variant.note ? <p className="text-sm text-muted-foreground">{variant.note}</p> : null}
                    </figcaption>
                  </figure>
                </div>
              )
            })}
          </div>
        </section>
      )

    case 'quote':
      return (
        <section className={`space-y-6 pt-14 md:pt-20 ${centeredLayout ? 'mx-auto max-w-6xl text-center' : ''}`}>
          <Separator className={`bg-border/70 ${centeredLayout ? 'mx-auto max-w-5xl' : ''}`} />
          <blockquote className={`text-4xl font-semibold leading-tight tracking-[-0.04em] md:text-6xl ${centeredLayout ? 'mx-auto max-w-5xl' : 'max-w-5xl'}`}>
            {block.text}
          </blockquote>
          {block.author ? <p className={`text-sm text-muted-foreground ${centeredLayout ? 'mx-auto max-w-3xl' : ''}`}>{block.author}</p> : null}
        </section>
      )

    default:
      return null
  }
}

function SectionTitle({ title, centered = false }: { title?: string; centered?: boolean }) {
  if (!title) {
    return null
  }

  return (
    <h2
      className={`text-balance text-4xl font-semibold leading-[0.95] tracking-[-0.045em] md:text-6xl lg:text-7xl ${
        centered ? 'text-center' : ''
      }`}
    >
      {title}
    </h2>
  )
}

function gridByCount(count: number) {
  if (count === 1) {
    return 'grid-cols-1'
  }

  if (count === 2) {
    return 'md:grid-cols-2'
  }

  return 'md:grid-cols-3'
}

function readableTextClassName(hex: string) {
  const normalized = hex.replace('#', '')
  const expanded =
    normalized.length === 3
      ? normalized
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : normalized

  const red = Number.parseInt(expanded.slice(0, 2), 16)
  const green = Number.parseInt(expanded.slice(2, 4), 16)
  const blue = Number.parseInt(expanded.slice(4, 6), 16)

  if ([red, green, blue].some((channel) => Number.isNaN(channel))) {
    return 'text-white'
  }

  const luminance = (0.299 * red + 0.587 * green + 0.114 * blue) / 255
  return luminance > 0.7 ? 'text-slate-900' : 'text-white'
}
