import { useEffect, useMemo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ArrowUp, ChevronDown } from 'lucide-react'
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
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

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

  return (
    <SidebarProvider defaultOpen>
      <Sidebar
        collapsible="offcanvas"
        className="bg-background group-data-[side=left]:border-r-0 group-data-[side=right]:border-l-0 [&>[data-sidebar=sidebar]]:border-0"
      >
        <SidebarHeader className="px-6 pb-2 pt-6 md:hidden">
          <div className="flex items-center justify-between gap-4">
            <Link to={firstPagePath} className="ml-4 shrink-0">
              <img src="/assets/logo.svg" alt="Finoverse Brand" className={logoClassName} />
            </Link>
            <SidebarTrigger className="h-7 w-7 rounded-md bg-transparent text-muted-foreground hover:bg-muted/30 hover:text-foreground" />
          </div>
        </SidebarHeader>

        <SidebarContent className="px-4">
          <div className="flex h-full items-center">
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
                        className={`h-10 rounded-lg px-5 text-[13px] font-medium tracking-[-0.01em] text-foreground/90 hover:bg-transparent data-[active=true]:bg-gradient-to-r data-[active=true]:from-white/10 data-[active=true]:to-white/5 ${
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
                              className="h-8 rounded-lg px-7 text-[12px] font-normal tracking-[-0.01em] text-foreground/70 hover:bg-transparent data-[active=true]:bg-gradient-to-r data-[active=true]:from-white/10 data-[active=true]:to-white/5"
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

        <div className="fixed left-0 top-8 z-50 hidden w-[var(--sidebar-width)] items-center justify-between px-6 md:flex">
          <Link to={firstPagePath} className="shrink-0 translate-y-1">
            <img src="/assets/logo.svg" alt="Finoverse Brand" className={logoClassName} />
          </Link>
          <SidebarTrigger className="h-7 w-7 rounded-md bg-transparent text-muted-foreground hover:bg-transparent hover:text-foreground" />
        </div>

        <div className="fixed left-4 top-4 z-40 md:hidden">
          <SidebarTrigger className="h-8 w-8 rounded-full border border-border/70 bg-transparent text-muted-foreground hover:bg-transparent hover:text-foreground" />
        </div>

        <main
          className={`main-shell relative z-10 mx-auto w-full max-w-7xl px-4 pb-32 md:px-12 lg:px-16 ${
            hasImmersiveHero ? 'pt-0 md:pt-0' : 'pt-6 md:pt-10'
          }`}
        >
          <article className={hasImmersiveHero ? 'space-y-14 md:space-y-20' : 'space-y-24 md:space-y-36'}>
            {pageLookup.page.blocks.map((block, index) => (
              <ModuleRenderer
                key={`${pageLookup.page.id}-${index}`}
                block={block}
                introHeroBackground={hasImmersiveHero && index === 0 && block.type === 'hero'}
                centeredLayout
                introHeroVideoSrc={isIntroduction ? '/assets/intro-main.mp4' : '/assets/intro-hero.mp4'}
                compactHeroDescription={useCompactHeroDescription && block.type === 'hero'}
                heroDownloadAsset={index === 0 && block.type === 'hero' ? heroDownloadAsset : null}
              />
            ))}
          </article>

          <Separator className="my-20 bg-border/70" />

          <footer className="grid gap-6 md:grid-cols-2">
            {pageLookup.previous ? (
              <Button
                asChild
                variant="outline"
                className="h-auto justify-start rounded-xl border-border/70 bg-transparent px-6 py-5 text-left font-normal shadow-none hover:bg-muted/30"
              >
                <NavLink to={pageLookup.previous.path}>
                  <span className="block text-[11px] uppercase tracking-[0.1em] text-muted-foreground">Previous</span>
                  <strong className="mt-3 block text-xl font-semibold tracking-[-0.02em]">
                    {pageLookup.previous.title}
                  </strong>
                </NavLink>
              </Button>
            ) : (
              <div />
            )}
            {pageLookup.next ? (
              <Button
                asChild
                variant="outline"
                className="h-auto justify-end rounded-xl border-border/70 bg-transparent px-6 py-5 text-right font-normal shadow-none hover:bg-muted/30"
              >
                <NavLink to={pageLookup.next.path}>
                  <span className="block text-[11px] uppercase tracking-[0.1em] text-muted-foreground">Next</span>
                  <strong className="mt-3 block text-xl font-semibold tracking-[-0.02em]">{pageLookup.next.title}</strong>
                </NavLink>
              </Button>
            ) : (
              <div />
            )}
          </footer>
        </main>

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
