import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { toast } from 'react-toastify'
import CompassRose from '@/components/molecules/CompassRose'
import HeadingDisplay from '@/components/molecules/HeadingDisplay'
import SensorStatus from '@/components/molecules/SensorStatus'
import CalibrationPanel from '@/components/molecules/CalibrationPanel'
import Button from '@/components/atoms/Button'
import Slider from '@/components/atoms/Slider'
import ApperIcon from '@/components/ApperIcon'
import { useCompass } from '@/hooks/useCompass'

const CompassDisplay = ({ className = '' }) => {
  const {
    heading,
    magneticHeading,
    trueHeading,
    accuracy,
    isSupported,
    isActive,
    hasPermission,
    error,
    requestPermission,
    calibrate
  } = useCompass()

  const [showCalibration, setShowCalibration] = useState(false)
  const [isCalibrating, setIsCalibrating] = useState(false)
  const [declination, setDeclination] = useState(0)
  const [showSettings, setShowSettings] = useState(false)

  useEffect(() => {
    if (error) {
      toast.error(error)
    }
  }, [error])

  useEffect(() => {
    if (!isSupported) {
      toast.error("Your device doesn't support compass functionality")
    }
  }, [isSupported])

  const handleCalibrate = async () => {
    setIsCalibrating(true)
    try {
      await calibrate()
      setTimeout(() => {
        setIsCalibrating(false)
        setShowCalibration(false)
        toast.success("Compass calibrated successfully!")
      }, 3000)
    } catch (err) {
      setIsCalibrating(false)
      toast.error("Calibration failed. Please try again.")
    }
  }

  const handlePermissionRequest = async () => {
    try {
      await requestPermission()
      toast.success("Compass permission granted!")
    } catch (err) {
      toast.error("Permission denied. Please enable location/motion sensors.")
    }
  }

  if (!isSupported) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center space-y-4">
          <ApperIcon name="AlertCircle" className="w-16 h-16 text-error mx-auto" />
          <h2 className="text-2xl font-display font-bold text-white">
            Compass Not Supported
          </h2>
          <p className="text-gray-400 max-w-md">
            Your device doesn't support compass functionality. Please try using a different device with orientation sensors.
          </p>
        </div>
      </div>
    )
  }

  if (!hasPermission) {
    return (
      <div className="flex items-center justify-center min-h-screen p-4">
        <div className="text-center space-y-6">
          <ApperIcon name="Compass" className="w-16 h-16 text-primary mx-auto" />
          <h2 className="text-2xl font-display font-bold text-white">
            Enable Compass
          </h2>
          <p className="text-gray-400 max-w-md">
            TrueNorth needs access to your device's orientation sensors to provide accurate compass readings.
          </p>
          <Button onClick={handlePermissionRequest} icon="Unlock" size="lg">
            Grant Permission
          </Button>
        </div>
      </div>
    )
  }

return (
    <div className={`space-y-4 sm:space-y-6 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between p-mobile sm:p-4">
        <div className="flex-1 min-w-0">
          <h1 className="text-xl sm:text-2xl font-display font-bold text-white truncate">
            TrueNorth
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">Precision Compass</p>
        </div>
        <div className="flex space-x-2 ml-4">
          <Button
            variant="outline"
            size="sm"
            icon="Settings"
            onClick={() => setShowSettings(!showSettings)}
            className="min-h-touch min-w-touch"
          />
          <Button
            variant="outline"
            size="sm"
            icon="Compass"
            onClick={() => setShowCalibration(true)}
            className="min-h-touch min-w-touch"
          />
        </div>
      </div>

      {/* Sensor Status */}
{/* Sensor Status */}
      <div className="px-mobile sm:px-4">
        <SensorStatus
          isSupported={isSupported}
          isActive={isActive}
          accuracy={accuracy}
          hasPermission={hasPermission}
        />
      </div>

      {/* Settings Panel */}
      {showSettings && (
        <motion.div
initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="px-mobile sm:px-4"
        >
          <div className="bg-surface rounded-lg p-mobile sm:p-4 border border-primary/30 space-y-4">
            <h3 className="text-base sm:text-lg font-display font-bold text-white">Settings</h3>
            
            <Slider
              label="Magnetic Declination"
              value={declination}
              onChange={setDeclination}
              min={-30}
              max={30}
              step={0.1}
              unit="°"
            />
            
            <div className="text-xs text-gray-400">
              Adjust for your location's magnetic declination to get true north readings.
            </div>
          </div>
        </motion.div>
      )}
{/* Heading Display */}
      <div className="px-mobile sm:px-4">
        <HeadingDisplay
          heading={heading}
          magneticHeading={magneticHeading}
          trueHeading={trueHeading + declination}
        />
      </div>

      {/* Compass Rose */}
      <div className="flex justify-center px-mobile sm:px-4">
        <CompassRose
          heading={heading}
          accuracy={accuracy}
        />
      </div>

      {/* Quick Actions */}
      <div className="px-mobile sm:px-4 pb-8">
        <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
<Button
            variant="outline"
            size="sm"
            icon="RotateCcw"
            onClick={() => setShowCalibration(true)}
            className="w-full sm:w-auto min-h-button"
          >
            Calibrate
          </Button>
          <Button
            variant="outline"
            size="sm"
            icon="Bookmark"
            onClick={() => toast.info("Bearing saved!")}
            className="w-full sm:w-auto min-h-button"
          >
            Save Bearing
          </Button>
        </div>
      </div>

      {/* Calibration Panel */}
      <CalibrationPanel
        isVisible={showCalibration}
        onClose={() => setShowCalibration(false)}
        onCalibrate={handleCalibrate}
        isCalibrating={isCalibrating}
      />
    </div>
  )
}

export default CompassDisplay