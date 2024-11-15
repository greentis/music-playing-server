import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";

export default function RoomPage() {
    const [votes_to_skip, setVotesToSkip] = useState(0);
    const [guest_control, setGuestControl] = useState(false);
    const [is_host, setIsHost] = useState(false);

    const {room_code} = useParams();
    const history = useNavigate();

    function getRoomDetails() {
        console.log('http://127.0.0.1:8000/get-room' + '?code=' + room_code);
        fetch('http://127.0.0.1:8000/get-room' + '?code=' + room_code)
        .then(response=> response.json())
        .then(data => {
            //console.log(data)
            setVotesToSkip(data.votes_to_skip);
            setGuestControl(data.guest_control);
            setIsHost(data.is_host);
        })
    }
    
    function handleLeaveRoom() {
        
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
        }
        fetch("http://127.0.0.1:8000/leave-room", requestOptions)
        .then(response => {
            history('/');
        })
    }

    useEffect(() => {
        getRoomDetails();
    }, []);

    return (
        <>
        <h2>Room Code: {room_code}</h2>
        <p>Votes: {votes_to_skip} </p>
        <p>Guest Control: {guest_control?"Enabled":"Disabled"}</p>
        <p>Hosting Room: {is_host.toString()}</p>
        <button type="button" onClick={handleLeaveRoom}>Leave Room</button>
        </>
    );
}