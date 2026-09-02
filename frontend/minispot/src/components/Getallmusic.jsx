 import axios from 'axios'
import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Delete from './Delete'

function Getallmusic () {

  const params = useParams()

  console.log(params.id)

  const [getMusic, setGetMusic] = useState([])
  const [playPause, setPlayPause] = useState(null)
  const [range, setRange] = useState({})
  const [duration, setDuration] = useState({})
  const [search, setSearch] = useState('')
  const [pg, setPg] = useState(1)
  const [playFirstAfterPage, setPlayFirstAfterPage] = useState(false)
  const [playLastAfterPage, setPlayLastAfterPage] = useState(false)

  // const [getSongId,setGetSongId] = useState()
  // console.log(getSongId)

  const [PlayNxtPage, setPlayNxtPage] = useState({
    id: null,
    url: null
  })

  const navigate = useNavigate()

  const [isFetching, SetFetching] = useState(false)

  const lm = 5

  // GET MUSIC
  useEffect(() => {

    const getMusicData = async () => {

      SetFetching(true)

      try {

        // await new Promise(resolve => setTimeout(resolve, 2000))

        const response = await axios.get(
          `http://localhost:8000/api/music/getAll-songs?page=${pg}&limit=${lm}&search=${search}`
        )

        setGetMusic(response.data.music)

      } catch (error) {

        console.log(error)

      } finally {

        SetFetching(false)

      }

    }

    getMusicData()

  }, [pg, search])


  // PAGE CHANGE KE BAAD FIRST / LAST SONG
  useEffect(() => {

    if (!getMusic.length) return

    if (playFirstAfterPage) {

      const firstSong = getMusic[0]

      setPlayNxtPage({
        id: firstSong._id,
        url: firstSong.url
      })

      setPlayFirstAfterPage(false)

    }

    if (playLastAfterPage) {

      const lastSong = getMusic[getMusic.length - 1]

      setPlayNxtPage({
        id: lastSong._id,
        url: lastSong.url
      })

      setPlayLastAfterPage(false)

    }

  }, [getMusic, playFirstAfterPage, playLastAfterPage])


  // SONG END
  const playAfterSong = () => {

    const currentId = PlayNxtPage.id

    if (!currentId) return

    const currentIndex = getMusic.findIndex(
      item => item._id === currentId
    )

    if (currentIndex === -1) return

    // LAST SONG -> NEXT PAGE
    if (currentIndex === getMusic.length - 1) {

      setPlayFirstAfterPage(true)

      setPg(prev => prev + 1)

      return

    }

    // NEXT SONG
    const nextSong = getMusic[currentIndex + 1]

    setPlayNxtPage({
      id: nextSong._id,
      url: nextSong.url
    })

  }


  // FORWARD
  const forWardMusic = e => {

    const clickedId = e.currentTarget.dataset.forwardId

    // SIRF JO SONG CHAL RAHA HAI
    if (clickedId !== PlayNxtPage.id) {
      return
    }

    const currentIndex = getMusic.findIndex(
      item => item._id === PlayNxtPage.id
    )

    if (currentIndex === -1) return

    // LAST SONG -> NEXT PAGE
    if (currentIndex === getMusic.length - 1) {

      setPg(prev => prev + 1)

      return

    }

    const nextSong = getMusic[currentIndex + 1]

    setPlayNxtPage({
      id: nextSong._id,
      url: nextSong.url
    })

  }


  // BACKWARD
  const backWardMusic = e => {

    const clickedId = e.currentTarget.dataset.prevId

    // SIRF CURRENT SONG
    if (clickedId !== PlayNxtPage.id) {
      return
    }

    const currentIndex = getMusic.findIndex(
      item => item._id === PlayNxtPage.id
    )

    if (currentIndex === -1) return

    // FIRST SONG -> PREVIOUS PAGE
    if (currentIndex === 0) {

      if (pg === 1) {
        return
      }

      setPlayLastAfterPage(true)

      setPg(prev => prev - 1)

      return

    }

    const prevSong = getMusic[currentIndex - 1]

    setPlayNxtPage({
      id: prevSong._id,
      url: prevSong.url
    })

  }


  // SLIDER
  const rangeFunc = e => {

    const songId = e.currentTarget.dataset.rangeId

    const value = Number(e.target.value)

    const audio = document.getElementById('main-audio')

    // SIRF CURRENT SONG KA SLIDER
    if (audio && PlayNxtPage.id === songId) {

      audio.currentTime = value

      setRange(prev => ({
        ...prev,
        [songId]: value
      }))

    }

  }


  // AUDIO TIME UPDATE
  const rangeMove = e => {

    const audio = e.target

    const currentId = PlayNxtPage.id

    if (!currentId) return

    setRange(prev => ({
      ...prev,
      [currentId]: audio.currentTime
    }))

  }


  // DURATION
  const getduration = (e, id) => {

    const durationValue = e.target.duration

    if (!Number.isFinite(durationValue)) {
      return
    }

    setDuration(prev => ({
      ...prev,
      [id]: durationValue
    }))

  }


  // TIME FORMAT
  const formatDuration = time => {

    if (!Number.isFinite(time)) {
      return '0:00'
    }

    const minutes = Math.floor(time / 60)

    const seconds = Math.floor(time % 60)

    return `${minutes}:${seconds.toString().padStart(2, '0')}`

  }


  // SONG PLAY / RESUME
  useEffect(() => {

    if (!PlayNxtPage.id) {
      return
    }

    const audio = document.getElementById('main-audio')

    if (!audio) {
      return
    }

    // JAHAN PAUSE HUA THA WAHIN SE
    audio.currentTime = Number(
      range[PlayNxtPage.id] || 0
    )

    audio.play().catch(error => {
      console.log(error)
    })

    setPlayPause(PlayNxtPage.id)

  }, [PlayNxtPage])


  const getdetailsByid = id => {

    navigate(`/get-music/${id}`)

    console.log(id)

  }


  const updateSong = items => {

    navigate(`/update-Song/${items}`)

  }


  const addToSongAlbum = async (songId, albumId) => {

    try {

      const res = await axios.post(
        `http://localhost:8000/api/album/add-song-album`,
        {
          songId: songId,
          albumId: albumId
        },
        {
          withCredentials: true
        }
      )

      console.log(albumId, songId)

      console.log(res.data)

    } catch (error) {

      console.log(error.response.data)

    }

  }


  return (

    <div className='relative select-none bg-black min-h-screen text-green-400 font-mono'>

      {/* NAVBAR */}

      <div className='flex flex-wrap items-center justify-center gap-2 sm:gap-3 min-h-20 p-3 sm:p-5 bg-black fixed top-0 left-0 w-full z-10 border-b border-green-500/40 shadow-[0_0_20px_rgba(34,197,94,0.15)] [&>*]:border [&>*]:p-2 [&>*]:text-sm sm:[&>*]:text-lg md:[&>*]:text-xl [&>*]:rounded text-green-400'>

        <button
          disabled={pg === 1}
          onClick={() => {
            setPg(prev => prev - 1)
          }}
          className='bg-black border-green-700 hover:bg-green-500/10 hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300'
        >
          &lt;_
        </button>


        <input
          type='search'
          placeholder='root@music:~$ search'
          value={search}
          onChange={e => {
            setSearch(e.target.value)
            setPg(1)
          }}
          className='w-full sm:w-auto max-w-xs bg-black border-green-700 text-green-400 outline-none px-3 sm:px-5 py-2 placeholder:text-green-900 focus:border-green-400 focus:shadow-[0_0_15px_rgba(34,197,94,0.4)] text-xs sm:text-sm md:text-base'
        />


        <button
          disabled={getMusic.length === 0}
          onClick={() => {
            setPg(prev => prev + 1)
          }}
          className='bg-black border-green-700 hover:bg-green-500/10 hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300'
        >
          _&gt;
        </button>


        <button
          className='bg-black border-green-700 hover:bg-green-500/10 hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300'
          onClick={() => navigate('/')}
        >
          Upload
        </button>


        <button
          className='bg-black border-green-700 hover:bg-green-500/10 hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300'
          onClick={() => navigate('/create-album')}
        >
          Create Album
        </button>


        <button
          className='bg-black border-green-700 hover:bg-green-500/10 hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300'
          onClick={() => navigate(`/album-data/${params.id}`)}
        >
          Album Data
        </button>

      </div>


      <div className='flex flex-wrap justify-center gap-5 p-4 pt-28 sm:p-6 sm:pt-28 md:p-10 md:pt-32 bg-black select-none'>

        {/* MAIN AUDIO */}

        <audio
          id='main-audio'
          src={PlayNxtPage.url}
          onEnded={playAfterSong}
          onTimeUpdate={rangeMove}
          onLoadedMetadata={e => getduration(e, PlayNxtPage.id)}
        />


        {isFetching ? (

          <div className='w-full min-h-screen flex items-center justify-center bg-black px-4'>

            <div className='flex flex-col items-center gap-4 font-mono text-center'>

              <div className='text-green-400 tracking-[0.2em] sm:tracking-[0.3em] text-sm sm:text-base animate-pulse'>
                FETCHING_MUSIC...
              </div>

              <div className='w-full max-w-64 h-2 border border-green-700 bg-green-950 overflow-hidden'>

                <div className='h-full w-1/2 bg-green-400 shadow-[0_0_15px_rgba(74,222,128,0.9)] animate-pulse'></div>

              </div>

              <div className='text-green-900 text-xs tracking-widest'>
                ACCESSING_DATABASE
              </div>

            </div>

          </div>

        ) : (

          <>

            {getMusic.map(items => {

              return (

                <div
                  key={items._id}
                  className='w-full sm:w-100 h-100 bg-black p-4 sm:p-6 md:p-10 text-lg sm:text-xl md:text-2xl text-green-300 relative'
                >

                  {/* DURATION NIKALNE KE LIYE */}

                  <audio
                    src={items.url}
                    preload='none'
                    onLoadedMetadata={e => getduration(e, items._id)}
                  />


                  <div className='min-h-fit w-full bg-black shadow-[0_0_25px_rgba(34,197,94,0.2)] border rounded-2xl border-green-800 hover:border-green-400 hover:shadow-[0_0_30px_rgba(34,197,94,0.35)] transition-all duration-300'>

                    <div className='flex flex-wrap justify-between gap-2 p-2'>

                      <button
                        onClick={() => getdetailsByid(items._id)}
                        className='text-green-500 text-xs sm:text-sm border border-green-800 bg-black px-2 sm:px-3 py-2 hover:text-black hover:bg-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all duration-200'
                      >
                        [ VIEW ]
                      </button>


                      <button
                        onClick={() => updateSong(items._id)}
                        className='text-green-500 text-xs sm:text-sm border border-green-800 bg-black px-2 sm:px-3 py-2 hover:text-black hover:bg-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.6)] transition-all duration-200'
                      >
                        [ EDIT ]
                      </button>


                      <Delete
                        id={items._id}
                        onDelete={(deletedId) => {
                          setGetMusic(prev =>
                            prev.filter(song => song._id !== deletedId)
                          );
                        }}
                      />

                    </div>


                    <div className='px-4 sm:px-5 pt-2 text-green-900 text-xs break-words'>
                      FILE://MUSIC/DATABASE
                    </div>


                    <h1 className='p-4 sm:p-5 flex justify-center text-green-300 text-base sm:text-xl tracking-widest drop-shadow-[0_0_8px_rgba(74,222,128,0.5)] text-center break-words'>
                      {items.title}
                    </h1>


                    {/* SLIDER */}

                    <input
                      type='range'
                      value={range[items._id] || 0}
                      data-range-id={items._id}
                      onChange={rangeFunc}
                      min={0}
                      max={duration[items._id] || 0}
                      className='w-[calc(100%-24px)] sm:w-90 mx-3 accent-green-500 cursor-pointer'
                    />


                    <div className='flex flex-wrap items-center justify-center gap-4 sm:gap-8 py-5 sm:py-6 px-2'>

                      {/* PREVIOUS */}

                      <button
                        onClick={backWardMusic}
                        data-prev-id={items._id}
                        className='group w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-black border border-green-900 text-green-900 hover:text-green-400 hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)] transition-all duration-300'
                      >
                        <span className='text-base sm:text-lg'>
                          &lt;&lt;
                        </span>
                      </button>


                      {/* PLAY / PAUSE */}

                      <button
                        onClick={() => {

                          const audio =
                            document.getElementById('main-audio')

                          if (playPause === items._id) {

                            audio.pause()

                            setPlayPause(null)

                            return

                          }

                          console.log('SONG URL:', items.url)

                          setPlayNxtPage({
                            id: items._id,
                            url: items.url
                          })

                        }}
                        className='relative w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center bg-black border border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.4)] hover:bg-green-500 hover:text-black hover:shadow-[0_0_35px_rgba(34,197,94,0.8)] hover:scale-105 active:scale-95 transition-all duration-300'
                      >

                        <span className='text-xs sm:text-sm font-bold tracking-widest'>
                          {playPause === items._id ? '||' : '>'}
                        </span>

                      </button>


                      {/* FORWARD */}

                      <button
                        onClick={forWardMusic}
                        data-forward-id={items._id}
                        className={`group w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center bg-black border border-green-900 transition-all duration-300 ${
                          PlayNxtPage.id === items._id
                            ? 'text-green-400 hover:border-green-400 hover:shadow-[0_0_15px_rgba(34,197,94,0.4)]'
                            : 'text-gray-800'
                        }`}
                      >

                        <span className='text-base sm:text-lg'>
                          &gt;&gt;
                        </span>

                      </button>


                      {/* TIME */}

                      <div className='w-full sm:w-auto text-center text-green-800 text-xs sm:text-sm tracking-wider'>
                        {formatDuration(range[items._id] || 0)}
                        {' / '}
                        {formatDuration(duration[items?._id] || 0)}
                      </div>


                      <button
                        onClick={() =>
                          addToSongAlbum(items._id, params.id)
                        }
                        className='text-2xl sm:text-3xl'
                      >
                        +
                      </button>

                    </div>

                  </div>

                </div>

              )

            })}


            {/* MUSIC LIST */}

            {/* MUSIC NOT FOUND */}

            {getMusic.length === 0 && (

              <div className='w-full flex justify-center px-4'>

                <h1 className='border border-red-700 bg-black shadow-[0_0_20px_rgba(220,38,38,0.3)] rounded mt-20 p-4 sm:p-5 text-sm sm:text-base text-red-500 font-mono tracking-widest text-center break-words'>
                  [ ERROR ] :: MUSIC_NOT_FOUND
                </h1>

              </div>

            )}

          </>

        )}

      </div>

    </div>

  )

}

export default Getallmusic