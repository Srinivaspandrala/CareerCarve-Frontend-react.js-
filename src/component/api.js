import axios from 'axios';


// Mentor API
export const getMentors = () => {
    return axios.get(`${API_URL}/mentors`);
};

export const getMentorsByExpertise = (areas_of_expertise) => {
    return axios.get(`${API_URL}/mentor`, {
        params: { areas_of_expertise }
    });
};
export const fetchMentors = (areaOfInterest) => {
    return axios.get(`${API_URL}/mentors`, {
        params: { areas_of_expertise: areaOfInterest }
    });
};

export const createBooking = (bookingData) => {
    return axios.post(`${API_URL}/booking`, bookingData);
};

export const fetchBookings = (filters) => {
    return axios.get(`${API_URL}/booking`, {
        params: filters
    });
};