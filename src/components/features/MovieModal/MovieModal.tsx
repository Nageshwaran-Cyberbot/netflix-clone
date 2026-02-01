import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { Movie, MovieDetails, Cast, Video } from '../../../types';
import { moviesApi } from '../../../services/api/movies.api';
import { getImageUrl, IMAGE_SIZES } from '../../../utils/constants';
import { useWishlist } from '../../../context/WishlistContext';
import Loader from '../../common/Loader/Loader';
import './MovieModal.css';

interface MovieModalProps {
  movie: Movie;
  onClose: () => void;
}

const MovieModal = ({ movie, onClose }: MovieModalProps) => {
  const [details, setDetails] = useState<MovieDetails | null>(null);
  const [trailer, setTrailer] = useState<Video | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const inWishlist = isInWishlist(movie.id);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const data = await moviesApi.getDetails(movie.id);
        setDetails(data);
        
        // Find trailer
        if (data.videos?.results) {
          const youtubeTrailer = data.videos.results.find(
            (video) => video.type === 'Trailer' && video.site === 'YouTube'
          );
          setTrailer(youtubeTrailer || data.videos.results[0]);
        }
      } catch (error) {
        console.error('Error fetching movie details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();

    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [movie.id]);

  const handleWishlistToggle = () => {
    if (inWishlist) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie);
    }
  };

  const backdropUrl = getImageUrl(
    details?.backdrop_path || movie.backdrop_path,
    IMAGE_SIZES.BACKDROP.LARGE
  );

  const cast = details?.credits?.cast?.slice(0, 6) || [];
  const genres = details?.genres?.map(g => g.name).join(', ') || '';
  const runtime = details?.runtime ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m` : '';

  return (
    <AnimatePresence>
      <motion.div
        className="movie-modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="movie-modal-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ type: 'spring', damping: 25 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close-btn" onClick={onClose}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {loading ? (
            <div className="modal-loading">
              <Loader />
            </div>
          ) : (
            <>
              {/* Hero Section with Trailer */}
              <div className="modal-hero">
                {trailer ? (
                  <div className="modal-video-container">
                    <iframe
                      src={`https://www.youtube.com/embed/${trailer.key}?autoplay=1&mute=1&controls=1&modestbranding=1&rel=0`}
                      title={movie.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="modal-video"
                    />
                    <div className="video-overlay" />
                  </div>
                ) : (
                  <div 
                    className="modal-backdrop"
                    style={{ backgroundImage: `url(${backdropUrl})` }}
                  >
                    <div className="modal-backdrop-overlay" />
                  </div>
                )}

                <div className="modal-hero-content">
                  <motion.h1
                    initial={{ y: 30, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="modal-title"
                  >
                    {movie.title}
                  </motion.h1>

                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="modal-actions"
                  >
                    <button className="modal-btn modal-btn-play">
                      <span className="play-icon">▶</span> Play
                    </button>
                    <button
                      className={`modal-btn modal-btn-wishlist ${inWishlist ? 'in-wishlist' : ''}`}
                      onClick={handleWishlistToggle}
                    >
                      {inWishlist ? '✓' : '+'} My List
                    </button>
                  </motion.div>
                </div>
              </div>

              {/* Details Section */}
              <div className="modal-details">
                <div className="modal-main-info">
                  <div className="modal-meta">
                    <span className="modal-rating">★ {movie.vote_average.toFixed(1)}</span>
                    <span className="modal-year">
                      {details?.release_date ? new Date(details.release_date).getFullYear() : 'N/A'}
                    </span>
                    {runtime && <span className="modal-runtime">{runtime}</span>}
                  </div>

                  <p className="modal-overview">{details?.overview || movie.overview}</p>
                </div>

                <div className="modal-secondary-info">
                  {genres && (
                    <div className="modal-info-row">
                      <span className="info-label">Genres:</span>
                      <span className="info-value">{genres}</span>
                    </div>
                  )}

                  {cast.length > 0 && (
                    <div className="modal-info-row">
                      <span className="info-label">Cast:</span>
                      <span className="info-value">
                        {cast.map((actor: Cast) => actor.name).join(', ')}
                      </span>
                    </div>
                  )}

                  {details?.vote_count && (
                    <div className="modal-info-row">
                      <span className="info-label">Votes:</span>
                      <span className="info-value">{details.vote_count.toLocaleString()}</span>
                    </div>
                  )}
                </div>

                {/* Cast Grid */}
                {cast.length > 0 && (
                  <div className="modal-cast-section">
                    <h3>Cast</h3>
                    <div className="modal-cast-grid">
                      {cast.map((actor: Cast) => (
                        <motion.div
                          key={actor.id}
                          className="cast-card"
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          {actor.profile_path ? (
                            <img
                              src={getImageUrl(actor.profile_path, IMAGE_SIZES.PROFILE.MEDIUM)}
                              alt={actor.name}
                              className="cast-image"
                            />
                          ) : (
                            <div className="cast-image-placeholder">
                              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2"/>
                                <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                              </svg>
                            </div>
                          )}
                          <div className="cast-info">
                            <p className="cast-name">{actor.name}</p>
                            <p className="cast-character">{actor.character}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default MovieModal;
