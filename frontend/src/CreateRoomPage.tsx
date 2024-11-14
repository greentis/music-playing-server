import { useParams } from "react-router-dom"

export default function CreateRoomPage() {
    const {id} = useParams()
    return (
        <>
            <p>This is the Create Room Page</p>
            <p>{id}</p>
        </>   
    )
}