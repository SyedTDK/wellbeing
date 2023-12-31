"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import LogoutButton from "../components/LogoutButton";
import { FormEvent } from "react";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Router from 'next/router';


//List of all the possible Daily Prompts
const prompts = [
    "What is my intention here?",
    "What are my core values?",
    "Which of my deep inner longings have I been ignoring?",
    "Who or what drains my energy?",
    "When do I feel most alive and why?",
    "How do I honor myself?",
    "How have I grown as a person?"
];
//Randomly selects a prompt from the list
const promptId = Math.floor(Math.random() * prompts.length);
const prompt = prompts[promptId];
//Initial page for the journey

const Journey: React.FC = () => {
    const { data: session, status } = useSession();

    
    const [message, setMessage] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    
    const [responseText, setResponseText] = useState<string>('');
    if (status === "authenticated") { //If the user is logged in, display the page
        const authorId = parseInt(session?.user?.id || '0');
        const submitData = async (e: React.SyntheticEvent) => {
            e.preventDefault();
            try {
              const body = { responseText, promptId, prompt, authorId};
              await fetch('/api/submit', {
                method: 'POST',
                body: JSON.stringify(body),
              });
            } catch (error) {
              console.log(error);
            }
          };
        return <>
            <body>
                <header>
                    <div className="content px-8 py-2">
                        <nav className="flex items-center justify-between">
                            <h2 className="text-gray-200 font-bold text-2xl">Well Being</h2>
                            <div className="auth flex items-center">
                                <h3 className="text-gray-200 capitalize pr-2">Hello {session.user.name}</h3>
                                <LogoutButton />
                            </div>
                        </nav>
                    </div>
                </header> 
                <div className="w-screen h-screen flex justify-center items-center">
                    <form onSubmit={submitData} className="rounded px-8 pt-6 pb-8 mb-4">
                        <label className="block text-black text-md font-bold mb-2">{prompt}</label>
                        <input type="text" name="prompt" placeholder="Think Deeply and Enter Your Thoughts Here"
                            className="block input input-bordered w-full max-w-xs opacity-25 text-black" 
                            id="answerData"
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                        />
                        <input 
                            disabled={!responseText}
                            type="submit" 
                            value="Submit"
                            className="block bg-gray-900 text-gray-200  py-2 px-3 rounded mt-4 hover:bg-gray-800 hover:text-gray-100" />
                    </form>
                    <div className="text-black">{message}</div>
                </div>
            </body>   
        </>
    } else { //If the user is not logged in, display the page
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
                    <Link className="text-center font-bold text-5xl underline decoration-sky-600 hover:decoration-blue-400" href='../auth/login'>Start your Daily Journey by logging in!</Link>
                </div>
            </body>
        )}
}
export default Journey;