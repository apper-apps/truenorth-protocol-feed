import React from 'react'
import { motion } from 'framer-motion'
import CompassDisplay from '@/components/organisms/CompassDisplay'

const CompassPage = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-background"
    >
      <div className="max-w-md mx-auto">
        <CompassDisplay />
      </div>
    </motion.div>
  )
}

export default CompassPage