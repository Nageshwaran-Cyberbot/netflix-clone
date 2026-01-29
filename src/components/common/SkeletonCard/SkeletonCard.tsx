import './SkeletonCard.css';

const SkeletonCard = () => {
  return (
    <div className="skeleton-card">
      <div className="skeleton-image" />
      <div className="skeleton-content">
        <div className="skeleton-title" />
        <div className="skeleton-info">
          <div className="skeleton-rating" />
          <div className="skeleton-year" />
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
