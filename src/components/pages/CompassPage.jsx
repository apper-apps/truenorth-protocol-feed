import React from 'react'
import { motion } from 'framer-motion'
import CompassDisplay from '@/components/organisms/CompassDisplay'

const CompassPage = () => {
return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="min-h-screen relative"
    >
      <div className="w-full max-w-mobile-safe sm:max-w-md mx-auto px-4 sm:px-0 relative z-10">
        <div className="glass-morphism rounded-glass-xl p-4 sm:p-6 m-4 shadow-glass-lg">
          <CompassDisplay />
        </div>
      </div>
    </motion.div>
  )
}

export default CompassPage