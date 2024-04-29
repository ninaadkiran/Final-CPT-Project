---
toc: true
comments: false
layout: post
title: Login Page
type: hacks
---

<html lang="en">


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
      myHeaders.append("Cookie", "jwt=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJfdWlkIjoidG9ueSJ9.jEShka0oXI1-uCuSTfo3ed5WRw3ASLNV0Tpn1kc5GB0");


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
          

      
      //return response
    }


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
          <button onClick = "window.location.href ='{{site.baseurl}}/main'" class="button-spacing" >Sign Up</button>

      
    </p>
  </form>

  <!-- Your JavaScript code -->
  


</html>