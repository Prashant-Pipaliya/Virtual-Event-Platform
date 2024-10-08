import React, { useState, useEffect } from "react";

const getSessions = () => {
  const savedSessions = localStorage.getItem("sessions");
  return savedSessions
    ? JSON.parse(savedSessions)
    : [
        {
          id: 1,
          title: "Session 1",
          video: "https://example.com/video1.mp4",
          liveContent: [],
        },
        { id: 2, title: "Session 2", video: "", liveContent: [] },
      ];
};

const isValidURL = (str) => {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" +
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
      "((\\d{1,3}\\.){3}\\d{1,3}))" +
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
      "(\\?[;&a-z\\d%_.~+=-]*)?" +
      "(\\#[-a-z\\d_]*)?$",
    "i"
  );
  return pattern.test(str);
};

const EventSchedule = () => {
  const [sessions, setSessions] = useState(getSessions());
  const [newSessionTitle, setNewSessionTitle] = useState("");
  const [newSessionVideo, setNewSessionVideo] = useState("");
  const [currentSession, setCurrentSession] = useState(null);
  const [liveContent, setLiveContent] = useState("");
  const [urlError, setUrlError] = useState("");

  useEffect(() => {
    localStorage.setItem("sessions", JSON.stringify(sessions));
  }, [sessions]);

  const addSession = (session) => {
    setSessions((prevSessions) => [...prevSessions, session]);
  };

  const handleAddSession = (e) => {
    e.preventDefault();
    if (newSessionTitle) {
      if (newSessionVideo && !isValidURL(newSessionVideo)) {
        setUrlError("Invalid video URL");
        return;
      }
      setUrlError("");
      const session = {
        id: sessions.length + 1,
        title: newSessionTitle,
        video: newSessionVideo,
        liveContent: [],
      };
      addSession(session);
      setNewSessionTitle("");
      setNewSessionVideo("");
    }
  };

  const handleJoinSession = (session) => {
    setCurrentSession(session);
    setLiveContent("");
  };

  const handleLeaveSession = () => {
    setCurrentSession(null);
    setLiveContent("");
  };

  const handleLiveContentChange = (e) => {
    setLiveContent(e.target.value);
  };

  const handleSendLiveContent = () => {
    if (liveContent && currentSession) {
      let currentSessionData;
      const updatedSessions = sessions.map((session) => {
        if (session.id === currentSession.id) {
          currentSessionData = {
            ...session,
            liveContent: [...session.liveContent, liveContent],
          };
          return {
            ...session,
            liveContent: [...session.liveContent, liveContent],
          };
        }
        return session;
      });
      setCurrentSession(currentSessionData);
      setSessions(updatedSessions);
      setLiveContent("");
    }
  };

  return (
    <div className="event-schedule">
      <h2>Event Schedule</h2>
      <form onSubmit={handleAddSession}>
        <input
          type="text"
          value={newSessionTitle}
          onChange={(e) => setNewSessionTitle(e.target.value)}
          placeholder="Session Title"
          required
        />
        <input
          type="text"
          value={newSessionVideo}
          onChange={(e) => setNewSessionVideo(e.target.value)}
          placeholder="Video URL"
        />
        {urlError && <p style={{ color: "red" }}>{urlError}</p>}
        <button type="submit">Add Session</button>
      </form>
      <ul>
        {sessions.map((session) => (
          <li key={session.id}>
            {session.title}
            <button onClick={() => handleJoinSession(session)}>
              Join Session
            </button>
          </li>
        ))}
      </ul>

      {currentSession && (
        <div className="joined-session">
          <h3>Joined Session: {currentSession.title}</h3>
          {currentSession.video ? (
            <div>
              <h4>Watch Video:</h4>
              <video width="320" height="240" controls>
                <source src={currentSession.video} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
            </div>
          ) : (
            <div>
              <h4>Live Text Content:</h4>
              <textarea
                style={{ width: "100%" }}
                value={liveContent}
                onChange={handleLiveContentChange}
                placeholder="Enter live content here..."
                rows="4"
              />
              <button onClick={handleSendLiveContent}>Send</button>
            </div>
          )}
          <h4>Live Content History:</h4>
          <ul>
            {currentSession.liveContent.map((content, index) => (
              <li key={index}>{content}</li>
            ))}
          </ul>
          <button onClick={handleLeaveSession}>Leave Session</button>
        </div>
      )}
    </div>
  );
};

export default EventSchedule;
