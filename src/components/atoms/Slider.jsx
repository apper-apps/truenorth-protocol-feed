import React from 'react'
import { motion } from 'framer-motion'

const Slider = ({
  label,
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  unit = '',
  disabled = false,
  className = '',
  ...props
}) => {
return (
    <div className={`space-y-4 ${className}`}>
      {label && (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-2 sm:space-y-0">
          <label className="block text-sm sm:text-base font-medium text-glass-200">
            {label}
          </label>
          <motion.span 
            key={value}
            initial={{ scale: 1.1, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="text-sm sm:text-base font-bold text-secondary bg-glass-primary-100 px-3 py-1 rounded-full backdrop-blur-sm"
          >
            {value}{unit}
          </motion.span>
        </div>
      )}
      
      <div className="relative">
        <motion.input
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          disabled={disabled}
          className={`
            range-slider w-full
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          `}
          {...props}
        />
        <div className="flex justify-between text-xs sm:text-sm text-glass-300 mt-3">
          <span className="bg-glass-dark-100 px-2 py-1 rounded-md backdrop-blur-sm">{min}{unit}</span>
          <span className="bg-glass-dark-100 px-2 py-1 rounded-md backdrop-blur-sm">{max}{unit}</span>
        </div>
      </div>
    </div>
  )
}

export default Slider