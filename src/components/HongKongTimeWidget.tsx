import { useEffect, useMemo, useState } from 'react'

const CLOCK_MODE_KEY = 'hong-kong-clock-mode'

export function HongKongTimeWidget() {
  const [now, setNow] = useState(() => new Date())
  const [is24Hour, setIs24Hour] = useState(() => window.localStorage.getItem(CLOCK_MODE_KEY) === '24')

  useEffect(() => {
    const timer = window.setInterval(() => setNow(new Date()), 1000)

    return () => window.clearInterval(timer)
  }, [])

  useEffect(() => {
    window.localStorage.setItem(CLOCK_MODE_KEY, is24Hour ? '24' : '12')
  }, [is24Hour])

  const timeFormatter = useMemo(
    () =>
      new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Hong_Kong',
        hour: '2-digit',
        minute: '2-digit',
        hour12: !is24Hour,
      }),
    [is24Hour],
  )
  const timeParts = timeFormatter.formatToParts(now)
  const hours = timeParts.find((part) => part.type === 'hour')?.value ?? '--'
  const minutes = timeParts.find((part) => part.type === 'minute')?.value ?? '--'
  const period = (timeParts.find((part) => part.type === 'dayPeriod')?.value ?? '').toUpperCase()
  const periodLabel = is24Hour ? '24H' : period
  const colonVisible = now.getSeconds() % 2 === 0

  return (
    <div className="pointer-events-none fixed right-4 top-4 z-50 md:right-8 md:top-7">
      <div className="pointer-events-auto inline-flex items-center gap-[2px]">
        <span className="inline-flex items-center rounded-full bg-[rgba(0,0,0,0.1)] px-3 py-1.5 text-[13px] font-medium leading-[18px] tracking-[-0.03em] text-[#424242] backdrop-blur-xl dark:bg-[rgba(255,255,255,0.1)] dark:text-white">
          Hong Kong
        </span>
        <span className="inline-flex items-center rounded-full bg-[rgba(0,0,0,0.1)] px-3 py-1.5 text-[13px] font-medium leading-[18px] tracking-[-0.03em] text-[#424242] tabular-nums backdrop-blur-xl dark:bg-[rgba(255,255,255,0.1)] dark:text-white">
          {hours}
          <span
            className={`mx-[1px] transition-opacity duration-500 ${colonVisible ? 'opacity-100' : 'opacity-30'}`}
          >
            :
          </span>
          {minutes}
          <button
            type="button"
            onClick={() => setIs24Hour((current) => !current)}
            className="ml-[6px] rounded-sm px-0.5 text-[13px] font-medium leading-[18px] tracking-[-0.03em] text-[#424242] hover:text-black focus-visible:outline-none focus-visible:ring-0 dark:text-white/95 dark:hover:text-white"
            aria-label={is24Hour ? 'Switch to 12-hour format' : 'Switch to 24-hour format'}
          >
            {periodLabel}
          </button>
        </span>
      </div>
    </div>
  )
}
