import { useState } from 'react';
import { motion } from 'framer-motion';
import { useMovies } from '../../hooks/useMovies';
import MovieRow from '../../components/features/MovieRow/MovieRow';
import MovieModal from '../../components/features/MovieModal/MovieModal';
import { getImageUrl, IMAGE_SIZES } from '../../utils/constants';
import './Home.css';

export default function Home() {
  const { movies: trending, loading: trendingLoading } = useMovies('trending');
  const { movies: popular, loading: popularLoading } = useMovies('popular');
  const { movies: topRated, loading: topRatedLoading } = useMovies('topRated');
  const { movies: upcoming, loading: upcomingLoading } = useMovies('upcoming');
  
  // Pick first trending movie for hero (stable, no random)
  const heroMovie = trending && trending.length > 0 ? trending[0] : null;
  
  const [showHeroModal, setShowHeroModal] = useState(false);

  const backdropUrl = heroMovie 
    ? getImageUrl(heroMovie.backdrop_path, IMAGE_SIZES.BACKDROP.LARGE)
    : '';

  return (
    <div className="home">
      {/* Hero Banner */}
      <motion.div 
        className="hero-banner"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
        style={{ 
          backgroundImage: `url(${backdropUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center top'
        }}
      >
        <div className="hero-overlay" />
        <div className="hero-content">
          <motion.h1 
            className="hero-title"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            {heroMovie?.title || 'Welcome to Netflix Clone'}
          </motion.h1>
          <motion.p 
            className="hero-description"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            {heroMovie?.overview || 'Unlimited movies, TV shows, and more. Watch anywhere. Cancel anytime.'}
          </motion.p>
          <motion.div
            className="hero-buttons"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            <button 
              className="hero-button hero-button-play"
              onClick={() => heroMovie && setShowHeroModal(true)}
            >
              <span className="button-icon">▶</span> Play
            </button>
            <button 
              className="hero-button hero-button-info"
              onClick={() => heroMovie && setShowHeroModal(true)}
            >
              <span className="button-icon">ℹ</span> More Info
            </button>
          </motion.div>
        </div>
        <div className="hero-fade" />
      </motion.div>

      {/* Movie Rows */}
      <div className="home-content">
        <MovieRow title="Trending Now" movies={trending} loading={trendingLoading} />
        <MovieRow title="Popular on Netflix" movies={popular} loading={popularLoading} />
        <MovieRow title="Top Rated" movies={topRated} loading={topRatedLoading} />
        <MovieRow title="Upcoming" movies={upcoming} loading={upcomingLoading} />
      </div>

      {/* Hero Movie Modal */}
      {showHeroModal && heroMovie && (
        <MovieModal movie={heroMovie} onClose={() => setShowHeroModal(false)} />
      )}
    </div>
  );
}
