import Link from 'next/link'
import React from 'react'

function NavBar() {
    return (
        <nav className="relative flex w-full flex-wrap items-center justify-between bg-indigo-700 py-3 text-white shadow-lg">
            <div className="flex w-full flex-wrap items-center justify-between px-6">
                <div>
                    <Link className="text-xl font-semibold  text-neutral-800 dark:text-neutral-200" href="#">ToConnect</Link>
                </div>
            </div>
        </nav>

    )
}

export default NavBar