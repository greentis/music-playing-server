
import RoomJoinPage from './RoomJoinPage'
import CreateRoomPage from './CreateRoomPage'
import RoomPage from './RoomPage'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import { BrowserRouter, 
        Routes, // Switch
        Route, 
        Link, 
        Navigate // Reditrect
    } 
    from 'react-router-dom'

function RoomNavigation() {
    const history = useNavigate();
    return (
        <div>
          <h1>Music Party!</h1>
          <button type="button" name="joinRoomBtn" id="joinRoomBtn"
          onClick={()=>{
            history('/join')
          }}>Join a Room</button>
          <button type="button" name="createRoomBtn" id="createRoomBtn"
          onClick={()=>{
            history('/create')
          }}>Create a Room</button>
        </div>
    )
}



export default function HomePage({}) {
  const [roomCode, setRoomCode] = useState('');

  async function componentDidMount(){
    fetch('http://127.0.0.1:8000/user-in-room')
    .then(response => response.json())
    .then(data => {
      console.log(data.code);
      setRoomCode(data.code);
    })
  }

  useEffect(() => {
    componentDidMount();
  }, []);

  function RedirectPage() {
    if (roomCode) {
      return (
          <Navigate to={`/room/${roomCode}`} />
      )
    }
    return (
        <RoomNavigation />
    )
  }
  

  return (
    <>
    <BrowserRouter>
        <Routes>
            <Route path='/' element={<RedirectPage/>}></Route>
            <Route path='/join' element={<RoomJoinPage />} />
            <Route path='/create/' element={<CreateRoomPage />} />
            <Route path='/room/:room_code' element={<RoomPage />} />
        </Routes>
    </BrowserRouter>
    </>
  )
}