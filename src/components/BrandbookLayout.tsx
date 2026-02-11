import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowUp, ChevronDown, ChevronLeft, ChevronRight, Github, Globe, Instagram, Linkedin, Youtube } from 'lucide-react'
import { firstPagePath } from '@/data/brandbookData'
import type { PageLookup } from '@/data/contentIndex'
import { navigationItems } from '@/data/contentIndex'
import type { DownloadAsset } from '@/types'
import { ThemeToggle } from '@/components/ThemeToggle'
import { ModuleRenderer } from '@/components/ModuleRenderer'
import { HongKongTimeWidget } from '@/components/HongKongTimeWidget'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar'

type BrandbookLayoutProps = {
  pageLookup: PageLookup
}

type Theme = 'light' | 'dark'

const THEME_KEY = 'brandbook-theme'

function getInitialTheme(): Theme {
  const saved = window.localStorage.getItem(THEME_KEY)

  if (saved === 'light' || saved === 'dark') {
    return saved
  }

  return 'dark'
}

const sidebarPages = navigationItems.flatMap((section) => section.pages)

export function BrandbookLayout({ pageLookup }: BrandbookLayoutProps) {
  const [theme, setTheme] = useState<Theme>(getInitialTheme)
  const currentPath = `/${pageLookup.sectionSlug}/${pageLookup.page.slug}`
  const isIntroduction = pageLookup.page.id === 'introduction'
  const isSubBrandOverview = ['events-overview', 'ai-overview', 'ventures-overview'].includes(pageLookup.page.id)
  const useCompactHeroDescription = !isIntroduction && !isSubBrandOverview
  const hasImmersiveHero = isIntroduction || isSubBrandOverview
  const hasTopHero = hasImmersiveHero || useCompactHeroDescription
  const logoClassName = `h-8 w-auto ${theme === 'light' ? 'brightness-0' : 'brightness-0 invert'}`
  const heroDownloadAsset = useMemo<DownloadAsset | null>(() => {
    if (!useCompactHeroDescription) {
      return null
    }

    for (const block of pageLookup.page.blocks) {
      if (block.type === 'downloadList' && block.items.length > 0) {
        return block.items[0]
      }
    }

    return null
  }, [pageLookup.page.blocks, useCompactHeroDescription])

  const sidebarGroups = useMemo(() => {
    const groups: Array<{
      parent: (typeof sidebarPages)[number]
      children: Array<(typeof sidebarPages)[number]>
    }> = []

    for (const page of sidebarPages) {
      if (page.navLevel === 1) {
        const last = groups[groups.length - 1]
        if (last) {
          last.children.push(page)
        }
        continue
      }

      groups.push({
        parent: page,
        children: [],
      })
    }

    return groups
  }, [])

  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({})

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
    window.localStorage.setItem(THEME_KEY, theme)
  }, [theme])

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [currentPath])

  const footerColumns = [
    {
      title: 'Brandbook',
      links: [
        { label: 'Introduction', href: `/${pageLookup.sectionSlug}/introduction` },
        { label: 'Brand Tone', href: `/${pageLookup.sectionSlug}/brand-tone` },
        { label: 'Logo', href: `/${pageLookup.sectionSlug}/logo` },
        { label: 'Colors', href: `/${pageLookup.sectionSlug}/colors` },
        { label: 'Typography', href: `/${pageLookup.sectionSlug}/typography` },
      ],
    },
    {
      title: 'Sub-brands',
      links: [
        { label: 'Finoverse Events', href: `/${pageLookup.sectionSlug}/events` },
        { label: 'Finoverse AI', href: `/${pageLookup.sectionSlug}/ai` },
        { label: 'Finoverse Ventures', href: `/${pageLookup.sectionSlug}/ventures` },
        { label: 'Stories', href: `/${pageLookup.sectionSlug}/stories` },
      ],
    },
    {
      title: 'Resources',
      links: [
        { label: 'Logo Variants ZIP', href: '/downloads/finoverse-logo-variants.zip' },
        { label: 'Color Palette ASE', href: '/downloads/color-palette.ase' },
        { label: 'Typography Guide', href: '/downloads/typography-guide.txt' },
        { label: 'Brand Checklist', href: '/downloads/co-brand-template.txt' },
      ],
    },
    {
      title: 'Practice',
      links: [
        { label: 'Motion', href: `/${pageLookup.sectionSlug}/motion` },
        { label: 'Social Media', href: `/${pageLookup.sectionSlug}/social-media` },
        { label: 'Documents', href: `/${pageLookup.sectionSlug}/documents` },
        { label: 'Figma Source', href: 'https://www.figma.com/' },
      ],
    },
  ] as const

  return (
    <SidebarProvider defaultOpen>
      <Sidebar
        collapsible="offcanvas"
        className="bg-background group-data-[side=left]:border-r-0 group-data-[side=right]:border-l-0 [&>[data-sidebar=sidebar]]:border-0"
      >
        <SidebarHeader className="px-6 pb-2 pt-6 md:hidden">
          <div className="flex items-center justify-between gap-4">
            <Link to={firstPagePath} className="shrink-0">
              <img src="/assets/logo.svg" alt="Finoverse Brand" className={logoClassName} />
            </Link>
            <SidebarTrigger className="-translate-y-1 h-7 w-7 rounded-md bg-transparent text-muted-foreground hover:bg-muted/30 hover:text-foreground" />
          </div>
        </SidebarHeader>

        <SidebarContent className="px-4">
          <div className="flex h-full items-start pt-14 md:pt-[8.5rem]">
            <SidebarMenu className="w-full gap-1">
              {sidebarGroups.map((group) => {
                const isParentActive = currentPath === group.parent.path
                const hasChildren = group.children.length > 0
                const isExpanded =
                  expandedGroups[group.parent.id] ?? (isParentActive || group.children.some((child) => child.path === currentPath))

                return (
                  <SidebarMenuItem key={group.parent.id} className="space-y-0.5">
                    <div className="relative">
                      <SidebarMenuButton
                        asChild
                        isActive={isParentActive}
                        className={`h-10 rounded-lg px-5 text-[13px] font-medium tracking-[-0.01em] text-foreground/90 transition-colors hover:bg-accent/50 hover:text-foreground data-[active=true]:bg-accent/65 data-[active=true]:text-foreground ${
                          hasChildren ? 'pr-10' : ''
                        }`}
                      >
                        <NavLink to={group.parent.path}>{group.parent.title}</NavLink>
                      </SidebarMenuButton>

                      {hasChildren ? (
                        <button
                          type="button"
                          aria-label={isExpanded ? 'Collapse submenu' : 'Expand submenu'}
                          onClick={() =>
                            setExpandedGroups((prev) => ({
                              ...prev,
                              [group.parent.id]: !isExpanded,
                            }))
                          }
                          className="absolute right-2 top-1/2 inline-flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-foreground"
                        >
                          <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                        </button>
                      ) : null}
                    </div>

                    {hasChildren && isExpanded ? (
                      <div className="space-y-0.5">
                        {group.children.map((child) => {
                          const isChildActive = currentPath === child.path

                          return (
                            <SidebarMenuButton
                              key={child.id}
                              asChild
                              isActive={isChildActive}
                              className="h-8 rounded-lg px-7 text-[12px] font-normal tracking-[-0.01em] text-foreground/70 transition-colors hover:bg-accent/45 hover:text-foreground data-[active=true]:bg-accent/60 data-[active=true]:text-foreground"
                            >
                              <NavLink to={child.path}>{child.title}</NavLink>
                            </SidebarMenuButton>
                          )
                        })}
                      </div>
                    ) : null}
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </div>
        </SidebarContent>

        <SidebarFooter className="px-6 pb-6">
          <ThemeToggle theme={theme} onToggle={() => setTheme(theme === 'dark' ? 'light' : 'dark')} iconOnly />
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="relative overflow-hidden bg-background md:peer-data-[state=collapsed]:[&_.main-shell]:max-w-none md:peer-data-[state=collapsed]:[&_.chat-inner]:max-w-none md:peer-data-[state=expanded]:[&_.chat-shell]:left-[var(--sidebar-width)]">
        <HongKongTimeWidget />

        <div className="fixed left-0 top-8 z-50 hidden w-[var(--sidebar-width)] items-center justify-between pl-9 pr-4 md:flex">
          <Link to={firstPagePath} className="shrink-0">
            <img src="/assets/logo.svg" alt="Finoverse Brand" className={logoClassName} />
          </Link>
          <SidebarTrigger className="-translate-y-1 h-7 w-7 rounded-md bg-transparent text-muted-foreground hover:bg-transparent hover:text-foreground" />
        </div>

        <div className="fixed left-0 top-8 z-40 flex w-[var(--sidebar-width)] items-center justify-between pl-6 pr-4 md:hidden">
          <Link to={firstPagePath} className="shrink-0">
            <img src="/assets/logo.svg" alt="Finoverse Brand" className={logoClassName} />
          </Link>
          <SidebarTrigger className="-translate-y-1 h-7 w-7 rounded-md bg-transparent text-muted-foreground hover:bg-transparent hover:text-foreground" />
        </div>

        <main
          className={`main-shell relative z-10 mx-auto w-full max-w-7xl px-4 pb-32 md:px-12 lg:px-16 ${
            hasTopHero ? 'pt-0 md:pt-0' : 'pt-6 md:pt-10'
          }`}
        >
          <article className={hasTopHero ? 'space-y-14 md:space-y-20' : 'space-y-24 md:space-y-36'}>
            {pageLookup.page.blocks.map((block, index) => (
              <ModuleRenderer
                key={`${pageLookup.page.id}-${index}`}
                block={block}
                introHeroBackground={hasImmersiveHero && index === 0 && block.type === 'hero'}
                standardHeroBackground={useCompactHeroDescription && index === 0 && block.type === 'hero'}
                centeredLayout
                introHeroVideoSrc={isIntroduction ? '/assets/intro-main.mp4' : '/assets/intro-hero.mp4'}
                standardHeroVideoSrc="/assets/hero-pages.mp4"
                compactHeroDescription={useCompactHeroDescription && block.type === 'hero'}
                heroDownloadAsset={index === 0 && block.type === 'hero' ? heroDownloadAsset : null}
              />
            ))}
          </article>

          <div className="my-16 md:my-20" />

          <footer className="grid gap-4 md:grid-cols-2">
            {pageLookup.previous ? (
              <NavLink
                to={pageLookup.previous.path}
                className="group rounded-2xl bg-transparent px-6 py-5 transition-colors hover:bg-foreground/6"
              >
                <p className="inline-flex items-center gap-2 text-xl font-semibold tracking-[-0.02em] text-foreground md:text-2xl">
                  <ChevronLeft size={30} className="text-foreground/70 transition-colors group-hover:text-foreground" />
                  <span className="text-sm font-normal text-muted-foreground md:text-base">Previous</span>
                  <span>{pageLookup.previous.title}</span>
                </p>
              </NavLink>
            ) : (
              <div />
            )}
            {pageLookup.next ? (
              <NavLink
                to={pageLookup.next.path}
                className="group rounded-2xl bg-transparent px-6 py-5 text-right transition-colors hover:bg-foreground/6"
              >
                <p className="inline-flex items-center gap-2 text-xl font-semibold tracking-[-0.02em] text-foreground md:text-2xl">
                  <span className="text-sm font-normal text-muted-foreground md:text-base">Next</span>
                  <span>{pageLookup.next.title}</span>
                  <ChevronRight size={30} className="text-foreground/70 transition-colors group-hover:text-foreground" />
                </p>
              </NavLink>
            ) : (
              <div />
            )}
          </footer>
        </main>

        <footer className="relative z-10 px-4 pb-12 pt-16 md:px-12 md:pb-14 md:pt-20 lg:px-16">
          <div className="mx-auto grid w-full max-w-7xl gap-10 md:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title} className="space-y-3">
                <p className="text-sm text-muted-foreground">{column.title}</p>
                <ul className="space-y-2.5">
                  {column.links.map((link) => (
                    <li key={`${column.title}-${link.label}`}>
                      {link.href.startsWith(`/${pageLookup.sectionSlug}/`) ? (
                        <NavLink to={link.href} className="text-lg tracking-[-0.01em] text-foreground/95 transition-colors hover:text-foreground">
                          {link.label}
                        </NavLink>
                      ) : (
                        <a
                          href={link.href}
                          className="text-lg tracking-[-0.01em] text-foreground/95 transition-colors hover:text-foreground"
                          {...(link.href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : { download: true })}
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-12 flex w-full max-w-7xl flex-col items-start justify-between gap-5 text-sm text-muted-foreground md:flex-row md:items-center">
            <div className="flex items-center gap-4 text-foreground/90">
              <a href="https://github.com/g88dknight/finoverse-brand" target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-70">
                <Github size={18} />
              </a>
              <a href="https://www.youtube.com/" target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-70">
                <Youtube size={18} />
              </a>
              <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-70">
                <Linkedin size={18} />
              </a>
              <a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="transition-opacity hover:opacity-70">
                <Instagram size={18} />
              </a>
            </div>

            <div className="flex flex-col items-start gap-2 md:items-center">
              <p>Finoverse Network © 2026</p>
              <a href="/downloads/co-brand-template.txt" download className="underline underline-offset-2 hover:text-foreground">
                Manage Brand Assets
              </a>
            </div>

            <div className="inline-flex items-center gap-2 rounded-full bg-muted px-4 py-2 text-foreground">
              <Globe size={14} />
              <span>English</span>
              <span className="text-muted-foreground">United States</span>
            </div>
          </div>
        </footer>

        <div className="chat-shell pointer-events-none fixed bottom-6 left-0 right-0 z-50">
          <div className="chat-inner mx-auto w-full max-w-7xl px-4 md:px-12 lg:px-16">
            <div className="flex justify-center">
              <form
                className="pointer-events-auto flex h-11 w-full max-w-xs items-center rounded-full bg-[rgba(0,0,0,0.1)] pl-4 pr-1 text-[#424242] backdrop-blur-xl dark:bg-[rgba(255,255,255,0.1)] dark:text-white/90"
                onSubmit={(event) => event.preventDefault()}
              >
                <input
                  type="text"
                  placeholder="Ask Samantha"
                  className="h-full w-full bg-transparent text-[14px] font-normal tracking-[-0.01em] text-[#424242] placeholder:text-[#424242]/75 focus:outline-none dark:text-white/90 dark:placeholder:text-white/65"
                />
                <button
                  type="submit"
                  aria-label="Ask Samantha"
                  className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-black/15 text-[#424242] transition-colors hover:bg-black/20 dark:bg-white/85 dark:text-zinc-800 dark:hover:bg-white"
                >
                  <ArrowUp size={14} strokeWidth={2.3} />
                </button>
              </form>
            </div>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
