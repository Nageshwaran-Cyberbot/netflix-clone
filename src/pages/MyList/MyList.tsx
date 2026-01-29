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
            <div className="empty-icon">💾</div>
            <h2>Your list is empty</h2>
            <p>Add movies and TV shows to your list to watch them later!</p>
            <div className="empty-hint">
              <p>💡 <strong>Tip:</strong> Click the + button on any movie or show card to add it to your list</p>
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
