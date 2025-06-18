import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Edit2, Trash2, Calendar, Tag, Brain, MessageSquare } from 'lucide-react';
import { format } from 'date-fns';
import useNotesStore from '../store/notesStore';

const NoteDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const {
    currentNote,
    loading,
    error,
    fetchNote,
    deleteNote,
    setCurrentNote,
  } = useNotesStore();

  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (id) {
      fetchNote(id);
    }
    
    // Clear current note when component unmounts
    return () => {
      setCurrentNote(null);
    };
  }, [id, fetchNote, setCurrentNote]);

  const handleDelete = async () => {
    if (!currentNote || isDeleting) return;
    
    if (window.confirm('Are you sure you want to delete this note? This action cannot be undone.')) {
      setIsDeleting(true);
      const success = await deleteNote(currentNote._id);
      if (success) {
        navigate('/dashboard');
      } else {
        setIsDeleting(false);
      }
    }
  };

  const handleEdit = () => {
    if (currentNote) {
      navigate(`/edit/${currentNote._id}`);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading note...</span>
      </div>
    );
  }

  if (error || !currentNote) {
    return (
      <div className="text-center py-12">
        <div className="max-w-md mx-auto">
          <h3 className="text-lg font-medium text-gray-900 mb-2">Note not found</h3>
          <p className="text-gray-600 mb-4">
            The note you're looking for doesn't exist or you don't have permission to view it.
          </p>
          <Link
            to="/dashboard"
            className="inline-flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Dashboard</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <Link
          to="/dashboard"
          className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="h-5 w-5" />
          <span>Back to Dashboard</span>
        </Link>
        
        <div className="flex items-center space-x-3">
          <button
            onClick={handleEdit}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
            <span>Edit</span>
          </button>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center space-x-2 bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Trash2 className="h-4 w-4" />
            <span>{isDeleting ? 'Deleting...' : 'Delete'}</span>
          </button>
        </div>
      </div>

      {/* Note Content */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        {/* Title and Metadata */}
        <div className="p-6 border-b border-gray-200">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{currentNote.title}</h1>
          
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Created {format(new Date(currentNote.createdAt), 'MMM d, yyyy')}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4" />
              <span>Updated {format(new Date(currentNote.updatedAt), 'MMM d, yyyy')}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        {currentNote.tags && currentNote.tags.length > 0 && (
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-2 mb-3">
              <Tag className="h-4 w-4 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Tags</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {currentNote.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* AI Summary */}
        {currentNote.summary && (
          <div className="p-6 border-b border-gray-200 bg-blue-50">
            <div className="flex items-center space-x-2 mb-3">
              <Brain className="h-4 w-4 text-blue-600" />
              <span className="text-sm font-medium text-blue-800">AI Summary</span>
            </div>
            <p className="text-blue-700 leading-relaxed">{currentNote.summary}</p>
          </div>
        )}

        {/* Main Content */}
        <div className="p-6">
          <div className="prose max-w-none">
            <div className="whitespace-pre-wrap text-gray-800 leading-relaxed">
              {currentNote.content}
            </div>
          </div>
        </div>

        {/* Q&A Pairs */}
        {currentNote.qaPairs && currentNote.qaPairs.length > 0 && (
          <div className="p-6 border-t border-gray-200 bg-green-50">
            <div className="flex items-center space-x-2 mb-4">
              <MessageSquare className="h-4 w-4 text-green-600" />
              <span className="text-sm font-medium text-green-800">AI-Generated Q&A</span>
            </div>
            <div className="space-y-4">
              {currentNote.qaPairs.map((qa, index) => (
                <div key={index} className="bg-white p-4 rounded-lg border border-green-200">
                  {qa.question && (
                    <div className="mb-2">
                      <span className="text-sm font-medium text-green-800">Q: </span>
                      <span className="text-green-700">{qa.question}</span>
                    </div>
                  )}
                  {qa.answer && (
                    <div>
                      <span className="text-sm font-medium text-green-800">A: </span>
                      <span className="text-green-600">{qa.answer}</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Metadata Footer */}
      <div className="mt-6 text-center text-sm text-gray-500">
        {currentNote.embeddingId && (
          <p>This note is indexed for AI search with ID: {currentNote.embeddingId}</p>
        )}
      </div>
    </div>
  );
};

export default NoteDetail;
