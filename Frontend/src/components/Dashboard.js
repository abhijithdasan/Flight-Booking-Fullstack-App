import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBookings = async () => {
            const token = localStorage.getItem('token');
            const response = await axios.get('http://localhost:5000/api/bookings/history', {
                headers: { Authorization: token }
            });
            setBookings(response.data.bookings);
        };
        fetchBookings();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    return (
        <div className="container">
            <h2>Your Bookings</h2>
            <ul className="list-group">
                {bookings.map((booking, index) => (
                    <li key={index} className="list-group-item">
                        <h5>Flight: {booking.flightId.flightNumber}</h5>
                        <p>From: {booking.flightId.departureCity} - To: {booking.flightId.destinationCity}</p>
                        <p>Date: {booking.flightId.date} - Time: {booking.flightId.time}</p>
                        <p>Passengers: {booking.passengers}</p>
                    </li>
                ))}
            </ul>
            <button onClick={handleLogout} className="btn btn-danger mt-3">Logout</button>
        </div>
    );
}

export default Dashboard;
