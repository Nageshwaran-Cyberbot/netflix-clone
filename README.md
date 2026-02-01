# Netflix Clone

> A full-stack Netflix clone with **React 19**, **TypeScript**, **Node.js**, and **MongoDB**

![React](https://img.shields.io/badge/React-19-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)
![Status](https://img.shields.io/badge/Status-Live-success)

**Live Demo**: [netflix-clone-hh1d.vercel.app](https://netflix-clone-hh1d.vercel.app)

---

## Quick Start

```bash
# Clone and install
git clone <your-repo-url>
cd netflix-clone
npm install

# Add your TMDB API key to .env.local
VITE_TMDB_API_KEY=your_api_key_here

# Start development server
npm run dev
```

**Get your free TMDB API key**: [themoviedb.org/settings/api](https://www.themoviedb.org/settings/api)


---

## Features

- **User Authentication** - Register, login, and secure sessions with JWT
- **Browse & Search** - 500K+ movies and TV shows from TMDB
- **Watch Trailers** - Auto-playing YouTube trailers in modals
- **My List** - Persistent watchlist with MongoDB storage
- **AI Chatbot** - Intelligent assistant for help and recommendations
- **Fully Responsive** - Seamless experience on all devices
- **Blazing Fast** - Built with Vite, optimized for performance

---

## Tech Stack

**Frontend**: React 19 • TypeScript • Vite • Framer Motion • Zustand  
**Backend**: Node.js • Express • TypeScript • JWT • Bcrypt  
**Database**: MongoDB • Mongoose  
**APIs**: TMDB (The Movie Database)

---

## Project Structure

```
netflix-clone/
├── src/                    # Frontend source
│   ├── components/         # React components
│   ├── pages/             # Page components
│   ├── hooks/             # Custom hooks
│   ├── context/           # React Context (Auth, Wishlist)
│   └── services/          # API services
│
├── server/                # Backend source
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── models/        # MongoDB models
│   │   ├── routes/        # API routes
│   │   └── middleware/    # Auth & error handling
│   └── dist/              # Compiled JavaScript
│
├── vercel.json            # Frontend deployment config
└── render.yaml            # Backend deployment config
```


---

## Development

### Frontend Only (Quickest)
```bash
npm run dev
# Opens at http://localhost:5173
```

### Full Stack (with Backend)
```bash
# Terminal 1 - Backend
cd server
npm install
npm run dev

# Terminal 2 - Frontend  
npm run dev
```

### Environment Variables

**Frontend** (`.env.local`):
```bash
VITE_TMDB_API_KEY=your_tmdb_api_key
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
VITE_BACKEND_URL=http://localhost:5001
```

**Backend** (`server/.env`):
```bash
PORT=5001
MONGODB_URI=mongodb://localhost:27017/netflix-clone
JWT_SECRET=your_secure_secret
CORS_ORIGIN=http://localhost:5173
```

---

## Deployment

**Live URLs**:
- Frontend: [https://netflix-clone-hh1d.vercel.app](https://netflix-clone-hh1d.vercel.app)
- Backend: [https://netflix-clone-api-hjqe.onrender.com](https://netflix-clone-api-hjqe.onrender.com)

**Platforms**:
- Frontend → Vercel (Auto-deploy from GitHub)
- Backend → Render (Free tier)
- Database → MongoDB Atlas (Free tier)

---

## API Endpoints

### Authentication
```
POST /api/auth/register  - Create account
POST /api/auth/login     - Login user
GET  /api/auth/me        - Get current user
```

### Watchlist
```
GET    /api/watchlist           - Get user's list
POST   /api/watchlist           - Add to list
DELETE /api/watchlist/:id       - Remove from list
```

### History
```
GET    /api/history             - Get watch history
POST   /api/history             - Add to history
DELETE /api/history/:id         - Remove from history
```

---

## Key Stats

```
Bundle Size:      432 KB (gzipped: 142 KB)
Build Time:       ~2.7s
TypeScript:       100% coverage
Components:       18+
API Endpoints:    12
Database Models:  3
```

---

## Key Features Explained

### **Intelligent Chatbot**
AI-powered assistant with context-aware responses for help, recommendations, and troubleshooting.

### **Persistent Watchlist**
Your list syncs across devices and browsers using MongoDB backend with localStorage fallback.

### **Auto-Playing Trailers**
YouTube trailers automatically play when you open movie details.

### **Smart Search**
Real-time search with debouncing (500ms) to optimize API calls and performance.


---

## Highlights

- **Production Ready** - Deployed on Vercel + Render
- **Type Safe** - 100% TypeScript coverage
- **Secure** - JWT authentication + password hashing
- **Fast** - 2.7s build time, <3s page load
- **Tested** - Zero errors, production-grade code

---

## Contributing

Contributions welcome! Fork the repo and create a pull request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

---

## License

MIT License - feel free to use this project for learning!

---

## Credits

- **TMDB** - Movie database API
- **Netflix** - Design inspiration
- **React Team** - Amazing framework

---

<div align="center">

**Built with passion for learning**

Star this repo if you find it helpful!

[Back to Top](#netflix-clone)

</div>
