import React from 'react'
import { motion } from 'framer-motion'

const HeadingDisplay = ({ heading = 0, magneticHeading = 0, trueHeading = 0, className = '' }) => {
  const getDirectionName = (degrees) => {
    const directions = [
      'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
      'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
    ]
    const index = Math.round(degrees / 22.5) % 16
    return directions[index]
  }

  const formatHeading = (degrees) => {
    return Math.round(degrees).toString().padStart(3, '0')
  }

  return (
    <div className={`space-y-4 ${className}`}>
      {/* Main Heading Display */}
<div className="text-center">
        <div className="glass-morphism-strong rounded-glass-xl p-6 sm:p-8 border border-glass-300 shadow-glass-lg">
          <div className="flex items-center justify-center space-x-4">
            <div className="text-center">
              <motion.div 
                key={formatHeading(heading)}
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="font-display text-mobile-display sm:text-6xl font-bold text-white"
              >
                {formatHeading(heading)}°
              </motion.div>
              <div className="font-body text-base sm:text-xl font-medium text-secondary mt-1">
                {getDirectionName(heading)}
              </div>
            </div>
          </div>
        </div>
      </div>
{/* Detailed Readings */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
<div className="glass-morphism rounded-glass-lg p-4 sm:p-5 border border-glass-200 shadow-glass">
          <div className="text-xs sm:text-sm text-gray-400 mb-1">Magnetic Heading</div>
          <div className="font-display text-mobile-heading sm:text-2xl font-bold text-white">
            {formatHeading(magneticHeading)}°
          </div>
        </div>
<div className="glass-morphism rounded-glass-lg p-4 sm:p-5 border border-glass-200 shadow-glass">
          <div className="text-xs sm:text-sm text-gray-400 mb-1">True Heading</div>
          <div className="font-display text-mobile-heading sm:text-2xl font-bold text-white">
            {formatHeading(trueHeading)}°
          </div>
        </div>
      </div>
    </div>
  )
}

export default HeadingDisplay