---
permalink: /chat
---
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Chatroom</title>
    <style>
        /* Basic CSS Created by me, embellished by ChatGPT */
        body {
            font-family: 'Arial', sans-serif;
            background-color: #232122;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            padding: 20px;
            background-image: url('{{site.baseurl}}/images/logincar.gif');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
        }
        .chatroom {
            width: 600px;
            height: 600px;
            background-color: #232122;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(255, 0, 153, 0.75); /* Vibrant pink glowing border */
            overflow: hidden;
        }
        .chatroom-header {
            background-color: #C13A7F;
            color: #FFF;
            text-align: center;
            padding: 10px;
            border-bottom: 1px solid #C13A7F;
        }
        .chatroom-messages {
            max-height: 410px;
            min-height: 375px;
            padding: 8px;
            overflow-y: auto;
            background-color: #232122;
        }
        .chatroom-messages div {
            background-color: #C13A7F;
            border-radius: 5px;
            margin: 5px 0;
            padding: 5px;
            word-wrap: break-word;
            cursor: pointer;
        }
        .chatroom-input, .filter-section {
            padding: 10px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            border-top: 1px solid #FFFFFF;
        }
        input[type="text"], .filter-section input[type="text"] {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 5px;
            background-color: #C13A7F;
            color: #FFFFFF;
        }
        button, .filter-section button {
            background-color: #C13A7F;
            color: #FFFFFF;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            cursor: pointer;
            margin-left: 10px;
            box-shadow: 0 0 10px rgba(255, 0, 153, 0.75); /* Bright pink glow */
        }
        button:hover, .filter-section button:hover {
            background-color: #FF66B2; /* Lighter neon pink */
        }
    </style>
</head>
<body>
<div class="chatroom">
    <div class="chatroom-header">
        <!-- The user input is typed here-->
        <h1>Chatroom</h1>
        <div class="filter-section">
            <label for="filter-content">Filter by Content:</label>
            <br>
            <input type="text" id="filter-content" placeholder="Enter text...">
            <button onclick="applyFilter()">Apply Filter</button>
            <button onclick="resetFilter()">Reset Filter</button>
            <button onclick="sortByAlphabeticalOrder()">Sort Alphabetically</button>
        </div>
    </div>
    <div class="chatroom-messages" id="chatroom-messages">
    </div>
    <div class="chatroom-input">
        <input type="text" id="message" placeholder="Type your message here..." onkeypress="handleKeyPress(event)">
        <button id="send" onclick="sendMessage()">Send</button>
        <button id="toggleModeButton" onclick="toggleMode()">Toggle Mode</button>
    </div>
</div>
<script>
    // Toggle mode created using chat GPT
    const chatBox = document.getElementById("chatroom-messages");
    const messageInput = document.getElementById("message");
    const backendUrl = "http://127.0.0.1:8089";
    let currentMessageId = null; // This tracks the message being edited
    let messagesData = []; // Array to hold messages data

    function toggleMode() {
        // Created constants for different parts of the chatroom in order for the color to be changed when toggle mode function is clicked
        const body = document.body;
        const chatroom = document.querySelector('.chatroom');
        const chatroomHeader = document.querySelector('.chatroom-header');
        const chatroomMessages = document.querySelector('.chatroom-messages');
        const input = document.querySelector('input[type="text"]');
        const button1 = document.getElementById('send');
        const toggleButton = document.getElementById('toggleModeButton');
        if (body.classList.contains('dark-mode')) {
            body.classList.remove('dark-mode');
            chatroom.style.backgroundColor = '#FFC8C5';
            chatroomHeader.style.backgroundColor = '#C13A7F';
            chatroomHeader.style.color = '#000';
            chatroomMessages.style.backgroundColor = '#FFC8C5';
            input.style.backgroundColor = '#C13A7F';
            input.style.color = '#000';
            button1.style.backgroundColor = '#C13A7F';
            button1.style.color = '#FFC8C5';
            toggleButton.style.backgroundColor = '#C13A7F';
            toggleButton.style.color = '#FFC8C5';
            toggleButton.textContent = 'Dark Mode';
        } else {
            body.classList.add('dark-mode');
            chatroom.style.backgroundColor = '#232122';
            chatroomHeader.style.backgroundColor = '#C13A7F';
            chatroomHeader.style.color = '#232122';
            chatroomMessages.style.backgroundColor = '#232122';
            input.style.backgroundColor = '#C13A7F';
            input.style.color = '#232122';
            button1.style.backgroundColor = '#C13A7F';
            button1.style.color = '#232122';
            toggleButton.style.backgroundColor = '#C13A7F';
            toggleButton.style.color = '#232122';
            toggleButton.textContent = 'Light Mode';
        }
    }

    // Example of algorithm calling to backend
    function sendMessage() {
        const message = messageInput.value.trim();
        if (message !== '') {
            // This is used to determine the endpoint and method based on whether there's a currentMessageId
            const apiEndpoint = currentMessageId ? `${backendUrl}/api/chat/edit` : `${backendUrl}/api/chat/create`;
            const methodType = currentMessageId ? "PUT" : "POST";
            const payload = currentMessageId ? { message_id: currentMessageId, message: message } : { message: message };
            fetch(apiEndpoint, {
                method: methodType,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            })
            .then(response => response.json())
            .then(data => {
                if (data.error) {
                    throw new Error(data.error);
                }
                displayChat(); // Refreshing chat message
                messageInput.value = ''; // Clearing the input field
                currentMessageId = null; // Resetting the current message ID
            })
            .catch(error => {
                console.error("API error:", error);
            });
        }
    }

    // Example of a procedure and how my visual output is shown
    function displayChat() {
        fetch(`${backendUrl}/api/chat/read`, {
            method: "GET",
        })
        .then(response => response.json())
        .then(data => {
            messagesData = data;
            renderMessages(data);
            applyFilter();
        })
        .catch(error => console.error("Failed to retrieve chat messages:", error));
    }

    // Render messages to the chat box
    function renderMessages(messages) {
        chatBox.innerHTML = "";
        messages.forEach(item => {
            const messageElement = document.createElement("div");
            const formattedTimestamp = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            messageElement.textContent = `[${formattedTimestamp}] User ${item.user_id}: ${item.message}`;
            messageElement.id = `message-${item.id}`;
            messageElement.onclick = () => editMessage(item.id);
            chatBox.appendChild(messageElement);
        });
    }

    // A call to one of my student procedures
    function editMessage(messageId) {
        currentMessageId = messageId;
        const messageDiv = document.getElementById(`message-${messageId}`);
        const messageTextWithUserId = messageDiv.textContent;
        const userIdStartIndex = messageTextWithUserId.indexOf(']') + 2; // Finding the start index of the user ID in order to take it out
        const userIdEndIndex = messageTextWithUserId.indexOf(':', userIdStartIndex); // Find the end index of the user ID
        const messageText = messageTextWithUserId.substring(userIdEndIndex + 1);
        messageInput.value = messageText.trim(); // Set the message input value
    }

    // Sort messages alphabetically
    function sortByAlphabeticalOrder() {
        const sortedMessages = [...messagesData].sort((a, b) => a.message.localeCompare(b.message));
        renderMessages(sortedMessages);
    }

    function applyFilter() {
        const filterText = document.getElementById("filter-content").value.toLowerCase();
        const filteredMessages = messagesData.filter(item => item.message.toLowerCase().includes(filterText));
        renderMessages(filteredMessages);
    }

    function resetFilter() {
        document.getElementById("filter-content").value = '';
        renderMessages(messagesData);
    }

    function handleKeyPress(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            sendMessage();
        }
<<<<<<< HEAD
    }

    setInterval(displayChat, 5000);
</script>
</body>
</html>
=======
    });
}
function resetFilter() {
    currentFilter = "";  // Clearing the current filter
    const messages = document.querySelectorAll(".chatroom-messages div");
    messages.forEach(message => {
        message.style.display = "block"; // Reset the display of all messages
    });
    document.getElementById("filter-content").value = "";  // Clear the filter input box
    document.getElementById("length-filter").value = "";  // Clear the length filter input box
}
        function filterByExactLength() {
    const lengthFilter = parseInt(document.getElementById("length-filter").value, 10);
    const messages = document.querySelectorAll(".chatroom-messages div");
    messages.forEach(message => {
        const messageText = message.textContent.split(": ").pop();
        if (message.textContent.length === lengthFilter) {
            message.style.display = "block";
        } else {
            message.style.display = "none";
        }
    });
}
        function handleKeyPress(event) {
            if (event.key === "Enter") {
                event.preventDefault();
                sendMessage();
            }
        }
        displayChat();
        setInterval(displayChat, 5000);
    </script>
>>>>>>> 4869d0bd5e3a4171b7f264ec1bb444242637411a
