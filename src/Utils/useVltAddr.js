import { useState } from 'react'

export default function useVltAddr(params) {

  const getVltAddr = () => {
    const addressStr = localStorage.getItem("vltAddress");
    const address = JSON.parse(addressStr);
    return address
  }
  
  const [vltAddr, setVltAddr] = useState(getVltAddr());

    const saveAddr = (addr) => {
      localStorage.setItem("vltAddress", JSON.stringify(addr));
      setVltAddr(addr)
    }

    return {
      setVltAddr: saveAddr,
      vltAddr
    }
}