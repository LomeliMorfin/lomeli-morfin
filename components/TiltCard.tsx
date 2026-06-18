'use client'

import type { ReactNode } from 'react'
import type { MotionProps } from 'framer-motion'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

type TiltProps = Pick<MotionProps, 'initial' | 'animate' | 'exit' | 'whileHover' | 'transition' | 'variants'>

interface Props extends TiltProps {
  children: ReactNode
  className?: string
  maxTilt?: number
}

const SPRING = { stiffness: 280, damping: 26 }

export default function TiltCard({
  children,
  className = '',
  maxTilt = 8,
  variants,
  initial,
  animate,
  exit,
  whileHover,
  transition,
}: Props) {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rotateY = useSpring(useTransform(mx, [-0.5, 0.5], [-maxTilt, maxTilt]), SPRING)
  const rotateX = useSpring(useTransform(my, [-0.5, 0.5], [maxTilt, -maxTilt]), SPRING)

  return (
    <motion.div
      className={`tilt-wrap ${className}`}
      style={{ rotateX, rotateY, perspective: '1000px' }}
      onMouseMove={e => {
        const r = e.currentTarget.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onMouseLeave={() => { mx.set(0); my.set(0) }}
      variants={variants}
      initial={initial}
      animate={animate}
      exit={exit}
      whileHover={whileHover}
      transition={transition}
    >
      {children}
      <div className="tilt-highlight" aria-hidden />
    </motion.div>
  )
}
