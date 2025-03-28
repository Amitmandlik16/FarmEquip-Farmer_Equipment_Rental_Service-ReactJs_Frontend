import React, { useState } from "react";
import MessageInput from "./MessageInput";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI("AIzaSyCMhuhudG9S33XEF8ThLZYAFrrbK1ZVzLM");
const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash",
  generationConfig: {
    responseMimeType: "text/plain",
  },
});

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async (message) => {
    if (message.trim()) {
      const newMessages = [...messages, { sender: "user", text: message }];
      setMessages(newMessages);

      const customPrompt = `Please provied the answer upto 10 line only. related to agriculture and equipments used. Question: "${message}"`;

      try {
        const result = await model.generateContent(customPrompt);
        const response = result.response.text();
        console.log(response);
        setMessages([...newMessages, { sender: "bot", text: response }]);
      } catch (error) {
        console.error("Error generating response:", error);
        setMessages([
          ...newMessages,
          { sender: "bot", text: "Sorry, I couldn't process that." },
        ]);
      }
    }
  };

  return (
    <div className="fixed bottom-20 right-4 w-80 h-96 md:w-90 md:h-150 bg-white border border-gray-300 rounded-[30px] flex flex-col ml-4 mr-4 z-100">
      <div
        className="bg-gradient-to-r from-blue-300 to-blue-900
 text-white p-4 rounded-t-[30px] "
      >
        <div className="flex flex-row space-x-5">
          <strong className="text-2xl flex justify-center items-center">
            FarmEquip
          </strong>
          <div>
            I am AgroBot,
            <p>How Can I help you?</p>
          </div>
        </div>
      </div>
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 ${
              msg.sender === "user" ? "text-right" : "text-left"
            }`}
          >
            <span
              className={`inline-block p-2 rounded-lg ${
                msg.sender === "user" ? "bg-blue-100" : "bg-gray-100"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>
      <MessageInput onSendMessage={handleSendMessage} />
    </div>
  );
};

export default ChatWindow;
