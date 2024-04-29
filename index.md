---
---

  <style>

    #login-container {
      background-color: #ffcccc; /* light pink */
      max-width: 400px;
      margin: 50px auto;
      padding: 20px;
      border-radius: 10px;
      box-shadow: 0px 0px 10px 0px rgba(0,0,0,0.5);
    }
    
    h1 {
      text-align: center;
      color: #000; /* black */
    }
    
    label {
      display: block;
      margin-bottom: 10px;
      color: #ffb6f1; /* black */
    }
    
    input[type="text"],
    input[type="password"] {
      width: 100%;
      padding: 10px;
      margin-bottom: 20px;
      border: 2px solid #000; /* black */
      border-radius: 5px;
      box-sizing: border-box;
    }
    
    button {
      width: 100%;
      padding: 10px;
      background-color: #AA336A; /* black */
      color: #fff; /* white */
      border: none;
      border-radius: 5px;
      cursor: pointer;
    }
    
    button:hover {
      background-color: #666; /* dark grey */
    }
    
    .button-spacing {
      margin-right: 100px;
    }
    
    .signup-link {
      text-align: center;
      margin-top: 10px;
    }
    
    .signup-link a {
      color: #333; /* black */
      text-decoration: none;
    }
    
    .signup-link a:hover {
      text-decoration: underline;
    }
body {
  background: url({{site.baseurl}}/images/logincar.gif);
  background-size: cover;
}

</style>

<script>
    //import { uri, options } from '{{site.baseurl}}/assets/js/api/config.js';

    function login_user() {
      const enteredUid = document.getElementById("uid").value;
      const enteredPassword = document.getElementById("password").value;
      console.log("Uid = " + enteredUid)
      console.log("Password = " + enteredPassword)
      const signupHeaders = new Headers();
      signupHeaders.set('111', '222');
      
      signupHeaders.set("Accept", "*/*");
      signupHeaders.set("Accept-Language", "en-US,en;q=0.9");
      signupHeaders.set("Content-Type", "application/json");

      login_api(enteredUid,enteredPassword)
        
      }
    

    function login_api(uid, pw){
      var myHeaders = new Headers();
      myHeaders.append("Accept", "*/*");
      myHeaders.append("Accept-Language", "en-US,en;q=0.9");
      myHeaders.append("Content-Type", "application/json");
      //myHeaders.append("Cookie", "jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfdWlkIjoidG9ueSJ9.jEShka0oXI1-uCuSTfo3ed5WRw3ASLNV0Tpn1kc5GB0");
      myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzI1NiJ9.e30.BSQAHTECtxHe2dzC75Ijpz18pTmjDb1q6WWrJMOLlm0");
      myHeaders.append("Cookie", "jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfdWlkIjoibWJhNCJ9.oBlUf7JKmb_rLaoAFJ55yUs-70O7NUAFE6ALOXOviUc");

var raw = "";

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  body: raw,
  redirect: 'follow'
};

fetch("http://127.0.0.1:8089/api/users", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));

      var raw = JSON.stringify({
          "uid": uid,
          "password": pw
        });

      var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
        };

      fetch("http://127.0.0.1:8089/api/users/authenticate", requestOptions)
          .then(response => {
            if (response.ok) {
                console.log("User logged in successfully");
                window.location.href = "{{site.baseurl}}/main"

              } else {
                console.error("User login failed");
                // You can handle failed login attempts here
                const errorMessageDiv = document.getElementById('errorMessage');
                errorMessageDiv.innerHTML = '<label style="color: red;">User Login Failed</label>';
              }
          })
          .then(result => { 
            console.log(result);
            
            })
          .catch(error => console.log('error', error));
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "uid": uid,
        "password": pw
    });

    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        credentials: 'include' // This needs to be included to handle cookies
    };

    fetch("http://127.0.0.1:8089/api/users/authenticate", requestOptions)
        .then(response => response.json())  // Make sure to handle JSON response correctly
        .then(result => {
            console.log("User logged in successfully");
            window.location.href = "/main";  // Ensure you're redirecting correctly
        })
        .catch(error => {
            console.error('Error:', error);
            document.getElementById('errorMessage').innerHTML = '<label style="color: red;">User Login Failed</label>';
        });
}
      //return response


  </script>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Page</title>
  <!-- Your HTML login form -->
  <div id="errorMessage"></div>
  <form action="javascript:login_user()">
    <p><label for="uid">User ID:</label>
      <input type="text" name="uid" id="uid" required>
    </p>
    <p><label for="password">Password:</label>
      <input type="password" name="password" id="password" required>
    </p>
    <p>
     <button class="button-spacing">Log In</button>
          <button onClick = "window.location.href ='{{site.baseurl}}/signup'" class="button-spacing" >Sign Up</button>

      
    </p>
  </form>

  <!-- Your JavaScript code -->
  

