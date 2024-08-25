import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FlightSearch() {
    const [departureCity, setDepartureCity] = useState('');
    const [destinationCity, setDestinationCity] = useState('');
    const [date, setDate] = useState('');
    const [flights, setFlights] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:5000/api/flights/search', 
        { departureCity, destinationCity, date },
        { headers: { Authorization: token } });
        setFlights(response.data.flights);
    };

    const handleBook = (flightId) => {
        navigate(`/book/${flightId}`);
    };

    return (
        <div className="container">
            <h2>Search Flights</h2>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label>Departure City</label>
                    <input type="text" className="form-control" value={departureCity} onChange={(e) => setDepartureCity(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Destination City</label>
                    <input type="text" className="form-control" value={destinationCity} onChange={(e) => setDestinationCity(e.target.value)} required />
                </div>
                <div className="form-group">
                    <label>Date</label>
                    <input type="date" className="form-control" value={date} onChange={(e) => setDate(e.target.value)} required />
                </div>
                <button type="submit" className="btn btn-primary">Search</button>
            </form>

            {flights.length > 0 && (
                <div className="mt-4">
                    <h3>Available Flights</h3>
                    <ul className="list-group">
                        {flights.map((flight, index) => (
                            <li key={index} className="list-group-item">
                                <h5>Flight: {flight.flightNumber}</h5>
                                <p>From: {flight.departureCity} - To: {flight.destinationCity}</p>
                                <p>Date: {flight.date} - Time: {flight.time}</p>
                                <button onClick={() => handleBook(flight._id)} className="btn btn-success">
                                    Book Now
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}
export default FlightSearch;
