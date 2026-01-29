import { useState, useEffect } from 'react';
import { moviesApi } from '../../services/api/movies.api';
import { tvShowsApi } from '../../services/api/tvshows.api';
import type { Movie, TVShow } from '../../types';
import MovieCard from '../../components/features/MovieCard/MovieCard';
import TVShowCard from '../../components/features/TVShowCard/TVShowCard';
import Loader from '../../components/common/Loader/Loader';
import './Search.css';

export default function Search() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState<'all' | 'movies' | 'tv'>('all');
  const [movies, setMovies] = useState<Movie[]>([]);
  const [tvShows, setTVShows] = useState<TVShow[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setLoading(true);
    setHasSearched(true);

    try {
      const [movieResults, tvResults] = await Promise.all([
        moviesApi.search(searchQuery),
        tvShowsApi.search(searchQuery),
      ]);

      setMovies(movieResults.results);
      setTVShows(tvResults.results);
    } catch (error) {
      console.error('Search error:', error);
      setMovies([]);
      setTVShows([]);
    } finally {
      setLoading(false);
    }
  };

  const handleTagClick = (tag: string) => {
    setSearchQuery(tag);
  };

  // Auto-search when query changes (debounced)
  useEffect(() => {
    if (!searchQuery.trim() || !hasSearched) return;

    const timer = setTimeout(() => {
      const searchMoviesAndTV = async () => {
        setLoading(true);
        try {
          const [movieResults, tvResults] = await Promise.all([
            moviesApi.search(searchQuery),
            tvShowsApi.search(searchQuery),
          ]);
          setMovies(movieResults.results);
          setTVShows(tvResults.results);
        } catch (error) {
          console.error('Search error:', error);
          setMovies([]);
          setTVShows([]);
        } finally {
          setLoading(false);
        }
      };
      searchMoviesAndTV();
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, hasSearched]);

  const filteredMovies = activeTab === 'tv' ? [] : movies;
  const filteredTVShows = activeTab === 'movies' ? [] : tvShows;
  const totalResults = movies.length + tvShows.length;

  return (
    <div className="search-page">
      <div className="search-container">
        <h1>Search</h1>
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for movies, TV shows..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="search-input"
            autoFocus
          />
          <button type="submit" className="search-button">
            🔍 Search
          </button>
        </form>

        {hasSearched && (
          <div className="search-tabs">
            <button
              className={`tab ${activeTab === 'all' ? 'active' : ''}`}
              onClick={() => setActiveTab('all')}
            >
              All ({totalResults})
            </button>
            <button
              className={`tab ${activeTab === 'movies' ? 'active' : ''}`}
              onClick={() => setActiveTab('movies')}
            >
              Movies ({movies.length})
            </button>
            <button
              className={`tab ${activeTab === 'tv' ? 'active' : ''}`}
              onClick={() => setActiveTab('tv')}
            >
              TV Shows ({tvShows.length})
            </button>
          </div>
        )}

        <div className="search-results">
          {loading ? (
            <Loader />
          ) : hasSearched ? (
            totalResults > 0 ? (
              <>
                {filteredMovies.length > 0 && (
                  <div className="results-section">
                    <h2>Movies ({filteredMovies.length})</h2>
                    <div className="results-grid">
                      {filteredMovies.map((movie) => (
                        <MovieCard key={movie.id} movie={movie} />
                      ))}
                    </div>
                  </div>
                )}

                {filteredTVShows.length > 0 && (
                  <div className="results-section">
                    <h2>TV Shows ({filteredTVShows.length})</h2>
                    <div className="results-grid">
                      {filteredTVShows.map((show) => (
                        <TVShowCard key={show.id} tvShow={show} />
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="no-results">
                <div className="no-results-icon">🔍</div>
                <h2>No results found for "{searchQuery}"</h2>
                <p>Try searching for something else</p>
              </div>
            )
          ) : (
            <div className="search-suggestions">
              <h3>Popular Searches</h3>
              <div className="suggestion-tags">
                <span className="tag" onClick={() => handleTagClick('Action')}>Action</span>
                <span className="tag" onClick={() => handleTagClick('Comedy')}>Comedy</span>
                <span className="tag" onClick={() => handleTagClick('Drama')}>Drama</span>
                <span className="tag" onClick={() => handleTagClick('Thriller')}>Thriller</span>
                <span className="tag" onClick={() => handleTagClick('Sci-Fi')}>Sci-Fi</span>
                <span className="tag" onClick={() => handleTagClick('Romance')}>Romance</span>
                <span className="tag" onClick={() => handleTagClick('Horror')}>Horror</span>
                <span className="tag" onClick={() => handleTagClick('Animation')}>Animation</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
