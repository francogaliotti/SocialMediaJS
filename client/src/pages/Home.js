import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

function Home() {
    const [listOfPosts, setListOfPosts] = useState([]);
    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/posts', {
            headers:{
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((res) => {
            setListOfPosts(res.data)
        })
    }, [])

    const likePost = (postId) => {
        axios.post('http://localhost:8080/likes', {
            PostId: postId
        },{
            headers:{
                accessToken: localStorage.getItem("accessToken")
            }
        }).then(res => {
            setListOfPosts(listOfPosts.map(post => {
                if (post.id === postId){
                    if (res.data.liked){
                        return {...post, Likes: [...post.Likes, 0]}
                    } else {
                        const likesArray = post.Likes
                        likesArray.pop()
                        return {...post, Likes: likesArray}
                    }
                } else {
                    return post
                }
            }))
        })
    }

    return (
        <div>{listOfPosts.map((post, key) => {
            return <div key={key} className="post">
                <div className='title'>
                    {post.title}
                </div>
                <div className='body' onClick={()=>navigate(`/post/${post.id}`)}>
                    {post.postText}
                </div>
                <div className='footer'>
                    {post.username}
                    <button onClick={() => likePost(post.id)}> Like </button>
                    <label>{post.Likes.length}</label>
                </div>
            </div>
        })}</div>
    )
}

export default Home