---
permalink: /main
---

<html>
<style>
body {
    background-image: url('{{site.baseurl}}/images/logincar.gif'); /* Add your GIF link here */
    background-size: cover; /* Cover the entire page */
    background-position: center; /* Center the background image */
    background-repeat: no-repeat; /* Do not repeat the image */
}

.fancy-button {
    background-color: #ff00ff; /* Neon Pink */
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
    background-color: #ff77ff; /* Lighter Neon Pink */
    box-shadow: 0 0 25px rgba(255, 0, 255, 0.75);
}
</style>
<head>
    <title>Synthwave Style Main Page</title>
    <link rel="stylesheet" type="text/css" href="styles.css">
</head>
<body>
    <div class="main-container">
        <button class="fancy-button" onclick="location.href='{{site.baseurl}}/chat';">Chat About Cars</button>
        <button class="fancy-button" onclick="location.href='{{site.baseurl}}/mpg';">MPG Predictor</button>
    </div>
</body>
</html>

<header><b>Plans for the Integration</b></header>
<br>
<text>
- We integrated the video sharing platform and the login system into the shared repo
<br>
<br>
- Finally, we integrated the other CPT projects
<br>
<br>
- Then, the different machine learning systems were integrated into the repo. (Titanic, Diamond cost predictor, MPG predictor, likelihood of car crash predictor, and house price predictor)
<br>
</text>