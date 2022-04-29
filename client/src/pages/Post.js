import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'

function Post() {
    let { id } = useParams()
    const [postObject, setPostObject] = useState({})
    const [comments, setComments] = useState([])
    const [newComment, setNewComment] = useState("")

    useEffect(() => {
        axios.get(`http://localhost:8080/posts/${id}`, {
            headers:{
                accessToken: sessionStorage.getItem("accessToken")
            }
        }).then((res) => {
            setPostObject(res.data)
        })
        axios.get(`http://localhost:8080/comments/${id}`, {
            headers:{
                accessToken: sessionStorage.getItem("accessToken")
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
            headers:{
                accessToken: sessionStorage.getItem("accessToken")
            }
        }).then((res) => {
            const commentToAdd = {commentBody: newComment}
            setComments([commentToAdd,...comments])
            setNewComment("")
        })
    }

    return (
        <div className="postPage">
            <div className="leftSide">
                <div className='post' key={postObject.id} id="individual">
                    <div className='title'>
                        {postObject.title}
                    </div>
                    <div className='body'>
                        {postObject.postText}
                    </div>
                    <div className='footer'>
                        {postObject.username}
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
                        return <div key={key} className='comment'>{comment.commentBody}</div>
                    })}
                </div>
            </div>
        </div>
    )
}

export default Post