import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { createSocketConnection } from "../store/socket";
import { useSelector } from "react-redux";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const { targetUserId } = useParams();
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user);
  const userId = user?._id;
  //   console.log(userId);

  useEffect(() => {
    if (!user) {
      return;
    }
    const socket = createSocketConnection();

    // as soon as this page loads, this socket connection is made and this joinChat event will be emmited
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, text }) => {
      setMessages((messages) => [...messages, { firstName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      userId,
      targetUserId,
      text: newMessage,
    });

    setNewMessage("");
  };

  return (
    <div className="w-1/2 mx-auto border mt-4 border-gray-700 h-[70vh] flex flex-col">
      <div className="border-b-2 p-4 border-gray-700 text-2xl font-bold">
        Chat
      </div>
      <div className="overflow-scroll flex-1 p-5">
        {messages.map((message, index) => {
          return user.firstName === message.firstName ? (
            <div key={index} className="chat chat-end">
              <div className="chat-header">
                {message.firstName}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{message.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          ) : (
            <div key={index} className="chat chat-start">
              <div className="chat-header">
                {message.firstName}
                <time className="text-xs opacity-50">2 hours ago</time>
              </div>
              <div className="chat-bubble">{message.text}</div>
              <div className="chat-footer opacity-50">Seen</div>
            </div>
          );
        })}
      </div>
      <div className="border-t border-gray-700 flex items-center gap-2 p-4">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 bg-gray-800 text-white rounded p-2"
        />
        <button onClick={sendMessage} className="btn btn-info">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
