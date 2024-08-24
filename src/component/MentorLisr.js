import React, { useState, useEffect } from 'react';
import { getMentors } from './api';

const MentorList = () => {
    const [mentors, setMentors] = useState([]);

    // Fetch all mentors from the backend
    useEffect(() => {
        const fetchMentors = async () => {
            try {
                const response = await getMentors();
                setMentors(response.data);
            } catch (error) {
                console.error("Error fetching mentors", error);
            }
        };

        fetchMentors();
    }, []);

    return (
        <div className="mentor-list">
            <h1>Mentor List</h1>
            {mentors.length > 0 ? (
                <ul>
                    {mentors.map(mentor => (
                        <li key={mentor.id}>
                            <h3>{mentor.name}</h3>
                            <p>Expertise: {mentor.areas_of_expertise}</p>
                            <p>Availability:</p>
                            <ul>
                                {Object.entries(mentor.availability).map(([day, times]) => (
                                    <li key={day}>
                                        {day}: {times.join(', ')}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No mentors available.</p>
            )}
        </div>
    );
};

export default MentorList;
