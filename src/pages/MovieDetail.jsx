import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../api';

export default function MovieDetail() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    fetchMovieDetails(id).then(res => setMovie(res.data));
  }, [id]);

  if (!movie) return <div className="p-4 text-white">Loading...</div>;

  const trailer = movie.videos?.results?.find(
    v => v.type === 'Trailer' && v.site === 'YouTube'
  );

  const topCast = movie.credits?.cast?.slice(0, 5);

  return (
    <div className="p-4 max-w-4xl mx-auto text-white">
      <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
        <img
          src={movie.poster_path 
            ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` 
            : 'https://placehold.co/500x750?text=No+Image+Available'}
          alt={movie.title}
          className="w-full max-w-md rounded mx-auto"
        />

        <h1 className="text-3xl font-bold mt-4 text-center">{movie.title}</h1>
        <p className="text-gray-400 text-center mb-4">⭐ {movie.vote_average}</p>
        <p className="mb-6 text-justify">{movie.overview}</p>

        <div className="space-y-2">
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Runtime:</strong> {movie.runtime} mins</p>
          <p><strong>Genres:</strong> {movie.genres.map(g => g.name).join(', ')}</p>
          <p><strong>Budget:</strong> ${movie.budget.toLocaleString()}</p>
        </div>

        {topCast?.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Top Cast:</h2>
            <ul className="list-disc list-inside">
              {topCast.map(actor => (
                <li key={actor.cast_id}>
                  {actor.name} as {actor.character}
                </li>
              ))}
            </ul>
          </div>
        )}

        {trailer && (
          <div className="mt-6 text-center">
            <a
              href={`https://www.youtube.com/watch?v=${trailer.key}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-red-600 px-4 py-2 rounded text-white hover:bg-red-700 inline-block"
            >
              ▶ Watch Trailer
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
