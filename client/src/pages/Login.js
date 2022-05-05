import React, {useState, useContext} from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom'
import {AuthContext} from '../helpers/authContext'
import Swal from 'sweetalert2'

function Login() {
    let navigate = useNavigate();
    const[username, setUsername] = useState("")
    const[password, setPassword] = useState("")
    const {setAuthState} = useContext(AuthContext)
    const login = () => {
        axios.post('http://localhost:8080/auth/login', {
            'username':username,
            'password':password
        }).then((res)=>{
            localStorage.setItem("accessToken", res.data.token)
            localStorage.setItem("username", res.data.user.username)
            setAuthState({
                username: res.data.user.username,
                id: res.data.user.id,
                status: true
              })
            console.log(res.data.user.id)
            navigate(`/`)
        }).catch((err)=>{
            if(err.response.data.error == "Incorrect password"){
                Swal.fire({
                    icon: 'error',
                    title: 'Incorrect password!'
                  })
            } else {
                Swal.fire({
                    icon: 'error',
                    title: "Username doesn't exist!"
                  })
            }
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