import { useEffect, useRef } from 'react'
import { cn } from '@/lib/utils'

type FaultyTerminalProps = {
  className?: string
  scale?: number
  gridMul?: [number, number]
  digitSize?: number
  timeScale?: number
  pause?: boolean
  scanlineIntensity?: number
  glitchAmount?: number
  flickerAmount?: number
  noiseAmp?: number
  chromaticAberration?: number
  dither?: number
  curvature?: number
  tint?: string
  mouseReact?: boolean
  mouseStrength?: number
  pageLoadAnimation?: boolean
  brightness?: number
}

const GLYPHS = '0123456789ABCDEF'

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

function hexToRgb(hex: string) {
  const source = hex.replace('#', '').trim()
  const normalized =
    source.length === 3
      ? source
          .split('')
          .map((char) => `${char}${char}`)
          .join('')
      : source

  const red = Number.parseInt(normalized.slice(0, 2), 16)
  const green = Number.parseInt(normalized.slice(2, 4), 16)
  const blue = Number.parseInt(normalized.slice(4, 6), 16)

  if ([red, green, blue].some(Number.isNaN)) {
    return { r: 167, g: 239, b: 158 }
  }

  return { r: red, g: green, b: blue }
}

function hashNoise(x: number, y: number, t: number) {
  const value = Math.sin(x * 12.9898 + y * 78.233 + t * 6.124) * 43758.5453
  return value - Math.floor(value)
}

export default function FaultyTerminal({
  className,
  scale = 1.5,
  gridMul = [2, 1],
  digitSize = 1.9,
  timeScale = 0.5,
  pause = false,
  scanlineIntensity = 0.5,
  glitchAmount = 1,
  flickerAmount = 1,
  noiseAmp = 1,
  chromaticAberration = 0,
  dither = 0,
  curvature = 0.1,
  tint = '#A7EF9E',
  mouseReact = true,
  mouseStrength = 0.5,
  pageLoadAnimation = true,
  brightness = 0.5,
}: FaultyTerminalProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const gridX = gridMul[0]
  const gridY = gridMul[1]

  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!canvas || !context) {
      return
    }

    const tintRgb = hexToRgb(tint)
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    const pointer = { x: 0.5, y: 0.5, active: false }
    let rafId = 0
    let last = performance.now()
    let phase = 0
    const startedAt = performance.now()

    const resize = () => {
      const width = Math.max(1, Math.floor(canvas.clientWidth))
      const height = Math.max(1, Math.floor(canvas.clientHeight))
      canvas.width = Math.floor(width * dpr)
      canvas.height = Math.floor(height * dpr)
      context.setTransform(dpr, 0, 0, dpr, 0, 0)
      context.imageSmoothingEnabled = false
    }

    const onMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      if (!rect.width || !rect.height) {
        return
      }

      pointer.x = clamp((event.clientX - rect.left) / rect.width, 0, 1)
      pointer.y = clamp((event.clientY - rect.top) / rect.height, 0, 1)
      pointer.active = true
    }

    const onLeave = () => {
      pointer.active = false
    }

    const draw = (now: number) => {
      const delta = Math.min(42, now - last)
      last = now

      if (!pause) {
        phase += (delta / 1000) * Math.max(0.08, timeScale)
      }

      const width = canvas.width / dpr
      const height = canvas.height / dpr
      const columns = Math.max(20, Math.floor((width / (16 * Math.max(0.35, scale))) * Math.max(0.4, gridX)))
      const rows = Math.max(12, Math.floor((height / (28 * Math.max(0.35, scale))) * Math.max(0.4, gridY)))
      const cellWidth = width / columns
      const cellHeight = height / rows
      const fontSize = Math.max(10, cellHeight * (0.68 + digitSize * 0.08))
      const loadProgress = pageLoadAnimation ? clamp((now - startedAt) / 900, 0, 1) : 1
      const flicker = 1 - clamp(flickerAmount, 0, 2) * (0.08 + 0.06 * Math.sin(now * 0.015))
      const baseBrightness = clamp(brightness, 0, 1) * loadProgress * flicker

      context.fillStyle = 'rgb(4, 8, 12)'
      context.fillRect(0, 0, width, height)

      context.font = `${fontSize}px "Geist Mono", monospace`
      context.textBaseline = 'alphabetic'

      for (let y = 0; y < rows; y += 1) {
        for (let x = 0; x < columns; x += 1) {
          const noise = hashNoise(x, y, phase)
          if (noise < 0.24) {
            continue
          }

          const glyph = GLYPHS[Math.floor(noise * GLYPHS.length) % GLYPHS.length]
          const jitter = glitchAmount * (hashNoise(y, x, phase * 2.7) - 0.5)
          const glitchShift = noise > 0.92 ? jitter * cellWidth * 0.7 : 0

          let alpha = clamp(baseBrightness * (0.45 + noise * 0.75), 0.04, 1)

          if (mouseReact && pointer.active) {
            const xNorm = (x + 0.5) / columns
            const yNorm = (y + 0.5) / rows
            const distance = Math.hypot(xNorm - pointer.x, yNorm - pointer.y)
            const influence = clamp(1 - distance * 2.1, 0, 1)
            alpha += influence * clamp(mouseStrength, 0, 2) * 0.35
          }

          const drawX = x * cellWidth + cellWidth * 0.2 + glitchShift
          const drawY = y * cellHeight + cellHeight * 0.85
          const aberration = clamp(chromaticAberration, 0, 2) * 0.85

          if (aberration > 0) {
            context.fillStyle = `rgba(255, 96, 128, ${alpha * 0.35})`
            context.fillText(glyph, drawX - aberration, drawY)
            context.fillStyle = `rgba(96, 180, 255, ${alpha * 0.35})`
            context.fillText(glyph, drawX + aberration, drawY)
          }

          context.fillStyle = `rgba(${tintRgb.r}, ${tintRgb.g}, ${tintRgb.b}, ${alpha})`
          context.fillText(glyph, drawX, drawY)
        }
      }

      if (scanlineIntensity > 0) {
        const lineAlpha = clamp(scanlineIntensity, 0, 2) * 0.06
        context.fillStyle = `rgba(0, 0, 0, ${lineAlpha})`
        for (let y = 0; y < height; y += 3) {
          context.fillRect(0, y, width, 1)
        }
      }

      if (noiseAmp > 0) {
        const points = Math.floor((width * height) / 420)
        const grainAlpha = clamp(noiseAmp, 0, 2) * 0.028
        context.fillStyle = `rgba(255, 255, 255, ${grainAlpha})`
        for (let i = 0; i < points; i += 1) {
          const x = Math.random() * width
          const y = Math.random() * height
          context.fillRect(x, y, 1, 1)
        }
      }

      if (dither > 0) {
        const ditherAlpha = clamp(dither, 0, 2) * 0.04
        context.fillStyle = `rgba(255, 255, 255, ${ditherAlpha})`
        for (let y = 0; y < height; y += 2) {
          for (let x = (y / 2) % 2; x < width; x += 4) {
            context.fillRect(x, y, 1, 1)
          }
        }
      }

      if (curvature > 0) {
        const edge = context.createRadialGradient(
          width * 0.5,
          height * 0.5,
          width * 0.15,
          width * 0.5,
          height * 0.5,
          Math.max(width, height) * 0.72,
        )
        edge.addColorStop(0, 'rgba(0, 0, 0, 0)')
        edge.addColorStop(1, `rgba(0, 0, 0, ${clamp(curvature, 0, 1) * 0.65})`)
        context.fillStyle = edge
        context.fillRect(0, 0, width, height)
      }

      rafId = window.requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    window.addEventListener('mousemove', onMove)
    window.addEventListener('mouseout', onLeave)
    rafId = window.requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mouseout', onLeave)
      window.cancelAnimationFrame(rafId)
    }
  }, [
    brightness,
    chromaticAberration,
    curvature,
    dither,
    digitSize,
    flickerAmount,
    glitchAmount,
    gridX,
    gridY,
    mouseReact,
    mouseStrength,
    noiseAmp,
    pageLoadAnimation,
    pause,
    scale,
    scanlineIntensity,
    timeScale,
    tint,
  ])

  return (
    <div className={cn('absolute inset-0', className)}>
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
