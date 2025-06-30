import compassReadingsData from '@/services/mockData/compassReadings.json'
import savedBearingsData from '@/services/mockData/savedBearings.json'
import calibrationData from '@/services/mockData/calibrationData.json'

class CompassService {
  constructor() {
    this.compassReadings = [...compassReadingsData]
    this.savedBearings = [...savedBearingsData]
    this.calibrationData = [...calibrationData]
  }

  // Simulate API delay
  delay(ms = 300) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  // Compass Readings
  async getAllReadings() {
    await this.delay()
    return [...this.compassReadings]
  }

  async getReadingById(id) {
    await this.delay()
    return this.compassReadings.find(reading => reading.Id === id)
  }

  async createReading(reading) {
    await this.delay()
    const newReading = {
      ...reading,
      Id: Math.max(...this.compassReadings.map(r => r.Id)) + 1,
      timestamp: new Date().toISOString()
    }
    this.compassReadings.push(newReading)
    return { ...newReading }
  }

  async updateReading(id, data) {
    await this.delay()
    const index = this.compassReadings.findIndex(reading => reading.Id === id)
    if (index !== -1) {
      this.compassReadings[index] = { ...this.compassReadings[index], ...data }
      return { ...this.compassReadings[index] }
    }
    throw new Error('Reading not found')
  }

  async deleteReading(id) {
    await this.delay()
    const index = this.compassReadings.findIndex(reading => reading.Id === id)
    if (index !== -1) {
      this.compassReadings.splice(index, 1)
      return true
    }
    throw new Error('Reading not found')
  }

  // Saved Bearings
  async getAllBearings() {
    await this.delay()
    return [...this.savedBearings]
  }

  async getBearingById(id) {
    await this.delay()
    return this.savedBearings.find(bearing => bearing.Id === id)
  }

  async createBearing(bearing) {
    await this.delay()
    const newBearing = {
      ...bearing,
      Id: Math.max(...this.savedBearings.map(b => b.Id)) + 1,
      timestamp: new Date().toISOString()
    }
    this.savedBearings.push(newBearing)
    return { ...newBearing }
  }

  async updateBearing(id, data) {
    await this.delay()
    const index = this.savedBearings.findIndex(bearing => bearing.Id === id)
    if (index !== -1) {
      this.savedBearings[index] = { ...this.savedBearings[index], ...data }
      return { ...this.savedBearings[index] }
    }
    throw new Error('Bearing not found')
  }

  async deleteBearing(id) {
    await this.delay()
    const index = this.savedBearings.findIndex(bearing => bearing.Id === id)
    if (index !== -1) {
      this.savedBearings.splice(index, 1)
      return true
    }
    throw new Error('Bearing not found')
  }

  // Calibration Data
  async getAllCalibrationData() {
    await this.delay()
    return [...this.calibrationData]
  }

  async getCalibrationById(id) {
    await this.delay()
    return this.calibrationData.find(cal => cal.Id === id)
  }

  async createCalibration(calibration) {
    await this.delay()
    const newCalibration = {
      ...calibration,
      Id: Math.max(...this.calibrationData.map(c => c.Id)) + 1,
      lastCalibration: new Date().toISOString()
    }
    this.calibrationData.push(newCalibration)
    return { ...newCalibration }
  }

  async updateCalibration(id, data) {
    await this.delay()
    const index = this.calibrationData.findIndex(cal => cal.Id === id)
    if (index !== -1) {
      this.calibrationData[index] = { 
        ...this.calibrationData[index], 
        ...data,
        lastCalibration: new Date().toISOString()
      }
      return { ...this.calibrationData[index] }
    }
    throw new Error('Calibration data not found')
  }

  async deleteCalibration(id) {
    await this.delay()
    const index = this.calibrationData.findIndex(cal => cal.Id === id)
    if (index !== -1) {
      this.calibrationData.splice(index, 1)
      return true
    }
    throw new Error('Calibration data not found')
  }
}

export default new CompassService()