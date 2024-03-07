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
        <body className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overscroll-none">
          <header>
            <div className="content py-2">
              <nav className="flex items-center justify-between">
                <h2 className="text-gray-200 font-bold text-lg sm:text-4xl pr-2 pl-2">WellBeing</h2>
                <div className="auth flex items-center">
                  <Link className="bg-gray-200 text-gray-900  p-2 mr-4 rounded border border-gray-300 hover:bg-gray-100 hover:text-gray-700" href="/auth/login">Log in</Link>
                  <Link className="bg-gray-900 text-gray-200  p-2 mr-4 rounded  hover:bg-gray-800 hover:text-gray-100" href="/auth/register">Sign up</Link>
                </div>
              </nav>
            </div> 
          </header>
          <div className="w-full h-screen flex justify-center items-center">
           <Link className="text-center text-black font-bold text-3xl sm:text-5xl underline decoration-sky-600 hover:decoration-blue-400" href='/Meditate'>Meditate, Elevate, Inspire: Your Journey Starts Here!</Link>
          </div>
          <Footer />
        </body>
    )
  //If the user is logged in, display the page with the sign out button.
  } else {
    return (
      <body className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 overscroll-none">
        <header>
          <div className="content py-2">
            <nav className="flex items-center justify-between">
              <h2 className="text-gray-200 font-bold text-md sm:text-4xl pr-2 pl-2">WellBeing</h2>
              <div className="auth flex items-center">
                <h3 className="text-gray-200 capitalize pr-2">Hello {user.name}</h3>
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