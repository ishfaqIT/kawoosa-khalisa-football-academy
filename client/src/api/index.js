import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

// Auth token interceptor
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('kkfa_token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// File Upload
export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append('image', file);
  const { data } = await API.post('/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  return data.url; // returns the accessible URL
};

// Players
export const fetchPlayers = () => API.get('/players');
export const fetchPlayerById = (id) => API.get(`/players/${id}`);
export const createPlayer = (data) => API.post('/players', data);
export const updatePlayer = (id, data) => API.put(`/players/${id}`, data);
export const deletePlayer = (id) => API.delete(`/players/${id}`);

// Coaches
export const fetchCoaches = () => API.get('/coaches');
export const createCoach = (data) => API.post('/coaches', data);
export const updateCoach = (id, data) => API.put(`/coaches/${id}`, data);
export const deleteCoach = (id) => API.delete(`/coaches/${id}`);

// News
export const fetchNews = () => API.get('/news');
export const createNews = (data) => API.post('/news', data);
export const updateNews = (id, data) => API.put(`/news/${id}`, data);
export const deleteNews = (id) => API.delete(`/news/${id}`);

// Events
export const fetchEvents = () => API.get('/events');
export const createEvent = (data) => API.post('/events', data);
export const updateEvent = (id, data) => API.put(`/events/${id}`, data);
export const deleteEvent = (id) => API.delete(`/events/${id}`);

// Fixtures
export const fetchFixtures = () => API.get('/fixtures');
export const createFixture = (data) => API.post('/fixtures', data);
export const updateFixture = (id, data) => API.put(`/fixtures/${id}`, data);
export const deleteFixture = (id) => API.delete(`/fixtures/${id}`);

// Gallery
export const fetchGallery = () => API.get('/gallery');
export const createGalleryItem = (data) => API.post('/gallery', data);
export const deleteGalleryItem = (id) => API.delete(`/gallery/${id}`);

// Registrations
export const fetchRegistrations = () => API.get('/register');
export const updateRegistration = (id, data) => API.put(`/register/${id}`, data);
export const deleteRegistration = (id) => API.delete(`/register/${id}`);

export default API;
