 import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import axios from 'axios'


const Register = () => {

  const navigate = useNavigate()

  const [registerData, setRegisterData] = useState({

    username: '',

    email: '',

    password: '',

    role: ''

  })


  const registerUser = e => {

    const res = e.target.value

    setRegisterData(prev => ({

      ...prev,

      [e.target.name]: res

    }))

  }


  console.log(registerData)


  const submitData = async e => {

    e.preventDefault()

    if (
      !registerData.username ||
      !registerData.email ||
      !registerData.password
    ) {

      return alert('Please Fill Required Field')

    }

    const data = { ...registerData }

    if (!data.role) {

      delete data.role

    }

    try {

      await axios.post(
        'https://mini-mern-2.onrender.com/api/auth/register',
        data
      )

      setRegisterData({

        username: '',
        email: '',
        password: '',
        role: ''

      })

      console.log(registerData)

      navigate('/login')

    } catch (error) {

      console.log(error.message)

    }

  }


  return (

    <div className='min-h-screen bg-black flex items-center justify-center px-4 py-6'>

      <div className='flex justify-center w-full max-w-md min-h-20 bg-green-950 border p-2 border-green-400 rounded-xl shadow-[0_0_35px_rgba(34,197,94,0.45)]'>

        <div className='flex items-center justify-center w-full'>

          <form
            onSubmit={submitData}
            autoComplete="off"
            className='w-full flex items-center justify-center flex-col gap-3 mt-2 bg-black border border-green-500 text-green-400 placeholder-green-700 rounded-lg px-4 sm:px-5 py-5 mb-4 outline-none shadow-[0_0_20px_rgba(34,197,94,0.2)]'
          >

            <div className='w-full text-center text-green-500 font-mono text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.25em] border-b border-green-900 pb-3 break-all'>

              CREATE_USER.exe

            </div>


            <input
              type='text'
              placeholder='username'
              name='username'
              className='w-full bg-black border border-green-900 text-green-400 placeholder-green-900 px-3 py-2 text-sm sm:text-base font-mono outline-none focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-green-400 focus:shadow-[0_0_12px_rgba(34,197,94,0.35)]'
              value={registerData.username}
              onChange={registerUser}
              autoComplete="username"
              required
            />


            <input
              type='email'
              placeholder='email'
              name='email'
              className='w-full bg-black border border-green-900 text-green-400 placeholder-green-900 px-3 py-2 text-sm sm:text-base font-mono outline-none focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-green-400 focus:shadow-[0_0_12px_rgba(34,197,94,0.35)]'
              value={registerData.email}
              onChange={registerUser}
              autoComplete="email"
              required
            />


            <input
              type='password'
              placeholder='Enter password'
              name='password'
              className='w-full bg-black border border-green-900 text-green-400 placeholder-green-900 px-3 py-2 text-sm sm:text-base font-mono outline-none focus:outline-none focus:ring-1 focus:ring-green-400 focus:border-green-400 focus:shadow-[0_0_12px_rgba(34,197,94,0.35)]'
              value={registerData.password}
              onChange={registerUser}
              autoComplete="new-password"
              required
            />


            <select
              name='role'
              value={registerData.role}
              onChange={registerUser}
              className='w-full bg-black border border-green-900 text-green-400 px-3 py-2 text-sm sm:text-base font-mono outline-none focus:ring-1 focus:ring-green-400 focus:border-green-400'
            >

              <option value=''>Select Role (Optional)</option>

              <option value='user'>User</option>

              <option value='artist'>Artist</option>

            </select>


            <div className='h-1 w-full bg-green-700 shadow-[0_0_15px_rgba(74,222,128,0.7)]'>
            </div>


            <button
              className='border border-green-600 p-2 w-full text-base sm:text-xl font-bold font-mono text-green-400 hover:bg-green-500 hover:text-black hover:shadow-[0_0_20px_rgba(34,197,94,0.7)] transition-all duration-200'
              type='submit'
            >

              [ CREATE ACCOUNT ]

            </button>

          </form>

        </div>

      </div>

    </div>

  )

}


export default Register