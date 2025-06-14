import axios from 'axios';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchPopularMovies = (page = 1) =>
  axios.get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${page}`);

export const fetchMovieDetails = (id) =>
  axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&append_to_response=videos,credits`);

export const searchMovies = (query, page = 1) =>
  axios.get(`${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`);

export const fetchGenres = () =>
  axios.get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}`);

export const fetchMoviesByGenre = (genreId, page = 1) =>
  axios.get(`${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}&page=${page}`);