# Tech Tutorials Hub

A full-stack web application for sharing and discovering technical tutorials. Built with Node.js, Express, MongoDB, and vanilla JavaScript.

## Features

- **User Authentication** — Register, login, and logout with JWT-based auth
- **Tutorial Management** — Create, read, update, and delete tutorials
- **Rating System** — Rate tutorials on a 1-5 star scale
- **Comments** — Add comments to tutorials
- **Responsive UI** — Clean, modern interface

## Tech Stack

| Layer | Technology |
|-------|------------|
| Backend | Express.js |
| Database | MongoDB + Mongoose |
| Auth | JWT + bcryptjs |
| Frontend | Vanilla HTML/CSS/JS |
| Deployment | Render |

## Project Structure

```
├── public/                 # Frontend static files
│   ├── index.html          # Main HTML page
│   ├── style.css           # Styles
│   └── script.js           # Frontend logic
├── server.js               # Express entry point
├── db.js                   # MongoDB connection
├── api.js                  # API utilities
├── authController.js       # Auth business logic
├── authMiddleware.js       # JWT verification
├── authRoutes.js           # Auth API routes
├── commentController.js    # Comment business logic
├── errorMiddleware.js      # Error handling
├── Tutorial.js             # Tutorial Mongoose model
├── tutorialController.js  # Tutorial business logic
├── tutorialRoutes.js      # Tutorial API routes
├── User.js                # User Mongoose model
├── render.yaml            # Render Blueprint config
├── package.json           # Dependencies
├── .env.example           # Environment template
└── .gitignore             # Git ignore rules
```

## Prerequisites

- Node.js 18+
- MongoDB (local or Atlas)

## Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your values:

| Variable | Description |
|----------|-------------|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Secret key for JWT signing |
| `JWT_EXPIRES_IN` | Token expiry (e.g., `7d`) |
| `CLIENT_URL` | Frontend URL for CORS |

### 3. Start the Server

```bash
# Development (with auto-reload)
npm run dev

# Production
npm start
```

The app will be available at `http://localhost:5000`

## API Endpoints

### Authentication

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login user |
| GET | `/api/auth/me` | Get current user |

### Tutorials

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tutorials` | List all tutorials |
| GET | `/api/tutorials/:id` | Get single tutorial |
| POST | `/api/tutorials` | Create tutorial (auth required) |
| PUT | `/api/tutorials/:id` | Update tutorial (auth required) |
| DELETE | `/api/tutorials/:id` | Delete tutorial (auth required) |

### Comments

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tutorials/:id/comments` | Add comment |
| DELETE | `/api/tutorials/:tutorialId/comments/:commentId` | Delete comment |

### Ratings

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/tutorials/:id/rate` | Rate a tutorial |

## Deploying to Render

### Option 1: Blueprint (Recommended)

1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Click **New +** → **Blueprint**
4. Select your GitHub repository
5. Render will detect `render.yaml` automatically
6. Add environment variables:
   - `MONGO_URI` — Your MongoDB Atlas connection string
   - `JWT_SECRET` — Generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

### Option 2: Manual

1. Create a new Web Service on Render
2. Set:
   - Build Command: `npm install`
   - Start Command: `npm start`
3. Add environment variables as above

Your app will be live at `https://<your-service>.onrender.com`

## Testing

```bash
# Run smoke tests
npm run smoke
```

## License

MIT