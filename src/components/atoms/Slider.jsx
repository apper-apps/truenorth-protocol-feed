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
    <div className={`space-y-3 ${className}`}>
      {label && (
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-1 sm:space-y-0">
          <label className="block text-sm sm:text-base font-medium text-gray-300">
            {label}
          </label>
          <span className="text-sm sm:text-base font-bold text-secondary">
            {value}{unit}
          </span>
        </div>
      )}
      
      <div className="relative">
        <motion.input
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
<div className="flex justify-between text-xs sm:text-sm text-gray-500 mt-2">
          <span>{min}{unit}</span>
          <span>{max}{unit}</span>
        </div>
      </div>
    </div>
  )
}

export default Slider