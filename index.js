const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());


const port = 8000;

// Helper function to extract numbers, alphabets, and the highest lowercase alphabet
function processInputString(inputString) {
    // Step 1: Replace curly quotes and parse the string into a JavaScript array
    const cleanedString = inputString.replace(/[“”]/g, '"');
    const data = JSON.parse(cleanedString);

    // Step 2: Initialize arrays for numbers and alphabets and a variable for the highest lowercase alphabet
    const numbers = [];
    const alphabets = [];
    let highestLowercase = '';

    // Step 3: Iterate over the array and process each element
    data.forEach(item => {
        if (!isNaN(item)) {
            numbers.push(item);
        } else if (typeof item === 'string' && item.length === 1) {
            alphabets.push(item);
            if (item === item.toLowerCase() && (!highestLowercase || item > highestLowercase)) {
                highestLowercase = item;
            }
        }
    });

    // Step 4: Return the processed arrays and highest lowercase alphabet
    return {
        numbers,
        alphabets,
        highestLowercase: highestLowercase ? highestLowercase : null
    };
}


// POST /bfhl
app.post('/bfhl', (req, res) => {
    const { data } = req.body;

    // if (!Array.isArray(data)) {
    //     return res.status(400).json({ is_success: false, message: "Invalid input" });
    // }

    const processedData = processInputString(data);

    const response = {
        is_success: true,
        user_id: "john_doe_17091999", // Replace with your actual user_id logic
        email: "john@xyz.com", // Replace with the actual email
        roll_number: "ABCD123", // Replace with the actual roll number
        numbers: processedData.numbers,
        alphabets: processedData.alphabets,
        highest_lowercase_alphabet: processedData.highestLowercase
    };

    res.json(response);
});

// GET /bfhl
app.get('/bfhl', (req, res) => {
    res.json({
        operation_code: 1
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
