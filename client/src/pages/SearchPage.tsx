import { useState, useEffect } from 'react';
import { Search, Sparkles, FileText } from 'lucide-react';
import useNotesStore from '../store/notesStore';
import NoteCard from '../components/NoteCard';
import type { Note } from '../types/note';

const SearchPage = () => {
  const {
    searchResults,
    isSearching,
    searchNotes,
    clearSearch,
    deleteNote,
  } = useNotesStore();

  const [query, setQuery] = useState('');
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    // Clear search results when component unmounts
    return () => {
      clearSearch();
    };
  }, [clearSearch]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setHasSearched(true);
    await searchNotes(query.trim());
  };

  const handleClearSearch = () => {
    setQuery('');
    setHasSearched(false);
    clearSearch();
  };

  const handleEdit = (note: Note) => {
    // Navigate to edit page
    window.location.href = `/edit/${note._id}`;
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this note?')) {
      await deleteNote(id);
      // Refresh search results if there's an active search
      if (hasSearched && query.trim()) {
        await searchNotes(query.trim());
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Sparkles className="h-8 w-8 text-blue-600" />
          <h1 className="text-3xl font-bold text-gray-900">Smart Search</h1>
        </div>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Use AI-powered semantic search to find notes by meaning, not just keywords. 
          Search for concepts, topics, or questions and discover relevant content across all your notes.
        </p>
      </div>

      {/* Search Form */}
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <form onSubmit={handleSearch} className="space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by meaning, concept, or question..."
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-500">
              <p>Examples: "machine learning concepts", "productivity tips", "project ideas"</p>
            </div>
            <div className="flex space-x-3">
              {hasSearched && (
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
                >
                  Clear
                </button>
              )}
              <button
                type="submit"
                disabled={!query.trim() || isSearching}
                className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Search className="h-4 w-4" />
                <span>{isSearching ? 'Searching...' : 'Search'}</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Loading State */}
      {isSearching && (
        <div className="flex items-center justify-center py-12">
          <div className="flex items-center space-x-3">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
            <div className="text-center">
              <p className="text-gray-600 font-medium">Searching with AI...</p>
              <p className="text-sm text-gray-500">Finding semantically similar content</p>
            </div>
          </div>
        </div>
      )}

      {/* Search Results */}
      {hasSearched && !isSearching && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">
              Search Results
            </h2>
            <p className="text-gray-600">
              {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} found
            </p>
          </div>

          {searchResults.length === 0 ? (
            <div className="text-center py-12">
              <FileText className="mx-auto h-12 w-12 text-gray-400" />
              <h3 className="mt-2 text-sm font-medium text-gray-900">No results found</h3>
              <p className="mt-1 text-sm text-gray-500">
                Try adjusting your search query or using different keywords.
              </p>
              <div className="mt-4 text-sm text-gray-500 space-y-1">
                <p><strong>Tips for better results:</strong></p>
                <ul className="list-disc list-inside space-y-1 text-left max-w-md mx-auto">
                  <li>Use descriptive phrases rather than single words</li>
                  <li>Ask questions related to your notes</li>
                  <li>Search for concepts or topics you've written about</li>
                  <li>Try synonyms or related terms</li>
                </ul>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((note) => (
                <NoteCard
                  key={note._id}
                  note={note}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Search Tips */}
      {!hasSearched && (
        <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h3 className="text-lg font-medium text-blue-900 mb-3">How AI Search Works</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-blue-800">
            <div>
              <h4 className="font-medium mb-2">Semantic Understanding</h4>
              <p>Our AI understands the meaning behind your words, not just exact matches. Search for "productivity methods" and find notes about "time management" or "efficiency tips".</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Question-Based Search</h4>
              <p>Ask questions like "How to improve focus?" and discover relevant insights from your notes, even if they don't contain those exact words.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Concept Discovery</h4>
              <p>Find notes related to broad concepts. Search for "learning strategies" to discover notes about studying, memory techniques, or skill development.</p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Cross-Note Connections</h4>
              <p>Discover unexpected connections between your notes based on similar themes, ideas, or concepts you've written about.</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
