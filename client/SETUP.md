# Quick Setup Guide for AI Smart Notes Frontend

## 1. Prerequisites
- Bun installed on your system
- Clerk account (free at https://clerk.com)

## 2. Environment Setup

1. Copy the environment template:
   ```bash
   cp .env.example .env
   ```

2. Get your Clerk Publishable Key:
   - Go to https://dashboard.clerk.com
   - Create a new application or use existing one
   - Copy the "Publishable Key" from the API Keys section

3. Update your `.env` file:
   ```env
   VITE_API_URL=http://localhost:3000
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   ```

## 3. Install & Run

```bash
# Install dependencies
bun install

# Start development server
bun dev
```

The app will be available at http://localhost:5173

## 4. Backend Connection

Make sure your backend server is running on port 3000. If it's running on a different port, update the `VITE_API_URL` in your `.env` file.

## 5. First Run

1. Open http://localhost:5173
2. Click "Sign In" and create an account with Clerk
3. You'll be redirected to the dashboard
4. Start creating notes and testing the AI features!

## Troubleshooting

- **Build errors**: Run `bun install` again and check Node.js version
- **Authentication issues**: Verify your Clerk publishable key
- **API errors**: Ensure backend is running and VITE_API_URL is correct

That's it! You now have a fully functional AI Smart Notes frontend.
