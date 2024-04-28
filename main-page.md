---
permalink: /main
---

<html>
<style>
body {
    background-image: url('{{site.baseurl}}/images/logincar.gif');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: #FFFFFF;
}
.main-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 30vh;
    margin-bottom: 0;
    padding-bottom: 10px;
}
.fancy-button {
    background-color: #ff00ff;
    border: none;
    color: white;
    padding: 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 10px;
    cursor: pointer;
    border-radius: 5px;
    box-shadow: 0 0 20px rgba(255, 0, 255, 0.5);
    transition: all 0.3s ease-in-out;
}
.fancy-button:hover {
    background-color: #ff77ff;
    box-shadow: 0 0 25px rgba(255, 0, 255, 0.75);
}
.fancy-background {
    background-color: rgba(0, 0, 0, 0.5);
    padding: 20px;
    border-radius: 10px;
    margin: 0 auto 20px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
    width: 80%;
}
.small-button {
    background-color: #8800ff;
    padding: 10px 20px;
    font-size: 14px;
    border-radius: 8px;
    box-shadow: 0 0 15px rgba(136, 0, 255, 0.5);
    transition: all 0.3s ease-in-out;
    margin: 5px;
}
.small-button:hover {
    background-color: #bb77ff;
    box-shadow: 0 0 20px rgba(187, 119, 255, 0.75);
}
</style>
<body>
    <div class="main-container">
        <button class="fancy-button" onclick="location.href='{{site.baseurl}}/chat';">Chat About Cars</button>
        <button class="fancy-button" onclick="location.href='{{site.baseurl}}/mpg';">MPG Predictor</button>
<head>
    <title>Synthwave Style Main Page</title>
</head>
    <div class="fancy-background">
        <header><b>Plans for the Integration</b></header>
            - We integrated the video sharing platform and the login system into the shared repo
            <br>
            - Finally, we integrated the other CPT projects
            <br>
            - Then, the different machine learning systems were integrated into the repo. (Titanic, Diamond cost predictor, MPG predictor, likelihood of car crash predictor, and house price predictor)
    </div>
        <button class="small-button" onClick="signOut()">Sign Out</button>
    </div>
    <script>
function signOut() {
    // Get all cookies
    const cookies = document.cookie.split(';');
    // Iterate over each cookie and set its expiry date to a past date
    cookies.forEach(cookie => {
        const cookieParts = cookie.split('=');
        const cookieName = cookieParts[0].trim();
        document.cookie = cookieName + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    });
    // Redirect to the sign-in page or any other appropriate action
    window.location.href = '{{site.baseurl}}/';
}
    </script>
</body>
</html>
