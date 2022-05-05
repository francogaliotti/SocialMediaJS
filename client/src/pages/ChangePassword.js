import React, {useState, useEffect} from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'

function ChangePassword() {
    const [oldPassword, setOldPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    let navigate = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate('/login')
        }
    }, [])
    const changePassword = () => {
        axios.put(`http://localhost:8080/auth/changepassword`, {
            oldPassword: oldPassword,
            newPassword: newPassword
        },{
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then(res => {
            Swal.fire({
                icon: 'success',
                title: 'Password changed!'
              })
        }).catch(err => {
            Swal.fire({
                icon: 'error',
                title: err.response.data.error
              })
        })
    }
    return (
        <div className='loginContainer'>
            <h1> Change your password</h1>
            <input type="password" placeholder="Old password" onChange={(ev)=>{setOldPassword(ev.target.value)}}></input>
            <input type="password" placeholder="New password" onChange={(ev)=>{setNewPassword(ev.target.value)}}></input>
            <button type='submit' onClick={changePassword}> Save changes</button>
        </div>
    )
}

export default ChangePassword