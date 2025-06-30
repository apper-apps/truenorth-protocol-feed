import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  icon, 
  iconPosition = 'left',
  disabled = false,
  loading = false,
  onClick,
  className = '',
  ...props 
}) => {
const variants = {
    primary: 'bg-gradient-to-r from-glass-primary-300 to-glass-primary-200 text-white border-glass-primary-400 hover:from-glass-primary-400 hover:to-glass-primary-300 shadow-glass',
    secondary: 'bg-glass-100 text-white border-glass-200 hover:bg-glass-200 hover:border-glass-300 shadow-glass',
    outline: 'bg-glass-50 text-primary border-glass-primary-300 hover:bg-glass-primary-100 hover:border-glass-primary-400 shadow-glass',
    danger: 'bg-gradient-to-r from-error/20 to-error/10 text-white border-error/40 hover:from-error/30 hover:to-error/20 shadow-glass',
    success: 'bg-gradient-to-r from-success/20 to-success/10 text-white border-success/40 hover:from-success/30 hover:to-success/20 shadow-glass'
  }

  const sizes = {
    sm: 'px-4 py-3 sm:px-5 sm:py-3 text-sm sm:text-base min-h-touch',
    md: 'px-5 py-3 sm:px-7 sm:py-4 text-base sm:text-lg min-h-button',
    lg: 'px-7 py-4 sm:px-9 sm:py-5 text-lg sm:text-xl min-h-button'
  }

  return (
    <motion.button
      whileHover={{ 
        scale: disabled ? 1 : 1.02,
        y: disabled ? 0 : -2
      }}
      whileTap={{ 
        scale: disabled ? 1 : 0.98,
        y: disabled ? 0 : 0
      }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative rounded-glass border font-medium transition-all duration-300
        backdrop-blur-md -webkit-backdrop-filter
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:shadow-glass-lg'}
        ${className}
        flex items-center justify-center gap-2 overflow-hidden
      `}
      {...props}
    >
      {/* Glass reflection effect */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-glass-100 to-transparent opacity-20 pointer-events-none" />
      
      {loading && (
        <ApperIcon name="Loader2" className="w-4 h-4 animate-spin" />
      )}
      
      {icon && iconPosition === 'left' && !loading && (
        <ApperIcon name={icon} className="w-4 h-4" />
      )}
      
      {children}
      
      {icon && iconPosition === 'right' && !loading && (
        <ApperIcon name={icon} className="w-4 h-4" />
      )}
    </motion.button>
  )
}

export default Button