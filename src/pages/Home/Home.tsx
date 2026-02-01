import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMovies } from '../../hooks/useMovies';
import MovieRow from '../../components/features/MovieRow/MovieRow';
import MovieModal from '../../components/features/MovieModal/MovieModal';
import { getImageUrl, IMAGE_SIZES } from '../../utils/constants';
import { moviesApi } from '../../services/api/movies.api';
import type { Video } from '../../types';
import './Home.css';

export default function Home() {
  const { movies: trending, loading: trendingLoading } = useMovies('trending');
  const { movies: popular, loading: popularLoading } = useMovies('popular');
  const { movies: topRated, loading: topRatedLoading } = useMovies('topRated');
  const { movies: upcoming, loading: upcomingLoading } = useMovies('upcoming');
  
  const [currentHeroIndex, setCurrentHeroIndex] = useState(0);
  const [heroTrailer, setHeroTrailer] = useState<Video | null>(null);
  const [showHeroModal, setShowHeroModal] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Get top 5 trending movies for hero rotation
  const heroMovies = trending.slice(0, 5);
  const heroMovie = heroMovies[currentHeroIndex] || null;

  // Fetch trailer for current hero movie
  useEffect(() => {
    const fetchTrailer = async () => {
      if (!heroMovie) return;
      
      try {
        const details = await moviesApi.getDetails(heroMovie.id);
        if (details.videos?.results) {
          const trailer = details.videos.results.find(
            (video) => video.type === 'Trailer' && video.site === 'YouTube'
          );
          setHeroTrailer(trailer || details.videos.results[0] || null);
        }
      } catch (error) {
        console.error('Error fetching trailer:', error);
        setHeroTrailer(null);
      }
    };

    fetchTrailer();
  }, [heroMovie]);

  // Auto-rotate hero every 15 seconds
  useEffect(() => {
    if (heroMovies.length === 0) return;

    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        setCurrentHeroIndex((prev) => (prev + 1) % heroMovies.length);
        setIsTransitioning(false);
      }, 500);
    }, 15000); // Change every 15 seconds

    return () => clearInterval(interval);
  }, [heroMovies.length]);

  const backdropUrl = heroMovie 
    ? getImageUrl(heroMovie.backdrop_path, IMAGE_SIZES.BACKDROP.LARGE)
    : '';

  return (
    <div className="home">
      {/* Hero Banner with Auto-Rotating Trailers */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentHeroIndex}
          className="hero-banner"
          initial={{ opacity: 0 }}
          animate={{ opacity: isTransitioning ? 0 : 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Video Background */}
          {heroTrailer ? (
            <div className="hero-video-container">
              <iframe
                src={`https://www.youtube.com/embed/${heroTrailer.key}?autoplay=1&mute=1&controls=0&showinfo=0&modestbranding=1&loop=1&playlist=${heroTrailer.key}&rel=0&enablejsapi=1`}
                title={heroMovie?.title}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                className="hero-video"
              />
              <div className="hero-video-overlay" />
            </div>
          ) : (
            <div 
              className="hero-backdrop"
              style={{ 
                backgroundImage: `url(${backdropUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center top'
              }}
            />
          )}
          
          <div className="hero-overlay" />
          
          {/* Hero Content */}
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
          
          {/* Hero Indicators */}
          <div className="hero-indicators">
            {heroMovies.map((_, index) => (
              <button
                key={index}
                className={`hero-indicator ${index === currentHeroIndex ? 'active' : ''}`}
                onClick={() => {
                  setIsTransitioning(true);
                  setTimeout(() => {
                    setCurrentHeroIndex(index);
                    setIsTransitioning(false);
                  }, 300);
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="hero-fade" />
        </motion.div>
      </AnimatePresence>

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
