import React, { useEffect, useState, useRef } from 'react';
import { Navigate, redirect, useLocation } from 'react-router-dom';
import { socket } from '../socket';


const Chat = () => {
    if (!socket.connected) {
        return <Navigate to="/" />
    }

    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState('');

    const location = useLocation();
    const { nickname, roomCode } = location.state || {
        nickname: Math.random().toString(32).slice(2, 8),
        roomCode: "DefaultRoom",
    };

    const ChatRef = useRef()
    useEffect(() => {
        ChatRef.current.scrollTo(0, ChatRef.current.scrollHeight);
    }, [chats]);

    useEffect(() => {
        // Inform the server that a user has joined the chat
        socket.emit("joined", nickname, roomCode);

        // Listen for join notifications
        socket.on("joined", (joinedNickname) => {
            setChats((prevChats) => [
                ...prevChats,
                { nickname: "System", message: `${joinedNickname} joined the chat.` },
            ]);
        });

        socket.on("old-chats", (OldChats) => {
            setChats((prevChats) => [...OldChats]);
        });

        // Listen for messages
        socket.on("message", (senderNickname, newMessage, senderID) => {
            setChats((prevChats) => [
                ...prevChats,
                { nickname: senderNickname, message: newMessage ,senderID},
            ]);

        });

        // USER LEFT
        socket.on("left-room", (leftUserName) => {
            setChats((prevChats) => [
                ...prevChats,
                { nickname: "System", message: `${leftUserName} left the chat.` },
            ]);
        })

        // Cleanup on unmount
        return () => {
            socket.off("joined");
            socket.off("message");
            socket.off("left-room");
            socket.off("old-chats");
        };
    }, [nickname, roomCode]);

    // SEND MESSAGES
    const sendMessage = (e) => {
        e.preventDefault()
        if (message.trim()) {
            socket.emit("message", nickname, message, roomCode, socket.id);
            setMessage(''); // Clear the input field
        }
    };


    return (
        <div className='flex h-screen flex-col justify-center items-center'>
            <div className=' bg-[#03001a9d] h-[90%] w-[80%] rounded-lg backdrop-blur-md backdrop-saturate-200'>

                <h1 className='text-3xl font-bold text-center py-2'>Chat Room: {roomCode}</h1>
                <div className='overflow-scroll text-center flex flex-col h-[80%]' ref={ChatRef}>
                    {chats.map((chat, index) => (
                        <div key={index} className='text-light text-gray-600'>
                            {chat.nickname == "System" && (<><strong className='text-bold text-green-500'>{chat.nickname}:</strong> {chat.message}</>)}
                            {(chat.senderID != socket.id && chat.nickname != "System") && (<div className="w-fit sm:max-w-[60%] p-3 mx-5 my-1 rounded-2xl rounded-tl-none bg-[#d7398369]"><strong className='text-bold text-red-400'>{chat.nickname}:</strong> {chat.message}</div>)}
                            {chat.senderID == socket.id && (<div className="w-fit sm:max-w-[60%] p-3 my-1 mx-5 rounded-2xl flex-col-reverse rounded-tr-none bg-[#7339d769] float-end clear-end"><strong className='text-bold text-indigo-400'>{chat.nickname}:</strong> {chat.message}</div>)}
                        </div>
                    ))}
                </div>

                <form onSubmit={sendMessage} className="my-4 sm:my-1 w-full flex flex-col sm:flex-row gap-2 justify-center items-center">
                    <input className='sm:my-5 sm:w-1/2 w-[75%] shadow-md bg-blue-100 rounded-md py-1 px-3 text-gray-900 '
                        type="text"
                        name="message"
                        placeholder="Type something..."
                        autoComplete='off'
                        autoFocus={true}
                        value={message}
                        onChange={(e) => {
                            setMessage(e.target.value)
                        }}
                    />
                    <button className='py-1 w-[75%] sm:w-fit shadow-lg px-5 text-white bg-blue-600 rounded-md text-xl font-semibold'
                    >Send</button>
                </form>
            </div>
        </div>
    );
};

export default Chat;
