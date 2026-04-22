// __mocks__/framer-motion.tsx
import React from 'react'

type AnyProps = Record<string, unknown> & { children?: React.ReactNode }

const createMock = (tag: string) =>
  React.forwardRef<HTMLElement, AnyProps>(({ children, initial, animate, exit, variants, whileInView, viewport, transition, whileHover, whileTap, ...props }, ref) =>
    React.createElement(tag, { ...props, ref }, children)
  )

export const motion = {
  div: createMock('div'),
  section: createMock('section'),
  h1: createMock('h1'),
  h2: createMock('h2'),
  p: createMock('p'),
  span: createMock('span'),
  nav: createMock('nav'),
  a: createMock('a'),
  ul: createMock('ul'),
  li: createMock('li'),
}

export const AnimatePresence = ({ children }: { children: React.ReactNode }) => <>{children}</>
export const useScroll = () => ({ scrollY: { on: () => () => {}, get: () => 0 } })
export const useTransform = () => 0
export const useMotionValue = (initial: number) => ({ get: () => initial, set: () => {} })
