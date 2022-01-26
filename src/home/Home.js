import "./Home.scss"
import React, {useState} from "react"
import { Link } from "react-router-dom"

const Home = ({socket}) => {

    const [username, setUsername] = useState("")
    const [roomname, setRoomname] = useState("")
    const url = 'https://lucid-ptolemy-a40286.netlify.app/'

    async function copyToClipboard (text) {
        if('clipboard' in navigator){
            return await navigator.clipboard.writeText(text)
        } else {
            return document.execCommand('copy', true, text);
        }
    }

    const sendData = async () => {
        if (username !== "" && roomname !== "") {
            socket.emit("joinRoom", {username, roomname})
        } 
        else {
            alert("username and roomanme are required");
            window.location.reload();
        }
    };

    const inviteLink = async () => {
        if (username !== "" && roomname !== ""){
            try {
              await copyToClipboard(`Let's chat at ${url} in Room Name: ${roomname}`)
                window.alert('Invite copied')
            } catch (error) {
                console.log(error)
            };
        } 
        else {
            alert("username and roomanme are required");
            window.location.reload();
        }
    }
    
    return (
        <div className="homepage">
            <h1>Welcome to ChatApp</h1>
            <input
                placeholder="Input your user name"
                value={username}
                onChange={(e) => setUsername(e.target.value)}>
            </input>
            <input
                placeholder="Input the room name"
                value={roomname}
                onChange={(e) => setRoomname(e.target.value)}>
            </input>
            <Link
                to={`/chat/${roomname}/${username}`}
                state={{roomname: roomname, username: username}}>
                    <button className="join" onClick={sendData}>Join</button>
            </Link>
            <button className="invite" onClick={inviteLink}>Invite</button>
        </div>
    )
}

export default Home