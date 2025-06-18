import { ClerkProvider, SignedIn, SignedOut } from '@clerk/clerk-react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import Dashboard from './pages/Dashboard';
import CreateEditNote from './pages/CreateEditNote';
import SearchPage from './pages/SearchPage';
import NoteDetail from './pages/NoteDetail';

// Import your Clerk publishable key
const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key");
}

export default function App() {
  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl="/">
      <BrowserRouter>
        <div className="App">
          <SignedOut>
            <LandingPage />
          </SignedOut>
          
          <SignedIn>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="create" element={<CreateEditNote />} />
                <Route path="edit/:id" element={<CreateEditNote />} />
                <Route path="note/:id" element={<NoteDetail />} />
                <Route path="search" element={<SearchPage />} />
                <Route path="*" element={<Navigate to="/dashboard" replace />} />
              </Route>
            </Routes>
          </SignedIn>
        </div>
      </BrowserRouter>
    </ClerkProvider>
  );
}