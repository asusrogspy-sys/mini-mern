import { Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Getallmusic from './components/Getallmusic'
import Upload from './components/Upload'
import GetDetailById from './components/GetDetailById'
import Songupdate from './components/Songupdate'
import CreateAlbum from './components/CreateAlbum'
import AlbumData from './components/AlbumData';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path='/login' element={<Login />} />

        <Route path='/register' element={<Register />} />

        <Route
          path='/'
          element={
            <ProtectedRoute>
              <Home />
              <Upload />
            </ProtectedRoute>
          }
        />

        <Route
          path='/get-all-music'
          element={
            <ProtectedRoute>
              <Getallmusic />
            </ProtectedRoute>
          }
        />

        <Route
          path='/get-all-music/:id'
          element={
            <ProtectedRoute>
              <Getallmusic />
            </ProtectedRoute>
          }
        />

        <Route
          path='/get-music/:id'
          element={
            <ProtectedRoute>
              <GetDetailById />
            </ProtectedRoute>
          }
        />

        <Route
          path='/update-Song/:id'
          element={
            <ProtectedRoute>
              <Songupdate />
            </ProtectedRoute>
          }
        />

        <Route
          path='/create-album'
          element={
            <ProtectedRoute>
              <CreateAlbum />
            </ProtectedRoute>
          }
        />

        <Route
          path='/album-data/:id'
          element={
            <ProtectedRoute>
              <AlbumData/>
            </ProtectedRoute>
          }
        />

      </Routes>
    </div>
  )
}

export default App
