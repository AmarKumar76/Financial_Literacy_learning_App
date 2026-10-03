# FIN-08 Project Setup Guide

This document provides a step-by-step guide to setting up the FIN-08 Financial Literacy Learning App on your local machine.

## Prerequisites
Before you begin, ensure you have the following installed:
- **Node.js** (v18 or higher recommended)
- **MongoDB** (Local instance or MongoDB Atlas cluster)
- **Git**
- **Code Editor** (e.g., VS Code)

## 1. Project Initialization & Folder Structure

First, create the root directory for the project and initialize the frontend and backend folders according to the SRS structure.

```bash
mkdir financial-literacy-app
cd financial-literacy-app

# Initialize backend
mkdir server
cd server
npm init -y
cd ..

# Initialize frontend
npx create-react-app client
```

Next, set up the recommended folder structure:

```bash
# Backend structure
cd server
mkdir controllers middleware models routes services services/gemini utils
type nul > server.js
type nul > .env
cd ..

# Frontend structure (inside client/src)
cd client/src
mkdir components pages layouts services hooks utils
cd ../..
```

## 2. Backend Setup (Node.js & Express)

### Install Dependencies

Navigate to the `server` directory and install the necessary packages.

```bash
cd server

# Core dependencies
npm install express mongoose dotenv cors helmet morgan

# Security & Authentication
npm install bcrypt jsonwebtoken

# AI Integration
npm install @google/generative-ai
```

### Install Dev Dependencies
```bash
npm install --save-dev nodemon
```

### Configure package.json
Update your `server/package.json` to include a dev script:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

### Environment Variables
Inside `server/.env`, configure the following variables (do not commit this file):

```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
GEMINI_API_KEY=your_gemini_api_key
CLIENT_URL=http://localhost:3000
```

## 3. Frontend Setup (React & Tailwind)

### Install Tailwind CSS
Navigate to the `client` directory to install Tailwind CSS for styling.

```bash
cd client
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

### Configure Tailwind
Update `tailwind.config.js`:
```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

Update `src/index.css` to include Tailwind directives:
```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

### Additional Dependencies
```bash
npm install react-router-dom axios lucide-react
```

## 4. Running the Project Locally

To run the full stack locally, you will need two terminal windows.

**Terminal 1 (Backend Server):**
```bash
cd server
npm run dev
```
*Server will start on http://localhost:5000*

**Terminal 2 (Frontend Client):**
```bash
cd client
npm start
```
*React app will open on http://localhost:3000*

## 5. Next Steps
Once the project skeleton is set up, you can refer to the **[SRS.md](./SRS.md)** to begin implementing the core MVP phases:
1. Phase 1: React UI + routing
2. Phase 2: Node/Express + MongoDB setup
3. Phase 3: JWT Authentication + RBAC
