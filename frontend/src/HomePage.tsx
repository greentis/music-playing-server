
import RoomJoinPage from './RoomJoinPage'
import CreateRoomPage from './CreateRoomPage'

import { BrowserRouter, 
        Routes, // Switch
        Route, 
        Link, 
        Navigate // Reditrect
    } 
    from 'react-router-dom'

export default function HomePage({}) {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/' element={"Home Page"}></Route>
            <Route path='/join' element={<RoomJoinPage />} />
            <Route path='/create' element={<CreateRoomPage />} />
        </Routes>
    </BrowserRouter>
  )
}