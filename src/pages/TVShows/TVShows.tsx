import { useTVShows } from '../../hooks/useTVShows';
import TVShowCard from '../../components/features/TVShowCard/TVShowCard';
import Loader from '../../components/common/Loader/Loader';
import './TVShows.css';

export default function TVShows() {
  const { tvShows: trending, loading: trendingLoading } = useTVShows('trending');
  const { tvShows: popular, loading: popularLoading } = useTVShows('popular');
  const { tvShows: topRated, loading: topRatedLoading } = useTVShows('topRated');
  const { tvShows: airingToday, loading: airingTodayLoading } = useTVShows('airingToday');

  return (
    <div className="tvshows-page">
      <div className="tvshows-header">
        <h1>TV Shows</h1>
        <p>Browse popular TV series and shows</p>
      </div>

      <div className="tvshows-content">
        {/* Trending TV Shows */}
        <div className="tvshow-section">
          <h2 className="tvshow-section-title">Trending Now</h2>
          {trendingLoading ? (
            <Loader />
          ) : (
            <div className="tvshow-row">
              {trending.map((show) => (
                <TVShowCard key={show.id} tvShow={show} />
              ))}
            </div>
          )}
        </div>

        {/* Popular TV Shows */}
        <div className="tvshow-section">
          <h2 className="tvshow-section-title">Popular on Netflix</h2>
          {popularLoading ? (
            <Loader />
          ) : (
            <div className="tvshow-row">
              {popular.map((show) => (
                <TVShowCard key={show.id} tvShow={show} />
              ))}
            </div>
          )}
        </div>

        {/* Top Rated TV Shows */}
        <div className="tvshow-section">
          <h2 className="tvshow-section-title">Top Rated</h2>
          {topRatedLoading ? (
            <Loader />
          ) : (
            <div className="tvshow-row">
              {topRated.map((show) => (
                <TVShowCard key={show.id} tvShow={show} />
              ))}
            </div>
          )}
        </div>

        {/* Airing Today */}
        <div className="tvshow-section">
          <h2 className="tvshow-section-title">Airing Today</h2>
          {airingTodayLoading ? (
            <Loader />
          ) : (
            <div className="tvshow-row">
              {airingToday.map((show) => (
                <TVShowCard key={show.id} tvShow={show} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
