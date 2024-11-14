import { useParams } from "react-router-dom"


export default function RoomJoinPage({}) {
    const {id} = useParams()
    return (
        <>
        <p>This is the Room Join Page</p>
        <p>{id}</p>
        </>
        
    )
}