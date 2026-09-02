 import { useNavigate } from 'react-router-dom'
import { useUser } from "../components/UserContext"
import { useEffect } from 'react';

const Home = () => {

  const { getData, getUser } = useUser()

  const navigate = useNavigate()

  useEffect(() => {

    getUser()

  }, [])


  return (

    <div className="min-h-screen bg-black text-green-400 font-mono flex items-center justify-center p-4 sm:p-6">

      <div className="w-full max-w-4xl border border-green-500/60 bg-black shadow-[0_0_40px_rgba(34,197,94,0.25)]">

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-green-900 px-4 sm:px-5 py-3 bg-green-950/20">

          <div className="text-green-500 tracking-[0.2em] sm:tracking-[0.3em] text-xs sm:text-sm break-all">
            SYSTEM://USER_PROFILE
          </div>

          <div className="text-green-900 text-xs">
            ACCESS_GRANTED
          </div>

        </div>


        <div className="p-5 sm:p-8">

          <div className="text-green-900 text-xs mb-5 sm:mb-6 break-all">
            root@music-server:~$ whoami
          </div>


          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">


            <div className="border border-green-900 bg-green-950/10 p-4 sm:p-5 hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-300">

              <p className="text-green-900 text-xs mb-3">
                USERNAME
              </p>

              <p className="text-green-300 text-base sm:text-lg break-all">
                {getData?.username}
              </p>

            </div>


            <div className="border border-green-900 bg-green-950/10 p-4 sm:p-5 hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-300">

              <p className="text-green-900 text-xs mb-3">
                EMAIL
              </p>

              <p className="text-green-300 text-base sm:text-lg break-all">
                {getData?.email}
              </p>

            </div>


            <div className="border border-green-900 bg-green-950/10 p-4 sm:p-5 hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-300">

              <p className="text-green-900 text-xs mb-3">
                ROLE
              </p>

              <p className="text-green-300 text-base sm:text-lg uppercase break-all">
                {getData?.role}
              </p>

            </div>


            <button
              className="border border-green-900 bg-green-950/10 p-4 sm:p-5 text-green-400 hover:border-green-400 hover:shadow-[0_0_20px_rgba(34,197,94,0.2)] transition-all duration-300"
              onClick={() => navigate("/login")}
            >
              Login
            </button>

          </div>


          <div className="mt-6 sm:mt-8 border-t border-green-900 pt-5 sm:pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

            <p className="text-green-900 text-xs break-all">
              root@music-server:~$ _
            </p>

            <button
              onClick={() => navigate("/get-all-music")}
              className="w-full sm:w-auto border border-green-500 px-4 sm:px-6 py-3 text-sm sm:text-base text-green-400 hover:bg-green-500 hover:text-black hover:shadow-[0_0_25px_rgba(34,197,94,0.8)] transition-all duration-200 tracking-widest"
            >
              [ ENTER MUSIC DATABASE ]
            </button>

          </div>

        </div>

      </div>

    </div>

  )

}

export default Home