import { useMovies } from '../../hooks/useMovies';
import MovieRow from '../../components/features/MovieRow/MovieRow';
import './Movies.css';

export default function Movies() {
  const { movies: popular, loading: popularLoading } = useMovies('popular');
  const { movies: topRated, loading: topRatedLoading } = useMovies('topRated');
  const { movies: upcoming, loading: upcomingLoading } = useMovies('upcoming');
  const { movies: nowPlaying, loading: nowPlayingLoading } = useMovies('nowPlaying');

  return (
    <div className="movies-page">
      <div className="movies-header">
        <h1>Movies</h1>
        <p>Explore our collection of amazing movies</p>
      </div>

      <div className="movies-content">
        <MovieRow title="Now Playing" movies={nowPlaying} loading={nowPlayingLoading} />
        <MovieRow title="Popular Movies" movies={popular} loading={popularLoading} />
        <MovieRow title="Top Rated" movies={topRated} loading={topRatedLoading} />
        <MovieRow title="Coming Soon" movies={upcoming} loading={upcomingLoading} />
      </div>
    </div>
  );
}
