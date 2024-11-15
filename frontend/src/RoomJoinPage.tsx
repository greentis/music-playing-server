import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"

export default function RoomJoinPage({}) {
    const history = useNavigate()

    const [roomCode, setRoomCode] = useState('')
    const [avaliableRooms, setAvaliableRooms] = useState([])
    const [error, setError] = useState('')

    function handleRoomCodeChange(e : React.ChangeEvent<HTMLSelectElement>){
        setRoomCode(e.target.value);
    }
    function joinRoom(){
        const requestOptions = {
            method: "POST",
            headers: {"Content-Type" : "application/json"},
            body: JSON.stringify({
                code: roomCode
            })
        }
        console.log("http://127.0.0.1:8000/join-room" + "?code=" + roomCode)
        fetch("http://127.0.0.1:8000/join-room" + "?code=" + roomCode, requestOptions)
        .then(response=>{
            if (response.ok) {
                history(`/room/${roomCode}`)
            } else {
                setError("Room not found")
            }
        }).catch(error => {
            console.error('Error:', error)
        })
    }

    useEffect(() => {
        updateAvailableRoom();
    }, []);

    // Local component
    function ErrorTxt(){
        if (error === '') {
            return <></>
        }
        return (
            <p>error={error}</p>
        )
    }
    function updateAvailableRoom(){
        const requestOptions = {
            method: "GET",
            headers: {"Content-Type" : "application/json"},
        }
        fetch("http://localhost:8000/room", requestOptions)
        .then(response => response.json())
        .then(data => {
            data.unshift({ room_code: "" });
            setAvaliableRooms(data)
        })
    }
    function RoomCode(){
        const options = avaliableRooms.map((room: {room_code:string}) =>{
            const room_code = room.room_code
            return <option key={room_code} value={room_code}>{room_code}</option>
        })
        return (
            <>
            {options}
            </>
        )
    }
    return (
        <>
        <h1>Join a Room</h1>
        <label htmlFor="roomCode">Room Code:</label>
        <select id="roomCode" name="roomCode" onChange={handleRoomCodeChange}>
            <RoomCode />
        </select>
        <ErrorTxt />
        <p>Code:{roomCode}</p>
        <button type="button" onClick={joinRoom}>Join Room</button>   
        </>
    )
}