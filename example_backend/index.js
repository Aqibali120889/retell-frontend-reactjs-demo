const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 8080;

// Middleware to parse JSON bodies
app.use(cors({
    origin: ['http://localhost:3000', 'https://localhost:3000', 'http://127.0.0.1:3000'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
}));

app.use(express.json());

app.post('/create-web-call', async (req, res) => {
    const { agent_id, metadata, retell_llm_dynamic_variables } = req.body;

    // Prepare the payload for the API request
    const payload = { agent_id };

    // Conditionally add optional fields if they are provided
    if (metadata) {
        payload.metadata = metadata;
    }

    if (retell_llm_dynamic_variables) {
        payload.retell_llm_dynamic_variables = retell_llm_dynamic_variables;
    }

    try {
        const response = await axios.post(
            'https://api.retellai.com/v2/create-web-call',
            payload,
            {
                headers: {
                    'Authorization': 'Bearer key_d85d0e5c9b89e5377b7407dc77e5', // Replace with your actual Bearer token
                    'Content-Type': 'application/json',
                },
            }
        );

        res.status(201).json(response.data);
    } catch (error) {
        console.error('Error creating web call:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to create web call' });
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
