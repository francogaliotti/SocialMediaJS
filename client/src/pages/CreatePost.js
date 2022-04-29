import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

function CreatePost() {
    let navigate = useNavigate();
    const initialValues={
        title:"",
        postText:"",
        username:""
    }
    const onSubmit = (data) =>{
        axios.post('http://localhost:8080/posts', data, {
            headers:{
                accessToken: sessionStorage.getItem("accessToken")
            }
        }).then((res) => {
            navigate(`/`)
        })
    }
    const validationSchema = Yup.object().shape({
        title: Yup.string().min(1).max(25).required(),
        postText: Yup.string().min(3).max(200).required(),
        username: Yup.string().min(3).max(15).required()
    })
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
                    <label>Username: </label>
                    <ErrorMessage name='username' component='span'/>
                    <Field
                        autoComplete="off"
                        id="inputCreatePost"
                        name="username"
                        placeholder="Your username" />
                    <button type='submit'>Create a Post</button>
                </Form>
            </Formik>
        </div>
    )
}

export default CreatePost