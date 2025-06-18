# AI Smart Notes - Frontend

A modern React frontend for the AI Smart Notes application, built with TypeScript, Tailwind CSS, and powered by Vite.

## Features

- **Authentication**: Secure authentication with Clerk
- **Note Management**: Create, edit, delete, and view notes
- **AI-Powered Search**: Semantic search using vector embeddings
- **Smart Organization**: Auto-generated tags and summaries
- **Responsive Design**: Works on desktop, tablet, and mobile
- **Real-time Updates**: Optimistic UI updates with error handling

## Tech Stack

- **Framework**: React 19 with TypeScript
- **Build Tool**: Vite
- **Package Manager**: Bun
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Authentication**: Clerk
- **Routing**: React Router DOM
- **Form Handling**: React Hook Form with Zod validation
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## Getting Started

### Prerequisites

- Bun (latest version)
- Node.js 18+
- Clerk account for authentication

### Installation

1. Clone the repository and navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   bun install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   
   Update the `.env` file with your configuration:
   ```
   VITE_API_URL=http://localhost:3000
   VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
   ```

4. Start the development server:
   ```bash
   bun dev
   ```

5. Open your browser and navigate to `http://localhost:5173`

## Available Scripts

- `bun dev` - Start development server
- `bun build` - Build for production
- `bun preview` - Preview production build
- `bun lint` - Run ESLint

## API Integration

The frontend integrates with the backend API for:

- **Notes API**: CRUD operations for notes
- **Search API**: Semantic search functionality
- **Authentication**: Clerk token validation

All API calls include proper error handling and loading states.
