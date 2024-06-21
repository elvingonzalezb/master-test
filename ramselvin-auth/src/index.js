const express = require('express');
const bodyParser = require('body-parser');
const connectToDatabase = require('./authentication/infrastructure/persistence/mongooseConnection');
const authRoutes = require('./authentication/routes/authRoutes');
const corsConfig = require('./authentication/infrastructure/config/corsConfig');
const cors = require('cors');

const app = express();
app.use(express.json());

// Middlewares
app.use(cors(corsConfig));
app.use(bodyParser.json());

connectToDatabase();

app.use('/auth', authRoutes);

const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
