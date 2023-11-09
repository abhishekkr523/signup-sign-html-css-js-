const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".container");

sign_up_btn.addEventListener('click', () =>{
    container.classList.add("sign-up-mode");
});

sign_in_btn.addEventListener('click', () =>{
    container.classList.remove("sign-up-mode");
});


document.querySelector(".sign-in-form").addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent the default form submission behavior
  
    // Retrieve values from the input fields
    const username = document.getElementById("username").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
  
    // Store the data in local storage
    localStorage.setItem("username", username);
    localStorage.setItem("email", email);
    localStorage.setItem("password", password);
  
    // Redirect to the home page (you can replace 'home.html' with your actual home page URL)
    window.location.href = "home.html";
  });
  

//   // Assuming a successful login
// localStorage.setItem("isLoggedIn", "true");

// // Redirect to the home page (you can replace 'home.html' with your actual home page URL)
// window.location.href = "home.html";
const express = require('express');
const session = require('express-session');
const app = express();

// Initialize session middleware
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
}));

// Middleware to check if the user is authenticated
function checkAuthentication(req, res, next) {
  if (req.session && req.session.user) {
    // User is authenticated
    return next();
  } else {
    // User is not authenticated, redirect to the login page
    res.redirect('/login');
  }
}

// Protect the home page using the checkAuthentication middleware
app.get('/home', checkAuthentication, (req, res) => {
  // Render the home page only if the user is authenticated
  res.send('Welcome to the home page!');
});

// Login route
app.get('/login', (req, res) => {
  // Render your login form
});

// Handle login form submission
app.post('/login', (req, res) => {
  // Check user credentials
  if (req.body.username === 'yourUsername' && req.body.password === 'yourPassword') {
    req.session.user = req.body.username; // Store user in session
    res.redirect('/home'); // Redirect to the home page
  } else {
    // Handle login failure
    res.send('Login failed. Please try again.');
  }
});

// Logout route
app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    res.redirect('/login');
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
