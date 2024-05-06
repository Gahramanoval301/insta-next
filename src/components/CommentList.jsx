"use client"
import React, { useEffect, useState } from 'react'
import io from 'socket.io-client'
const socket = io.connect("http://localhost:3001")

export default function CommentList({ post }) {
    const [comment, setComment] = useState('')
    const [inbox, setInbox] = useState([])

    useEffect(() => {
        socket.on("receive_message", (data) => {
            console.log(data.message);
            setInbox([...inbox, data.message])
        })
    }, [socket])

    const sendMessage = () => {
        socket.emit("send_message", { message: comment })
    }

    return (
        <>
            <div>
                {inbox.map((message, index) => {
                    return <div key={index}>{message} {post.id}</div>
                })}
            </div>
            <div>
                <input type="text" placeholder='write comment'
                    onChange={(e) => setComment(e.target.value)}
                    value={comment} />
                <button onClick={sendMessage}>Send Message</button>
            </div>
        </>
    )
}
