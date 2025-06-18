import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Save, ArrowLeft, X, Plus } from 'lucide-react';
import useNotesStore from '../store/notesStore';
import type { CreateNoteData, UpdateNoteData } from '../types/note';

// Form validation schema
const noteSchema = z.object({
  title: z.string().min(1, 'Title is required').max(200, 'Title must be less than 200 characters'),
  content: z.string().min(1, 'Content is required'),
  summary: z.string().optional(),
  tags: z.array(z.string()).optional(),
});

type NoteFormData = z.infer<typeof noteSchema>;

const CreateEditNote = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditing = Boolean(id);
  
  const {
    currentNote,
    loading,
    createNote,
    updateNote,
    fetchNote,
    setCurrentNote,
  } = useNotesStore();

  const [tagInput, setTagInput] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm<NoteFormData>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: '',
      content: '',
      summary: '',
      tags: [],
    },
  });

  const watchedTags = watch('tags') || [];

  // Load note data for editing
  useEffect(() => {
    if (isEditing && id) {
      fetchNote(id);
    } else {
      setCurrentNote(null);
    }
  }, [isEditing, id, fetchNote, setCurrentNote]);

  // Populate form when note is loaded
  useEffect(() => {
    if (currentNote && isEditing) {
      reset({
        title: currentNote.title,
        content: currentNote.content,
        summary: currentNote.summary || '',
        tags: currentNote.tags || [],
      });
    }
  }, [currentNote, isEditing, reset]);

  const addTag = () => {
    const trimmedTag = tagInput.trim();
    if (trimmedTag && !watchedTags.includes(trimmedTag)) {
      setValue('tags', [...watchedTags, trimmedTag]);
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setValue('tags', watchedTags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const onSubmit = async (data: NoteFormData) => {
    setIsSubmitting(true);
    try {
      if (isEditing && id) {
        const updateData: UpdateNoteData = {
          title: data.title,
          content: data.content,
          summary: data.summary || undefined,
          tags: data.tags?.length ? data.tags : undefined,
        };
        await updateNote(id, updateData);
      } else {
        const createData: CreateNoteData = {
          title: data.title,
          content: data.content,
          summary: data.summary || undefined,
          tags: data.tags?.length ? data.tags : undefined,
        };
        await createNote(createData);
      }
      navigate('/dashboard');
    } catch (error) {
      console.error('Error saving note:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isEditing && loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
        <span className="ml-2 text-gray-600">Loading note...</span>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center space-x-4">
          <button
            onClick={() => navigate('/dashboard')}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            <span>Back to Dashboard</span>
          </button>
        </div>
        <h1 className="text-3xl font-bold text-gray-900">
          {isEditing ? 'Edit Note' : 'Create New Note'}
        </h1>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          {/* Title */}
          <div className="mb-6">
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Title
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  {...field}
                  type="text"
                  id="title"
                  placeholder="Enter note title..."
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.title ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              )}
            />
            {errors.title && (
              <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
            )}
          </div>

          {/* Content */}
          <div className="mb-6">
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Content
            </label>
            <Controller
              name="content"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="content"
                  rows={12}
                  placeholder="Write your note content here..."
                  className={`w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical ${
                    errors.content ? 'border-red-300' : 'border-gray-300'
                  }`}
                />
              )}
            />
            {errors.content && (
              <p className="mt-1 text-sm text-red-600">{errors.content.message}</p>
            )}
          </div>

          {/* Summary */}
          <div className="mb-6">
            <label htmlFor="summary" className="block text-sm font-medium text-gray-700 mb-2">
              Summary (Optional)
            </label>
            <Controller
              name="summary"
              control={control}
              render={({ field }) => (
                <textarea
                  {...field}
                  id="summary"
                  rows={3}
                  placeholder="Add a brief summary (AI can help generate this)..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-vertical"
                />
              )}
            />
          </div>

          {/* Tags */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-3">
              {watchedTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center space-x-1 bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => removeTag(tag)}
                    className="hover:text-blue-900"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </span>
              ))}
            </div>
            <div className="flex space-x-2">
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Add a tag..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={addTag}
                disabled={!tagInput.trim()}
                className="flex items-center space-x-1 bg-gray-100 text-gray-700 px-3 py-2 rounded-md hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Plus className="h-4 w-4" />
                <span>Add</span>
              </button>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/dashboard')}
            className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Save className="h-4 w-4" />
            <span>{isSubmitting ? 'Saving...' : isEditing ? 'Update Note' : 'Create Note'}</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEditNote;
