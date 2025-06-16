# AI Smart Note

A modern, intelligent note-taking application that leverages artificial intelligence to enhance your note-taking experience. Built with TypeScript, Express.js, and React, this application provides a seamless interface for creating, managing, and organizing your notes with AI-powered features.

## Features

- 📝 Create and manage notes with rich text formatting
- 🤖 AI-powered note organization and categorization
- 🔍 Smart search functionality
- 🔐 Secure user authentication
- 📱 Responsive design for all devices
- 🔄 Real-time updates and synchronization

## Tech Stack

### Backend
- TypeScript
- Express.js
- Node.js
- RESTful API architecture

### Frontend
- React
- TypeScript
- Modern UI/UX design

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- TypeScript

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/ai-smart-note.git
cd ai-smart-note
```

2. Install dependencies
```bash
# Install server dependencies
cd server
npm install

# Install client dependencies
cd ../client
npm install
```

3. Set up environment variables
```bash
# In server directory
cp .env.example .env
# Configure your environment variables
```

4. Start the development servers
```bash
# Start backend server (from server directory)
npm run dev

# Start frontend server (from client directory)
npm start
```

## Project Structure

```
ai-smart-note/
├── client/             # Frontend React application
├── server/             # Backend Express application
├── tsconfig.json       # TypeScript configuration
└── LICENSE            # Project license
```

## API Documentation

The API documentation is available at `/api-docs` when running the server in development mode.

### Main Endpoints

- `POST /api/notes` - Create a new note
- `GET /api/notes/:id` - Get a specific note
- `PUT /api/notes/:id` - Update a note
- `DELETE /api/notes/:id` - Delete a note
- `GET /api/notes` - Get all notes for a user

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please open an issue in the GitHub repository or contact the development team.

## Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for their invaluable tools and libraries 