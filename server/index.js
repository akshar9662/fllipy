

/* mkdir server
cd server
npm init -y
npm install express mongoose cors

cd server
node index.js

*/
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("MongoDB connected"))
  .catch(err => console.error(err));

// Routes
app.use('/api/cart', require('./routes/cart'));

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
