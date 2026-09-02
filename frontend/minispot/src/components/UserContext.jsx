import { createContext, useContext, useEffect, useState } from 'react'
import axios from 'axios'

const UserContext = createContext()

export function UserProvider({ children }) {

  const [getData, setGetData] = useState({})

  

    const getUser = async () => {

      try {
        const response = await axios.get(
          'http://localhost:8000/api/auth/',
          {
            withCredentials: true
          }
        )

        setGetData(response.data)

      } catch (error) {

        console.log(error.message)

      }

    }

     useEffect(()=>{
      getUser()
     },[])

  return (
    <UserContext.Provider value={{ getData , getUser }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  return useContext(UserContext)
}

