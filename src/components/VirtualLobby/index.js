import React, { useEffect, useState } from "react";

const VirtualLobby = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState({});

  const sampleUsers = [
    {
      id: 1,
      name: "Alice",
      photo: "https://via.placeholder.com/100",
      interests: "Tech, Music",
    },
    {
      id: 2,
      name: "Bob",
      photo: "https://via.placeholder.com/100",
      interests: "Sports, Art",
    },
    {
      id: 3,
      name: "Charlie",
      photo: "https://via.placeholder.com/100",
      interests: "Travel, Food",
    },
  ];

  useEffect(() => {
    setUsers(sampleUsers);

    const storedChatHistory =
      JSON.parse(localStorage.getItem("chatHistory")) || {};
    setChatHistory(storedChatHistory);

    const interval = setInterval(() => {
      const updatedChatHistory =
        JSON.parse(localStorage.getItem("chatHistory")) || {};
      setChatHistory(updatedChatHistory);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleSendMessage = () => {
    if (selectedUser && message) {
      const newMessage = { message, sender: "You" };

      const newChatHistory = {
        ...chatHistory,
        [selectedUser.id]: [
          ...(chatHistory[selectedUser.id] || []),
          newMessage,
        ],
      };

      localStorage.setItem("chatHistory", JSON.stringify(newChatHistory));

      setChatHistory(newChatHistory);
      setMessage("");
    }
  };

  return (
    <div className="virtual-lobby">
      <h2>Virtual Lobby</h2>
      <div className="user-list">
        <h3>Attendees</h3>
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className="user"
          >
            <img
              src={user.photo}
              alt={user.name}
              style={{ width: "50px", borderRadius: "50%" }}
            />
            <span style={{ marginLeft: "10px" }}>
              {user.name} - {user.interests}
            </span>
          </div>
        ))}
      </div>

      {selectedUser && (
        <div className="chat-container">
          <h3>Chat with {selectedUser.name}</h3>
          <div className="chat-history">
            {chatHistory[selectedUser.id] &&
              chatHistory[selectedUser.id].map((msg, index) => (
                <div
                  key={index}
                  className={`chat-message ${
                    msg.sender === "You" ? "sent" : "received"
                  }`}
                >
                  {msg.sender}: {msg.message}
                </div>
              ))}
          </div>
          <div className="virtual-user">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message..."
            />
            <button onClick={handleSendMessage}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VirtualLobby;
