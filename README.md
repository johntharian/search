# Image Search for Google Drive

A powerful semantic image search application that helps you find images in your Google Drive using natural language descriptions. Search your images the way you remember them, not just by filenames or tags.

## 🎯 Motivation

This project was born out of a personal need. Like many people, I had accumulated thousands of images in my Google Drive over the years, especially from my high school days. As I switched between mobile devices, I kept backing up these precious memories, but never took the time to organize them properly.

The problem became clear when I wanted to find specific photos, I could remember the content and context of the images, but had no idea about the filenames or exact locations. Manually scrolling through years of photos was time consuming and frustrating.

That's when I decided to build this, a way to search through my Google Drive images using natural language descriptions of what I remember about them. Now, instead of relying on filenames or tags, I can simply describe what I'm looking for and find those memories instantly.

## ✨ Features

- 🖼️ Semantic image search across your Google Drive
- 🤖 AI-powered visual understanding of image content
- 🔍 Find images using natural language descriptions
- 🚀 Fast and responsive React frontend with image grid view
- 🔒 Secure Google OAuth authentication
- 📱 Responsive design for all devices

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or later)
- Python 3.8+
- npm or yarn
- MongoDB (for the Node.js backend)
- Google Cloud Platform account with OAuth credentials

### Environment Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/johntharian/search
   cd search
   ```

2. Create a `.env` file in both `client/` and `server/` directories with your Google OAuth credentials:
   ```
   REACT_APP_GOOGLE_CLIENT_ID=your-google-client-id
   REACT_APP_GOOGLE_API_KEY=your-google-api-key
   ```

## 🖥️ Frontend Setup

```bash
cd client
npm install
npm start
```

The React application will be available at `http://localhost:3000`

## ⚙️ Backend Setup

### Node.js Backend

```bash
cd server
npm install
npm run dev
```

The Node.js server will run on `http://localhost:5000`

### Python FastAPI Backend (Alternative)

```bash
cd server-python
pip install -r requirements.txt
uvicorn main:app --reload
```

The FastAPI server will run on `http://localhost:8000`

## 🔧 Configuration

1. **Google OAuth Setup**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable Google Drive API and Google OAuth 2.0
   - Configure OAuth consent screen
   - Create OAuth client ID for web application
   - Add `http://localhost:3000` to authorized JavaScript origins
   - Add `http://localhost:3000/auth/google/callback` to authorized redirect URIs

2. **Environment Variables**:
   - `MONGODB_URI`: MongoDB connection string (for Node.js backend)
   - `GOOGLE_CLIENT_ID`: Your Google OAuth client ID
   - `GOOGLE_CLIENT_SECRET`: Your Google OAuth client secret
   - `JWT_SECRET`: Secret key for JWT token generation

## 🏗️ System Architecture

```
┌─────────────────┐     ┌───────────────────┐     ┌──────────────────┐
│                 │     │                   │     │                  │
│  React          │◄───►│  Node.js/         │◄───►│  MongoDB         │
│  Frontend       │     │  FastAPI Backend  │     │  Database        │
│  (Material-UI)  │     │                   │     │  (Image Index)   │
└─────────────────┘     └─────────┬─────────┘     └──────────────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │ Google Drive API │
                         │  & OAuth         │
                         └──────────────────┘
```

### Key Components:

1. **Frontend Layer**
   - Built with React and Material-UI for responsive design
   - Image grid layout with infinite scrolling
   - Advanced search filters and image previews
   - Handles user authentication via Google OAuth

2. **Backend Layer**
   - **Node.js Backend**:
     - Express.js server for handling API requests
     - MongoDB for storing image metadata and search indices
     - Google Drive API integration for image access
   - **Python Backend**:
     - FastAPI for high-performance API endpoints
     - CLIP or similar models for image-text similarity
     - FAISS for efficient image similarity search

3. **Image Processing Pipeline**:
   - Scans Google Drive for image files (JPG, PNG, etc.)
   - Extracts visual features and generates embeddings
   - Indexes images for fast similarity search
   - Processes natural language queries to find relevant images

## 🎯 Use Cases

1. **Personal Image Library**
   - Find specific photos using natural language descriptions
   - Search for images when you remember the content but not the filename
   - Organize and retrieve personal photo collections

2. **Creative Projects**
   - Quickly find reference images for design work
   - Search for images based on visual style or content
   - Manage and discover assets for creative projects

3. **E-commerce & Product Management**
   - Search product images by visual attributes
   - Find similar product images in your catalog
   - Organize and retrieve product photos efficiently

4. **Research & Education**
   - Search through image datasets using natural language
   - Find visual examples for teaching materials
   - Discover connections between different visual concepts

## 🛠️ Tech Stack

- **Frontend**: React, Material-UI, React Router
- **Node.js Backend**: Express, Mongoose, Google Drive API
- **Python Backend**: FastAPI, CLIP/OpenAI CLIP, FAISS
- **Database**: MongoDB
- **Authentication**: Google OAuth 2.0

