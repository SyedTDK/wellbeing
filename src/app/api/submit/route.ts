import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../libs/prisma'
import { NextResponse } from "next/server";


// POST /api/post
// Required fields in body: title, authorEmail
// Optional fields in body: content
//responseText, promptId, prompt, authorId
// export default async function handle(
//   req: NextApiRequest,
//   res: NextApiResponse,
// ) {
//   const { responseText, promptId, prompt, authorId } = await req.body
//   const result = await prisma.reflection.create({
//     data: {
//       responseText: responseText,
//       promptId: promptId,
//       prompt: prompt,  
//       author: { connect: { id: authorId } },
//     },
//   })
//   return res.status(201).json(result)
// }

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { responseText, promptId, prompt, authorId } = body;
    const reflection = await prisma.reflection.create({
      data: { responseText, promptId, prompt, authorId }
    });
    return NextResponse.json(reflection);
  } catch (error: any) {
    console.log({ error });
    return NextResponse.json({ error: 'An error occurred while processing your request.' });
  }
}