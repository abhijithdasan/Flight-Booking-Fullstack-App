const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    flightId: { type: mongoose.Schema.Types.ObjectId, ref: 'Flight', required: true },
    passengers: { type: Number, required: true },
    bookingDate: { type: Date, default: Date.now },
});

const Booking = mongoose.model('Booking', BookingSchema);
module.exports = Booking;
