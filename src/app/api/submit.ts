
import { getSession } from "next-auth/react";
import prisma from "@/app/libs/prisma";
import type { NextApiRequest, NextApiResponse } from 'next'
import { getServerSession } from "next-auth";
import { authOptions } from "./auth/[...nextauth]/route";

type Data = 
  | { message: string }
  | {
      id: number;
      answerData: string;
      promptId: number;
      createdAt: Date;
    };

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

export default async function submitAnswer(
    req: NextApiRequest,
    res: NextApiResponse<Data>) 
  {
  
  // Ensure it's a POST request
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Get user session
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ message: "Not authenticated" });
  }

  const { promptId, answerData } = req.body;

  // Validate input
  if (!answerData || !promptId) {
    return res.status(400).json({ message: "Content and prompt are required" });
  }
  const user = await getCurrentUser()
  if (!user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  // Save the answer in the database
  const answer = await prisma.reflection.create({
    data: {
       promptId: promptId,
       responseText: answerData,
       authorId: user.id,
       prompt: "", // Add the prompt property here
       author: undefined, // Update the author property here
    },
  });
}
