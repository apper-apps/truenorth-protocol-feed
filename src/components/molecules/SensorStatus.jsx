import React from 'react'
import { motion } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'

const SensorStatus = ({ 
  isSupported = false, 
  isActive = false, 
  accuracy = 0,
  hasPermission = false,
  className = '' 
}) => {
  const getStatusColor = () => {
    if (!isSupported) return 'text-error'
    if (!hasPermission) return 'text-warning'
    if (!isActive) return 'text-error'
    if (accuracy > 20) return 'text-error'
    if (accuracy > 10) return 'text-warning'
    return 'text-success'
  }

  const getStatusText = () => {
    if (!isSupported) return 'Device orientation not supported'
    if (!hasPermission) return 'Waiting for permission'
    if (!isActive) return 'Sensor inactive'
    if (accuracy > 20) return 'Poor accuracy - calibrate device'
    if (accuracy > 10) return 'Moderate accuracy'
    return 'Good accuracy'
  }

  const getStatusIcon = () => {
    if (!isSupported) return 'XCircle'
    if (!hasPermission) return 'Clock'
    if (!isActive) return 'AlertCircle'
    if (accuracy > 20) return 'AlertTriangle'
    if (accuracy > 10) return 'AlertCircle'
    return 'CheckCircle'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
animate={{ opacity: 1, y: 0 }}
className={`flex items-center space-x-4 p-4 sm:p-5 glass-morphism rounded-glass-lg border border-glass-200 shadow-glass ${className}`}
    >
      <motion.div
        animate={{
          scale: isActive ? [1, 1.1, 1] : 1,
        }}
        transition={{
          duration: 2,
          repeat: isActive ? Infinity : 0,
          ease: "easeInOut"
        }}
      >
        <ApperIcon 
          name={getStatusIcon()} 
          className={`w-5 h-5 ${getStatusColor()}`} 
        />
      </motion.div>
      
      <div className="flex-1">
        <div className="text-sm font-medium text-white">
          Compass Sensor
        </div>
        <div className={`text-xs ${getStatusColor()}`}>
          {getStatusText()}
        </div>
      </div>
      
      {accuracy > 0 && (
        <div className="text-right">
          <div className="text-xs text-gray-400">Accuracy</div>
          <div className={`text-sm font-bold ${getStatusColor()}`}>
            ±{Math.round(accuracy)}°
          </div>
        </div>
      )}
    </motion.div>
  )
}

export default SensorStatus