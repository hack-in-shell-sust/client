import React, { useState, useEffect } from "react";
import "./Chat.css";
import { IoMdSend } from "react-icons/io";
import NavigationBar from "../landingPage/navbar/NavigationBar";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPEN_API_KEY,
  dangerouslyAllowBrowser: true,
});

const MAX_QUESTION_COUNT = 5;

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [previousConversation, setPreviousConversation] = useState("");
  const [fineTuneResult, setFineTuneResult] = useState(null);
  const [questionCount, setQuestionCount] = useState(0);

  const synthesis = window.speechSynthesis

  useEffect(() => {
    // Function to perform asynchronous tasks
    const initializeChat = async () => {
      try {
        // Perform fine-tuning and store the result in state
        const result = await openai.fineTuning.jobs.create({
          training_file: "../../../dataset/my_file.jsonl",
          model: "gpt-3.5-turbo",
        });

        // Update state with fine-tune result
        setFineTuneResult(result);
        console.log("Fine-tuning job created:", result);
      } catch (error) {
        console.error("Error during initialization:", error);
      }
    };

    // Call the asynchronous function
    initializeChat();
  }, []);

  const incrementQuestionCount = () => {
    setQuestionCount((prevCount) => prevCount + 1);
  };

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setMessages([...messages, { text: inputValue }]);
      setInputValue("");
      incrementQuestionCount();
    }
  };

  const getSummary = async (text) => {
    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "system",
            content: `Please summarize the following text and be careful about keeping medically relevant information and summarize it so it can be fed to another model as the past conversation. Information such as someone having pain or nausea and particulars like that is very important: ${text}`,
          },
        ],
      });

      console.log("Summary Response from OpenAI:", response);

      if (response.choices && response.choices.length > 0) {
        return response.choices[0].message.content;
      } else {
        console.error("Failed to get summary from OpenAI's summarization API");
        return "";
      }
    } catch (error) {
      console.error("Error getting summary:", error);
      return "";
    }
  };

  const sendMessage = async () => {
    if (questionCount >= MAX_QUESTION_COUNT) {
      // Reached the maximum allowed questions, send a closing message
      console.log("Maximum question limit reached. Ending the conversation.");

      try {
        // Generate a summary of the entire conversation
        const summary = await getSummary(previousConversation);

        // Create a closing message thanking the user and providing the summary
        const closingPrompt = `Thank you for your time! Here is a summary of our conversation: ${summary}`;

        const closingResponse = await openai.chat.completions.create({
          model: "gpt-3.5-turbo",
          messages: [
            {
              role: "system",
              content: `You are a medical assistant. Your job is patient history taking. Ending the conversation. Provide the user a brief summary of the conversation : ${summary}`,
            },
            // { role: "user", content: closingPrompt },
          ],
        });

        if (closingResponse.choices && closingResponse.choices.length > 0) {
          const closingSystemMessage =
            closingResponse.choices[0].message.content;

          setPreviousConversation(
            `${previousConversation} User: ${closingPrompt} Assistant: ${closingSystemMessage} `
          );

          // setMessages((previousMessages) => [
          //   ...previousMessages,
          //   { text: closingPrompt, user: { _id: 1 } },
          // ]);

          setMessages((previousMessages) => [
            ...previousMessages,
            { text: closingSystemMessage, user: { _id: 2 } },
          ]);

          // Set a flag to indicate the conversation is ending
          setIsConversationEnding(true);
        } else {
          throw new Error(
            `Failed to get a successful response for the closing prompt. Status: ${closingResponse.status}`
          );
        }
      } catch (error) {
        console.error("Error sending closing message:", error);
        if (error.response) {
          console.error("Response data:", error.response.data);
        }
      }

      return; // Exit the function after sending the closing message
    }

    const userMessage = inputValue;
    setInputValue("");

    const newMessages = [
      {
        role: "system",
        content: `You are a medical assistant. Your job is patient history taking. Ask only one question at a time. Previous conversations: ${previousConversation}`,
      },
      { role: "user", content: userMessage },
      // Add an additional system message after the user's final message
      {
        role: "system",
        content:
          "Thank you for providing the necessary information. I will now summarize our conversation.",
      },
    ];

    console.log("Message being sent to GPT:", newMessages);

    try {
      const response = await openai.chat.completions.create({
        model: "gpt-3.5-turbo",
        messages: newMessages,
      });

      if (response.choices && response.choices.length > 0) {
        const systemMessage = response.choices[0].message.content;

        setPreviousConversation(
          `${previousConversation} User: ${userMessage} Assistant: ${systemMessage} `
        );

        setMessages((previousMessages) => [
          ...previousMessages,
          { text: userMessage, user: { _id: 1 } },
        ]);

        setMessages((previousMessages) => [
          ...previousMessages,
          { text: systemMessage, user: { _id: 2 } },
        ]);

        incrementQuestionCount(); // Increment question count after successfully sending a message
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
    // console.log(userInfo);
    // getAllMessages();
  }, []);


  const [speaking, setSpeaking] = useState(false);

  const speak = () => {
    if (!synthesis) {
      console.error('Speech synthesis not supported');
      return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    synthesis.speak(utterance);
    setSpeaking(true);

    utterance.onend = () => {
      setSpeaking(false);
    };
  };

  const stopSpeaking = () => {
    if (synthesis && synthesis.speaking) {
      synthesis.cancel();
      setSpeaking(false);
    }
  };

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
            <h2>MedAid Chat</h2>
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
      {/* <div className="question-count">
        <p>Number of Questions Asked: {questionCount}</p>
      </div> */}
    </>
  );
};

export default Chat;
