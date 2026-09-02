 import axios from 'axios'

import { useEffect, useState } from 'react'

import { useNavigate, useParams } from 'react-router-dom'


function Songupdate () {

  const params = useParams()

  const navigate = useNavigate()


  const [update, SetUpdate] = useState({

    title: '',

    music: ''

  })


  console.log(update)


  const updateHandle = e => {

    const { name, value, files } = e.target

    SetUpdate(prev => ({

      ...prev,

      [name]: name === 'music' ? files[0] : value

    }))

  }


  const submitHandler = async e => {

    e.preventDefault()

    const formData = new FormData()

    formData.append('title', update.title)

    formData.append('music', update.music)


    try {

      const res = await axios.patch(

        `http://localhost:8000/api/music/song-update/${params.id}`,

        formData,

        {

          withCredentials: true

        }

      )

      console.log(res.data)

      navigate('/get-all-music')

    } catch (error) {

      console.log(error.response.data)

    }

  }


  const getOldData = async () => {

    try {

      const res = await axios.get(
        `http://localhost:8000/api/music/get-music/${params.id}`
      )

      console.log(res.data)

      SetUpdate(() => ({

        title: res.data.music.title,

        // music: res.data.music.url

      }))

    } catch (error) {

      console.log(error)

    }

  }


  useEffect(() => {

    getOldData()

  }, [])


  return (

    <div className="min-h-screen w-full bg-black flex items-center justify-center px-4 py-6 sm:px-6">

      <form
        onSubmit={submitHandler}
        className="w-full max-w-md bg-black border border-green-500 p-5 sm:p-8 rounded-lg shadow-[0_0_25px_rgba(34,197,94,0.35)]"
      >

        <div className="mb-5 sm:mb-6">

          <div className="text-green-400 font-mono text-xs sm:text-sm mb-5 sm:mb-6 border-b border-green-900 pb-3 break-all">

            &gt; SONG_UPDATE.exe

          </div>


          <input
            onChange={updateHandle}
            type="text"
            name="title"
            value={update.title}
            placeholder="ENTER NEW TITLE..."
            className="w-full bg-black border border-green-700 text-green-400 font-mono text-sm sm:text-base px-3 sm:px-4 py-3 mb-4 outline-none placeholder:text-green-900 focus:border-green-400 focus:shadow-[0_0_12px_rgba(34,197,94,0.4)]"
          />


          <input
            onChange={updateHandle}
            type="file"
            name="music"
            className="w-full min-w-0 bg-black border border-green-700 text-green-400 font-mono text-xs sm:text-sm px-2 sm:px-3 py-2 sm:py-3 outline-none file:bg-green-500 file:text-black file:border-0 file:px-2 sm:file:px-3 file:py-1 file:mr-2 sm:file:mr-3 file:font-bold hover:file:bg-green-400"
          />

        </div>


        <button
          type="submit"
          className="w-full border border-green-500 text-green-400 font-mono text-sm sm:text-base py-3 tracking-widest hover:bg-green-500 hover:text-black transition duration-200 shadow-[0_0_10px_rgba(34,197,94,0.2)]"
        >

          [ EXECUTE UPDATE ]

        </button>

      </form>

    </div>

  )

}


export default Songupdate