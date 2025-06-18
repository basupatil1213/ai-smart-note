import { type Note } from '../types/note';
import { format } from 'date-fns';
import { Edit2, Trash2, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';

interface NoteCardProps {
  note: Note;
  onEdit: (note: Note) => void;
  onDelete: (id: string) => void;
}

const NoteCard = ({ note, onEdit, onDelete }: NoteCardProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-all duration-200 border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-xl font-semibold text-gray-800 line-clamp-2">{note.title}</h3>
        <div className="flex space-x-2 ml-4">
          <Link
            to={`/note/${note._id}`}
            className="text-gray-600 hover:text-gray-800 transition-colors p-1"
            title="View note"
          >
            <Eye className="h-4 w-4" />
          </Link>
          <button
            onClick={() => onEdit(note)}
            className="text-blue-600 hover:text-blue-800 transition-colors p-1"
            title="Edit note"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={() => onDelete(note._id)}
            className="text-red-600 hover:text-red-800 transition-colors p-1"
            title="Delete note"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      {/* Content Preview */}
      <div className="mb-4">
        <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed">
          {note.content.length > 150 
            ? `${note.content.substring(0, 150)}...` 
            : note.content
          }
        </p>
      </div>

      {/* Summary */}
      {note.summary && (
        <div className="bg-blue-50 p-3 rounded-md mb-4">
          <p className="text-sm text-blue-800 font-medium">AI Summary:</p>
          <p className="text-sm text-blue-700 mt-1">{note.summary}</p>
        </div>
      )}

      {/* Tags */}
      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {note.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium"
            >
              {tag}
            </span>
          ))}
          {note.tags.length > 3 && (
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full font-medium">
              +{note.tags.length - 3} more
            </span>
          )}
        </div>
      )}

      {/* Q&A Pairs */}
      {note.qaPairs && note.qaPairs.length > 0 && (
        <div className="bg-green-50 p-3 rounded-md mb-4">
          <p className="text-sm text-green-800 font-medium mb-2">AI Q&A:</p>
          <div className="space-y-2">
            {note.qaPairs.slice(0, 1).map((qa, index) => (
              <div key={index} className="text-sm">
                {qa.question && (
                  <p className="text-green-700 font-medium">Q: {qa.question}</p>
                )}
                {qa.answer && (
                  <p className="text-green-600 mt-1">A: {qa.answer}</p>
                )}
              </div>
            ))}
            {note.qaPairs.length > 1 && (
              <p className="text-xs text-green-600">+{note.qaPairs.length - 1} more Q&A</p>
            )}
          </div>
        </div>
      )}

      {/* Timestamps */}
      <div className="text-xs text-gray-500 space-y-1">
        <p>Created: {format(new Date(note.createdAt), 'MMM d, yyyy')}</p>
        <p>Updated: {format(new Date(note.updatedAt), 'MMM d, yyyy')}</p>
      </div>
    </div>
  );
};

export default NoteCard; 