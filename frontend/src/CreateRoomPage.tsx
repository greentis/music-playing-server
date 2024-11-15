import React from "react";
import { useState } from "react";
import { useParams } from "react-router-dom"

export default function CreateRoomPage() {
    const {id} = useParams()
    const [roomName, setRoomName] = useState('');
    const [guestControl, setGuestControl] = useState(false);
    const [minVotes, setMinVotes] = useState(0);

    function handleGuestControlEnabling() {
        setGuestControl(true);
        // Setstate keeps a snapshot that stays the same for a local function until the next render
        console.log(guestControl);
        const requestOptions = {
            method: 'POST',
            headers: {'Content-Type': 'application/json; charset=utf-8'},
            body: JSON.stringify({
                room_name: roomName,
                guest_control: true, 
                votes_to_skip: minVotes
            })
        }
        fetch('http://localhost:8000/create-room', requestOptions)
        .then(response => response.json())
        .then(data => console.log(data))
    }

    function handleRoomNameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setRoomName(event.target.value);
        console.log(event.target.value);
    }
    function handleGuestControlDisabling(e: React.ChangeEvent<HTMLInputElement>) {
        setGuestControl(false);
        console.log(guestControl);
    }
    function handleVotesChange(event: React.ChangeEvent<HTMLInputElement>) {
        setMinVotes(parseInt(event.target.value));
        console.log(minVotes);
    }

    function handleCreateRoom() {
        console.log('Create Room');
    }

    return (
        <>
            <h1>Create a Room?</h1>
            <h2>Room Name:</h2>
            <label htmlFor="roomName">Room Name:</label>
            <input type="text" id="roomName" name="roomName" onChange={handleRoomNameChange}/>
            <h2>Guest Control</h2>
            
            <div>
                <label>
                    <input type="radio" onChange={handleGuestControlEnabling} name="guestControl" defaultChecked={guestControl}/>
                    Enabled
                </label>
                <label>
                    <input type="radio" onChange={handleGuestControlDisabling} name="guestControl" defaultChecked={!guestControl} />
                    Disabled
                </label>
            </div>
            <label htmlFor="minVotes">Minimum votes to skip song:</label>
            <input type="number" onChange={handleVotesChange} name="minVotes" id="minVotes" min="0"/>
            <br />
            <button type="submit" onClick={handleCreateRoom}>Create Room</button>
            <br />
            <button type="reset">Reset</button>
            <button type="button">Back</button>
            <p>{id}</p>

            <style>{`
                button {
                    background-color: skyblue;
                    width: 100px;
                    height: 50px;
                }
                button:active {
                    background-color: lightblue;
                    shadow: 0 5px #000;
                }
            `}</style>
        </>   
    )
}