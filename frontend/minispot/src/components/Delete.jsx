 import axios from 'axios';
import React, { useState } from 'react'

const Delete = ({ id, onDelete }) => {

  const [Show, SetSHow] = useState(false)

  console.log(Show)

  const deleteSong = async () => {

    try {

      const res = await axios.delete(
      `https://mini-mern-2.onrender.com/api/music/song-delete/${id}`,
        {
          withCredentials: true
        }
      )

      console.log(res)

    } catch (error) {

      console.log(error)

    } finally {

      SetSHow(false)
      onDelete(id)

    }

  }

  return (
    <div>

      <button
        onClick={() => SetSHow(true)}
        className='text-green-500 text-xs sm:text-sm font-mono border border-green-800 bg-black px-2 sm:px-3 py-2 hover:text-black hover:bg-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all duration-200'
      >
        [ DELETE ]
      </button>

      {Show && (

        <div className='fixed inset-0 z-10 flex items-center justify-center bg-black/80 px-4'>

          <div className='w-full max-w-xs sm:w-50 h-auto min-h-50 bg-black border border-green-500 rounded-lg flex flex-col items-center justify-center gap-5 p-5 shadow-[0_0_30px_rgba(34,197,94,0.4)]'>

            <div className='text-green-400 font-mono text-xs sm:text-sm tracking-widest text-center'>
              [ SYSTEM_WARNING ]
            </div>

            <div className='text-green-700 font-mono text-xs'>
              DELETE_FILE?
            </div>

            <div className='flex gap-3 sm:gap-5'>

              <button
                onClick={deleteSong}
                className='text-green-400 font-mono border border-green-700 px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-green-400 hover:text-black hover:shadow-[0_0_15px_rgba(34,197,94,0.7)] transition-all'
              >
                [ YES ]
              </button>

              <button
                onClick={() => SetSHow(false)}
                className='text-red-500 font-mono border border-red-700 px-3 sm:px-4 py-2 text-xs sm:text-sm hover:bg-red-500 hover:text-black hover:shadow-[0_0_15px_rgba(239,68,94,0.7)] transition-all'
              >
                [ NO ]
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  )
}

export default Delete