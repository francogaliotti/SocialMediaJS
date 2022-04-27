import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/posts').then((res) => {
            setListOfPosts(res.data)
        })
    }, [])

    return (
        <div>{listOfPosts.map((post, key) => {
            return <div key={key} className="post" onClick={()=>navigate(`/post/${post.id}`)}>
                <div className='title'>
                    {post.title}
                </div>
                <div className='body'>
                    {post.postText}
                </div>
                <div className='footer'>
                    {post.username}
                </div>
            </div>
        })}</div>
    )
}

export default Home