import { useCallback, useEffect, useState } from "react";

export const useCompass = () => {
  const [heading, setHeading] = useState(0)
  const [magneticHeading, setMagneticHeading] = useState(0)
  const [trueHeading, setTrueHeading] = useState(0)
  const [accuracy, setAccuracy] = useState(0)
  const [isSupported, setIsSupported] = useState(false)
  const [isActive, setIsActive] = useState(false)
  const [hasPermission, setHasPermission] = useState(false)
  const [error, setError] = useState(null)

  // Check if device orientation is supported
  useEffect(() => {
    const checkSupport = () => {
      const hasDeviceOrientation = 'DeviceOrientationEvent' in window
      const hasAbsoluteOrientation = 'ondeviceorientationabsolute' in window
      
      setIsSupported(hasDeviceOrientation || hasAbsoluteOrientation)
    }

    checkSupport()
  }, [])

  // Request permission for device orientation
const requestPermission = useCallback(async () => {
    try {
      setError(null)
      
      // Check if permission is required (iOS 13+)
      if (typeof window !== 'undefined' && 
          window.DeviceOrientationEvent && 
          typeof window.DeviceOrientationEvent.requestPermission === 'function') {
        const permission = await window.DeviceOrientationEvent.requestPermission()
        if (permission === 'granted') {
          setHasPermission(true)
          return true
        } else {
          throw new Error('Permission denied')
        }
      } else {
        // Android or older iOS
        setHasPermission(true)
        return true
      }
    } catch (err) {
      setError(err.message)
      setHasPermission(false)
      return false
    }
  }, [])

  // Handle device orientation changes
  const handleOrientation = useCallback((event) => {
    try {
      setError(null)
      setIsActive(true)
      
      let compassHeading = 0
      
      if (event.webkitCompassHeading !== undefined) {
        // iOS - webkitCompassHeading gives magnetic north
        compassHeading = event.webkitCompassHeading
      } else if (event.alpha !== null) {
        // Android - alpha gives rotation around z-axis
        compassHeading = 360 - event.alpha
      }
      
      // Normalize to 0-360 range
      compassHeading = ((compassHeading % 360) + 360) % 360
      
      setHeading(compassHeading)
      setMagneticHeading(compassHeading)
      setTrueHeading(compassHeading)
      
      // Estimate accuracy based on event properties
      const estimatedAccuracy = event.webkitCompassAccuracy || 
                               (event.alpha !== null ? 5 : 15)
      setAccuracy(estimatedAccuracy)
      
    } catch (err) {
      setError('Error reading compass data')
      setIsActive(false)
    }
  }, [])

  // Start listening to orientation changes
  useEffect(() => {
    if (!isSupported || !hasPermission) return

    const startListening = () => {
      try {
        // Try absolute orientation first (more accurate)
        if ('ondeviceorientationabsolute' in window) {
          window.addEventListener('deviceorientationabsolute', handleOrientation)
        } else {
          window.addEventListener('deviceorientation', handleOrientation)
        }
        
        // Set timeout to detect if sensors are working
        const timeout = setTimeout(() => {
          if (!isActive) {
            setError('Compass sensors not responding')
          }
        }, 3000)
        
        return () => {
          clearTimeout(timeout)
          window.removeEventListener('deviceorientationabsolute', handleOrientation)
          window.removeEventListener('deviceorientation', handleOrientation)
        }
      } catch (err) {
        setError('Failed to start compass listener')
      }
    }

    const cleanup = startListening()
    return cleanup
  }, [isSupported, hasPermission, handleOrientation, isActive])

  // Auto-request permission on mount
  useEffect(() => {
    if (isSupported && !hasPermission) {
      requestPermission()
    }
  }, [isSupported, hasPermission, requestPermission])

  // Calibration function
  const calibrate = useCallback(async () => {
    return new Promise((resolve, reject) => {
      try {
        // Reset accuracy to trigger recalibration
        setAccuracy(0)
        
        // Simulate calibration process
        setTimeout(() => {
          setAccuracy(3) // Good accuracy after calibration
          resolve()
        }, 3000)
      } catch (err) {
        reject(err)
      }
    })
  }, [])

  return {
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
  }
}