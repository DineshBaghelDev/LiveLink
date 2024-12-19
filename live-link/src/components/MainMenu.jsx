import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { socket } from '../socket';

const MainMenu = () => {
  const navigate = useNavigate();
  const [stage, setStage] = useState("nickname");
  const [nickname, setNickname] = useState('');
  const [roomCode, setRoomCode] = useState('');
  const [loading, setLoading] = useState(false);

  // Handle joining a room
  const handleJoinRoom = (e) => {
    e.preventDefault()
    setLoading(true);
    socket.emit("joinRoom", nickname, roomCode, (response) => {
      setLoading(false);
      if (response.status === "success") {
        navigate("/chat", { state: { nickname, roomCode } });
      } else {
        alert(response.error || "Failed to join the room. Try again.");
      }
    });
  };

  // Handle creating a room
  const handleCreateRoom = (e) => {
    e.preventDefault()
    setLoading(true);
    socket.emit("createRoom", nickname, (response) => {
      setLoading(false);
      if (response.status === "success") {
        navigate("/chat", { state: { nickname, roomCode: response.roomCode } });
      } else {
        alert(response.error || "Failed to create the room. Try again.");
      }
    });
  };

  return (
    <div className="h-screen flex justify-center items-center">

      {/* NICKNAME SCREEN */}
      {stage === "nickname" && (
        <form onSubmit={(e) => { e.preventDefault(); setStage("roomDetails");}} className='backdrop-blur-md backdrop-saturate-200 w-[80%] h-[90%] rounded-xl bg-[#03001a9d] shadow-md text-xl flex flex-col justify-center items-center'>
          <h2 className='font-bold text-4xl mb-5'>Welcome</h2>
          <div className='w-[75%] my-5 flex flex-col justify-center items-center gap-5'>
            <div className='w-[95%] lg:w-1/2'>

            <h2 className='font-semibold text-xl'>Nickname</h2>
            <input className='w-full shadow-md bg-[#03001a94] outline-none rounded-md py-2 px-3 text-gray-100'
              type="text"
              name="nickname"
              id="nickname"
              placeholder="Enter Nickname"
              autoComplete='off'
              autoFocus={true}
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              />
              </div>
            <button className='py-1 shadow-lg w-[50%] text-white bg-blue-600 rounded-md text-xl font-semibold'
              disabled={!nickname.trim()}
            >
              Done
            </button>
          </div>
        </form>
      )}

      {/* ROOM SELECTION PAGE */}
      {stage === "roomDetails" && (
        <div className='backdrop-blur-md backdrop-saturate-200 w-[80%] h-[90%] rounded-xl bg-[#03001a9d] shadow-md text-xl flex flex-col justify-center items-center'>
          <h2 className='font-bold text-4xl mb-5'>Welcome</h2>
          <form onSubmit={handleJoinRoom} className='w-[75%] my-2 text-center'>
            <div>

            <h2 className='font-light text-2xl'>Join Room</h2>
            <input className='lg:w-1/2 w-[95%] shadow-md bg-[#03001a94] outline-none rounded-md py-2 px-3 text-gray-100'
              type="text"
              name="roomCode"
              id="roomCode"
              placeholder="Enter Room Code"
              autoComplete='off'
              autoFocus={true}
              value={roomCode}
              onChange={(e) => setRoomCode(e.target.value)} />
            </div>

            <button className='py-1 shadow-lg w-[50%] my-5 text-white bg-blue-600 rounded-md text-xl font-semibold'
              disabled={loading || !roomCode.trim()} >
              {loading ? "Joining..." : "Join"}
            </button>
          </form>


          <h3 className='font-light text-xl'>or</h3>
          <h2 className='font-light text-2xl'>Create Room</h2>
          <button className='py-1 shadow-lg w-[37%] text-white bg-blue-600 rounded-md text-xl font-semibold'
            disabled={loading} onClick={handleCreateRoom}>
            {loading ? "Creating..." : "Create"}
          </button>

          <button className='py-1 shadow-lg w-[37%] my-2 text-white bg-blue-600 rounded-md text-xl font-semibold'
            onClick={() => setStage("nickname")}>Back</button>
        </div>
      )}
    </div>
  );
};

export default MainMenu;
