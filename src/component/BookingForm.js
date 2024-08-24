import React, { useState, useEffect } from 'react';
import { fetchMentors, createBooking } from './api';

const BookingForm = () => {
    const [name, setName] = useState('');
    const [mentors, setMentors] = useState([]);
    const [selectedMentor, setSelectedMentor] = useState('');
    const [availability, setAvailability] = useState('');
    const [areaOfInterest, setAreaOfInterest] = useState('');

    useEffect(() => {
        if (areaOfInterest) {
            const fetchMentorData = async () => {
                try {
                    const response = await fetchMentors(areaOfInterest);
                    setMentors(response.data);
                    setSelectedMentor(''); 
                    setAvailability('');
                } catch (error) {
                    console.error("Error fetching mentors", error);
                }
            };
            fetchMentorData();
        } else {
            setMentors([]);
            setSelectedMentor('');
            setAvailability('');
        }
    }, [areaOfInterest]);

    const handleMentorChange = (e) => {
        const selectedMentorName = e.target.value;
        setSelectedMentor(selectedMentorName);

        const mentor = mentors.find(m => m.name === selectedMentorName);
        if (mentor && mentor.availability) {
            setAvailability('');
        } else {
            setAvailability('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await createBooking({
                name,
                availability,
                area_of_interest: areaOfInterest,
            });
            alert("Successfully booked a mentor");
        } catch (error) {
            console.error("Error submitting booking", error);
        }
    };

    return (
        <div>
        <form onSubmit={handleSubmit}>
        <img src='https://media.licdn.com/dms/image/D4D0BAQEIHtBquI5VHQ/company-logo_200_200/0/1683185709570/careercarve_logo?e=2147483647&v=beta&t=vHna3Gm9T61ur8ELu2iQ8MlkcxAYGj4qVfJxKiKbOdM' alt='logo' width={"50px"}/>

            <h1>Book a Session with a Mentor</h1>
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <select
                value={areaOfInterest}
                onChange={(e) => setAreaOfInterest(e.target.value)}
            >
                <option value="">Select Area of Interest</option>
                <option value="Strategic Sales Management">Strategic Sales Management</option>
                <option value="Digital Transformation & Innovation">Digital Transformation & Innovation</option>
                <option value="Financial Analysis & Investment Strategy">Financial Analysis & Investment Strategy</option>
                <option value="E-Commerce & Online Retail Optimization">E-Commerce & Online Retail Optimization</option>
                <option value="Supply Chain & Operations Excellence">Supply Chain & Operations Excellence</option>
            </select>
            {mentors.length > 0 && (
                <select
                    value={selectedMentor}
                    onChange={handleMentorChange}
                >
                    <option value="">Select Mentor</option>
                    {mentors.map((mentor) => (
                        <option key={mentor.name} value={mentor.name}>
                            {mentor.name}
                        </option>
                    ))}
                </select>
            )}
            {selectedMentor && (
                <select
                    value={availability}
                    onChange={(e) => setAvailability(e.target.value)}
                >
                    <option value="">Select Availability</option>
                    {mentors.find(m => m.name === selectedMentor) &&
                        Object.keys(mentors.find(m => m.name === selectedMentor).availability).map((day) => (
                            mentors.find(m => m.name === selectedMentor).availability[day].map((timeSlot, idx) => (
                                <option key={`${day}-${idx}`} value={`${day} ${timeSlot}`}>
                                    {`${day} ${timeSlot}`}
                                </option>
                            ))
                        ))
                    }
                </select>
            )}
            <button type="submit" disabled={!availability}>Book Session</button>
        </form>
        </div>
    );
};

export default BookingForm;
