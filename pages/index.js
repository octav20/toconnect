import ChatContainer from "@/components/ChatContainer"
import SideBar from "@/components/SideBar";
import Welcome from "@/components/Welcome";
import axios from "axios";
import { jwtVerify } from "jose";
import { useState, useEffect } from "react";
import io from 'socket.io-client'
import { useRouter } from 'next/router';
let socket;

function Chat({ user }) {
    const [contacts, setContacts] = useState([])
    const [currentChat, setCurrentChat] = useState(undefined)
    const router = useRouter();
    useEffect(() => {
        const getUser = async () => {

            if (!user) {
                router.push("/login");
            } else {

                console.log(user);
            }
        }
        const socketInitializer = async () => {
            await fetch('/api/pruebasocket');
            socket = io();

            socket.on('connect', () => {
                console.log('connected')
                console.log(`Socket del cliente ${socket.id}`)

            })

            if (user) {
                console.log(user.id);
                socket.emit("add-user", user.id);
            }

            socket.on("connect_error", (err) => {
                if (err.message === "invalid username") {
                    setUsernameAlreadySelected(false);
                }
            });




        }
        getUser();
        socketInitializer()

    }, [router, user]);

    useEffect(() => {
        const getContacts = async () => {
            if (user) {
                const { data } = await axios.get(`/api/getContacts/` + user.id);

                setContacts(data.data);

            }
        }
        getContacts()
    }, [user])
    const addContact = (contact) => {
        try {
            const contactss = [...contacts]
            contactss.push(contact)
            setContacts(contactss);
            console.log(contacts);
        } catch (error) {
            console.log(error);
        }
    }
    const handleChatChange = (chat) => {
        setCurrentChat(chat);
    };
    return (
        <div className="flex h-screen antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-x-hidden">
                <SideBar currentUser={user} contacts={contacts} changeChat={handleChatChange} addContact={addContact} />
                {
                    currentChat === undefined ? <Welcome /> :
                        <ChatContainer currentUser={user} currentChat={currentChat} socket={socket} />
                }
            </div>
        </div>


    )
}

export default Chat
export const getServerSideProps = async (context) => {

    const cookie = context.req.cookies.token || null;

    if (cookie) {
        const { payload } = await jwtVerify(
            cookie,
            new TextEncoder().encode("secret")
        );
        return {
            props: {
                user: payload,
            },
        };
    }
    return {
        props: {
            user: null,
        },
    };

};
