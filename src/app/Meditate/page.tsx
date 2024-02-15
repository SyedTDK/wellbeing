// Code: Meditate page

"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Footer from '../components/Footer';

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
            <Footer />
        </body>
    );
};

export default Timer;
