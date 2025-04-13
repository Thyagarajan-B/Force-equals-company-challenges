const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// getting the routes from routes folder
const authRoutes = require('./routes/auth');
const accountRoutes = require('./routes/accounts');

// routes
app.use('/login', authRoutes);
app.use('/accounts', accountRoutes);

// port from .env file
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
