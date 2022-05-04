import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../helpers/authContext'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import DeleteIcon from '@material-ui/icons/Delete';

function Profile() {
    let { id } = useParams()
    const [username, setUsername] = useState("")
    let navigate = useNavigate();
    const [email, setEmail] = useState("")
    const [listOfPosts, setListOfPosts] = useState([])
    const [likedPosts, setLikedPosts] = useState([])
    const { authState } = useContext(AuthContext)
    useEffect(() => {
        axios.get(`http://localhost:8080/auth/info/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then(res => {
            setUsername(res.data.username)
            setEmail(res.data.email)
        })
        axios.get(`http://localhost:8080/posts/user/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then(res => {
            setListOfPosts(res.data.listOfPosts)
            setLikedPosts(res.data.likedPosts.map(like => {
                return like.PostId
            }))
        })
    }, [])
    const deletePost = (postId) => {
        axios.delete(`http://localhost:8080/posts/${postId}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then(res => {
            setListOfPosts(listOfPosts.filter(post => {
                return post.id !== postId
            }))
        })
    }

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
        if (likedPosts.includes(postId)) {
            setLikedPosts(likedPosts.filter(id => {
                return id !== postId
            }))
        } else {
            setLikedPosts([...likedPosts, postId])
        }

    }
    return (
        <div className='profilePageContainer'>
            <div className='basicInfo'>
                <h1> Username: {username}</h1>
                <h2> Email: {email}</h2>
            </div>
            <div className='listOfPosts'>
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
                                {authState.username === post.username &&
                                    <DeleteIcon className='deleteIcon'
                                        onClick={() => {
                                            deletePost(post.id)
                                        }}
                                    />}
                            </div>
                        </div>
                    </div>
                })}</div >
            </div>
        </div>
    )
}

export default Profile