import React, { useEffect, useState } from 'react'
import InputChat from './InputChat'
import axios from 'axios'
function ChatContainer({ currentUser, currentChat, socket }) {
    const [messages, setMessages] = useState([]);
    const [arrivalMessage, setArrivalMessage] = useState(null);


    useEffect(() => {
        const getMessages = async () => {
            const { data } = await axios.post(`/api/getMessages/`, { from: currentUser.id, to: currentChat.contact_id });
            setMessages(data.data);
            console.log(currentChat);
        }
        getMessages();
    }, [currentChat])


    const handleSendMsg = async (msg) => {
        socket.emit("send-msg", {
            from: currentUser.id,
            to: currentChat.contact_id,
            content: msg,
        });
        await axios.post("/api/sendMessage/", {
            from: currentUser.id,
            to: currentChat.contact_id,
            content: msg,
        });

        const msgs = [...messages];
        msgs.push({ fromSelf: true, message: msg });
        setMessages(msgs);
    };

    /* This `useEffect` hook is setting up a listener for the "msg-recieve" event on the `socket`
    object. If the `socket` object exists, it will listen for the "msg-recieve" event and when it
    receives a message, it will update the `arrivalMessage` state variable with an object containing
    the message and a `fromSelf` property set to `false`. The empty dependency array `[]` ensures
    that this effect only runs once when the component mounts. */
    useEffect(() => {
        if (socket) {
            socket.on("msg-recieve", (msg) => {
                setArrivalMessage({ fromSelf: false, message: msg });
            });
        }
    }, [socket]);

    /* This `useEffect` hook is watching for changes in the `arrivalMessage` state variable. If
    `arrivalMessage` is truthy (i.e. not null or undefined), it will update the `messages` state by
    adding the `arrivalMessage` to the end of the array using the spread operator. This is used to
    update the chat messages with any new messages that are received from the server via the socket
    connection. */
    useEffect(() => {
        arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage]);


    return (

        <div className="flex flex-col flex-auto h-full p-6">
            <div className="flex flex-col flex-auto flex-shrink-0 rounded-2xl bg-gray-100 h-full p-4">
                {/* Messages Container */}
                <div className="flex flex-col h-full overflow-x-auto mb-4">
                    <div className="flex flex-col h-full">
                        <div className="grid grid-cols-12 gap-y-2">
                            {/* Mensajes */}
                            {messages.map((message, index) => {
                                return (
                                    <div key={index} className={`${message.fromSelf ? "col-start-6 col-end-13 p-3 rounded-lg" : "col-start-1 col-end-8 p-3 rounded-lg"}`}>
                                        <div className={`${message.fromSelf ? "flex items-center justify-start flex-row-reverse" : "flex flex-row items-center"}`}>
                                            <div className="flex items-center justify-center h-10 w-10 rounded-full bg-indigo-500 flex-shrink-0">
                                                {message.fromSelf ? currentUser.username[0].toUpperCase() : currentChat.username[0].toUpperCase()}
                                            </div>
                                            <div className={`relative text-sm ${message.fromSelf ? "bg-indigo-100 mr-3" : "bg-white  ml-3"}  py-2 px-4 shadow rounded-xl`}>
                                                <p>{message.message}</p>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <InputChat handleSendMsg={handleSendMsg} />
            </div>
        </div>

    )
}

export default ChatContainer