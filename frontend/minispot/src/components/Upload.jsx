 import axios from 'axios'

import { useState } from 'react'

import { useNavigate } from 'react-router-dom'

import { useUser } from '../components/UserContext'


function Upload () {

  const { getData } = useUser()

  const [message, setMessage] = useState('')

  const navigate = useNavigate()

  const [uploadMusic, setUploadMusic] = useState({

    title: '',

    music: ''

  })

  const [isUploading, Setuploading] = useState(false)


  const formPrevent = async e => {

    e.preventDefault()

    const formdata = new FormData()

    console.log('STATE:', uploadMusic)

    formdata.append('title', uploadMusic.title)

    formdata.append('music', uploadMusic.music)

    console.log('FORMDATA:', [...formdata.entries()])


    try {

      if (getData.role !== 'artist') {

        setMessage('only artist baby')

        return

      }

      Setuploading(true)

      const res = await axios.post(

        'http://localhost:8000/api/music/upload',

        formdata,

        {

          withCredentials: true

        }

      )

      if (res.status === 200 || res.status === 201) {

        setMessage('music success')

      }

      Setuploading(false)

      navigate('/get-all-music')

      console.log(res.data)

    } catch (error) {

      console.log(error)

    }

    console.log(uploadMusic)

  }


  const uploadDetail = e => {

    const { name, value, files } = e.target

    setUploadMusic(prev => ({

      ...prev,

      [name]: name === 'music' ? files[0] : value

    }))

    console.log(uploadMusic)

  }


  return (

    <div className='min-h-screen w-full flex items-center justify-center bg-black text-green-400 font-mono px-4 py-6 sm:px-6'>

      <div className='w-full max-w-md min-h-60 bg-black flex flex-col p-4 sm:p-6 border border-green-500 rounded-lg shadow-[0_0_35px_rgba(34,197,94,0.35)]'>

        <div className='border-b border-green-900 pb-4 mb-5 sm:mb-6 text-center'>

          <p className='text-green-400 text-sm sm:text-base tracking-[0.15em] sm:tracking-[0.25em] break-all'>

            UPLOAD_PROTOCOL

          </p>

          <p className='text-green-900 text-[10px] sm:text-xs mt-2 break-all'>

            root@music-server:~$ upload

          </p>

        </div>


        <form
          onSubmit={formPrevent}
          className='flex flex-col gap-4 sm:gap-5'
        >

          <input
            type='text'
            placeholder='ENTER_TITLE...'
            name='title'
            value={uploadMusic.title}
            onChange={uploadDetail}
            className='w-full min-w-0 bg-black border border-green-900 rounded p-3 text-sm sm:text-base text-green-400 placeholder:text-green-900 outline-none focus:border-green-400 focus:shadow-[0_0_15px_rgba(34,197,94,0.35)]'
          />


          <label
            htmlFor='music'
            className='w-full cursor-pointer border border-green-900 rounded p-3 text-center text-sm sm:text-base text-green-500 hover:bg-green-500 hover:text-black hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all duration-200'
          >

            [ SELECT_AUDIO_FILE ]

          </label>


          <input
            id='music'
            type='file'
            placeholder='Upload Your Music'
            name='music'
            onChange={uploadDetail}
            className='hidden'
          />


          <button
            disabled={isUploading}
            type='submit'
            className='w-full min-w-0 border border-green-500 rounded p-3 text-sm sm:text-base text-green-400 tracking-widest hover:bg-green-500 hover:text-black hover:shadow-[0_0_25px_rgba(34,197,94,0.7)] transition-all duration-200'
          >

            {isUploading ? (

              <div className='w-full flex flex-col gap-3'>

                <div className='flex flex-col xs:flex-row justify-between items-start xs:items-center gap-1'>

                  <span className='text-green-400 text-[10px] sm:text-xs tracking-[0.15em] sm:tracking-[0.25em] animate-pulse'>
                    SYSTEM_UPLOAD
                  </span>

                  <span className='text-green-700 text-[10px] sm:text-xs'>
                    [ ACTIVE ]
                  </span>

                </div>


                <div className='relative w-full h-3 bg-black border border-green-800 overflow-hidden'>

                  <div className='absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(74,222,128,0.35),transparent)] animate-[translate_1.2s_linear_infinite]'>
                  </div>

                  <div className='absolute left-0 top-0 h-full w-1/3 bg-green-400 shadow-[0_0_20px_rgba(74,222,128,0.9)] animate-[pulse_0.7s_ease-in-out_infinite]'>
                  </div>

                </div>


                <div className='flex flex-col sm:flex-row justify-between gap-1 text-[9px] sm:text-[10px] tracking-widest'>

                  <span className='text-green-900 break-all'>
                    TRANSFERRING_FILE
                  </span>

                  <span className='text-green-500 animate-pulse'>
                    PLEASE_WAIT
                  </span>

                </div>

              </div>

            ) : (

              '[ EXECUTE_UPLOAD ]'

            )}

          </button>

        </form>


        {message && (

          <div className='border border-green-400 text-red-500 mt-5 p-3 rounded bg-red-950/10 shadow-[0_0_15px_rgba(220,38,38,0.2)] text-xs sm:text-sm break-words'>

            {message}

          </div>

        )}

      </div>

    </div>

  )

}


export default Upload