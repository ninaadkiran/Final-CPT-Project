---
permalink: /signup
---

<!-- 
A simple HTML login form with a Login action when button is pressed.  

The form triggers the login_user function defined in the JavaScript below when the Login button is pressed.
-->

<p class="title"> Sign Up! </p>

<p>Create a New User! Input your Name, User ID, Password, Date of Birth, and Favorite Color</p>

<form action="javascript:signup_user()">
    <p><label>
        Name:
        <input type="text" name="name" id="name" required>
    </label></p>
    <p><label>
        User ID:
        <input type="text" name="uid" id="uid" required>
    </label></p>
        <p><label>
        Password:
        <input type="password" name="password" id="password" required>
    </label></p>
        <p><label>
        Date of Birth:
        <input type="date" name="dob" id="dob" required>
    </label></p>
        <p><label>
        Favorite Color:
        <input type="text" name="color" id="color" required>
    </label></p>
    <p>
        <button class="signup-button">Sign Up</button>
    </p>

<!-- 
Below JavaScript code is designed to handle user authentication in a web application. It's written to work with a backend server that uses JWT (JSON Web Tokens) for authentication.

The script defines a function when the page loads. This function is triggered when the Login button in the HTML form above is pressed. 
 -->
<script type="module">
    // uri variable and options object are obtained from config.js
    import { uri, options } from '{{site.baseurl}}/assets/js/api/config.js';

function signup_user() {
    // Set Create User endpoint
    const url = uri + '/api/users/';

    // Set body of request to include signup data from DOM
    const body = {
        name: document.getElementById("name").value,
        uid: document.getElementById("uid").value,
        password: document.getElementById("password").value,
        dob: document.getElementById("dob").value,
        color: document.getElementById("color").value,
    };

    // Change options according to Authentication requirements
    const createOptions = {
        ...options,
        method: 'POST',
        cache: 'no-cache',
        body: JSON.stringify(body)
    };

    // Fetch to create user
    fetch(url, createOptions)
        .then(response => {
            if (!response.ok) {
                const errorMsg = 'Signup error: ' + response.status;
                console.log(errorMsg);
                alert("Error creating user");
                return;
            }

            // Success - user created
            alert("User created successfully!");
            window.location.href = "{{site.baseurl}}/index";
        })
        .catch(err => {
            console.error(err);
        });
}
    // Attach signup_user to the window object, allowing access to form action
    window.signup_user = signup_user;
</script>
