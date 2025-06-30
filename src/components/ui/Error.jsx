import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const Error = ({ 
  message = "Unable to access compass sensors", 
  onRetry,
  className = '' 
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={`flex flex-col items-center justify-center space-y-6 p-8 ${className}`}
    >
<div className="w-20 h-20 bg-error/20 glass-morphism rounded-full flex items-center justify-center shadow-glass">
        <ApperIcon name="AlertTriangle" className="w-10 h-10 text-error" />
      </div>
      
      <div className="text-center space-y-2">
        <h3 className="text-xl font-display font-bold text-white">
          Compass Error
        </h3>
        <p className="text-gray-400 max-w-md">
          {message}
        </p>
      </div>

      <div className="space-y-3 text-center">
        <p className="text-sm text-gray-500">
          Try the following:
        </p>
        <ul className="text-sm text-gray-400 space-y-1">
          <li>• Enable location services</li>
          <li>• Allow motion sensor access</li>
          <li>• Check device orientation lock</li>
          <li>• Restart your browser</li>
        </ul>
      </div>

      {onRetry && (
        <Button onClick={onRetry} icon="RefreshCw" size="lg">
          Try Again
        </Button>
      )}
    </motion.div>
  )
}

export default Error