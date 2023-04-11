import axios from 'axios';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, { useState } from 'react'
function LoginForm() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        password: "",
    })

    const handleChange = ({ target: { name, value } }) => {
        setUser({
            ...user,
            [name]: value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            console.log(user);
            await axios.post("/api/login/", user);
            router.push("/");
        } catch ({ response: { data } }) {
            alert(data.msg);
            console.log(data);
        }
    }
    return (

        < div className="bg-white relative" >
            <div className="flex flex-col items-center justify-between pt-0 pr-10 pb-0 pl-10 mt-0 mr-auto mb-0 ml-auto max-w-7xl
        xl:px-5 ">
                <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 ">

                    <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 max-w-2xl lg:mt-0 lg:w-5/12">
                        <div className="flex flex-col items-start justify-start pt-10 pr-10 pb-10 pl-10 bg-white shadow-2xl rounded-xl
              relative z-10">
                            <h3 className="w-full text-4xl font-medium text-center leading-snug">Sign in</h3>
                            <form onSubmit={handleSubmit} className="w-full mt-6 mr-0 mb-0 ml-0 relative space-y-8">
                                <div className="relative">
                                    <label className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                    absolute">Username</label>
                                    <input placeholder="username" type="text" name='username' value={user.username} onChange={handleChange} required className="border placeholder-gray-400 focus:outline-none
                    focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                    border-gray-300 rounded-md" />
                                </div>
                                <div className="relative">
                                    <label className="bg-white pt-0 pr-2 pb-0 pl-2 -mt-3 mr-0 mb-0 ml-2 font-medium text-gray-600
                    absolute">Password</label>
                                    <input placeholder="Password" type="password" name='password' value={user.password} onChange={handleChange} required className="border placeholder-gray-400 focus:outline-none
                    focus:border-black w-full pt-4 pr-4 pb-4 pl-4 mt-2 mr-0 mb-0 ml-0 text-base block bg-white
                    border-gray-300 rounded-md" />
                                </div>
                                <div className="relative">
                                    <button type='submit' className="w-full inline-block pt-4 pr-5 pb-4 pl-5 text-xl font-medium text-center text-white bg-indigo-500
                    rounded-lg transition duration-200 hover:bg-indigo-600 ease">Submit</button>
                                </div>
                                <div className="text-sm font-medium text-gray-600">
                                    {"Don't have an account?"} <Link href="/register" className="text-blue-700 hover:underline dark:text-blue-500">Create an account</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>




    )
}

export default LoginForm