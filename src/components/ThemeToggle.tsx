import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

type ThemeToggleProps = {
  theme: 'light' | 'dark'
  onToggle: () => void
  iconOnly?: boolean
}

export function ThemeToggle({ theme, onToggle, iconOnly = false }: ThemeToggleProps) {
  const isDark = theme === 'dark'

  return (
    <Button
      type="button"
      variant="ghost"
      size={iconOnly ? 'icon' : 'sm'}
      className={cn(
        iconOnly
          ? 'h-8 w-8 rounded-full bg-transparent p-0 text-muted-foreground shadow-none hover:bg-muted/30 hover:text-foreground'
          : 'h-8 rounded-full bg-transparent px-2 text-xs text-muted-foreground shadow-none hover:bg-muted/30 hover:text-foreground',
      )}
      onClick={onToggle}
      aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
      title={isDark ? 'Light' : 'Dark'}
    >
      <span
        className={cn(
          'inline-flex h-5 w-5 items-center justify-center rounded-full',
          isDark ? 'text-foreground' : 'text-muted-foreground',
        )}
      >
        {isDark ? <Moon size={14} /> : <Sun size={14} />}
      </span>
      {iconOnly ? null : <span>{isDark ? 'Dark' : 'Light'}</span>}
    </Button>
  )
}
