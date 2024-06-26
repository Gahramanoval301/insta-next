import React from 'react'
import { HiOutlineDotsVertical } from 'react-icons/hi'
import CommentList from './CommentList'

export default function Post({ post }) {
    // console.log(post, 'post');
    return (
        <div className='bg-white m-7 border rounded-md p-3 ' >
            <div className='flex item-center p-5 border-b border-gray-100 '>
                <img src={post.profileImg} alt={post.username}
                    className='h-12 rounded-full object-cover border p-1 mr-3'
                />
                <p className='flex-1 font-bold'>{post.username}</p>
                <HiOutlineDotsVertical className='h-5 cursor-pointer' />
            </div>
            <img src={post.image} alt={post.caption} className='object-cover w-full p-5' />

            <p className='p-5 truncate'>
                <span className='font-bold mr-2'>{post.username}</span>
                {post.caption}
            </p>
            <hr />
            <CommentList post={post} />
        </div>
    )
}
