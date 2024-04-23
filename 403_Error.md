---
permalink: /tri3frontend/403_Error
---

<p class="title"> 403 Error! </p>

<h2 id="messageContainer"></h2>

<!-- Incorrect Username or Password! Please try logging in again! -->

<a href="{{site.baseurl}}/index">
    <button class="signup-button">Try Again!</button>
</a>



<script>
    const urlParams = new URLSearchParams(window.location.search);

    // Get the value of a specific parameter
    const message = urlParams.get('message');

    const messageContainer = document.getElementById('messageContainer');

    messageContainer.textContent = message;

</script>