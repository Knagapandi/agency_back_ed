import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import agencyRoutes from './backend/routes/agencyRoutes.js';

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Replace with your own MongoDB connection string
const MONGODB_URI = 'mongodb+srv://Ayuship:9jQOXvCzbH8hq7nI@cluster0.pvgxw4g.mongodb.net/test';

mongoose.connect(MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch((err) => console.log('MongoDB connection error:', err));

app.use('/api/agencies', agencyRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
