require('dotenv').config();
const express     = require('express');
const userRoutes  = require('./routes/users');

const app = express();
app.use(express.json());
app.use('/users', userRoutes);
app.get('/', (_req, res) => res.send('API is up'));

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => console.log(`Server listening on http://localhost:${PORT}`));
