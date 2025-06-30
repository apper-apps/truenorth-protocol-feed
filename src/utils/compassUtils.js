/**
 * Utility functions for compass calculations and conversions
 */

/**
 * Convert degrees to radians
 */
export const degreesToRadians = (degrees) => {
  return degrees * (Math.PI / 180)
}

/**
 * Convert radians to degrees
 */
export const radiansToDegrees = (radians) => {
  return radians * (180 / Math.PI)
}

/**
 * Normalize angle to 0-360 range
 */
export const normalizeAngle = (angle) => {
  return ((angle % 360) + 360) % 360
}

/**
 * Calculate the difference between two angles
 */
export const angleDifference = (angle1, angle2) => {
  const diff = Math.abs(angle1 - angle2)
  return Math.min(diff, 360 - diff)
}

/**
 * Get direction name from bearing
 */
export const getDirectionName = (bearing) => {
  const directions = [
    'N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE',
    'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW'
  ]
  const index = Math.round(bearing / 22.5) % 16
  return directions[index]
}

/**
 * Get cardinal direction from bearing
 */
export const getCardinalDirection = (bearing) => {
  const directions = ['N', 'E', 'S', 'W']
  const index = Math.round(bearing / 90) % 4
  return directions[index]
}

/**
 * Calculate true bearing from magnetic bearing
 */
export const magneticToTrue = (magneticBearing, declination) => {
  return normalizeAngle(magneticBearing + declination)
}

/**
 * Calculate magnetic bearing from true bearing
 */
export const trueToMagnetic = (trueBearing, declination) => {
  return normalizeAngle(trueBearing - declination)
}

/**
 * Format bearing for display
 */
export const formatBearing = (bearing, decimals = 0) => {
  return bearing.toFixed(decimals).padStart(3, '0')
}

/**
 * Calculate bearing accuracy level
 */
export const getAccuracyLevel = (accuracy) => {
  if (accuracy <= 5) return 'excellent'
  if (accuracy <= 10) return 'good'
  if (accuracy <= 20) return 'fair'
  return 'poor'
}

/**
 * Get accuracy color for UI
 */
export const getAccuracyColor = (accuracy) => {
  if (accuracy <= 5) return 'text-success'
  if (accuracy <= 10) return 'text-info'
  if (accuracy <= 20) return 'text-warning'
  return 'text-error'
}

/**
 * Calculate distance between two geographic points
 */
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371 // Earth's radius in kilometers
  const dLat = degreesToRadians(lat2 - lat1)
  const dLon = degreesToRadians(lon2 - lon1)
  
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(degreesToRadians(lat1)) * Math.cos(degreesToRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2)
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c
}

/**
 * Calculate bearing between two geographic points
 */
export const calculateBearing = (lat1, lon1, lat2, lon2) => {
  const dLon = degreesToRadians(lon2 - lon1)
  const lat1Rad = degreesToRadians(lat1)
  const lat2Rad = degreesToRadians(lat2)
  
  const y = Math.sin(dLon) * Math.cos(lat2Rad)
  const x = Math.cos(lat1Rad) * Math.sin(lat2Rad) -
    Math.sin(lat1Rad) * Math.cos(lat2Rad) * Math.cos(dLon)
  
  const bearing = radiansToDegrees(Math.atan2(y, x))
  return normalizeAngle(bearing)
}

/**
 * Smooth compass readings to reduce jitter
 */
export const smoothCompassReading = (readings, windowSize = 5) => {
  if (readings.length < windowSize) return readings[readings.length - 1] || 0
  
  const recentReadings = readings.slice(-windowSize)
  const sum = recentReadings.reduce((acc, reading) => acc + reading, 0)
  return sum / recentReadings.length
}

/**
 * Detect if device is being held in portrait or landscape
 */
export const getDeviceOrientation = () => {
  const orientation = window.screen?.orientation?.angle || window.orientation || 0
  
  switch (orientation) {
    case 0:
      return 'portrait'
    case 90:
      return 'landscape-left'
    case 180:
      return 'portrait-upside-down'
    case 270:
    case -90:
      return 'landscape-right'
    default:
      return 'portrait'
  }
}

/**
 * Adjust compass reading based on device orientation
 */
export const adjustForOrientation = (reading) => {
  const orientation = getDeviceOrientation()
  
  switch (orientation) {
    case 'landscape-left':
      return normalizeAngle(reading + 90)
    case 'portrait-upside-down':
      return normalizeAngle(reading + 180)
    case 'landscape-right':
      return normalizeAngle(reading + 270)
    default:
      return reading
  }
}