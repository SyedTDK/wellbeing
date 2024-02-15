// Code: Meditate page

"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const Timer = () => {
    const [seconds, setSeconds] = useState(60);
    const [timerFinished, setTimerFinished] = useState(false);

    useEffect(() => {
        if (seconds > 0) {
            const timer = setInterval(() => {
                setSeconds((prevSeconds) => prevSeconds - 1);
            }, 1000);
            return () => clearInterval(timer);
        } else {
            setTimerFinished(true);
        }
    }, [seconds]);

    const timerProgress = (seconds / 60) * 100;

    return (
        <body className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
            <div className="w-screen h-screen flex justify-center items-center">
                <div className="timer">
                    <p className="text-lg font-bold">Take a minute, close your eyes, focus only on breathing...</p>
                    <div className="text-center font-semibold text-5xl">{seconds}</div>
                    <div className="flex justify-center">
                        <Link 
                            className="inline-flex text-center items-center justify-center p-0.5 mb-2 me-2 overflow-hidden text-lg font-medium text-white rounded-lg group bg-gradient-to-br from-teal-300 to-lime-300 group-hover:from-teal-300 group-hover:to-lime-300 focus:ring-4 focus:outline-none focus:ring-lime-200" 
                            href="/Journey"
                        >
                            <span className="px-5 py-2.5 transition-all ease-in duration-75 bg-gray-900 rounded-md group-hover:bg-opacity-0">
                                Once you feel calm, go to the next step
                            </span>
                        </Link>
                    </div>
                </div>
            </div>
            <footer className="bg-gray-800 rounded-lg shadow m-4">
              <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
                  <span className="text-sm sm:text-center text-gray-400">© 2023 WellBeing™. All Rights Reserved.
                </span>
                <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-400 sm:mt-0">
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">About</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Privacy Policy</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline me-4 md:me-6">Licensing</a>
                    </li>
                    <li>
                        <a href="#" className="hover:underline">Contact</a>
                    </li>
                </ul>
              </div>
          </footer>
        </body>
    );
};

export default Timer;
