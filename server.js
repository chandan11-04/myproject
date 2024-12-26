const express = require('express');
const path = require('path');
const fs = require('fs');
const app = express();
const port = 3000;

// Dataset path
const datasetPath = path.join(__dirname, 'merged_datasets.json');

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files (frontend) from the "public" directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint to handle queries
app.post('/query', (req, res) => {
  const query = req.body.query;

  if (!query) {
    return res.status(400).json({ error: 'Query is required' });
  }

  // Read and filter the dataset based on the query
  fs.readFile(datasetPath, 'utf-8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Failed to read dataset' });
    }

    try {
      const dataset = JSON.parse(data);
      
      // Check if dataset has the content field
      const results = dataset.filter(item => item.content && item.content.toLowerCase().includes(query.toLowerCase()));

      if (results.length === 0) {
        return res.status(404).json({ message: 'No results found' });
      }

      return res.json({
        success: true,
        data: results
      });

    } catch (error) {
      return res.status(500).json({ error: 'Error parsing dataset' });
    }
  });
});

// Default route to serve index.html (frontend)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
