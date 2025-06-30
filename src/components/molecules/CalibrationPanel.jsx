import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '@/components/ApperIcon'
import Button from '@/components/atoms/Button'

const CalibrationPanel = ({ 
  isVisible = false, 
  onClose, 
  onCalibrate,
  isCalibrating = false,
  className = '' 
}) => {
  const [step, setStep] = useState(0)
  const [progress, setProgress] = useState(0)

  const calibrationSteps = [
    {
      title: "Hold device flat",
      description: "Hold your device horizontally like a table",
      icon: "Smartphone"
    },
    {
      title: "Rotate in figure-8",
      description: "Move your device in a figure-8 pattern",
      icon: "RotateCcw"
    },
    {
      title: "Tilt and rotate",
      description: "Tilt the device and rotate it slowly",
      icon: "Rotate3D"
    }
  ]

  useEffect(() => {
    if (isCalibrating) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval)
            setStep(prev => Math.min(prev + 1, calibrationSteps.length - 1))
            return 0
          }
          return prev + 2
        })
      }, 100)

      return () => clearInterval(interval)
    }
  }, [isCalibrating, step])

  const handleStartCalibration = () => {
    setStep(0)
    setProgress(0)
    onCalibrate()
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
exit={{ opacity: 0 }}
className="fixed inset-0 bg-black/60 backdrop-blur-lg flex items-center justify-center z-50 p-mobile sm:p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className={`glass-morphism-strong rounded-glass-xl p-6 sm:p-8 border border-glass-300 max-w-mobile-safe sm:max-w-md w-full max-h-[90vh] overflow-y-auto shadow-glass-xl ${className}`}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-display font-bold text-white">
                Calibrate Compass
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <ApperIcon name="X" className="w-6 h-6" />
              </button>
            </div>

            {!isCalibrating ? (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <ApperIcon name="Compass" className="w-8 h-8 text-primary" />
                  </div>
                  <p className="text-gray-300 text-sm">
                    For best accuracy, calibrate your compass by following the steps below.
                  </p>
                </div>

                <div className="space-y-4">
                  {calibrationSteps.map((step, index) => (
<div key={index} className="flex items-center space-x-3 p-4 glass-morphism rounded-glass border border-glass-200">
                      <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                        <ApperIcon name={step.icon} className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-white">{step.title}</div>
                        <div className="text-xs text-gray-400">{step.description}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" onClick={onClose} className="flex-1">
                    Cancel
                  </Button>
                  <Button onClick={handleStartCalibration} className="flex-1">
                    Start Calibration
                  </Button>
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                <div className="text-center">
                  <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4 relative">
                    <div className="w-6 h-6 bg-primary rounded-full figure-eight" />
                  </div>
                  <h3 className="text-lg font-bold text-white mb-2">
                    {calibrationSteps[step].title}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    {calibrationSteps[step].description}
                  </p>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-400">Progress</span>
                    <span className="text-white">{Math.round(progress)}%</span>
                  </div>
<div className="w-full glass-morphism rounded-full h-3 border border-glass-200">
                    <motion.div
                      className="bg-gradient-to-r from-primary to-secondary h-2 rounded-full"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.1 }}
                    />
                  </div>
                </div>

                <div className="text-center">
                  <div className="text-sm text-gray-400">
                    Step {step + 1} of {calibrationSteps.length}
                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default CalibrationPanel