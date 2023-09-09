// backend/index.js
const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
// app.use(async(req, res, next) => {
//   res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000'); // Replace with your React app's origin
//   res.setHeader('Access-Control-Allow-Credentials', 'true');
//   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//   next();
// });
app.use(express.json());

// Your API endpoints will go here

app.use(require('./router/routers'))

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
