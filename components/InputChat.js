import React, { useState } from 'react'

function InputChat({ handleSendMsg }) {

    const [message, setMessage] = useState("");
    const sendChat = (e) => {
        e.preventDefault();
        try {
            if (message.length > 0) {
                handleSendMsg(message);
                setMessage("");
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            sendChat(e)
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <form onSubmit={handleSubmit} className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4">

            <div className="flex-grow ml-4">
                <div className="relative w-full">
                    <input type="text" className="flex w-full border rounded-xl focus:outline-none focus:border-indigo-300 pl-4 h-10" value={message} onChange={(e) => setMessage(e.target.value)} />

                </div>
            </div>
            <div className="ml-4">
                <button type='submit' className="flex items-center justify-center bg-indigo-700 hover:bg-indigo-800 rounded-xl text-white text-base font-semibold px-4 py-1 flex-shrink-0">
                    <span>Send</span>
                    <span className="ml-2">
                        <svg className="w-4 h-4 transform rotate-45 -mt-px" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                    </span>
                </button>
            </div>
        </form>
    )
}

export default InputChat