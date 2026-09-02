 import axios from 'axios'
import { useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const getUser = async () => {
      try {
        await axios.get(
          'https://mini-mern-2.onrender.com/api/auth/',
          {
            withCredentials: true
          }
        )

        setIsAuthenticated(true)
      } catch (error) {
        console.log('AUTH ERROR:', error)
        setIsAuthenticated(false)
      } finally {
        setLoading(false)
      }
    }

    getUser()
  }, [])

  if (loading) {
    return (
      <div className='min-h-screen w-full bg-black flex items-center justify-center'>
        <p className='text-green-500 font-mono'>
          Checking authentication...
        </p>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to='/login' replace />
  }

  return (
    <div className='min-h-screen w-full bg-black'>
      {children}
    </div>
  )
}

export default ProtectedRoute