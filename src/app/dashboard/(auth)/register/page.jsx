"use client"
import axios from 'axios'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const Register = () => {
  const [err, setErr] = useState(false)
  const router = useRouter()

  const hadleSubmit = async (e) => {
    e.preventDefault()

    const name = e.target[0].value
    const email = e.target[1].value
    const password = e.target[2].value

    try {
      const res = await axios.post('/api/auth/register',{name,email,password})
      if(res.status === 201) {
        router.push('/dashboard/login')
      }
      
    } catch (error) {
      setErr(true)
    }

    console.log('form submitted')
  }

  return (
    <div className='flex justify-center items-center flex-col'>
      <form className='p-2 flex flex-col gap-2' onSubmit={hadleSubmit}>
        <input type="text" placeholder="Username" required />
        <input type="email" placeholder="Email"  required/>
        <input type="password" placeholder="Password"  required/>
        <button type="submit" className='bg-green-300 text-black'>Register</button>
      </form>
      {err&& (<p>sending form error</p>)}
      <Link href={'/dashboard/login'} className='cursor-pointer'>Have an account? Login</Link>
    </div>
  )
}

export default Register