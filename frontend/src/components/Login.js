import React, {useState, useEffect} from 'react'
import {render} from "react-dom";

const Login = () => {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const failure = () => {
        alert('wrong username or password');
    };

    const handleEnter = (keycode) => {
        if (keycode === 13) {
            login();
        }
    };

    useEffect(() => {
        document.body.addEventListener('keyup', (e) => handleEnter(e.keyCode));
    });


    const login = () => {

        fetch("/api/login", {
            method: 'POST',
            body: JSON.stringify({
                username: username,
                password: password,
            })
        }).then(response => {
            if (response.status > 400) {
                failure();
            }else{
                self.location = '/main/'
            }
        })

    };

    return (
        <React.Fragment>
            <div id="logoSection">
                <div id="logoLogin"/>
                <h4>Boxer Leads</h4>
            </div>
            <div id="credentialsContainer">
                <label>
                    <input onBlur={(e) => setUsername(e.target.value)} type="text" id="userName"
                           placeholder="User name"/>
                </label>
                <label>
                    <input onBlur={(e) => setPassword(e.target.value)} type="password" id="password"
                           placeholder="Password"/>
                </label>
                <button onClick={login} id="loginButton">Login</button>
            </div>
        </React.Fragment>
    )

};

const container = document.getElementById("login");
if ( container !==  null) {
    render(<Login/>, container);
}