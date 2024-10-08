const SESSION_KEY = "eventSessions";

// Get sessions from local storage
export const getSessions = () => {
  try {
    const sessions = localStorage.getItem(SESSION_KEY);
    return sessions ? JSON.parse(sessions) : [];
  } catch (error) {
    console.error("Failed to get sessions from localStorage:", error);
    return [];
  }
};

// Add a new session
export const addSession = (session) => {
  try {
    const sessions = getSessions();
    if (sessions.find((existingSession) => existingSession.id === session.id)) {
      console.warn("Session already exists:", session);
      return;
    }
    localStorage.setItem(SESSION_KEY, JSON.stringify([...sessions, session]));
  } catch (error) {
    console.error("Failed to add session to localStorage:", error);
  }
};
