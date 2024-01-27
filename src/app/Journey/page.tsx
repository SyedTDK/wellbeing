"use client";
import Link from "next/link";
import LogoutButton from "../components/LogoutButton";
import { useSession } from "next-auth/react";
import { useState } from "react";


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

//Initial page for the journey page
const Journey: React.FC = () => {
    const { data: session, status } = useSession();
    const [message, setMessage] = useState<string>('');
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const [responseText, setResponseText] = useState<string>('');

    //If the user is logged in, display the page with the prompt and a text box to enter the response.
    if (status === "authenticated") { 
        const authorId = parseInt(session?.user?.id || '0');
        const submitData = async (e: React.SyntheticEvent) => {
            e.preventDefault();
            setIsSubmitting(true);
            try {
              const body = { responseText, promptId, prompt, authorId};
              await fetch('/api/submit', {
                method: 'POST',
                body: JSON.stringify(body),
              });
            } catch (error) {
              console.log(error);
            } finally {
              setIsSubmitting(false);
              setMessage('Your response has been submitted!');
              setResponseText('');
            }
          };
        return <>
            <body className="bg-[url('/mountain.jpg')]">
                <header>
                    <div className="content py-2">
                        <nav className="flex items-center justify-between">
                            <h2 className="text-gray-200 font-bold text-lg sm:text-4xl pr-2 pl-2">WellBeing</h2>
                            <div className="auth flex items-center">
                                <h3 className="text-gray-200 capitalize pr-2">Hello {session.user.name}</h3>
                                <LogoutButton />
                            </div>
                        </nav>
                    </div>
                </header> 
                <div className="w-screen h-screen flex justify-center items-center">
                    <form onSubmit={submitData} className="rounded px-8 pt-6 pb-8 mb-4">
                        <label className="block text-white text-md font-bold mb-2">{prompt}</label>
                        <textarea 
                            name="prompt" 
                            placeholder="Think Deeply and Write Your Response Here..."
                            className="block input input-bordered w-full p-4 max-w-4xl sm:max-w-10xl rounded-lg opacity-50 text-black h-40" 
                            id="answerData"
                            value={responseText}
                            onChange={(e) => setResponseText(e.target.value)}
                        />
                        <button 
                            disabled={!responseText && isSubmitting}
                            type="submit" 
                            value="Submit"
                            className="block bg-gray-900 text-gray-200  py-2 px-3 rounded mt-4 hover:bg-gray-800 hover:text-gray-100" 
                        >
                            {isSubmitting && <p>Submitting...</p>}
                            {!isSubmitting && <p>Submit</p>}
                        </button>
                    </form>
                    <div className="text-black">{message}</div>
                </div>
            </body>   
        </>
    //If the user is not logged in, display the page with a link to the login page.
    } else { 
        return (
            <body className="w-full h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                <header>
                    <div className="content py-2">
                        <nav className="flex items-center justify-between">
                            <h2 className="text-gray-200 font-bold text-lg sm:text-4xl">WellBeing</h2>
                            <div className="auth flex items-center">
                                <Link className="bg-gray-200 text-gray-900  p-2 rounded border border-gray-300 mr-4 hover:bg-gray-100 hover:text-gray-700" href="/auth/login">Log in</Link>
                                <Link className="bg-gray-900 text-gray-200  py-2 px-3 rounded  hover:bg-gray-800 hover:text-gray-100" href="/auth/register">Sign up</Link>
                            </div>
                        </nav>
                    </div> 
                </header>  
                <div className="w-full h-screen flex justify-center items-center">
                    <Link className="text-center font-bold text-white text-5xl underline decoration-sky-600 hover:decoration-blue-400" href='../auth/login'>Get access by logging in for free!</Link>
                </div>
            </body>
        )}
}
export default Journey;