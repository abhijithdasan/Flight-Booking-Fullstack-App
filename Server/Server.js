const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Flight = require('./models/Flight');
const Booking = require('./models/Booking');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('your_mongodb_connection_string', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.post('/api/register', async (req, res) => {
    const { name, email, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ name, email, password: hashedPassword });
    await user.save();
    res.json({ status: 'ok' });
});

app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
        return res.json({ status: 'error', error: 'Invalid email or password' });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (isPasswordValid) {
        const token = jwt.sign({ id: user._id }, 'your_jwt_secret', { expiresIn: '1h' });
        return res.json({ status: 'ok', token });
    } else {
        return res.json({ status: 'error', error: 'Invalid email or password' });
    }
});

const authenticateToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.sendStatus(403);
    jwt.verify(token, 'your_jwt_secret', (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

app.post('/api/flights/search', authenticateToken, async (req, res) => {
    const { departureCity, destinationCity, date } = req.body;
    const flights = await Flight.find({ departureCity, destinationCity, date });
    res.json({ status: 'ok', flights });
});

app.post('/api/bookings', authenticateToken, async (req, res) => {
    const { flightId, passengers } = req.body;
    const booking = new Booking({ userId: req.user.id, flightId, passengers });
    await booking.save();
    res.json({ status: 'ok', booking });
});

app.get('/api/bookings/history', authenticateToken, async (req, res) => {
    const bookings = await Booking.find({ userId: req.user.id }).populate('flightId');
    res.json({ status: 'ok', bookings });
});

app.listen(5000, () => {
    console.log('Server started on port 5000');
});
