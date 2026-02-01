import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Movie } from '../../../types';
import { getImageUrl, IMAGE_SIZES } from '../../../utils/constants';
import { useWishlist } from '../../../context/WishlistContext';
import MovieModal from '../MovieModal/MovieModal';
import './MovieCard.css';

interface MovieCardProps {
  movie: Movie;
  onClick?: () => void;
}

const MovieCard = ({ movie, onClick }: MovieCardProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [showModal, setShowModal] = useState(false);
  const imageUrl = getImageUrl(movie.poster_path, IMAGE_SIZES.POSTER.MEDIUM);
  const inWishlist = isInWishlist(movie.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(movie.id);
    } else {
      addToWishlist(movie);
    }
  };

  const handleCardClick = () => {
    if (onClick) {
      onClick();
    } else {
      setShowModal(true);
    }
  };

  return (
    <>
      <motion.div
        className="movie-card"
        onClick={handleCardClick}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ 
          scale: 1.08, 
          zIndex: 10,
          transition: { duration: 0.3 }
        }}
        transition={{ duration: 0.5 }}
      >
        <img 
          src={imageUrl} 
          alt={movie.title}
          className="movie-card-image"
          loading="lazy"
        />
        <button 
          className={`wishlist-button ${inWishlist ? 'in-wishlist' : ''}`}
          onClick={handleWishlistClick}
          title={inWishlist ? 'Remove from My List' : 'Add to My List'}
        >
          {inWishlist ? '✓' : '+'}
        </button>
        <div className="movie-card-overlay">
          <h3 className="movie-card-title">{movie.title}</h3>
          <div className="movie-card-info">
            <span className="movie-card-rating">★ {movie.vote_average.toFixed(1)}</span>
            <span className="movie-card-year">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : 'N/A'}
            </span>
          </div>
          <button className="card-play-btn">
            <span className="play-icon">▶</span>
          </button>
        </div>
      </motion.div>

      {showModal && (
        <MovieModal movie={movie} onClose={() => setShowModal(false)} />
      )}
    </>
  );
};

export default MovieCard;
