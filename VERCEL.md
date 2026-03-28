# Vercel Deployment Guide

Your project has been migrated to a fully serverless Next.js architecture. To make it work in production, follow these steps:

### 1. Enable Storage (Vercel KV)
1. Go to your project on the [Vercel Dashboard](https://vercel.com/dashboard).
2. Click on the **Storage** tab.
3. Select **Create Database** and choose **KV**.
4. Follow the steps into create the KV instance.
5. Vercel will automatically add the `KV_URL`, `KV_REST_API_URL`, etc., to your environment variables.

### 2. Setup Real-time (Pusher)
1. Create a free account at [Pusher](https://pusher.com/).
2. Create a new **Channels** app.
3. Go to **App Keys** and copy the credentials.
4. In your Vercel Project Settings -> **Environment Variables**, add:
   - `PUSHER_APP_ID`
   - `NEXT_PUBLIC_Pusher_KEY`
   - `PUSHER_SECRET`
   - `NEXT_PUBLIC_PUSHER_CLUSTER`

### 3. Deploy
Push the latest changes to your GitHub repository:
```bash
git add .
git commit -m "Migrate to serverless Next.js for Vercel deployment"
git push origin main
```

Vercel will automatically redeploy the project and it will be fully functional!
