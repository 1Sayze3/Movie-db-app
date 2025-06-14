export default function AboutUs() {
  return (
    <div className="bg-gray-950 min-h-screen">
      <div className="max-w-3xl mx-auto p-6 text-white">
        <h1 className="text-3xl font-bold mb-4">About MovieDB</h1>
        <p className="mb-4">
          MovieDB is a lightweight React web app built using the TMDb API to showcase popular movies, their trailers, and cast info.
        </p>
        <p className="mb-4">
          The project was created to practice React.
        </p>
        <p>
          Data is sourced from{' '}
          <a
            href="https://www.themoviedb.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-400 underline hover:text-blue-300"
          >
            TMDb
          </a>
          .
        </p>
      </div>
    </div>
  );
}
