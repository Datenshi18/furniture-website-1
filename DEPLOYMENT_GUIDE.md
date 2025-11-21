# Deployment Guide for Tirth Furniture Website

## Overview
This guide will help you deploy your furniture e-commerce website to production.

## Architecture
- **Frontend**: Vercel (Free)
- **Backend**: Railway (Free tier)
- **Database**: MongoDB Atlas (Free tier)
- **Images**: Cloudinary (Free tier)

## Prerequisites
✅ Cloudinary configured (dzzuiu8o4)
✅ Local MongoDB working
✅ Admin user system ready
✅ All features tested locally

## Deployment Steps

### 1. MongoDB Atlas Setup (5 minutes)
1. Go to https://www.mongodb.com/cloud/atlas
2. Create free account
3. Create new cluster (free tier)
4. Create database user
5. Get connection string

### 2. Backend Deployment - Railway (10 minutes)
1. Go to https://railway.app
2. Connect GitHub account
3. Deploy from repository
4. Set environment variables
5. Test API endpoints

### 3. Frontend Deployment - Vercel (5 minutes)
1. Go to https://vercel.com
2. Connect GitHub account
3. Deploy from repository
4. Update API URLs
5. Test live website

### 4. Final Configuration (5 minutes)
1. Update CORS settings
2. Update frontend URL in backend
3. Test all features end-to-end

## Environment Variables Needed

### Backend (.env)
```
MONGO_URI=your_atlas_connection_string
JWT_SECRET=your_secure_jwt_secret
CLOUDINARY_CLOUD_NAME=dzzuiu8o4
CLOUDINARY_API_KEY=849143168691161
CLOUDINARY_API_SECRET=awE4XCrjufLDhTnBeDf0BgeESPo
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
FRONTEND_URL=https://your-vercel-domain.vercel.app
```

### Frontend (.env)
```
VITE_API_BASE=https://your-railway-domain.railway.app
```

## Total Time: ~25 minutes