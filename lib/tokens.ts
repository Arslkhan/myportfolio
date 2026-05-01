export const ACCENT_PILL_STYLES = {
  purple: 'text-accent-purple border-[rgba(167,139,250,0.3)] bg-[rgba(167,139,250,0.1)]',
  blue:   'text-accent-blue border-[rgba(96,165,250,0.3)] bg-[rgba(96,165,250,0.1)]',
  green:  'text-accent-green border-[rgba(52,211,153,0.3)] bg-[rgba(52,211,153,0.1)]',
} as const

export type AccentColor = keyof typeof ACCENT_PILL_STYLES
