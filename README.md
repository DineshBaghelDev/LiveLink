# Real-Time Chat Application

## Overview
This project is a real-time chat application that allows users to create and join rooms, choose nicknames, and communicate instantly. The app supports features such as notifications when users join or leave, and the ability for new users to see previous messages in a room.

---

## Features
1. **Create and Join Rooms:** Users can create unique chat rooms or join existing ones using a room code.
2. **Nickname Support:** Each user can set a unique nickname.
3. **User Notifications:** Shows messages when a user joins or leaves the room.
4. **Persistent Chat History:** New users can see all previous messages in the room.
5. **Responsive UI:** Chat bubbles are displayed on opposite sides of the screen for different users.

---

## Tech Stack
- **Frontend:** React (with React Router)
- **Backend:** Node.js with Express and Socket.IO
- **Styling:** Tailwind CSS

---

## Installation

### Prerequisites
- Node.js and npm installed
- A modern web browser

### Steps
1. Clone the repository:
   ```bash
   git clone <repository_url>
   cd live-link
   ```

2. Install dependencies for both server and client:
   ```bash
   cd Backend
   npm install
   cd live-link
   npm install 
   ```

3. Start the server:
   ```bash
   cd Backend
   node server.js
   ```

4. Start the client:
   ```bash
   npm run dev
   ```

5. Open the application in your browser at [http://localhost:5173](http://localhost:5173).

---

## File Structure

### Server
- **`server.js`**
  - Handles room creation, user management, and message broadcasting.

### Client
- **`src/App.jsx`**
  - Main entry point for routing between components.

- **`src/components/MainMenu.jsx`**
  - Landing page with options to create or join a room.

- **`src/components/Chat.jsx`**
  - Displays chat messages, and message sending.

---

## Usage

### Creating a Room
1. Navigate to the main menu.
2. Click "Create Room."
3. Copy the generated room code and share it with others.
4. Enter a nickname and start chatting.

### Joining a Room
1. Navigate to the main menu.
2. Click "Join Room."
3. Enter the room code and your nickname.
4. Join the chat and view previous messages.

---

## Features in Detail

### User Notifications
- "[User] joined the room" or "[User] left the room" messages are broadcasted to all users in the room.

### Persistent Chat History
- New users joining a room receive the room’s chat history immediately.

---

## Future Enhancements
1. **Private Messaging:** Enable one-on-one conversations.
2. **File Sharing:** Allow users to share files.
3. **Enhanced UI:** Improve chat bubble styling and add themes.
4. **Authentication:** Require login for persistent user accounts.

---

## License
This project is licensed under the MIT License.

---

## Contributors
- **Dinesh** (Developer)

Feel free to contribute to this project by submitting issues or pull requests!

