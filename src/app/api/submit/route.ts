//Submission handler that handles a POST request when the users submit their reflection to the endpoint to create new reflections.

import prisma from '../../libs/prisma'
import { NextResponse } from "next/server";


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