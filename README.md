Here’s the updated **README** file with your requested changes. 🚀  

---

# Quiz Application  

A **React-based** quiz application that allows users to attempt quizzes in full-screen mode with a countdown timer. The app ensures fair play by preventing users from switching tabs or exiting fullscreen.  

## Features  
- **Dynamic Quiz Fetching:** Retrieves quiz data from an API.  
- **Timer Functionality:** Users must complete the quiz within the given time.  
- **Fullscreen Enforcement:** The quiz submits automatically if the user tries to exit fullscreen or switch tabs.  
- **Navigation:** Users can move between questions using Next and Previous buttons.  
- **Auto-Submit on Timeout:** If the timer reaches zero, the quiz is submitted automatically.  

## Technologies Used  
- **Frontend:** React, Tailwind CSS  
- **Backend Proxy Server:** Node.js, Express.js  
- **API Fetching:** Fetch API  
- **State Management:** React Hooks (`useState`, `useEffect`)  

---

## Installation & Setup  

### 1️⃣ Clone the Repository  
```sh
git clone https://github.com/your-repo/quiz-app.git
cd quiz-app
```

### 2️⃣ Install Dependencies  
```sh
npm install
```

### 3️⃣ Start the Proxy Server  
```sh
cd server
node server.js
```
The proxy server runs at **`http://localhost:3001`**.

### 4️⃣ Start the React App  
```sh
npm start
```
The React app runs at **`http://localhost:3000`**.

---

## Folder Structure  
```
/quiz-app
│── /src
│   ├── /components
│   │   ├── Quiz.js   # Main quiz component  
│   │   ├── FullScreenHandler.js  # Fullscreen event handler  
│   ├── /services
│   │   ├── apiService.js  # API handling logic  
│   ├── App.js  # Entry point  
│── proxyServer.js  # Express proxy server  
│── package.json
│── README.md
```

---

## API Service (`/src/services/api.js`)  
Handles fetching quiz data from the backend.

```js
const API_BASE_URL = 'http://localhost:3001/api';

export const fetchQuizData = async (quizId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${quizId}`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data.questions;
  } catch (error) {
    console.error('Error fetching quiz data:', error);
    return [];
  }
};
```

---

## Proxy Server (`/proxyServer.js`)  
Handles API requests and forwards them to `api.jsonserve.com`.


## How It Works  
1️⃣ The React app fetches quiz data from `api.jsonserve.com` via the proxy server.  
2️⃣ The user answers the quiz within the given time.  
3️⃣ If the user presses **Escape** or switches tabs, the quiz is submitted automatically.  
4️⃣ The quiz auto-submits when time runs out.  

---

## FullScreen Handling  
The app enforces fullscreen mode using the `FullScreenHandler.js` component.  

- If the user **presses Escape**, a confirmation appears asking if they want to submit the quiz.  
- If the user **switches tabs**, the quiz is submitted automatically.  
- If fullscreen mode **exits accidentally**, it prompts the user to re-enter fullscreen.  

## Future Improvements  
✅ Add authentication for user-based quizzes.  
✅ Store quiz progress in local storage.  
✅ Improve UI/UX with animations.  

---

### 🤝 Contributing  
Feel free to submit pull requests and improve this project!  

---

### 🔗 Contact  
For queries, contact **Himanshu Sharma**. 🚀  

---

Let me know if you need further modifications! 🚀