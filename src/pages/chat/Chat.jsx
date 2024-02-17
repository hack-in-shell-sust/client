import React, { useState, useEffect } from "react";
import "./Chat.css";
import axios from "axios";
import { IoMdSend } from "react-icons/io";
import NavigationBar from "../landingPage/navbar/NavigationBar";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_API_KEY,
  dangerouslyAllowBrowser: true,
});

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [previousConversation, setPreviousConversation] = useState("");

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setMessages([...messages, { text: inputValue }]);
      setInputValue("");
    }
  };

  const getSummary = async (text) => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo", // or any suitable summarization model
        messages: [
          {
            role: "system",
            content: `Please summarize the following text and be careful about keeping medically relevant information and summarize it so it can be fed to another model as the past conversation: ${text}`,
          },
        ],
      });
      console.log("Summary Response from OpenAI:", response);

      if (response.choices && response.choices.length > 0) {
        return response.choices[0].message.content;
      } else {
        console.error("Failed to get summary from OpenAI's summarization API");
        return ""; // Return an empty string if the summarization fails
      }
    } catch (error) {
      console.error("Error getting summary:", error);
      return ""; // Return an empty string in case of an error
    }
  };

  const sendMessage = async () => {
    const userMessage = inputValue;
    setInputValue("");

    const summary = await getSummary(previousConversation);
    console.log("Summary:", summary);

    const newMessages = [
      {
        role: "system",
        content: `You are a medical assistant. Your job is patient history taking. You are going to ask the patient about their symptoms and medical condition. Previous conversations: ${summary}`,
      },
      { role: "user", content: userMessage },
    ];
    console.log("Message being sent to GPT:", newMessages);
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: newMessages,
      });

      if (response.choices && response.choices.length > 0) {
        const systemMessage = response.choices[0].message.content;

        // Update previous conversation
        setPreviousConversation(
          `${previousConversation} User: ${userMessage} Assistant: ${systemMessage} `
        );

        // Add user message to the state
        setMessages((previousMessages) => [
          ...previousMessages,
          { text: userMessage, user: { _id: 1 } },
        ]);

        // Add system message to the state
        setMessages((previousMessages) => [
          ...previousMessages,
          { text: systemMessage, user: { _id: 2 } },
        ]);
      } else {
        throw new Error(
          `Failed to get a successful response from OpenAI's chat API. Status: ${response.status}`
        );
      }
    } catch (error) {
      console.error("Error sending message:", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
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
              onKeyDown={handleKeyPress}
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
