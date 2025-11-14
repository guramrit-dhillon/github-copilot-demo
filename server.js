const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Health check route
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// Math add route
app.get('/math/add', (req, res) => {
  const a = parseFloat(req.query.a);
  const b = parseFloat(req.query.b);
  
  if (isNaN(a) || isNaN(b)) {
    return res.status(400).json({ error: 'Invalid parameters. Please provide numeric values for a and b.' });
  }
  
  const sum = a + b;
  res.json({ result: sum });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = app;
