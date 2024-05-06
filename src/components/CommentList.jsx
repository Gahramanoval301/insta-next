"use client"
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { LuSendHorizonal } from 'react-icons/lu';
import { useSession } from 'next-auth/react';
import { AiFillLike } from "react-icons/ai";

const socket = io.connect('http://localhost:3001');

export default function CommentList({ post }) {
    const url = 'https://65217450a4199548356d3a5c.mockapi.io/api/v1/comments';
    const [comment, setComment] = useState('');
    const [inbox, setInbox] = useState({}); // Change state structure to hold messages for each post
    const [likes, setLikes] = useState({});
    const { data: session } = useSession();
    const username = session?.user?.username;
    const email = session?.user?.email;
    const image = session?.user?.image;

    useEffect(() => {
        socket.on('receive_message', (data) => {
            const updatedInbox = { ...inbox };
            const newMessage = {
                message: data.message,
                username: data.username,
                email: data.email,
                image: data.image,
            };
            updatedInbox[data.postId] = [...(updatedInbox[data.postId] || []), newMessage];
            setInbox(updatedInbox);
        });

        socket.on('receive_like', ({ postId, liked }) => {
            setLikes((prevLikes) => ({
                ...prevLikes,
                [postId]: liked,
            }));
        });

    }, [socket, inbox]);


    const sendLike = (postId) => {
        const updatedLikes = { ...likes };
        updatedLikes[postId] = !updatedLikes[postId]; // Toggle like state

        // Send the updated like status to the server
        socket.emit('send_like', { postId, liked: updatedLikes[postId] });

        // Update the local state with the new like status
        setLikes(updatedLikes);
    };




    const sendMessage = () => {
        socket.emit('send_message', { message: comment, postId: post.id, username, email, image });
        setComment('');
    };

    return (
        <>
            <div>
                <button onClick={() => sendLike(post.id)} disabled={likes[post.id]}
                    className='flex items-center gap-1 text-2xl mx-4 my-2'
                >
                    <AiFillLike className={`text-2xl ${likes[post.id] ? 'text-green-500' : 'text-gray-500'} hover:text-green-500 hover:cursor-pointer hover:scale-110 hover:-translate-y-2 transition duration-300 ease-out`} />
                    <span>{likes[post.id] ? 1 : 0}</span>
                </button>
            </div>
            <div className="">
                {inbox[post.id] &&
                    inbox[post.id].map((message, index) => (
                        <div key={index} className="">
                            <div className="flex items-center gap-5">
                                <div className="flex flex-col gap-2 px-3 py-5 border-r-2 border-gray-600">
                                    <img className="h-12 w-12 rounded-full ml-3" src={message.image} alt={message.username} />
                                    <p className="text-[11px]">{message.username}</p>
                                </div>
                                <div>
                                    <p>{message.message}</p>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>
            <div className="relative my-5 mx-3 flex items-center gap-2 border-2 border-gray-300 rounded-2xl p-2">
                <input
                    type="text"
                    placeholder="Comment..."
                    onChange={(e) => setComment(e.target.value)}
                    value={comment}
                    className="outline-none w-11/12 "
                />
                <button onClick={sendMessage}>
                    <LuSendHorizonal className="text-3xl hover:text-pink-600 hover:scale-110 transition duration-300" />
                </button>
            </div>
        </>
    );
}
