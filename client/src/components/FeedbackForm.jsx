import React from 'react'
import { useState } from "react"
import { Button } from './ui/button';
import { Textarea } from "./ui/textarea"
import { Toaster, toast } from 'sonner';

import axios from 'axios';


function FeedbackForm() {


    const [text, setText] = useState("");



    const backendUrl = import.meta.env.VITE_BACKEND_URL

    const handleChange = (e) => {
        setText(e.target.value)

    }

    const FeedbackSubmit = async (e) => {
        e.preventDefault();

        if (!text.trim()) {
            toast.info("Feedback is required")
        }

        try {
            const { data } = await axios.post(`${backendUrl}/api/feedback/analyze`, { text }, {
                withCredentials: true
            })

            if (data.success) {
                toast.success(data.message);
                setText('');
            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }

    }


    return (
        <>
            <Toaster richColors />
            <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
                <div className='absolute top-0 left-0 py-20 px-5 md:py-8 md:mx-8'>
                    <h1 className='text-xl md:text-2xl font-semibold'>Ai Feedback Analyzer</h1>
                </div>
                <div className='py-4 text-center w-96 md:w-[500px]'>
                    <h1 className='text-2xl md:text-3xl font-semibold mb-3'>We Value Your Feedback!</h1>
                    <p className='text-lg'>Share your thoughts with us. We use smart AI to understand and improve your experience.</p>
                </div>
                <div className="flex flex-col items-center ">
                    <Textarea
                        className='w-[350px] md:w-[600px] h-20 md:min-h-24 text-gray-700 '
                        onChange={handleChange}
                        value={text}
                        placeholder="Type your Feedback here."
                    />
                    <Button onClick={FeedbackSubmit} className="mt-5 cursor-pointer px-10 py-5">Submit Feedback</Button>
                </div>
            </div>
        </>

    )
}

export default FeedbackForm
