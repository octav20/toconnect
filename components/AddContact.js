import axios from 'axios';
import React, { useState } from 'react'

function AddContact({ currentUser, addContact }) {
    const [modal, setModal] = useState(false);
    const [contact, setContact] = useState({
        contact_of: 0,
        contact_id: 0,
        username: "",
    })
    const handleChange = ({ target: { name, value } }) => {
        setContact({
            ...contact,
            [name]: value
        })
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(`/api/getContact/${contact.username}`)


            contact.contact_of = currentUser.id;
            contact.contact_id = data.data[0].id;
            contact.username = contact.username;

            console.log(contact);
            await axios.post("/api/saveContact/", contact)
            addContact(contact);
            setContact({
                contact_of: 0,
                contact_id: 0,
                username: "",
            })
        } catch (error) {
            console.log(error.message);
        }
    }
    return (

        <div>
            {/* Modal toggle */}
            <div className='flex flex-row'>
                <div className="flex flex-row items-center justify-between text-xs">
                    <span className="font-bold text-base ">Contacts</span>
                </div>
                <button className="block text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center ml-8 " type="button" onClick={() => setModal(!modal)}>
                    Add Contact
                </button>
            </div>
            {/* Main modal */}
            <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className={`fixed top-0 left-0 right-0 z-50 ${modal ? "" : "hidden"} w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] md:h-full`}>
                <div className="relative w-full h-full max-w-md md:h-auto">
                    {/* Modal content */}
                    <div className="relative bg-white rounded-lg shadow">
                        <button type="button" className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" data-modal-hide="authentication-modal" onClick={() => setModal(false)}>
                            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-gray-900 ">Add Contact</h3>
                            <form className="space-y-6" action="#" onSubmit={handleSubmit}>
                                <div>
                                    <label htmlFor="text" className="block mb-2 text-sm font-medium text-gray-900 ">Username</label>
                                    <input type="text" name="username" value={contact.username} onChange={handleChange} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-indigo-500 focus:border-indigo-500 block w-full p-2.5 " required />
                                </div>

                                <button type="submit" className="w-full text-white bg-indigo-700 hover:bg-indigo-800 focus:ring-4 focus:outline-none focus:ring-indigo-300 font-medium rounded-xl text-sm px-5 py-2.5 text-center ">Save Contact</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default AddContact