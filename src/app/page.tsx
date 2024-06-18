// This is the main page of the application. It checks if the user is logged in and displays the page accordingly.

import Link  from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import prisma from "@/app/libs/prisma";
import { SessionProvider, signOut } from "next-auth/react";
import LogoutButton from "./components/LogoutButton";
import Footer from "./components/Footer";

//Decodes the current session data and use prisma to retrieve the current user in the database.
const getCurrentUser = async () => {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) return;
    const currentUser = await prisma.user.findUnique({
      where: { email: session.user.email }
    });
    if (!currentUser) return;
    return currentUser;
  } catch (e: any) {
    // simply ignores if no user is logged in
    return;
  }
};

export default async function Home() {
  const user = await getCurrentUser();
  
  //If the user is not logged in, display the page with the sign in and register buttons.
  if(!user) {
    return (
      <>
      <header>
        <nav className="border-gray-200 px-4 lg:px-6 py-2.5">
            <div className="flex flex-nowrap justify-between items-center mx-auto max-w-screen-xl">
                <a href="/" className="flex items-center">
                    <img src="/WellBeing_Logo.png" className="mr-3 h-6 sm:h-9" alt="WellBeing Logo" />
                    <span className="self-center text-2xl font-semibold whitespace-nowrap">WellBeing</span>
                </a>
                <div className="flex items-center">
                  <a href="/auth/login" className="rounded-md px-4 py-1.5 mr-2 text-sm font-medium leading-6 text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700">Login</a>
                  <a href="/auth/register" className="rounded-md px-4 py-1.5 text-sm font-medium leading-6 text-white bg-gradient-to-br from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">Register</a>
                </div>
            </div>
          </nav>
      </header>
      <main className="flex items-center justify-center px-4 mx-auto max-w-screen-xl min-h-screen text-center lg:px-12">
        <div className="w-full">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none  md:text-5xl lg:text-6xl"><span className=" text-blue-500">Meditate</span>, <span className=" text-red-500">Elevate</span>, and <span className=" text-green-500">Inspire</span>.</h1>
          <p className="mb-8 text-lg font-normal  lg:text-xl sm:px-16 xl:px-48 ">The journey of your mental well being starts here. Perform meditations, post and reflect on thoughtful questions about life and the universe.</p>
          <div className="flex flex-col mb-8 lg:mb-16 space-y-4 sm:flex-row sm:justify-center sm:space-y-0 sm:space-x-4">
              <a href="/auth/register" className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-white rounded-lg bg-indigo-600 bg-gradient-to-br from-cyan-500 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-cyan-300 shadow-[0_0_2px_#fff,inset_0_0_2px_#fff,0_0_5px_#08f,0_0_15px_#08f,0_0_30px_#08f]">
                  Get Started
                  <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
              </a>
          </div>  
        </div>
      </main>
      <footer>
        <div className="mx-auto w-full max-w-screen-xl p-4 py-6 lg:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
              <span className="text-sm sm:text-center text-gray-700">© 2024 WellBeing™. All Rights Reserved. Made with ❤️ by Syed Faizullah.
              </span>
          </div>
        </div>
      </footer>
    </>
    )
  //If the user is logged in, display the page with the sign out button.
  } else {
    return (
      <body className="w-full h-screen">
        <header>
          <div className="content py-2">
            <nav className="flex items-center justify-between">
              <h2 className="font-bold text-md sm:text-4xl pr-2 pl-2">WellBeing</h2>
              <div className="auth flex items-center">
                <h3 className="capitalize pr-2">Hello {user.name}</h3>
                <LogoutButton />
              </div>
            </nav>
          </div>
        </header>
        <div className="w-full h-screen flex justify-center items-center">
          <Link className="text-center text-black font-bold text-3xl sm:text-5xl underline decoration-sky-600 hover:decoration-blue-400" href='/Meditate'>Meditate, Elevate, Inspire: Your Journey Starts Here!</Link>
        </div>
        <Footer />
      </body>
  )}
}