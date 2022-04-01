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
      <div id="wrapper" class="container">
        <div id="menu" >
          <h4 className="welcome">Welcome To The Chat Application!</h4>
          
          <button type="button" class="btn btn-danger">Exit Chat</button>

          {/* <p className="logout"><a id="exit" href="http://localhost:8000/exit">Exit Chat</a></p> */}
        </div>
        <div id="chatbox" class="modal-content" >
          {chat.map((payload, index) => {
            return (
              <li class="list-group-item" key={index}>{payload.userName} {payload.message}</li>
              // <h3 key={index}>{payload.userName} : <span>{payload.message}</span></h3>
            )
          })}
        </div>  
        <form onSubmit={sendMessage}>
          <input  class="form-control" name="usermsg"
            type="text"
            placeholder="Type a Message"
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            required />
          {/* <button name="submitmsg" type="submit" id="submitmsg">Send</button> */}
          <button type="button" class="btn btn-primary">Send</button>

        </form>
      </div>
    </>
  );
}

export default App;
