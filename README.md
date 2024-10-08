# Virtual Event Platform

This is a Virtual Event Platform built using React. The platform allows users to join virtual sessions, view live content, interact in real-time, and manage user profiles.

## Features

- **Event Schedule:** Users can join sessions, view video content or live text, and add live content updates.
- **Interactive Content:** Users can participate in polls, submit questions, and share files.
- **User Profile:** Users can update their personal information and profile picture.
- **Virtual Lobby:** Users can network with other attendees and engage in one-on-one chats.

### Setup

1. Clone the repository:
    ```bash
    git clone https://github.com/Prashant-Pipaliya/Virtual-Event-Platform
    ```

2. Navigate to the project directory:
    ```bash
    cd virtual-event-platform
    ```

3. Install the dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm start
    ```

5. Open the app in your browser:
    ```bash
    http://localhost:3000
    ```

## Usage

- **Add Sessions:** You can add a new session by providing a session title and an optional video URL.
- **Join a Session:** Click on a session to join, and either view the video or participate by sending live text updates.
- **Send Live Content:** Type in the textarea and click the "Send" button to send live content in real-time.
- **User Profiles:** Update your user profile by changing the name, email, profile photo, and visibility settings.

## Testing

To run unit tests for this project:

1. Run tests with Jest:
    ```bash
    npm test
    ```

2. Tests are included for critical functionalities, such as:
   - Adding and persisting sessions
   - Joining a session
   - Sending and displaying live content in real-time
   - Managing user profiles

## Technologies Used

- **React.js** – Frontend library
- **React Context API** – State management
- **LocalStorage** – Data persistence for sessions and live content
- **Jest** – Testing framework
- **React Testing Library** – For testing UI components

## Folder Structure

```bash
.
├── public/                   # Public files
├── src/                      # Source files
│   ├── components/           # React components
│   ├── context/              # Context providers
│   ├── utils/                # Utility functions
│   ├── App.js                # Main application component
│   ├── index.js              # Entry point of the React app
├── .gitignore                # Git ignore file
├── package.json              # Project dependencies and scripts
├── README.md                 # Project documentation
