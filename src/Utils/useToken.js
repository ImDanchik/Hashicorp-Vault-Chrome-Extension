import { useState } from 'react'

export default function useToken(params) {
    
  const getToken = () => {
    const tokenStr = localStorage.getItem("token");
    const token = JSON.parse(tokenStr);
    return token
  }
  
  const [token,setToken] = useState(getToken());
  
      const saveToken = (token) => {
        localStorage.setItem("token", JSON.stringify(token));
        setToken(token)
      }

      return {
          setToken: saveToken,
          token
      }
}