//Layout of the login page
"use client";
import { getSession, signIn } from "next-auth/react";
import Link from "next/link";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Router from "next/router";
const LoginPage = () => {
  const router = useRouter();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState({
    status: "",
    message: "",
  });
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };
  const onSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    try {
      await signIn("credentials", loginData);
      setAlert({ status: "success", message: "Login successfully" });
      setLoginData({ email: "", password: "" });
    } catch (error: any) {
      console.log({ error });
      setAlert({ status: "error", message: "Something went wrong" });
    }
    
  };  

  useEffect(() => {
    const redirectUser = async () => {
      const session = await getSession(); 
      if (session) {
        router.push("/"); // Redirect to the homepage after successful login
      }
    };

    redirectUser();
  }, [router]);

  
    return (
      <body className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-white">Login Page</h2>
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
            <label htmlFor="email" className="block text-white text-sm font-bold mb-2">Email</label>
            <input
              className="input input-bordered w-full max-w-xs opacity-25 text-black" 
              onChange={onChange}
              value={loginData.email}  
              name="email" 
              type="email" 
              required
          />
          </div>

          <div className="md:w-1/3">
            <label htmlFor="password" className="block text-white text-sm font-bold mb-2">Password</label>
            <input 
              className="input input-bordered w-full max-w-xs opacity-25 text-black" 
              onChange={onChange}
              value={loginData.password}
              name="password" 
              type="password" 
              required
          />
          </div>
          <button type="submit" className="bg-transparent text-gray-200  p-1 rounded border border-gray-300 mt-6 hover:bg-gray-100 hover:text-gray-700">Login</button>
          <button onClick={() => signIn('google')} className="bg-transparent text-gray-200  p-1 rounded border border-gray-300 mt-6 hover:bg-gray-100 hover:text-gray-700">Login with Google</button>
        </form>
        <div>
          Do not have an account?{" "}
          <Link href="/auth/register" className="bg-transparent text-gray-200  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700">Sign up</Link>
        </div>
      </div>
      </body>
    );
  };
export default LoginPage;