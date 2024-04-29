---
permalink: /mpg
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>MPG Prediction</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-image: url('{{site.baseurl}}/images/logincar.gif'); /* GIF background */
            background-size: cover; /* Cover the entire page */
            background-position: center; /* Center the background image */
            background-repeat: no-repeat; /* Do not repeat the image */
            color: #FFFFFF; /* Set text color to white for better readability */
            margin: 0;
            padding: 20px;
        }
        h1 {
            color: #FF0099; /* Vibrant Pink */
            text-shadow: 2px 2px 4px #000000;
        }
        form {
            background: rgba(0, 0, 0, 0.8); /* Dark semi-transparent background */
            padding: 20px;
            border-radius: 8px;
            border: 1px solid #FF0099; /* Neon pink border */
            box-shadow: 0 0 20px rgba(255, 0, 153, 0.75);
        }
        label {
            margin-top: 10px;
            display: inline-block;
            color: #CCCCCC; /* Light grey for readability */
            font-size: 16px;
        }
        input, select {
            margin-bottom: 10px;
            border: 1px solid #DDDDDD;
            border-radius: 4px;
            padding: 8px;
            width: calc(100% - 22px);
            background: #333333; /* Dark backgrounds for inputs */
            color: #FFFFFF; /* White text for inputs */
            box-shadow: inset 0 0 5px rgba(255, 0, 153, 0.5);
        }
        button {
            background-color: #FF0099; /* Neon pink */
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(255, 0, 153, 0.75);
            transition: background 0.3s ease-in-out;
        }
        button:hover {
            background-color: #FF66B2; /* Lighter neon pink */
        }
        #result, .legend {
            background: rgba(0, 0, 0, 0.85); /* Dark background */
            color: #CCCCCC; /* Light grey text */
            padding: 20px;
            border-radius: 8px;
            margin-top: 20px;
            box-shadow: 0 0 10px rgba(255, 0, 153, 0.75);
        }
        .legend h2 {
            color: #FF0099; /* Neon pink */
        }
        .legend p {
            font-size: 14px;
            line-height: 1.6;
        }
        .info-icon {
            margin-left: 5px;
            cursor: pointer;
            font-size: 18px;
            color: #FF0099; /* Neon pink */
        }
        .info-icon:hover {
            color: #FF66B2; /* Lighter pink */
        }
    </style>
</head>
<body>
    <h1>MPG Predictor</h1>
    <form onsubmit="event.preventDefault(); predictMPG();">
        <label for="cylinders">Cylinders:</label>
        <span class="info-icon" title="Suggested range: 4 - 8">&#9432;</span>
        <input type="number" id="cylinders" required>

        <label for="displacement">Displacement:</label>
        <span class="info-icon" title="Suggested range: 70 - 430">&#9432;</span>
        <input type="number" id="displacement" required>
        
        <label for="horsepower">Horsepower:</label>
        <span class="info-icon" title="Suggested range: 40 - 240">&#9432;</span>
        <input type="number" id="horsepower" required>

        <label for="weight">Weight:</label>
        <span class="info-icon" title="Suggested range: 1600 - 4800">&#9432;</span>
        <input type="number" id="weight" required>    

        <label for="acceleration">Acceleration:</label>
        <span class="info-icon" title="Suggested range: 8 - 22">&#9432;</span>
        <input type="number" id="acceleration" required>

        <label for="model_year">Model Year:</label>
        <span class="info-icon" title="Suggested range: 70 - 82">&#9432;</span>
        <input type="number" id="model_year" required><br>

        <label for="origin">Origin:</label>
        <select id="origin" required>
            <option value="1">USA</option>
            <option value="2">Europe</option>
            <option value="3">Japan</option>
        </select><br>
        <button type="submit">Predict MPG</button>
    </form>
    <div id="result"></div>
    <div class="legend">
        <h2>Parameter Legend</h2>
        <p><strong>Cylinders:</strong> Number of engine cylinders. More cylinders usually mean more power but less fuel efficiency.</p>
        <p><strong>Displacement:</strong> Engine displacement in cubic centimeters. Larger engines can produce more power.</p>
        <p><strong>Horsepower:</strong> Engine power output in horsepower. Higher horsepower indicates a more powerful engine.</p>
        <p><strong>Weight:</strong> Vehicle weight in pounds. Heavier vehicles generally consume more fuel.</p>
        <p><strong>Acceleration:</strong> Time in seconds to accelerate from 0 to 60 mph. Indicates vehicle's ability to gain speed.</p>
        <p><strong>Model Year:</strong> The year the vehicle model was released. Newer models may have better fuel efficiency.</p>
        <p><strong>Origin:</strong> The country where the vehicle was manufactured. This can influence the design and fuel efficiency.</p>
    </div>
    <script>
     async function predictMPG() {
        const data = {
            cylinders: parseInt(document.getElementById('cylinders').value),
            displacement: parseFloat(document.getElementById('displacement').value),
            horsepower: parseFloat(document.getElementById('horsepower').value),
            weight: parseFloat(document.getElementById('weight').value),
            acceleration: parseFloat(document.getElementById('acceleration').value),
            model_year: parseInt(document.getElementById('model_year').value),
            origin: document.getElementById('origin').value
        };

        try {
            const response = await fetch('http://127.0.0.1:8089/api/mpg/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();
if (response.ok) {
    const prediction = parseFloat(result.prediction); // Ensure it is a number
    if (!isNaN(prediction)) { // Check if it is a valid number
        document.getElementById('result').textContent = 'Predicted MPG: ' + prediction.toFixed(1);
    } else {
        document.getElementById('result').textContent = 'Error: Prediction value is not a number';
    }
} else {
    document.getElementById('result').textContent = 'Error: ' + result.error;
}

        } catch (error) {
            console.error('Error:', error);
            document.getElementById('result').textContent = 'Failed to fetch prediction';
        }
    }
    </script>
</body>
</html>
