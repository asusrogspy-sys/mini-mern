import axios from 'axios'

import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

const Login = () => {
  const navigate = useNavigate()

  const [userData, setUserData] = useState({
    usernameoremail: '',

    password: ''
  })

  const onCheck = e => {
    const res = e.target.value

    setUserData(prev => ({
      ...prev,

      [e.target.name]: res
    }))
  }

  console.log(userData)

  const formPrevent = async e => {
    e.preventDefault()

    console.log('submit')

    if (!userData.usernameoremail || !userData.password) {
      return alert('Please Fill All Fields')
    }

    try {
      await axios.post(
        'https://mini-mern-2.onrender.com/api/auth/login',

        userData,

        {
          withCredentials: true
        }
      )

      console.log('ys')

      setUserData({
        usernameoremail: '',

        password: ''
      })

      console.log(userData)

      navigate('/')

      console.log('ys2')
    } catch (error) {
      console.log(error)
      console.log('LOGIN ERROR:', error)
      console.log('STATUS:', error.response?.status)
      console.log('DATA:', error.response?.data)
    }
  }

  return (
    <div className='min-h-screen bg-black flex items-center justify-center px-4 py-6'>
      <div className='flex justify-center w-full max-w-md min-h-20 bg-green-950 border p-2 border-green-400 rounded-xl shadow-[0_0_35px_rgba(34,197,94,0.45)]'>
        <div className='flex items-center justify-center w-full'>
          <form
            onSubmit={formPrevent}
            autoComplete='off'
            className='w-full flex items-center justify-center flex-col gap-4 mt-2 bg-black border border-green-500 text-green-400 placeholder-green-700 rounded-lg px-4 sm:px-5 py-5 mb-4 outline-none shadow-[0_0_20px_rgba(34,197,94,0.2)]'
          >
            <div className='w-full text-center text-green-500 font-mono text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] border-b border-green-900 pb-3'>
              LOGIN_TERMINAL
            </div>

            <input
              type='text'
              placeholder='username or email'
              name='usernameoremail'
              value={userData.usernameoremail}
              onChange={onCheck}
              autoComplete='username'
              className='w-full bg-black border border-green-900 text-green-400 placeholder-green-900 px-3 py-2 text-sm sm:text-base font-mono outline-none focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-green-400 focus:shadow-[0_0_12px_rgba(34,197,94,0.35)]'
            />

            <input
              type='password'
              placeholder='Enter password'
              name='password'
              value={userData.password}
              onChange={onCheck}
              autoComplete='new-password'
              className='w-full bg-black border border-green-900 text-green-400 placeholder-green-900 px-3 py-2 text-sm sm:text-base font-mono outline-none focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-green-400 focus:shadow-[0_0_12px_rgba(34,197,94,0.35)]'
            />

            <div className='h-1 w-full bg-green-700 shadow-[0_0_15px_rgba(74,222,128,0.7)]'></div>

            <div className='flex flex-col sm:flex-row w-full sm:w-auto gap-3 sm:gap-6'>
              <button
                className='w-full sm:w-auto border border-green-700 px-4 py-2 text-green-400 font-mono text-sm sm:text-base hover:bg-green-500 hover:text-black hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all duration-200'
                type='submit'
              >
                [ LOGIN ]
              </button>

              <button
                type='button'
                onClick={() => navigate('/register')}
                className='w-full sm:w-auto border border-green-700 px-4 py-2 text-green-400 font-mono text-sm sm:text-base hover:bg-green-500 hover:text-black hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all duration-200'
              >
                [ REGISTER ]
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login
