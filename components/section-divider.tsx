'use client'

import { motion } from 'framer-motion'

export default function SectionDivider() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.125 }}
      className="bg-muted my-6 h-8 w-1 rounded-full sm:my-12"
    ></motion.div>
  )
}