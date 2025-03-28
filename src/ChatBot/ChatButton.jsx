import React, { useState } from "react";
import ChatWindow from "./ChatWindow";
import { IoChatboxEllipsesOutline } from "react-icons/io5";

const ChatButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleChatWindow = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="fixed bottom-4 right-4 z-100">
            <button
                className="bg-blue-500 text-white rounded-full w-16 h-16 text-lg flex items-center justify-center"
                onClick={toggleChatWindow}
            >
                <IoChatboxEllipsesOutline className="h-8 w-8" />
            </button>
            {isOpen && <ChatWindow />}
        </div>
    );
};

export default ChatButton;
