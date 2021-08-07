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
            <div className="button-wrap">
                <button className="login" onClick={login}>Login</button>
                <button className="signup" onClick={signup}>Signup</button>
            </div>
        </div>
    )
}

export default Navigation;