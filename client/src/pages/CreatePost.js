import React, {useContext, useEffect} from 'react'
import {AuthContext} from '../helpers/authContext'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function CreatePost() {
    let navigate = useNavigate();
    const {authState} = useContext(AuthContext)
    const initialValues={
        title:"",
        postText:""
    }
    const onSubmit = (data) =>{
        axios.post('http://localhost:8080/posts', data, {
            headers:{
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((res) => {
            navigate(`/`)
        })
    }
    const validationSchema = Yup.object().shape({
        title: Yup.string().min(1).max(25).required(),
        postText: Yup.string().min(3).max(200).required(),
    })
    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate('/login')
        }
    }, [])

    return (
        <div className='createPostPage'>
            <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
                <Form className="formContainer">
                    <label>Tittle: </label>
                    <ErrorMessage name='title' component='span'/>
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="title"
                        placeholder="Write a title" />
                    <label>Post Content: </label>
                    <ErrorMessage name='postText' component='span'/>
                    <Field
                        autoComplete="off"
                        as="textarea"
                        id="inputTextPost"
                        name="postText"
                        placeholder="Write a post" />
                    <button type='submit'>Create a Post</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost