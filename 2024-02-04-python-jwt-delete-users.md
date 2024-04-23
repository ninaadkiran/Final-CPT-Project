---
permalink: /delete
---

<!-- 
A simple HTML login form with a Login action when button is pressed.  

The form triggers the login_user function defined in the JavaScript below when the Login button is pressed.
-->
<p class="title"> Delete a User </p>

<form action="javascript:delete_user()">
    <h2><label>
        User ID:
        <input type="text" name="duid" id="duid" required>
    </label></h2>
    <p>
        <button class="delete-button">Delete</button>
    </p>

</form>

<script type="module">
    // uri variable and options object are obtained from config.js
    import { uri, options } from '{{site.baseurl}}/assets/js/api/config.js';

    const url = uri + '/api/users/';

    function delete_user(){
    const body = {
      uid: document.getElementById("duid").value,
    };
    const AuthOptions = {
                mode: 'cors', // no-cors, *cors, same-origin
                credentials: 'include', // include, same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                },
                method: 'DELETE', // Override the method property
                cache: 'no-cache', // Set the cache property
                body: JSON.stringify(body) // delete if using backend code that fetches directly from the cookie
            };
      // fetch the API
      fetch(url, AuthOptions)
        // response is a RESTful "promise" on any successful fetch
        .then(response => {
          // check for response errors and display
          if (response.status !== 200) {
                window.location.replace("{{site.baseurl}}/403_Error?message=Insufficient+Permissions");
                return;
          }
          // valid response will contain JSON data
          response.json().then(data => {
            window.location.href = "{{site.baseurl}}/database";
          })
      })
      // catch fetch errors (ie ACCESS to server blocked)
      .catch(err => {
        console.log(err)
      });
  }
  window.delete_user = delete_user;
</script>