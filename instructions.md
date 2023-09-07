## Backlog Item 1: Login Page

1. Right Click on 02_maze_game_begin and open in intergrated terminal. Create a new React project using create-react-app. Run each of the commands below
```bash
    npx create-react-app maze_game
    mkdir frontend
    mv maze_game/* ./frontend
    rm -rf maze_game
    cd frontend

```

2. Install Axios using npm or yarn
```bash
    npm install axios
```

3. Create a Login & SignUp component that renders a form with two inputs for username and password and a button for submitting the form

### Login

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setErrorMessage('');
    }, [username, password]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://{my_app}/api/login', {
                username,
                password
            });
            
            const token = response.data.token;
            localStorage.setItem('token', token);
            
            // Redirect to welcome page
            // You can use React Router for navigation
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit">Login</button>
                {errorMessage && <p className="error">{errorMessage}</p>}
            </form>
        </div>
    );
}

export default Login;

```

### Sign Up

```jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Signup() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        setErrorMessage('');
    }, [username, password]);

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('https://{my_app}/api/signup', {
                username,
                password
            });
            
            // Redirect to login page
            // You can use React Router for navigation
        } catch (error) {
            setErrorMessage(error.response.data.message);
        }
    };

    return (
        <div>
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={handleUsernameChange} />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={handlePasswordChange} />
                </div>
                <button type="submit">Sign Up</button>
                {errorMessage && <p className="error">{errorMessage}</p>}
            </form>
        </div>
    );
}

export default Signup;

```

4. Implement the `Login` and `SignUp` components in `App.js`
```jsx
import React from 'react';
import Login from './Login';
import Signup from './Signup'; // Add this line
import './App.css';

function App() {
    return (
        <div className="App">
            {/* Comment or uncomment the following lines to switch between Login and Signup */}
            <span className="d-flex">
                <Login />
                <Signup />
            </span>
        </div>
    );
}

export default App;
```


5. Adjust your `App.css`
```css
.App {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background-color: #f5f5f5;
}

form {
    border: 1px solid #ccc;
    padding: 20px;
    background-color: #fff;
    box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.1);
    width: 300px;
}

label {
    display: block;
    margin-bottom: 5px;
}

input {
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
    border: 1px solid #ccc;
    border-radius: 3px;
}

button {
    background-color: #007bff;
    color: #fff;
    padding: 10px 15px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    width: 100%;
}

.error {
    color: #ff0000;
    margin-top: 5px;
}

```

## Creating a backend

6. Inside 02_maze_game_begin, create a new folder called backend for your project and open it in the intergrated terminal on vs code.

7.  Initialize a new Node.js project and install the necessary dependencies using the following commands:

```bash
    npm init -y
    npm install express body-parser cors
```
8. Create a file named `server.js` in the project folder and add the following code:

```javascript
    const express = require('express');
    const bodyParser = require('body-parser');
    const cors = require('cors');

    const app = express();
    const port = 3001; // You can change this to your desired port

    app.use(bodyParser.json());
    app.use(cors());

    // Sample user data (for demo purposes)
    const users = [
        { id: 1, username: 'user1', password: 'password1' },
        { id: 2, username: 'user2', password: 'password2' }
    ];

    app.post('/api/login', (req, res) => {
        const { username, password } = req.body;

        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            res.status(200).json({ message: 'Login successful', token: 'your_token_here' });
        } else {
            res.status(401).json({ message: 'Invalid credentials' });
        }
    });

    app.post('/api/signup', (req, res) => {
        const { username, password } = req.body;

        const existingUser = users.find(u => u.username === username);

        if (existingUser) {
            res.status(409).json({ message: 'Username already exists' });
        } else {
            const newUser = { id: users.length + 1, username, password };
            users.push(newUser);
            res.status(201).json({ message: 'User registered successfully', user: newUser });
        }
    });

    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
```

9. Run the backend server using the following command:

```bash
    node server.js
```
