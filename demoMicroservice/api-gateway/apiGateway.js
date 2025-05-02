const express = require('express');
const proxy = require('express-http-proxy');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// Services URLs (targets)
const customerServiceURL = process.env.CUSTOMER_SERVICE_URL || 'http://localhost:3002';
const bookServiceURL = process.env.BOOK_SERVICE_URL || 'http://localhost:3001';
const orderServiceURL = process.env.ORDER_SERVICE_URL || 'http://localhost:3003';

// Proxy Configuration
app.use('/v1/api/customer', proxy(customerServiceURL, {
  proxyReqPathResolver: (req) => `/v1/api/customer${req.url}`,
}));

app.use('/v1/api/book', proxy(bookServiceURL, {
  proxyReqPathResolver: (req) => `/v1/api/book${req.url}`,
}));

app.use('/v1/api/order', proxy(orderServiceURL, {
  proxyReqPathResolver: (req) => `/v1/api/order${req.url}`,
}));

app.get('/', (req, res) => {
  res.send('API Gateway is running!');
});

// Start the API Gateway server
app.listen(port, () => {
  console.log(`API Gateway is listening on http://localhost:${port}`);
});