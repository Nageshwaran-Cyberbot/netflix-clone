import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 5001,
  nodeEnv: process.env.NODE_ENV || 'development',
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/netflix-clone',
  jwtSecret: process.env.JWT_SECRET || 'your_jwt_secret_key',
  jwtExpire: process.env.JWT_EXPIRE || '7d',
  tmdbApiKey: process.env.TMDB_API_KEY || '8dcba2c5d42d8060925a212e54656155',
  tmdbBaseUrl: process.env.TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  corsOrigin: process.env.CORS_ORIGIN || 'http://localhost:5173',
  rateLimitWindowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000'),
  rateLimitMaxRequests: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '100'),
};
