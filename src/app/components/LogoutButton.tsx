//LogoutButton component

"use client";

import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return <button className="  p-2 rounded border mr-4 text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 " onClick={() => signOut()}>Log out</button>;
};

export default LogoutButton;