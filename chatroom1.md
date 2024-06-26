---
permalink: /chat
---



<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Diary</title>
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
        .Diary {
            width: 600px;
            height: 600px;
            background-color: #232122;
            border-radius: 8px;
            box-shadow: 0 0 20px rgba(255, 0, 153, 0.75);
            /* Vibrant pink glowing border */
            overflow: hidden;
        }
        .Diary-header {
            background-color: #C13A7F;
            color: #FFF;
            text-align: center;
            padding: 10px;
            border-bottom: 1px solid #C13A7F;
        }
        .Diary-messages {
            max-height: 410px;
            min-height: 305px;
            padding: 8px;
            overflow-y: auto;
            background-color: #232122;
        }
        .Diary-messages div {
            background-color: #C13A7F;
            border-radius: 5px;
            margin: 5px 0;
            padding: 5px;
            word-wrap: break-word;
            cursor: pointer;
        }
        .Diary-input,
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
        .dark-mode .Diary {
            background-color: #232122;
        }
        .dark-mode .Diary-header {
            background-color: #C13A7F;
            color: #232122;
        }
        .dark-mode .Diary-messages {
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
    <div class="Diary">
        <div class="Diary-header">
            <h1>Diary</h1>
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
        <div class="Diary-messages" id="Diary-messages">
        </div>
        <div class="Diary-input">
            <input type="text" id="message" placeholder="Type your message here..." onkeypress="handleKeyPress(event)">
            <button id="send" onclick="sendMessage()">Send</button>
            <button id="toggleModeButton" onclick="toggleMode()">Toggle Mode</button>
        </div>
    </div>
    <script>
        const chatBox = document.getElementById("Diary-messages");
        const messageInput = document.getElementById("message");
        const backendUrl = "http://127.0.0.1:8089";
        let currentMessageId = null;
        let messagesData = [];
        let sortAlphabetically = false;
        function toggleMode() {
            const body = document.body;
            const Diary = document.querySelector('.Diary');
            const DiaryHeader = document.querySelector('.Diary-header');
            const DiaryMessages = document.querySelector('.Diary-messages');
            const input = document.querySelector('input[type="text"]');
            const button1 = document.getElementById('send');
            const toggleButton = document.getElementById('toggleModeButton');
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                Diary.style.backgroundColor = '#FFC8C5';
                DiaryHeader.style.backgroundColor = '#C13A7F';
                DiaryHeader.style.color = '#000';
                DiaryMessages.style.backgroundColor = '#FFC8C5';
                input.style.backgroundColor = '#C13A7F';
                input.style.color = '#000';
                button1.style.backgroundColor = '#C13A7F';
                button1.style.color = '#FFC8C5';
                toggleButton.style.backgroundColor = '#C13A7F';
                toggleButton.style.color = '#FFC8C5';
                toggleButton.textContent = 'Dark Mode';
            } else {
                body.classList.add('dark-mode');
                Diary.style.backgroundColor = '#232122';
                DiaryHeader.style.backgroundColor = '#C13A7F';
                DiaryHeader.style.color = '#232122';
                DiaryMessages.style.backgroundColor = '#232122';
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
            // Retrieve the value from the input element with the id "filter-content" and convert it to lowercase.
            const filterContent = document.getElementById("filter-content").value.toLowerCase();
            // Initialize an empty array to hold the filtered messages.
            const filteredMessages = [];
            // Loop through each message in the messagesData array.
            for (let i = 0; i < messagesData.length; i++) {
                // Get the current message from the messagesData array.
                const message = messagesData[i];
                // Convert the message text to lowercase and check if it includes the filterContent.
                if (message.message.toLowerCase().includes(filterContent)) {
                    // If the message includes the filterContent, add it to the filteredMessages array.
                    filteredMessages.push(message);
                }
            }
            // Call the renderMessages function to display the filtered messages.
            renderMessages(filteredMessages);
        }
        function filterByExactLength() {
            const lengthFilter = document.getElementById("length-filter").value;
            const filteredMessages = [];
            for (let i = 0; i < messagesData.length; i++) {
                const message = messagesData[i];
                if (message.message.length == lengthFilter) {
                    filteredMessages.push(message);
                }
            }
            renderMessages(filteredMessages);
        }
        function filterByTime() {
            const timeFilter = document.getElementById("time-filter").value.toLowerCase();
            const filteredMessages = [];
            for (let i = 0; i < messagesData.length; i++) {
                const message = messagesData[i];
            const messageTime = new Date(message.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }).toLowerCase();
            if (messageTime.includes(timeFilter)) {
                filteredMessages.push(message);
                }
            }
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
        function sortMessagesAlphabetically() {
            fetch(`${backendUrl}/api/chat/sort/alphabetical`)
                .then(response => response.json())
                .then(data => renderMessages(data))
                .catch(error => console.error("Failed to sort alphabetically:", error));
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
