// server.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// Connect to MongoDB (replace 'your_database_url' with your actual database connection string)
mongoose.connect('mongodb://localhost:27017/mishraji?directConnection=true', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define a simple User schema
const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model('User', userSchema);

// Middleware to parse JSON data
app.use(bodyParser.json());

// Serve HTML files in the 'public' directory
app.use(express.static('public'));


// Update the login route to send a success message
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });
        if (user) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.json({ success: false, message: 'Invalid username or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Server error' });
    }
});

// 
async function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const response = await fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.success) {
        alert(data.message);
        onLoginSuccess();
    } else {
        alert(data.message);
    }

    // Return false to prevent the form from submitting
    return false;
}

function showSignup() {
    // Assuming you have a signup page or modal
    alert('Redirect to signup page or show signup modal');
}

function logout() {
    // Assuming you have a server endpoint for logout
    fetch('/logout', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    }).then(() => {
        document.getElementById('login-logout-link').innerText = 'Login';
        showLogin();
    });
}

// Update the following function to execute after successful login
function onLoginSuccess() {
    document.getElementById('login-logout-link').innerText = 'Logout';
    document.getElementById('logoutBtn').style.display = 'block';
    const username = document.getElementById('username').value;
    document.getElementById('user-info').innerText = `Hello, ${username}!`;
    // Redirect or perform other actions on successful login
}

// Additional function to show login form
function showLogin() {
    document.getElementById('login').style.display = 'block';
    document.getElementById('contact').style.display = 'none';
    document.getElementById('user-info').innerText = ''; // Clear user information
    document.getElementById('logoutBtn').style.display = 'none';
}

// Contact Us 

const express = require('express');
const { MongoClient } = require('mongodb');
const bodyParser = require('body-parser');

//const app1 = express();
//const PORT = 3000;

// Connection URL and Database Name
const url = 'mongodb://localhost:27017/mishraji?directConnection=true';
const dbName = 'car_selling_platform';

// Middleware to parse incoming JSON requests
app.use(bodyParser.json());

// Endpoint to handle contact form submissions
app.post('/submitContactForm', async (req, res) => {
    const { name, email, message } = req.body;

    try {
        // Connect to MongoDB
        const client = new MongoClient(url, { useUnifiedTopology: true });
        await client.connect();

        // Access the database
        const db = client.db(dbName);

        // Insert the data into the MongoDB collection
        const result = await db.collection('contact_submissions').insertOne({
            name,
            email,
            message,
        });

        // Close the connection
        await client.close();

        res.status(200).json({ success: true, message: 'Form submitted successfully.' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, message: 'Failed to submit the form.' });
    }
});




// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

//const app = express();
//const PORT = 3000;

app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mishraji?directConnection=true', { useNewUrlParser: true, useUnifiedTopology: true });

// Define User model
const User = mongoose.model('User', {
    username: String,
    password: String,
});

// Login route
app.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });

        if (user) {
            res.json({ success: true, message: 'Login successful' });
        } else {
            res.json({ success: false, message: 'Incorrect username or password' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

// Signup route
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    try {
        const existingUser = await User.findOne({ username });

        if (existingUser) {
            res.json({ success: false, message: 'Username already exists' });
        } else {
            const newUser = new User({ username, password });
            await newUser.save();
            res.json({ success: true, message: 'Signup successful' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Internal server error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

