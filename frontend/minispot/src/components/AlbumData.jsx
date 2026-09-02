
import axios from "axios";

import { useEffect, useState, useRef } from "react";

import { useParams } from "react-router-dom";

function AlbumData() {

  const [albumData, setAlbumData] = useState(null);

  const [isPlaying, setIsPlaying] = useState(false);

  const [playingSong, setPlayingSong] = useState(null);

  const ref = useRef(null);

  console.log(albumData);

  const params = useParams();

  const albumUserdata = async () => {

    const res = await axios.get(
      `http://localhost:8000/api/album/get-album/${params.id}`,
      {
        withCredentials: true
      }
    );

    console.log(res.data);

    setAlbumData(res.data);
  };

  useEffect(() => {
    albumUserdata();
  }, [params.id]);

  const handlePlayPause = (song) => {

    // Same song click
    if (playingSong?._id === song._id) {

      if (isPlaying) {
        ref.current.pause();
        setIsPlaying(false);
      } else {
        ref.current.play();
        setIsPlaying(true);
      }

      return;
    }

    // Different song click
    if (ref.current) {
      ref.current.pause();
    }

    const audio = new Audio(song.url);

    ref.current = audio;

    ref.current.play();

    setPlayingSong(song);

    setIsPlaying(true);
  };

  return (

    <div className="min-h-screen bg-black text-green-400 font-mono p-4 sm:p-6 md:p-10">

      {!albumData ? (

        <div className="min-h-screen flex items-center justify-center px-4">

          <div className="border border-green-800 p-5 sm:p-8 shadow-[0_0_25px_rgba(34,197,94,0.2)]">

            <div className="text-green-400 text-sm sm:text-base tracking-[0.2em] sm:tracking-[0.3em] animate-pulse">
              LOADING_ALBUM...
            </div>

            <div className="text-green-900 text-xs mt-3">
              ACCESSING_DATABASE
            </div>

          </div>

        </div>

      ) : (

        <div className="max-w-5xl mx-auto">

          {/* ALBUM HEADER */}

          <div className="border border-green-800 bg-black p-5 sm:p-8 mb-6 sm:mb-8 shadow-[0_0_25px_rgba(34,197,94,0.15)]">

            <div className="text-green-900 text-xs tracking-widest mb-4">
              DATABASE://ALBUM
            </div>

            <h1 className="text-2xl sm:text-3xl md:text-4xl text-green-300 tracking-widest break-words">
              {albumData.title}
            </h1>

            <div className="mt-4 text-green-700 text-sm">
              ARTIST :: {albumData.artist}
            </div>

            <div className="mt-2 text-green-900 text-xs">
              TRACKS :: {albumData.songs?.length || 0}
            </div>

          </div>


          {/* SONG LIST */}

          <div className="border border-green-900">

            <div className="px-4 sm:px-6 py-4 border-b border-green-900 text-green-700 text-xs sm:text-sm tracking-widest">
              ALBUM_TRACKS
            </div>

            {albumData.songs?.length === 0 ? (

              <div className="p-6 sm:p-10 text-center text-green-900">
                [ EMPTY ] :: NO_SONGS_FOUND
              </div>

            ) : (

              albumData.songs?.map((song, index) => (

                <div
                  key={song._id}
                  className="flex items-center gap-3 sm:gap-5 px-4 sm:px-6 py-4 sm:py-5 border-b border-green-950 hover:bg-green-500/5 hover:border-green-800 transition-all duration-200"
                >

                  <div className="text-green-900 w-6 sm:w-8 text-xs sm:text-base shrink-0">
                    {String(index + 1).padStart(2, "0")}
                  </div>

                  <div className="flex-1 min-w-0">

                    <h2 className="text-green-300 text-sm sm:text-base truncate">
                      {song.title}
                    </h2>

                    <div className="text-green-900 text-xs mt-1">
                      FILE://MUSIC/DATABASE
                    </div>

                  </div>

                  <button
                    onClick={() => {
                      handlePlayPause(song);
                    }}
                    className="shrink-0 border border-green-900 px-3 sm:px-4 py-2 text-xs sm:text-sm text-green-700 hover:text-black hover:bg-green-400 hover:border-green-400 transition-all duration-200"
                  >
                    {playingSong?._id === song._id && isPlaying
                      ? "Pause"
                      : "Play"}
                  </button>

                </div>

              ))

            )}

          </div>

        </div>

      )}

    </div>
  );
}

export default AlbumData;

