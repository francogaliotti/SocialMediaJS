import React, { useEffect, useState, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { AuthContext } from '../helpers/authContext'
import DeleteIcon from '@material-ui/icons/Delete';
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt';
import Swal from 'sweetalert2'

function Post() {
    let { id } = useParams()
    const [postObject, setPostObject] = useState({})
    const [postLikes, setPostLikes] = useState([])
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")
    const { authState } = useContext(AuthContext)
    let navigate = useNavigate();

    useEffect(() => {
        axios.get(`http://localhost:8080/posts/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((res) => {
            setPostObject(res.data)
            const likes = res.data.Likes
            setPostLikes(likes.map(like => {
                return like.UserId
            }))
        })
        axios.get(`http://localhost:8080/comments/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((res) => {
            setComments(res.data)
        })
    }, [])

    const addComment = () => {
        axios.post(`http://localhost:8080/comments`, {
            'commentBody': newComment,
            'PostId': postObject.id
        }, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((res) => {
            const commentToAdd = res.data
            setComments([commentToAdd, ...comments])
            setNewComment("")
        })
    }

    const deleteComment = (id) => {
        axios.delete(`http://localhost:8080/comments/${id}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then((res) => {
            setComments(comments.filter((c) => {
                return c.id != id
            }))
        }).catch(err => {
            console.log(err)
        })
    }

    const deletePost = (postId) => {
        axios.delete(`http://localhost:8080/posts/${postId}`, {
            headers: {
                accessToken: localStorage.getItem("accessToken")
            }
        }).then(res => {
            navigate('/')
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
            if (res.data.liked) {
                setPostLikes([...postLikes, authState.id])
            } else {
                setPostLikes(postLikes.filter(id => {
                    return id !== authState.id
                }))
            }
        })
    }

    const editPost = (option) => {
        if (option === "title") {
            Swal.fire({
                title: "Edit your title",
                input: 'text',
                inputValue: postObject.title,
                showCancelButton: true
            }).then((result) => {
                if(result.value){
                    axios.put(`http://localhost:8080/posts/title/${id}`, {
                    newTitle: result.value
                }, {
                    headers: {
                        accessToken: localStorage.getItem("accessToken")
                    }
                }).then(res => {
                    setPostObject({...postObject, title: result.value})
                })
                }
                
            });
        } else {
            Swal.fire({
                title: "Edit your post body",
                input: 'textarea',
                inputValue: postObject.postText,
                showCancelButton: true
            }).then((result) => {
                if (result.value) {
                    axios.put(`http://localhost:8080/posts/body/${id}`, {
                        newPostText: result.value
                    }, {
                        headers: {
                            accessToken: localStorage.getItem("accessToken")
                        }
                    }).then(res => {
                        setPostObject({...postObject, postText: result.value})
                    })
                }
               
            });
        }
    }

    return (
        <div className="postPage">
            <div className="leftSide">
                <div className='post' key={postObject.id} id="individual">
                    <div className='title' onClick={() => {
                        if (authState.id === postObject.UserId) {
                            editPost("title")
                        }
                    }}>
                        {postObject.title}
                    </div>
                    <div className='body' onClick={() => {
                        if (authState.id === postObject.UserId) {
                            editPost("body")
                        }
                    }}>
                        {postObject.postText}
                    </div>
                    <div className='footer'>
                        <div className="username">{postObject.username}</div>
                        <div className="buttons">
                            <ThumbUpAltIcon
                                onClick={() => {
                                    likePost(postObject.id);
                                }}
                                className={postLikes.includes(authState.id) ? "unlikeBttn" : "likeBttn"}
                            />
                            <label> {postLikes.length}</label>
                            {authState.username === postObject.username &&
                                <DeleteIcon className='deleteIcon'
                                    onClick={() => {
                                        deletePost(postObject.id)
                                    }}
                                />}
                        </div>
                    </div>
                </div>
            </div>
            <div className="rightSide">
                <div className='addCommentContainer'>
                    <textarea
                        placeholder='Comment...'
                        autoComplete='off'
                        onChange={(e) => { setNewComment(e.target.value) }}
                        value={newComment} />
                    <button onClick={addComment}>Add Comment</button>
                </div>
                <div className='listOfComments'>
                    {comments.map((comment, key) => {
                        return <div key={key} className='comment'>
                            <div className='comment-body'>
                                {comment.commentBody}
                            </div>
                            <div className='comment-footer'>
                                <label> {comment.username}</label>
                                {authState.username === comment.username && <DeleteIcon className='deleteIcon' onClick={() => deleteComment(comment.id)} />}
                            </div>
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post