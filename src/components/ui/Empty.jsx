import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Empty = ({ 
  message = "No compass data available", 
  action,
  onAction,
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`flex flex-col items-center justify-center space-y-6 p-8 ${className}`}
    >
      <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center">
        <ApperIcon name="Compass" className="w-10 h-10 text-primary" />
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-xl font-display font-bold text-white">
          Ready to Navigate
        </h3>
        <p className="text-gray-400 max-w-md">
          {message}
        </p>
      </div>

      <div className="text-center space-y-3">
        <div className="bg-surface rounded-lg p-4 border border-primary/30">
          <ApperIcon name="Smartphone" className="w-8 h-8 text-primary mx-auto mb-2" />
          <p className="text-sm text-gray-300">
            Hold your device flat and point it in the direction you want to measure
          </p>
        </div>
      </div>

      {action && onAction && (
        <Button onClick={onAction} icon="Play" size="lg">
          {action}
        </Button>
      )}
    </motion.div>
  )
}

export default Empty