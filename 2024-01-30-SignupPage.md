---
permalink: /signup
---


<html lang="en">


<script>
    //import { uri, options } from '{{site.baseurl}}/assets/js/api/config.js';

    function signUp_user() {
        const enteredName = document.getElementById("name").value;
        const enteredUid = document.getElementById("uid").value;
        const enteredPassword = document.getElementById("password").value;
        const enteredDOB = document.getElementById("dob").value;
        console.log("Name = " + enteredName)
        console.log("Uid = " + enteredUid)
        console.log("Password = " + enteredPassword)
        console.log("dob = " + enteredDOB)
        const signupHeaders = new Headers();
      signupHeaders.set('111', '222');
      
      signupHeaders.set("Accept", "*/*");
      signupHeaders.set("Accept-Language", "en-US,en;q=0.9");
      signupHeaders.set("Content-Type", "application/json");

        signUp_api(enteredName, enteredUid, enteredPassword, enteredDOB)
        
      }
    

    function signUp_api(name, uid, pw, dob){
      let signupHeaders = new Headers();
      signupHeaders.append('111', '222');
      
      signupHeaders.append("Accept", "*/*");
      signupHeaders.append("Accept-Language", "en-US,en;q=0.9");
      signupHeaders.append("Content-Type", "application/json");
      

      var raw = JSON.stringify({
          "name" : name,
          "uid": uid,
          "password": pw,
          "dob": dob
        });

      var requestOptions = {
          method: 'POST',
          headers: signupHeaders,
          body: raw,
          redirect: 'follow'
        };

      fetch("http://localhost:8088/api/users/", requestOptions)
          .then(response => {
            if (response.ok) {
                console.log("Successfully Signed Up");
                alert("Account has been created. You will be directed to login page shortly.");
                window.location.href = "https://eshaank1.github.io/csp2/2024/01/30/LoginPage.html"
              } else {
                console.error("Sign Up Failed");
                // You can handle failed login attempts here
                const errorMessageDiv = document.getElementById('errorMessage');
                errorMessageDiv.innerHTML = '<label style="color: red;">User Sign Up Failed</label>';
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
    <div class="container">
    <form action="javascript:signUp_user()">
    <p><label for="Name">First Name:</label>
     <input type="text" id="name" placeholder="Your First Name" />
    </p>
    <p><label for="uid">User ID:</label> 
    <input type="text" id="uid" placeholder="User ID" />
    </p>
    <p><label for="password">Password:</label>
    <input type="password" id="password" placeholder="Password" />
    </p>
    <p><label for="dob">Date Of Birth:</label>
    <input type="text" id="dob" placeholder="Date of Birth (YYYY-MM-DD)" />
    </p>
    <button class="button-spacing">Submit</button>
    </form>
  </div>
</html>