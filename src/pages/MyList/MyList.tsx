import { useWishlist } from '../../context/WishlistContext';
import MovieCard from '../../components/features/MovieCard/MovieCard';
import './MyList.css';

export default function MyList() {
  const { wishlist } = useWishlist();

  return (
    <div className="mylist-page">
      <div className="mylist-header">
        <h1>My List</h1>
        <p>Your personal collection of favorites ({wishlist.length} {wishlist.length === 1 ? 'item' : 'items'})</p>
      </div>

      <div className="mylist-content">
        {wishlist.length === 0 ? (
          <div className="empty-list">
            <div className="empty-icon">
              <svg width="80" height="80" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 21H5C3.89543 21 3 20.1046 3 19V5C3 3.89543 3.89543 3 5 3H14L21 10V19C21 20.1046 20.1046 21 19 21Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14 3V10H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h2>Your list is empty</h2>
            <p>Add movies and TV shows to your list to watch them later!</p>
            <div className="empty-hint">
              <p><strong>Tip:</strong> Click the + button on any movie or show card to add it to your list</p>
            </div>
          </div>
        ) : (
          <div className="mylist-grid">
            {wishlist.map((movie) => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
