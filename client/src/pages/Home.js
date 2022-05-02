import React from 'react'
import axios from "axios"
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';

function Home() {
    const [listOfPosts, setListOfPosts] = useState([])
    const [likedPosts, setLikedPosts] = useState([])
    let navigate = useNavigate();

    useEffect(() => {
        axios.get('http://localhost:8080/posts', {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((res) => {
            setListOfPosts(res.data.listOfPosts)
            setLikedPosts(res.data.likedPosts.map(like => {
                return like.PostId
            }))
        })
    }, [])

    const likePost = (postId) => {
        axios.post('http://localhost:8080/likes', {
            PostId: postId
        }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then(res => {
            setListOfPosts(listOfPosts.map(post => {
                if (post.id === postId) {
                    if (res.data.liked) {
                        return { ...post, Likes: [...post.Likes, 0] }
                    } else {
                        const likesArray = post.Likes
                        likesArray.pop()
                        return { ...post, Likes: likesArray }
                    }
                } else {
                    return post
                }
            }))
        })
        if (likedPosts.includes(postId)){
            setLikedPosts(likedPosts.filter(id => {
                return id !== postId
            }))
        } else {
            setLikedPosts([...likedPosts, postId])
        }

    }

    return (
        <div>{listOfPosts.map((post, key) => {
            return <div key={key} className="post">
                <div className='title'>
                    {post.title}
                </div>
                <div className='body' onClick={() => navigate(`/post/${post.id}`)}>
                    {post.postText}
                </div>
                <div className='footer'>
                    <div className="username">{post.username}</div>
                    <div className="buttons">
                        <ThumbUpAltIcon
                            onClick={() => {
                                likePost(post.id);
                            }}
                            className={likedPosts.includes(post.id) ? "unlikeBttn" : "likeBttn"}
                        />

                        <label> {post.Likes.length}</label>
                    </div>
                </div>
            </div>
        })}</div >
    )
}

export default Home