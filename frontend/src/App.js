import './App.css';
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
const socket = io('http://localhost:8000')
const userName = 'User' + parseInt(Math.random() * 10)

function App() {
  const [message, setmessage] = useState('');
  const [chat, setchat] = useState([])

  const sendMessage = (e) => {
    e.preventDefault()
    console.log(message);
    socket.emit('message', { userName,message })
    setmessage('')
  }

  useEffect(() => {
    socket.on('message', payload => {
      setchat([...chat, payload])
    })
  })

  return (
    <>
      <div id="wrapper">
        <div id="menu">
          <p className="welcome">Welcome to the WhatsApp</p>
          <p className="logout"><a id="exit" href="http://localhost:8000/exit">Exit Chat</a></p>
        </div>
        <div id="chatbox">
          {chat.map((payload, index) => {
            return (
              <h3 key={index}>{payload.userName} : <span>{payload.message}</span></h3>
            )
          })}
        </div>
        <form onSubmit={sendMessage}>
          <input name="usermsg"
            type="text"
            placeholder="Type a Message"
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            required />
          <button name="submitmsg" type="submit" id="submitmsg">Send</button>
        </form>
      </div>
    </>
  );
}

export default App;
