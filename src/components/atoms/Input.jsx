import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Input = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  error,
  disabled = false,
  icon,
  className = '',
  ...props
}) => {
return (
    <div className={`space-y-3 ${className}`}>
      {label && (
        <label className="block text-sm sm:text-base font-medium text-glass-200 mb-2">
          {label}
        </label>
      )}
      
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <ApperIcon name={icon} className="h-5 w-5 text-glass-300" />
          </div>
        )}
        
        <motion.input
          whileFocus={{ scale: 1.01 }}
          whileHover={{ scale: 1.005 }}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          disabled={disabled}
          className={`
            glass-input w-full px-4 py-3 sm:py-4 rounded-glass text-white
            placeholder-glass-300 focus:outline-none 
            transition-all duration-300 text-base min-h-touch
            ${icon ? 'pl-12 sm:pl-14' : ''}
            ${error ? 'border-error/60 bg-error/5' : ''}
            ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          `}
          {...props}
        />
        
        {/* Glass reflection effect */}
        <div className="absolute inset-0 rounded-glass bg-gradient-to-r from-transparent via-glass-50 to-transparent opacity-20 pointer-events-none" />
      </div>
      
      {error && (
        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-sm text-error bg-error/10 p-2 rounded-lg backdrop-blur-sm"
        >
          {error}
        </motion.p>
      )}
    </div>
  )
}

export default Input