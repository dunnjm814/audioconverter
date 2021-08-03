import React from 'react'
import "./nav.css"

function Navigation() {

    function login(e) {
        e.preventDefault();
        console.log("click")
    }
    function signup(e) {
        e.preventDefault();
        console.log("click")
    }
    
    return (
        <div className="nav">
            <button className="login" onClick={login}>Login</button>
            <button className="signup" onClick={signup}>Signup</button>
        </div>
    )
}

export default Navigation;