import { fadeUpVariant, staggerContainerVariant, sectionProps } from '@/lib/animations'

describe('fadeUpVariant', () => {
  it('has hidden state with opacity 0 and y 30', () => {
    expect(fadeUpVariant.hidden).toEqual({ opacity: 0, y: 30 })
  })

  it('has visible state with opacity 1 and y 0', () => {
    const visible = fadeUpVariant.visible as Record<string, unknown>
    expect(visible.opacity).toBe(1)
    expect(visible.y).toBe(0)
  })
})

describe('staggerContainerVariant', () => {
  it('has visible transition with staggerChildren 0.08', () => {
    const visible = staggerContainerVariant.visible as { transition: { staggerChildren: number } }
    expect(visible.transition.staggerChildren).toBe(0.08)
  })
})

describe('sectionProps', () => {
  it('has initial hidden, whileInView visible, viewport once true', () => {
    expect(sectionProps.initial).toBe('hidden')
    expect(sectionProps.whileInView).toBe('visible')
    expect(sectionProps.viewport.once).toBe(true)
  })
})
