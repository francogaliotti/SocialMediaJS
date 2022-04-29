import React, {useState} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function Login() {
    let navigate = useNavigate();
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const login = () => {
        axios.post('http://localhost:8080/auth/login', {
            'username':username,
            'password':password
        }).then((res)=>{
            sessionStorage.setItem("accessToken", res.data.token)
            navigate(`/`)
        }).catch((err)=>{
            console.log(err)
        })
    }
  return (
    <div className='loginContainer'>
        <label>Username:</label>
        <input
            type="text"
            onChange={(event)=>{setUsername(event.target.value)}}
            placeholder="Enter your Username"
        />
        <label>Password:</label>
        <input
            type="password"
            onChange={(event)=>{setPassword(event.target.value)}}
            placeholder="Enter your Password"
        />
        <button onClick={login}>Login</button>
    </div>
  )
}

export default Login