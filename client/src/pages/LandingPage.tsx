import { SignInButton } from '@clerk/clerk-react';
import { BookOpen, Search, Brain, Sparkles, ArrowRight } from 'lucide-react';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <div className="flex items-center justify-center space-x-3 mb-8">
            <BookOpen className="h-12 w-12 text-blue-600" />
            <h1 className="text-5xl font-bold text-gray-900">AI Smart Notes</h1>
          </div>
          
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Transform your note-taking with AI-powered insights. Create, organize, and discover your thoughts 
            with intelligent summaries, semantic search, and automated Q&A generation.
          </p>
          
          <SignInButton>
            <button className="inline-flex items-center space-x-2 bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-medium hover:bg-blue-700 transition-colors shadow-lg">
              <span>Get Started Free</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </SignInButton>
        </div>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful AI Features</h2>
          <p className="text-lg text-gray-600">Enhance your productivity with intelligent note management</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Brain className="h-8 w-8 text-blue-600" />
              <h3 className="text-xl font-semibold text-gray-900">AI Summaries</h3>
            </div>
            <p className="text-gray-600">
              Automatically generate concise summaries of your notes to quickly understand key points 
              and main ideas without reading the entire content.
            </p>
          </div>

          {/* Feature 2 */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Search className="h-8 w-8 text-green-600" />
              <h3 className="text-xl font-semibold text-gray-900">Semantic Search</h3>
            </div>
            <p className="text-gray-600">
              Find notes by meaning, not just keywords. Search for concepts and ideas to discover 
              relevant content across all your notes with AI-powered understanding.
            </p>
          </div>

          {/* Feature 3 */}
          <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-200">
            <div className="flex items-center space-x-3 mb-4">
              <Sparkles className="h-8 w-8 text-purple-600" />
              <h3 className="text-xl font-semibold text-gray-900">Smart Q&A</h3>
            </div>
            <p className="text-gray-600">
              Generate intelligent questions and answers from your notes to help with studying, 
              review, and deeper understanding of your content.
            </p>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
            <p className="text-lg text-gray-600">Simple steps to supercharge your note-taking</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Step 1 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Create Notes</h3>
              <p className="text-gray-600">
                Write your thoughts, ideas, meeting notes, or any content using our clean, 
                distraction-free editor.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">2</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Enhancement</h3>
              <p className="text-gray-600">
                Our AI automatically generates summaries, suggests tags, and creates Q&A pairs 
                to enhance your notes.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Discovery</h3>
              <p className="text-gray-600">
                Use semantic search to find relevant notes by meaning, discover connections, 
                and unlock insights from your knowledge base.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Notes?</h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who have revolutionized their note-taking with AI
          </p>
          <SignInButton>
            <button className="inline-flex items-center space-x-2 bg-white text-blue-600 px-8 py-4 rounded-lg text-lg font-medium hover:bg-gray-50 transition-colors shadow-lg">
              <span>Start Free Today</span>
              <ArrowRight className="h-5 w-5" />
            </button>
          </SignInButton>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <BookOpen className="h-8 w-8 text-blue-400" />
            <span className="text-2xl font-bold text-white">AI Smart Notes</span>
          </div>
          <p className="text-center text-gray-400">
            © 2025 AI Smart Notes. Empowering knowledge workers with intelligent note-taking.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
