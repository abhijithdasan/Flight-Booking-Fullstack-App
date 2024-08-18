import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import FlightSearch from './components/FlightSearch';
import BookingForm from './components/BookingForm';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/search" element={<FlightSearch />} />
                <Route path="/book/:flightId" element={<BookingForm />} />
            </Routes>
        </Router>
    );
}

export default App;
