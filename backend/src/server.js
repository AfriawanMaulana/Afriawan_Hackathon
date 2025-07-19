const express = require('express');
const cors = require('cors');
const authRoute = require('./routes/authRoute');
const qrRoute = require('./routes/qrRoute')
const absensiRoute = require('./routes/absensiRoute');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api', authRoute, qrRoute, absensiRoute);

app.listen(3000, () => {
    console.log('Server running on port 3000')
})