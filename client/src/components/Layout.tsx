import { SignedIn, SignedOut, SignInButton, UserButton, useAuth } from '@clerk/clerk-react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Search, Plus, BookOpen, Home } from 'lucide-react';
import { useEffect } from 'react';
import { setAuthToken } from '../services/api';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  const { getToken } = useAuth();
  const location = useLocation();

  // Set auth token when component mounts or auth changes
  useEffect(() => {
    const setToken = async () => {
      try {
        const token = await getToken();
        setAuthToken(token);
      } catch (error) {
        console.error('Error setting auth token:', error);
        setAuthToken(null);
      }
    };

    setToken();
  }, [getToken]);

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Toaster position="top-right" />
      
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo and Brand */}
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2">
                <BookOpen className="h-8 w-8 text-blue-600" />
                <span className="text-xl font-bold text-gray-900">AI Smart Notes</span>
              </Link>
            </div>

            {/* Navigation - Only show when signed in */}
            <SignedIn>
              <nav className="hidden md:flex items-center space-x-8">
                <Link
                  to="/dashboard"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Home className="h-4 w-4" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/search"
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    isActive('/search')
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
                >
                  <Search className="h-4 w-4" />
                  <span>Search</span>
                </Link>
                <Link
                  to="/create"
                  className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
                >
                  <Plus className="h-4 w-4" />
                  <span>New Note</span>
                </Link>
              </nav>
            </SignedIn>

            {/* Auth Section */}
            <div className="flex items-center space-x-4">
              <SignedOut>
                <SignInButton>
                  <button className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors">
                    Sign In
                  </button>
                </SignInButton>
              </SignedOut>
              <SignedIn>
                <UserButton
                  appearance={{
                    elements: {
                      avatarBox: "h-8 w-8"
                    }
                  }}
                />
              </SignedIn>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <SignedIn>
          <div className="md:hidden border-t border-gray-200">
            <div className="px-4 py-3">
              <div className="flex items-center justify-around">
                <Link
                  to="/dashboard"
                  className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                    isActive('/dashboard')
                      ? 'text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Home className="h-5 w-5" />
                  <span>Dashboard</span>
                </Link>
                <Link
                  to="/search"
                  className={`flex flex-col items-center space-y-1 px-3 py-2 rounded-md text-xs font-medium transition-colors ${
                    isActive('/search')
                      ? 'text-blue-700'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </Link>
                <Link
                  to="/create"
                  className="flex flex-col items-center space-y-1 px-3 py-2 rounded-md text-xs font-medium text-blue-600 hover:text-blue-700"
                >
                  <Plus className="h-5 w-5" />
                  <span>New Note</span>
                </Link>
              </div>
            </div>
          </div>
        </SignedIn>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
