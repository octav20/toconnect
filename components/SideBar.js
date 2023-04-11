import React, { useEffect, useState } from 'react'
import AddContact from './AddContact';
import axios from 'axios';
import { useRouter } from 'next/router';
function SideBar({ currentUser, contacts, changeChat, addContact }) {
    const router = useRouter()
    const [currentSelected, setCurrentSelected] = useState(undefined);
    const [SideBar, setSidebar] = useState(true);
    const changeCurrentChat = (index, contact) => {
        setCurrentSelected(index);
        changeChat(contact);
    };
    useEffect(() => {
        if (window.screen.width < 690) {
            setSidebar(false)
        }
    }, [])

    const logout = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/api/signOut");
            console.log(res);
            router.push("/login");

        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            {SideBar ? <div className="flex flex-col py-8 pl-6 pr-2 w-64 bg-white flex-shrink-0">
                <div className="flex flex-row items-center justify-center h-12 w-full">
                    <div className="flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                        </svg>
                    </div>
                    <div className="ml-2 font-bold text-2xl">ToConnect</div>
                    <button className='ml-5' onClick={() => setSidebar(!SideBar)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                            <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                        </svg>


                    </button>
                </div>
                <div className="flex flex-col mt-8 h-full max-h-96">

                    <AddContact currentUser={currentUser} addContact={addContact} />
                    {/* Contactos */}
                    <div className="flex flex-col space-y-1 mt-4 -mx-2 overflow-y-auto">
                        {contacts.length === 0 ? <span className="font-bold">No Contacts</span> : contacts.map((contact, index) => {
                            return (
                                <button key={contact.contact_id} className={`flex flex-row items-center hover:bg-gray-100 rounded-xl p-2 ${index === currentSelected ? "bg-gray-100" : ""}`} onClick={() => changeCurrentChat(index, contact)}>
                                    <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                                        {contact.username[0].toUpperCase()}
                                    </div>
                                    <div className="ml-2 text-sm font-semibold">{contact.username}</div>
                                </button>
                            )
                        })}

                    </div>

                </div>
                <button className="block text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mt-12" type="button" onClick={logout}>
                    Sign Out
                </button>
            </div> : <div className=' py-8 pl-2 pr-2'> <button className='ml-5' onClick={() => setSidebar(!SideBar)}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                </svg>

            </button></div>}

        </>
    )
}

export default SideBar