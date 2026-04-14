# SkillSwap Marketplace – Buy & Sell Digital Skills

A full-stack web application where users can register/login, create skill listings, and manage their own digital skill marketplace offerings.

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB Atlas with Mongoose
- **Frontend:** HTML, CSS, Vanilla JavaScript
- **Auth:** JWT + bcrypt password hashing

## Project Structure

```text
backend/
  config/
    db.js
  controllers/
    userController.js
    skillController.js
  middleware/
    authMiddleware.js
  models/
    User.js
    Skill.js
  routes/
    userRoutes.js
    skillRoutes.js
  .env.example
  package.json
  server.js
frontend/
  css/
    style.css
  js/
    api.js
    auth.js
    index.js
    login.js
    register.js
    dashboard.js
  index.html
  login.html
  register.html
  dashboard.html
```

## API Endpoints

### User Routes (`/api/users`)

- `POST /register` - Register a new user
- `POST /login` - Login and receive token

### Skill Routes (`/api/skills`)

- `GET /` - Get all skill listings
- `GET /:id` - Get skill details by id
- `POST /` - Create a new skill (protected)
- `PUT /:id` - Update your own skill (protected)
- `DELETE /:id` - Delete your own skill (protected)

## Setup Instructions

1. **Clone or download this repository**

2. **Install backend dependencies**

   ```bash
   cd backend
   npm install
   ```

3. **Create environment variables**

   ```bash
   cp .env.example .env
   ```

4. **Update `.env` values**

   ```env
   PORT=5000
   MONGO_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/skillswap?retryWrites=true&w=majority&appName=Cluster0
   JWT_SECRET=replace-with-a-strong-secret
   ```

5. **Start the backend server**

   ```bash
   npm run dev
   ```

6. **Open the app in browser**

   - Visit `http://localhost:5000`

## Notes

- Frontend uses `fetch` API to communicate with backend.
- Backend serves frontend static files from `/frontend` for a simple one-command local run.
- Passwords are hashed before storage.
