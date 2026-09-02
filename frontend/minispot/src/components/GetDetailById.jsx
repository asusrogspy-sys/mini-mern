 import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function GetDetailById() {

  const params = useParams()

  console.log(params.id)

  const [details, SetDetails] = useState({})

  console.log(details)


  const getIdData = async () => {

    try {

      const getdata = await axios.get(
       `https://mini-mern-2.onrender.com/api/music/get-music/${params.id}`,
      )

      SetDetails(getdata.data)

      console.log(getdata.data)

    }
    catch (error) {

      console.log(error)

    }

  }


  useEffect(() => {

    getIdData()

  }, [])


  return (

    <div className="min-h-screen w-full bg-black flex items-center justify-center px-4 sm:px-5 py-6">

      <div className="w-full max-w-xl bg-black border border-green-500 rounded-2xl shadow-[0_0_35px_rgba(34,197,94,0.25)] overflow-hidden">

        {/* Header */}

        <div className="flex items-center justify-between gap-3 px-4 sm:px-6 py-3 sm:py-4 border-b border-green-900">

          <div className="flex items-center gap-1.5 sm:gap-2">

            <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-red-500"></span>

            <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-yellow-500"></span>

            <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-green-500"></span>

          </div>

          <span className="text-green-500 text-xs sm:text-sm tracking-wider">
            MUSIC_DETAILS
          </span>

        </div>


        {/* Content */}

        <div className="p-5 sm:p-7">

          <p className="text-green-700 text-xs sm:text-sm mb-2">
            // NOW_PLAYING
          </p>


          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-green-400 break-words mb-5 sm:mb-6">
            {details?.music?.title}
          </h1>


          {/* Artist */}

          <div className="border border-green-900 rounded-xl p-3 sm:p-4 mb-5 bg-green-950/10">

            <p className="text-green-700 text-xs mb-1">
              ARTIST
            </p>

            <p className="text-green-300 text-lg sm:text-xl break-words">
              @{details?.music?.artist?.username}
            </p>

            <p className="text-gray-400 text-xs sm:text-sm mt-1">
              Role: {details?.music?.artist?.role}
            </p>

          </div>


          {/* Song Info */}

          <div className="space-y-3 text-xs sm:text-sm">

            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-green-950 pb-2">

              <span className="text-gray-500">
                Music ID
              </span>

              <span className="text-green-400 break-all sm:text-right">
                {details?.music?._id}
              </span>

            </div>


            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4 border-b border-green-950 pb-2">

              <span className="text-gray-500">
                File ID
              </span>

              <span className="text-green-400 break-all sm:text-right">
                {details?.music?.fileId}
              </span>

            </div>


            <div className="flex flex-col sm:flex-row sm:justify-between gap-1 sm:gap-4">

              <span className="text-gray-500">
                Uploaded
              </span>

              <span className="text-gray-300">
                {details?.music?.createdAt
                  ? new Date(details.music.createdAt).toLocaleDateString()
                  : ''}
              </span>

            </div>

          </div>


          {/* Player */}

          <audio
            className="w-full mt-6 sm:mt-7"
            controls
            src={details?.music?.url}
          />

        </div>


        {/* Footer */}

        <div className="px-4 sm:px-6 py-3 border-t border-green-900 text-xs text-green-700 break-words">
          &gt; connection: secure
        </div>

      </div>

    </div>

  )

}

export default GetDetailById