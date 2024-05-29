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
            box-shadow: 0 0 20px rgba(255, 0, 153, 0.75);
            /* Vibrant pink glowing border */
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
            min-height: 305px;
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

        .chatroom-input,
        .filter-section {
            padding: 10px;
            display: flex;
            flex-wrap: wrap;
            align-items: center;
            border-top: 1px solid #FFFFFF;
        }

        input[type="text"],
        .filter-section input[type="text"],
        .filter-section input[type="number"] {
            flex: 1;
            padding: 10px;
            border: none;
            border-radius: 5px;
            background-color: #C13A7F;
            color: #FFFFFF;
        }

        button,
        .filter-section button {
            background-color: #C13A7F;
            color: #FFFFFF;
            border: none;
            border-radius: 5px;
            padding: 10px 20px;
            cursor: pointer;
            margin-left: 10px;
            box-shadow: 0 0 10px rgba(255, 0, 153, 0.75);
            /* Bright pink glow */
        }

        button:hover,
        .filter-section button:hover {
            background-color: #FF66B2;
            /* Lighter neon pink */
        }

        /* Dark Mode */
        .dark-mode .chatroom {
            background-color: #232122;
        }

        .dark-mode .chatroom-header {
            background-color: #C13A7F;
            color: #232122;
        }

        .dark-mode .chatroom-messages {
            background-color: #232122;
        }

        .dark-mode input[type="text"],
        .dark-mode input[type="number"] {
            background-color: #C13A7F;
            color: #232122;
        }

        .dark-mode button {
            background-color: #C13A7F;
            color: #232122;
        }
    </style>
</head>

<body>
    <div class="chatroom">
        <div class="chatroom-header">
            <h1>Chatroom</h1>
            <div class="filter-section">
                <label for="filter-content">Filter by Content:</label>
                <br>
                <input type="text" id="filter-content" placeholder="Enter text...">
                <button onclick="applyFilter()">Apply Filter</button>
                <input type="number" id="length-filter" placeholder="Enter exact message length">
                <button onclick="filterByExactLength()">Filter by Exact Length</button>
                <button onclick="sortByAlphabeticalOrder()">Sort Alphabetically</button>
                <label for="time-filter">Filter by Time:</label>
                <input type="text" id="time-filter" placeholder="HH:MM AM or PM">
                <button onclick="filterByTime()">Filter by Time</button>
                <button onclick="resetFilter()">Reset Filter</button>
                <button onclick="countMessagesByLength()">Count Messages by Exact Length</button>
                <span id="count-result"></span>
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
        const chatBox = document.getElementById("chatroom-messages");
        const messageInput = document.getElementById("message");
        const backendUrl = "http://127.0.0.1:8089";
        let currentMessageId = null;
        let messagesData = [];
        let sortAlphabetically = false;

        function toggleMode() {
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

        function sendMessage() {
            const message = messageInput.value.trim();
            if (message !== '') {
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
                        displayChat();
                        messageInput.value = '';
                        currentMessageId = null;
                    })
                    .catch(error => {
                        console.error("API error:", error);
                    });
            }
        }

        function displayChat() {
            fetch(`${backendUrl}/api/chat/read`, {
                    method: "GET",
                })
                .then(response => response.json())
                .then(data => {
                    messagesData = data;
                    applyFilter();  // Apply filter first
                    if (sortAlphabetically) {
                        sortMessagesAlphabetically();  // Apply sorting if needed
                    } else {
                        renderMessages(messagesData);  // Render messages without sorting
                    }
                })
                .catch(error => console.error("Failed to retrieve chat messages:", error));
        }

        function renderMessages(messages) {
            chatBox.innerHTML = "";
            messages.forEach(item => {
                const messageElement = document.createElement("div");
                const formattedTimestamp = new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
                messageElement.textContent = `[${formattedTimestamp}] User ${item.user_id}: ${item.message}`;
                messageElement.id = `message-${item.id}`;
                messageElement.onclick = () => editMessage(item.id, item.message);
                chatBox.appendChild(messageElement);
            });
        }

        function editMessage(messageId, message) {
            messageInput.value = message;
            currentMessageId = messageId;
        }

        function handleKeyPress(event) {
            if (event.key === 'Enter') {
                sendMessage();
            }
        }

        function applyFilter() {
            const filterContent = document.getElementById("filter-content").value.toLowerCase();
            const filteredMessages = messagesData.filter(item =>
                item.message.toLowerCase().includes(filterContent)
            );
            renderMessages(filteredMessages);
        }

        function filterByExactLength() {
            const lengthFilter = document.getElementById("length-filter").value;
            const filteredMessages = messagesData.filter(item =>
                item.message.length == lengthFilter
            );
            renderMessages(filteredMessages);
        }

        function filterByTime() {
            const timeFilter = document.getElementById("time-filter").value.toLowerCase();
            const filteredMessages = messagesData.filter(item =>
                new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase().includes(timeFilter)
            );
            renderMessages(filteredMessages);
        }

        function sortMessagesAlphabetically() {
            const sortedMessages = [...messagesData].sort((a, b) =>
                a.message.localeCompare(b.message)
            );
            renderMessages(sortedMessages);
        }

        function resetFilter() {
            document.getElementById("filter-content").value = '';
            document.getElementById("time-filter").value = '';
            document.getElementById("length-filter").value = '';
            sortAlphabetically = false;  // Reset sort state to false
            displayChat();  // Fetches and displays all messages again
        }

        function sortByAlphabeticalOrder() {
            sortAlphabetically = true;
            sortMessagesAlphabetically();
        }

        function countMessagesByLength() {
            const lengthFilter = document.getElementById("length-filter").value;
            const count = messagesData.filter(item =>
                item.message.length == lengthFilter
            ).length;
            document.getElementById("count-result").textContent = `Count: ${count}`;
        }

        // Initial chat display
        displayChat();
    </script>
</body>

</html>
