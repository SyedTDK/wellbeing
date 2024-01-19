import Link  from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import prisma from "@/app/libs/prisma";
import { SessionProvider, signOut } from "next-auth/react";
import LogoutButton from "./components/LogoutButton";

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
        <body className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
          <header>
            <div className="content px-8 py-2">
              <nav className="flex items-center justify-between">
                <h2 className="text-gray-200 font-bold text-2xl">Well Being</h2>
                <div className="auth flex items-center">
                  <Link className="bg-transparent text-gray-200  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700" href="/auth/login">Sign In</Link>
                  <Link className="bg-gray-900 text-gray-200  py-2 px-3 rounded  hover:bg-gray-800 hover:text-gray-100" href="/auth/register">Register</Link>
                </div>
              </nav>
            </div> 
          </header>
          <div className="w-screen h-screen flex justify-center items-center">
           <Link className="text-center font-bold text-5xl underline decoration-sky-600 hover:decoration-blue-400" href='/Journey'>Explore Today's Journey.</Link>
          </div>
        </body>
    )
  //If the user is logged in, display the page with the sign out button.
  } else {
    return (
      <body className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
        <header>
          <div className="content px-8 py-2">
            <nav className="flex items-center justify-between">
              <h2 className="text-gray-200 font-bold text-2xl">Well Being</h2>
              <div className="auth flex items-center">
                <h3 className="text-gray-200 capitalize pr-2">Hello {user.name}</h3>
                <LogoutButton />
              </div>
            </nav>
          </div>
        </header>
        <div className="w-screen h-screen flex justify-center items-center">
          <Link className="text-center font-bold text-5xl underline decoration-sky-600 hover:decoration-blue-400" href='/Journey'>Explore Today's Journey.</Link>
        </div>
      </body>
  )}
}