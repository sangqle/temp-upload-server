const express = require('express');
const path = require('path');

const app = express();
const port = 8080;

app.use(express.json()); // Add JSON body parsing middleware

// Define the upload route
app.post('/api/upload', (req, res) => {
    const { uuid } = req.query;
    const { base64Data } = req.body;

    if (!uuid || !base64Data) {
        return res.status(400).json({ error: 'Missing UUID or base64Data.' });
    }

    // Convert base64 data to a Buffer
    const buffer = Buffer.from(base64Data, 'base64');

    const filePath = `./public/temp/photo/${uuid}.png`; // Adjust the file path as needed
    require('fs').writeFile(filePath, buffer, (err) => {
        if (err) {
            console.error(err);
            return res.status(500).json({ error: 'Error saving the file.' });
        }

        const imageUrl = `/temp/photo/${uuid}.png`; // Adjust the URL format as needed
        res.json({ url: imageUrl });
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});