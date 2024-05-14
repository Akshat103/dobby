const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
dotenv.config();
const { connectDB } = require('./config/dbConfig');
const cors = require('cors');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Connect to MongoDB
connectDB();

// Import Router
const authRouter = require("./routes/authRoutes");
const folderRouter = require("./routes/folderRoutes");
const imageRouter = require("./routes/imageRoutes");

// Routes
app.use("/api/auth", authRouter);
app.use("/api/folder", folderRouter);
app.use("/api/image", imageRouter);

// Serve static files from the React build directory
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// Send the index.html file for any other requests
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});

// Start the server
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
