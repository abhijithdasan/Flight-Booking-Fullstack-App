import React, { useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function BookingForm() {
    const [passengers, setPassengers] = useState(1);
    const { flightId } = useParams();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:5000/api/bookings', 
        { flightId, passengers },
        { headers: { Authorization: token } });
        if (response.data.status === 'ok') {
            navigate('/dashboard');
        } else {
            alert('Booking failed');
        }
    };

    return (
        <div className="container">
            <h2>Book Flight</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Number of Passengers</label>
                    <input type="number" className="form-control" value={passengers} onChange={(e) => setPassengers(e.target.value)} required min="1" />
                </div>
                <button type="submit" className="btn btn-primary">Confirm Booking</button>
            </form>
        </div>
    );
}

export default BookingForm;