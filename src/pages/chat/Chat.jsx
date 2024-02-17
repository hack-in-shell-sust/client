import React, { useState, useEffect } from "react";
import "./Chat.css"; // Import your custom CSS file
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import PubNub from "pubnub";
import { useLocation } from "react-router-dom";

import { useUserContext } from "../../context/UserContext";
import NavigationBar from "../landingPage/navbar/NavigationBar";

import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_API_KEY,
  dangerouslyAllowBrowser: true,
});

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");

  const { userInfo } = useUserContext();

  const VITE_OPEN_API_KEY = import.meta.env.VITE_OPEN_API_KEY;

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setMessages([...messages, { text: inputValue }]);
      setInputValue("");
    }
  };

  const sendMessage = async () => {
    const msg = inputValue;
    setInputValue("");

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are a helpful assistant." },
          { role: "user", content: msg },
        ],
      });
      console.log(response);

      if (response.choices && response.choices.length > 0) {
        const receivedMessage = response.choices[0].message.content;
        setMessages((previousMessages) => [
          ...previousMessages,
          { text: receivedMessage, user: { _id: 2 } },
        ]);
      } else {
        throw new Error(
          `Failed to get successful response from OpenAI's chat API. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  useEffect(() => {
    //console.log(userInfo);
    //getAllMessages();
  }, []);

  return (
    <>
      <NavigationBar />
      <div className="chat">
        <div className="chat_mainBox">
          <div className="chat-header ">
            <img
              src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
              alt="profile"
            />
            <h2>Someone</h2>
          </div>
          <div className="chat-messageBox">
            {messages.map((message, index) =>
              message.user._id === 1 ? (
                <div key={index} className={`chat-messages chat-myMessage`}>
                  <p>{message.text}</p>
                </div>
              ) : (
                <div key={index} className={`chat-messages chat-othersMessage`}>
                  {/* <img src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png" alt="other user profile" /> */}
                  <p>{message.text}</p>
                </div>
              )
            )}
          </div>

          <div className="chat-input">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Type a message..."
              className="chat-inputField"
            />
            {inputValue.length > 0 ? (
              <div className="chat-inputSendButtonBox">
                <IoMdSend
                  className="chat-inputSendButton mx-auto my-auto"
                  onClick={sendMessage}
                />
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
