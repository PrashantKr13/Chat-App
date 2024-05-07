<h1>Welcome to PineCHAT</h1>
<h2>A dynamic chatting website</h2>

<h3>Preview:</h3>
<img src="https://github.com/PrashantKr13/PineChat/assets/98947818/351207c5-9a92-4662-a500-bcaffca4c9fc" alt="Preview 1" style={height="200px", width="400px"}>
<img src="https://github.com/PrashantKr13/PineChat/assets/98947818/410f5959-ed67-4623-82e0-5fc97798f28e" alt="Preview 2" style={height="200px", width="400px"}>
<img src="https://github.com/PrashantKr13/PineChat/assets/98947818/3a21d1c6-1e10-4417-9f41-3489bd0f2671" alt="Preview 3" style={height="200px", width="400px"}>
<img src="https://github.com/PrashantKr13/PineChat/assets/98947818/0428f6e2-b4df-4586-90f8-e69c33ef61ca" alt="Preview 4" style={height="200px", width="400px"}>

<h3>Features:</h3>

* **Authentication Implementation:** Explore how PineChat handles user authentication securely, allowing users to create accounts and log in using email addresses or social media credentials.

* **Real-Time Messaging with WebSocket:** Dive into the world of real-time messaging using WebSocket technology. PineChat enables seamless communication between users, updating conversations instantly without the need for page refreshes.

* **Emojis and Stickers:** Experiment with incorporating emojis and stickers into PineChat's messaging system, adding fun and expressiveness to conversations.

<h3>Getting Started:</h3>

* Navigate to public/chat-app
* npm i
* Navigate to server
* npm i
* Create a .env file for the server and make the following variables:
  - PORT = Port Address for the server //Eg: 2000, 4000,..etc
  - MONGO_URL = "Your MONGO_DB URL"
  - REACT_URL = "http://localhost:3000" //Default address for React frontend
* Create a .env file for the frontend and make the following variables:
  - REACT_APP_Api_Route_HOST = Address_of_your_server
  - REACT_APP_LOCALHOST_KEY = "app-user"
* Run the server using "npm start"
* Run the frontend using "npm start"
