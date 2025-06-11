import { useEffect, useState } from 'react';
import { fetchPopularMovies, searchMovies, fetchGenres, fetchMoviesByGenre } from '../api';
import { Link } from 'react-router-dom';

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [genres, setGenres] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchGenres().then(res => setGenres(res.data.genres));
  }, []);

  useEffect(() => {
    setLoading(true);

    let fetchFn;

    if (query) {
      // Always use search if there's a query
      fetchFn = () => searchMovies(query, page);
    } else if (selectedGenre) {
      // Use genre fetch if there's no query
      fetchFn = () => fetchMoviesByGenre(selectedGenre, page);
    } else {
      fetchFn = () => fetchPopularMovies(page);
    }

    fetchFn()
      .then(res => {
        let results = res.data.results;

        // If both query and genre are set, manually filter
        if (query && selectedGenre) {
          results = results.filter(m =>
            m.genre_ids.includes(Number(selectedGenre))
          );
        }

        setMovies(prev =>
          page > 1 ? [...prev, ...results] : results
        );
      })
      .finally(() => setLoading(false));
  }, [page, query, selectedGenre]);

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search movies..."
          className="border p-2 flex-1"
          value={query}
          onChange={(e) => {
            setPage(1);
            setQuery(e.target.value);
          }}
        />
        <select
          className="border p-2"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map(genre => (
            <option key={genre.id} value={genre.id}>{genre.name}</option>
          ))}
        </select>
      </div>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {movies.map(movie => (
          <Link
            to={`/movie/${movie.id}`}
            key={movie.id}
            className="bg-gray-800 text-white rounded-lg overflow-hidden shadow-md hover:scale-105 transition transform"
          >
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-full h-72 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-bold">{movie.title}</h3>
              <p className="text-sm">⭐ {movie.vote_average}</p>
            </div>
          </Link>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        {!loading && (
          <button
            onClick={() => setPage(prev => prev + 1)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Load More
          </button>
        )}
      </div>
    </div>
  );
}