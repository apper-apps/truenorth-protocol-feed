import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const Loading = ({ message = "Loading compass...", className = '' }) => {
  return (
    <div className={`flex flex-col items-center justify-center space-y-4 ${className}`}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        className="w-16 h-16 border-4 border-primary/20 border-t-primary rounded-full"
      />
      
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto">
          <ApperIcon name="Compass" className="w-6 h-6 text-primary animate-pulse" />
        </div>
        <p className="text-gray-400 text-sm">{message}</p>
      </div>

      {/* Skeleton Compass */}
      <div className="w-80 h-80 border-4 border-gray-700 rounded-full bg-surface/50 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-1 h-32 bg-gray-600 rounded-full animate-pulse" />
        </div>
      </div>

      {/* Skeleton Heading Display */}
      <div className="w-full max-w-sm space-y-4">
        <div className="bg-surface/50 rounded-xl p-6 animate-pulse">
          <div className="h-16 bg-gray-700 rounded mb-2"></div>
          <div className="h-6 bg-gray-700 rounded w-1/2 mx-auto"></div>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-surface/50 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-8 bg-gray-700 rounded"></div>
          </div>
          <div className="bg-surface/50 rounded-lg p-4 animate-pulse">
            <div className="h-4 bg-gray-700 rounded mb-2"></div>
            <div className="h-8 bg-gray-700 rounded"></div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Loading