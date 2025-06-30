import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { motion } from 'framer-motion'
import CompassPage from '@/components/pages/CompassPage'

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background topo-pattern">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="min-h-screen"
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
          toastClassName="mobile-toast"
        />
      </div>
    </Router>
  )
}

export default App