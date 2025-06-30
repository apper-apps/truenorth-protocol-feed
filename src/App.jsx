import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { motion } from 'framer-motion'
import CompassPage from '@/components/pages/CompassPage'

function App() {
return (
    <Router>
      <div className="min-h-screen bg-background liquid-glass-pattern relative overflow-hidden">
        {/* Liquid Glass Background Layer */}
        <div className="absolute inset-0 bg-gradient-to-br from-glass-primary-50 via-transparent to-glass-primary-100 pointer-events-none" />
        <div className="absolute inset-0 bg-liquid-gradient opacity-30 pointer-events-none" />
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="min-h-screen relative z-10"
        >
          <Routes>
            <Route path="/" element={<CompassPage />} />
          </Routes>
        </motion.div>
        
        <ToastContainer
          position="top-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          style={{ 
            zIndex: 9999,
            top: '1rem',
            left: '1rem',
            right: '1rem',
            width: 'auto'
          }}
          toastClassName="liquid-glass-toast"
        />
      </div>
    </Router>
  )
}

export default App