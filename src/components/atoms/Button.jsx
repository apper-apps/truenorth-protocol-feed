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
    primary: 'bg-gradient-to-r from-primary to-secondary text-white border-primary hover:from-secondary hover:to-primary',
    secondary: 'bg-surface text-white border-primary hover:bg-primary hover:text-white',
    outline: 'bg-transparent text-primary border-primary hover:bg-primary hover:text-white',
    danger: 'bg-gradient-to-r from-error to-red-600 text-white border-error hover:from-red-600 hover:to-error',
    success: 'bg-gradient-to-r from-success to-green-600 text-white border-success hover:from-green-600 hover:to-success'
  }

  const sizes = {
    sm: 'px-3 py-2 text-sm',
    md: 'px-4 py-3 text-base',
    lg: 'px-6 py-4 text-lg'
  }

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled || loading}
      className={`
        relative rounded-lg border-2 font-medium transition-all duration-200
        ${variants[variant]}
        ${sizes[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        ${className}
        flex items-center justify-center gap-2
      `}
      {...props}
    >
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