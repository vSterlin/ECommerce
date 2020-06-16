import React, { useEffect } from 'react'
import { Link } from "gatsby";



const Success = () => {

useEffect(() => {
  localStorage.setItem("cart", null);

}, [])

  return (
    <div>
      Thank you for your purchase!
      <Link to="/">Go Home</Link>
    </div>
  )
}

export default Success
