
import axios from 'axios'

import React, { useState } from 'react'

import { useNavigate } from 'react-router-dom';

function CreateAlbum () {

  // const [show,setShow] = useState(false)

  const [albumName, setAlbumName] = useState({
    title: ''
  })

  const [albumId, setAlbumId] = useState(null)

  console.log(albumId)

  const navigate = useNavigate()

  console.log(albumId)

  console.log(albumName)

  const saveName = e => {

    const { name, value } = e.target

    setAlbumName(prev => ({
      ...prev,
      [name]: value
    }))

  }

  const formHandler = async e => {

    e.preventDefault()

    try {

      const res = await axios.post(
        `http://localhost:8000/api/album/create-album`,
        albumName,
        {
          withCredentials: true
        }
      )

      console.log(res.data)

      setAlbumId(res?.data?.albumId)

      navigate(`/get-all-music/${res.data.albumId}`)

    } catch (error) {

      console.log(error.response.data)

    }

  }

  return (

    <div className='min-h-screen w-full bg-black text-green-400 font-mono flex items-center justify-center px-4 sm:px-5'>

      <div className='w-full max-w-lg border border-green-800 bg-black shadow-[0_0_30px_rgba(34,197,94,0.15)] rounded-lg overflow-hidden'>

        <div className='border-b border-green-800 px-4 sm:px-5 py-3 flex items-center justify-between text-xs tracking-widest'>

          <span className='text-green-500'>
            TERMINAL
          </span>

          <span className='text-green-900'>
            CREATE_ALBUM
          </span>

        </div>

        <div className='p-5 sm:p-8'>

          <div className='text-green-900 text-xs mb-2 break-words'>
            root@music:~$ album --create
          </div>

          <div className='text-green-500 text-sm mb-6'>
            ENTER_ALBUM_NAME
          </div>

          <form
            onSubmit={formHandler}
            className='flex flex-col gap-5'
          >

            <div className='flex items-center border border-green-800 bg-black px-3 sm:px-4 py-3 focus-within:border-green-400 focus-within:shadow-[0_0_15px_rgba(34,197,94,0.25)] transition-all duration-300'>

              <span className='text-green-700 mr-2 sm:mr-3'>
                $
              </span>

              <input
                onChange={saveName}
                type='text'
                value={albumName.title}
                name='title'
                placeholder='album_name'
                className='w-full min-w-0 bg-transparent outline-none text-green-400 placeholder:text-green-900'
              />

            </div>

            <button
              type='submit'
              className='w-full border border-green-700 bg-black text-green-400 py-3 text-sm sm:text-base tracking-widest hover:bg-green-400 hover:text-black hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.5)] transition-all duration-300'
            >
              [ CREATE_ALBUM ]
            </button>

          </form>

          <div className='mt-8 pt-4 border-t border-green-950 text-green-900 text-xs break-words'>
            STATUS :: WAITING_FOR_INPUT
          </div>

        </div>

      </div>

    </div>

  )

}

export default CreateAlbum
