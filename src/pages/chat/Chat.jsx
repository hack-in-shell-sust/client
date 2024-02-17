import React, { useState, useEffect} from 'react';
import './Chat.css'; // Import your custom CSS file
import axios from 'axios'
import { IoMdSend } from "react-icons/io";
import PubNub from 'pubnub';
import { useLocation } from 'react-router-dom';

import {useUserContext} from '../../context/UserContext';
import NavigationBar from '../landingPage/navbar/NavigationBar';

const Chat = () =>{
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const {userInfo} = useUserContext();
  
  const VITE_OPEN_API_KEY = import.meta.env.VITE_OPEN_API_KEY;

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== '') {
      setMessages([...messages, { text: inputValue }]);
      setInputValue('');
    }
  };

  const sendMessage = async () => {
    const msg = inputValue;
    setInputValue('');
  
    const requestBody = {
      messages: [{ role: 'user', content: msg }],
    };
  
    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${VITE_OPEN_API_KEY}`,
          },
          timeout: 10000,
        }
      );
  
      if (response.data && response.data.choices && response.data.choices.length > 0) {
        const receivedMessage = response.data.choices[0].message.content;
        setMessages(previousMessages => [...previousMessages, { text: receivedMessage }]);
      } else {
        throw new Error("Failed to get response from OpenAI's chat API");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };
  
  

 
  //get all message post request
  // const getAllMessages =  async () =>{
  //   const apipath = `https://sharental-api.vercel.app/chats/receive`;
  //   //const apipath = 'http://192.168.1.8:3001/chats/receive';
  //   // console.log(userInfo.id + " " + receiverUser.id);
  //   try {
  //     const response= await axios.post(apipath,
  //       {
  //         sendBy: userInfo.id,
  //         sendTo: receiverUser.id,
  //       },
  //       {
  //         timeout: 10000, // Timeout set to 30 seconds (30000 milliseconds)
  //       },
  //     ) 
  //     // setPageLoading(false);
  //     //console.log(response.data);
  //     const Chats=response.data.chats;

  //     const formattedMessages = Chats.map(chat => {
  //     return {
  //       _id: chat._id,
  //       text: chat.message,
  //       createdAt: new Date(chat.createdAt),
  //       user: {
  //         _id: chat.sendBy,
  //         name: (chat.sendBy === 1) ? 'Tafsir' : 'Other User',
  //       },
  //     };
  //   });

  //   // Sort the messages based on createdAt
  //   const sortedMessages = formattedMessages.sort((a, b) => a.createdAt - b.createdAt);

  //   // Set the sorted messages in the state
  //   setMessages(sortedMessages);
  //   //console.log(sortedMessages);

  //   } catch (error) {
  //     console.error(error.message);
  //   };
  // }

  useEffect(() => {
    //console.log(userInfo);
    //getAllMessages();
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="chat">
        <div className="chat_mainBox">
          <div className='chat-header '>
            <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/>
            <h2>Someone</h2>
          </div>
          <div className="chat-messageBox">
            {messages.map((message,index) => (
              message.user._id === 1 ?
                <div className={`chat-messages chat-myMessage`}>
                  <p key={index}>
                    {message.text}
                  </p>
                </div>
                :
                <div className={`chat-messages chat-othersMessage`}>
                  {/* <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"/> */}
                  <p key={index}
                  >
                    {message.text}
                  </p>
                </div>
            ))}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="chat-inputField"
            />
            {inputValue.length>0 ?
              (<div className='chat-inputSendButtonBox'> 
                <IoMdSend className='chat-inputSendButton mx-auto my-auto'
                onClick={()=>sendMessage()}/>
              </div>): null
            }
            
          </div>
        </div>
      </div>
    </>

  );
}

export default Chat;
