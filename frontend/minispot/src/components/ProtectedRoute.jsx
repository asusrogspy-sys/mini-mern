// import { Navigate } from 'react-router-dom'

// function ProtectedRoute ({ children }) {

//   // const [getData, setGetData] = useState({})

//   const cookie = document.cookie

//   const split = cookie.split(';')

//   const findCookie = split.find(cookie => cookie.startsWith('Token'))

//   // useEffect(() => {
//   //   const getUser = async () => {
//   //     try {
//   //       const response = await axios.get(
//   //         'http://localhost:8000/api/auth/',
//   //         {
//   //           withCredentials: true
//   //         }
//   //       )

//   //       console.log(response.data)

//   //       setGetData(response.data)

//   //     } catch (error) {
//   //       console.log(error.message)
//   //     }
//   //   }

//   //   if (findCookie) {
//   //     getUser()
//   //   }

//   // }, [findCookie])


//   if (!findCookie) {

//     return <Navigate to={'/login'} />

//   }


//   return (

//     <div className='min-h-screen w-full bg-black'>

//       {/* <Home getData={getData} /> */}

//       {children}

//     </div>

//   )

// }

// export default ProtectedRoute


function ProtectedRoute({ children }) {
  return (
    <div className='min-h-screen w-full bg-black'>
      {children}
    </div>
  )
}

export default ProtectedRoute 