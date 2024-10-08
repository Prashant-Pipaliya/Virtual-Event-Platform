import React from "react";
import ReactDOM from "react-dom/client";
import "./styles.css";
import EventSchedule from "./components/EventSchedule";
import VirtualLobby from "./components/VirtualLobby";
import InteractiveContent from "./components/InteractiveContent";
import UserProfile from "./components/UserProfile";
import { UserProvider } from './context/UserContext';

function App() {
  return (
    <UserProvider>
      <div>
        <h1>Welcome to Virtual Event Platform</h1>
        <EventSchedule />
        <VirtualLobby />
        <InteractiveContent />
        <UserProfile />
      </div>
    </UserProvider>
  );
}

// Create a root and render your app
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
