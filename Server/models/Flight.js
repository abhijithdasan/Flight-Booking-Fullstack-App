const mongoose = require('mongoose');

const FlightSchema = new mongoose.Schema({
    flightNumber: { type: String, required: true },
    departureCity: { type: String, required: true },
    destinationCity: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    availableSeats: { type: Number, required: true },
});

const Flight = mongoose.model('Flight', FlightSchema);
module.exports = Flight;
