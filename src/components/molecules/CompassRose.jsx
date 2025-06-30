import React from 'react'
import { motion } from 'framer-motion'

const CompassRose = ({ heading = 0, accuracy = 0, className = '' }) => {
  const cardinalDirections = [
    { angle: 0, label: 'N', color: 'text-accent' },
    { angle: 90, label: 'E', color: 'text-white' },
    { angle: 180, label: 'S', color: 'text-white' },
    { angle: 270, label: 'W', color: 'text-white' }
  ]

  const intercardinalDirections = [
    { angle: 45, label: 'NE' },
    { angle: 135, label: 'SE' },
    { angle: 225, label: 'SW' },
    { angle: 315, label: 'NW' }
  ]

  const generateTicks = () => {
    const ticks = []
    for (let i = 0; i < 360; i += 10) {
      const isMajor = i % 30 === 0
      const isCardinal = i % 90 === 0
      
      ticks.push(
        <div
          key={i}
          className="absolute top-0 left-1/2 transform -translate-x-1/2 origin-bottom"
          style={{
            transform: `translateX(-50%) rotate(${i}deg)`,
            height: '100%'
          }}
        >
          <div
            className={`
              bg-white mx-auto
              ${isCardinal ? 'w-1 h-8' : isMajor ? 'w-0.5 h-6' : 'w-0.5 h-4'}
            `}
          />
        </div>
      )
    }
    return ticks
  }

return (
    <div className={`relative ${className}`}>
      {/* Compass Ring */}
<div className="relative w-compass-mobile h-compass-mobile sm:w-80 sm:h-80 mx-auto">
        <div className="absolute inset-0 rounded-full border-2 sm:border-4 border-glass-primary-400 compass-ring glass-morphism-strong bg-gradient-to-br from-glass-primary-100 to-glass-primary-200">
          
          {/* Degree Ticks */}
          <div className="absolute inset-4 rounded-full">
            {generateTicks()}
          </div>

          {/* Cardinal Directions */}
          {cardinalDirections.map(({ angle, label, color }) => (
            <div
              key={label}
              className="absolute top-2 left-1/2 transform -translate-x-1/2 origin-bottom"
              style={{
                transform: `translateX(-50%) rotate(${angle}deg)`,
                height: '100%'
              }}
>
              <div
                className={`
                  font-display text-xl sm:text-2xl font-bold ${color}
                  transform rotate(-${angle}deg)
                  flex items-center justify-center
                  w-6 h-6 sm:w-8 sm:h-8
                `}
                style={{ transform: `rotate(-${angle}deg)` }}
              >
                {label}
              </div>
            </div>
          ))}

          {/* Intercardinal Directions */}
          {intercardinalDirections.map(({ angle, label }) => (
            <div
              key={label}
              className="absolute top-6 left-1/2 transform -translate-x-1/2 origin-bottom"
              style={{
                transform: `translateX(-50%) rotate(${angle}deg)`,
                height: '100%'
              }}
            >
              <div
                className="font-body text-sm font-medium text-gray-400 transform flex items-center justify-center w-6 h-6"
                style={{ transform: `rotate(-${angle}deg)` }}
              >
                {label}
              </div>
            </div>
          ))}

          {/* Compass Needle */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center compass-needle"
            animate={{ rotate: -heading }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              mass: 1
            }}
          >
            <div className="relative">
              {/* North Pointer (Red) */}
              <div 
                className="absolute w-1 bg-accent rounded-full shadow-lg"
                style={{
                  height: '120px',
                  top: '-120px',
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
              />
              
              {/* South Pointer (White) */}
              <div 
                className="absolute w-1 bg-white rounded-full shadow-lg"
                style={{
                  height: '120px',
                  top: '0px',
                  left: '50%',
                  transform: 'translateX(-50%)'
                }}
              />
              
              {/* Center Dot */}
              <div className="absolute w-4 h-4 bg-white rounded-full border-2 border-primary shadow-lg transform -translate-x-1/2 -translate-y-1/2" />
            </div>
          </motion.div>

          {/* Accuracy Indicator */}
          {accuracy > 0 && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div 
                className="border-2 border-warning rounded-full opacity-30"
                style={{
                  width: `${Math.min(accuracy * 4, 280)}px`,
                  height: `${Math.min(accuracy * 4, 280)}px`
                }}
              />
            </div>
          )}
        </div>

{/* Degree Markers */}
        <div className="absolute inset-0 flex items-center justify-center">
          {[0, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330].map((degree) => (
            <div
              key={degree}
              className="absolute text-xs sm:text-sm font-body text-gray-400 select-none"
              style={{
                transform: `rotate(${degree}deg) translateY(-130px) sm:translateY(-150px) rotate(-${degree}deg)`,
                transformOrigin: 'center'
              }}
            >
              {degree}°
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CompassRose