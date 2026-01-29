import { useRef } from 'react';
import { motion } from 'framer-motion';
import type { Movie } from '../../../types';
import MovieCard from '../MovieCard/MovieCard';
import SkeletonCard from '../../common/SkeletonCard/SkeletonCard';
import './MovieRow.css';

interface MovieRowProps {
  title: string;
  movies: Movie[];
  loading?: boolean;
}

const MovieRow = ({ title, movies, loading }: MovieRowProps) => {
  const rowRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (rowRef.current) {
      const scrollAmount = direction === 'left' ? -800 : 800;
      rowRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <motion.div 
        className="movie-row"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="movie-row-title">{title}</h2>
        <div className="movie-row-container">
          <div className="movie-row-content" ref={rowRef}>
            {Array.from({ length: 10 }).map((_, index) => (
              <SkeletonCard key={index} />
            ))}
          </div>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="movie-row"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="movie-row-title">{title}</h2>
      <div className="movie-row-container">
        <button 
          className="movie-row-arrow movie-row-arrow-left"
          onClick={() => scroll('left')}
          aria-label="Scroll left"
        >
          ‹
        </button>
        
        <div className="movie-row-content" ref={rowRef}>
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
        
        <button 
          className="movie-row-arrow movie-row-arrow-right"
          onClick={() => scroll('right')}
          aria-label="Scroll right"
        >
          ›
        </button>
      </div>
    </motion.div>
  );
};

export default MovieRow;
