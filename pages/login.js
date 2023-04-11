import LoginForm from '@/components/LoginForm';
import NavBar from '@/components/NavBar';
import React, { useState } from 'react'
function Login() {
    return (
        <>
            <NavBar></NavBar>
            <LoginForm></LoginForm>
        </>
    )
}

export default Login