// Note: This is the register page
"use client";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import Footer from "@/app/components/Footer";


const RegisterPage = () => {
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
    });
    
    const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
        setRegisterData({ ...registerData, [e.target.name]: e.target.value });
      };
    
    const [alert, setAlert] = useState({
        status: '',
        message: ''
    })
    const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault()
        try {
          await fetch('/api/auth/signup', {
            method: 'POST',
            body: JSON.stringify(registerData)
          })
          setAlert({ status: 'success', message: 'Signup successfully' })
          setRegisterData({ name: '', email: '', password: '' })
        } catch (error : any) {
          console.log({ error })
          setAlert({ status: 'error', message: 'Something went wrong'})
        }
    }

  return (
    <body className="">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <h1 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Create a New Account</h1>
        {alert.message && 
          <div style={{ 
              color: alert.status === 'success' ? 'green' : 'red',
              fontWeight: 'bold'
          }}>   
              {alert.status === 'success' ? '✅' : '❌'} {alert.message}
          </div>
        }
        <form onSubmit={onSubmit} className="shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <div className="md:w-1/3">
            <label htmlFor="name" className="block text-white text-sm font-bold mb-2">Name </label>
            <input
              className="input input-bordered w-full max-w-xs opacity-25 text-black"
              onChange={onChange}
              value={registerData.name} 
              name="name"
              type="text" 
              required 
            />
          </div>

          <div className="md:w-1/3">
            <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Email </label>
            <input
              className="input input-bordered w-full max-w-xs opacity-25 text-black"
              onChange={onChange}
              value={registerData.email} 
              name="email" 
              type="email" 
              required 
            />
          </div>

          <div className="md:w-1/3">
            <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Password </label>
            <input
              className="input input-bordered w-full max-w-xs opacity-25 text-black" 
              onChange={onChange}
              value={registerData.password}
              name="password" 
              type="password" 
              required 
            />
          </div>
          <button type="submit" className="bg-transparent text-gray-200  p-1 rounded border border-gray-300 mt-6 hover:bg-gray-100 hover:text-gray-700">Create account</button>
          <button onClick={() => signIn('google')} className="bg-transparent text-gray-200  p-1 rounded border border-gray-300 mt-6 hover:bg-gray-100 hover:text-gray-700">Login with Google</button>
        </form>
        <div>
          Already have an account? <Link href="/auth/login" className="bg-transparent text-gray-200  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700">Login here</Link>
        </div>
      </div>
      <Footer />
    </body>
  );
};

export default RegisterPage;