---
permalink: /update
---

<!-- 
A simple HTML login form with a Login action when button is pressed.  

The form triggers the login_user function defined in the JavaScript below when the Login button is pressed.
-->
<p class="title"> Update a User </p>

<p>Update a User! Input the User ID you need to update, along with the updated Name and Password you want for the account. ONLY INPUT ROLE AS ADMIN OR USER</p>

<form action="javascript:update_users()">
    <h2><label>
        User ID:
        <input type="text" name="uid" id="uid" required>
    </label></h2>
    <h2><label>
        Password:
        <input type="text" name="password" id="password" required>
    </label></h2>
        <h2><label>
        Name:
        <input type="text" name="name" id="name" required>
    </label></h2>
    <h2><label>
        Color:
        <input type="text" name="color" id="color" required>
    </label></h2>
        <h2><label>
        Role:
        <input type="text" name="role" id="role" required>
    </label></h2>
    <p>
        <button class="update-button">Update</button>
    </p>

</form>

<script type="module">
    // uri variable and options object are obtained from config.js
    import { uri, options } from '{{site.baseurl}}/assets/js/api/config.js';

    const url = uri + '/api/users/';

    function update_users(){
      // if (document.getElementById("password").value != document.getElementById("confirmpassword").value) {
      //   alert("Error: Passwords do not match.");
      //   return;
      // }
      const body = {
        uid: document.getElementById("uid").value,
        password: document.getElementById("password").value,
        name: document.getElementById("name").value,
        color: document.getElementById("color").value,
        role: document.getElementById("role").value,
      };
      const AuthOptions = {
                  mode: 'cors', // no-cors, *cors, same-origin
                  credentials: 'include', // include, same-origin, omit
                  headers: {
                      'Content-Type': 'application/json',
                  },
                  method: 'PUT', // Override the method property
                  cache: 'no-cache', // Set the cache property
                  body: JSON.stringify(body)
              };
        // fetch the API
        fetch(url, AuthOptions)
          // response is a RESTful "promise" on any successful fetch
          .then(response => {
            // check for response errors and display
            if (response.status !== 200) {
                window.location.replace("{{site.baseurl}}/403_Error?message=Insufficient+Permissions");
            }
            // valid response will contain JSON data
            response.json().then(data => {
              // insert whatever code you want here
            alert("User created successfully!");
            window.location.href = "{{site.baseurl}}/games";
            })
        })
        // catch fetch errors (ie ACCESS to server blocked)
        .catch(err => {
          console.log(err)
        });
    }
    // Attach login_user to the window object, allowing access to form action
    window.update_users = update_users;
</script>