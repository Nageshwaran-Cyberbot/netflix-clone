import type { TVShow } from '../../../types';
import { getImageUrl, IMAGE_SIZES } from '../../../utils/constants';
import { useWishlist } from '../../../context/WishlistContext';
import './TVShowCard.css';

interface TVShowCardProps {
  tvShow: TVShow;
  onClick?: () => void;
}

const TVShowCard = ({ tvShow, onClick }: TVShowCardProps) => {
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const imageUrl = getImageUrl(tvShow.poster_path, IMAGE_SIZES.POSTER.MEDIUM);
  const inWishlist = isInWishlist(tvShow.id);

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    // Convert TVShow to Movie format for wishlist
    const movieFormat = {
      ...tvShow,
      title: tvShow.name,
      release_date: tvShow.first_air_date,
      original_title: tvShow.original_name,
      original_language: tvShow.original_language,
      overview: tvShow.overview,
      poster_path: tvShow.poster_path,
      backdrop_path: tvShow.backdrop_path,
      genre_ids: tvShow.genre_ids,
      popularity: tvShow.popularity,
      vote_average: tvShow.vote_average,
      vote_count: tvShow.vote_count,
      adult: false,
      video: false,
    };
    
    if (inWishlist) {
      removeFromWishlist(tvShow.id);
    } else {
      addToWishlist(movieFormat);
    }
  };

  return (
    <div className="tvshow-card" onClick={onClick}>
      <img 
        src={imageUrl} 
        alt={tvShow.name}
        className="tvshow-card-image"
        loading="lazy"
      />
      <button 
        className={`wishlist-button ${inWishlist ? 'in-wishlist' : ''}`}
        onClick={handleWishlistClick}
        title={inWishlist ? 'Remove from My List' : 'Add to My List'}
      >
        {inWishlist ? '✓' : '+'}
      </button>
      <div className="tvshow-card-overlay">
        <h3 className="tvshow-card-title">{tvShow.name}</h3>
        <div className="tvshow-card-info">
          <span className="tvshow-card-rating">★ {tvShow.vote_average.toFixed(1)}</span>
          <span className="tvshow-card-year">
            {tvShow.first_air_date ? new Date(tvShow.first_air_date).getFullYear() : 'N/A'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default TVShowCard;
