import React, { useState } from "react";

const MessageInput = ({ onSendMessage }) => {
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
        if (message.trim()) {
            onSendMessage(message);
            setMessage("");
        }
    };

    return (
        <div className="flex p-4 border-t border-gray-300">
            <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 p-2 border border-gray-300 rounded-lg mr-2"
            />
            <button
                onClick={handleSendMessage}
                className="bg-blue-500 text-white rounded-lg px-4 py-2"
            >
                Send
            </button>
        </div>
    );
};

export default MessageInput;