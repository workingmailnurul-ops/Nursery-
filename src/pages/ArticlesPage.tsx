import React, { useState } from 'react';
import { BookOpen, Search, Sparkles, Clock, Calendar, User, ArrowRight, Tag, AlertCircle, X, ChevronRight, Share2, Eye } from 'lucide-react';
import { useFirestore } from '../context/FirestoreContext';
import { ArticleItem } from '../types';

export const ArticlesPage: React.FC = () => {
  const { articles, isLoading, error } = useFirestore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedArticle, setSelectedArticle] = useState<ArticleItem | null>(null);

  // Filter articles based on status, search, category
  const publishedArticles = articles.filter((art) => art.status !== 'draft');

  const categories = Array.from(
    new Set(publishedArticles.map((a) => a.category).filter(Boolean))
  );

  const filteredArticles = publishedArticles.filter((article) => {
    const matchesSearch =
      article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (typeof article.content === 'string' && article.content.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (Array.isArray(article.content) && article.content.join(' ').toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesCategory =
      selectedCategory === 'all' ||
      article.category.toLowerCase() === selectedCategory.toLowerCase();

    return matchesSearch && matchesCategory;
  });

  const authorName = (author: ArticleItem['author']) => {
    if (typeof author === 'string') return author;
    return author?.name || 'Nursery Specialist';
  };

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      {/* HERO HEADER */}
      <section className="bg-gradient-to-r from-[#1E3A20] via-[#2F5233] to-[#172D19] text-white py-12 px-4 shadow-sm">
        <div className="max-w-6xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-[#E8862E] text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            <BookOpen size={14} /> Knowledge Hub & Agronomy
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-amber-50">
            Nursery Plant Care Articles
          </h1>
          <p className="text-stone-200 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            In-depth guides on grafted tree acclimatization, rooftop container gardening, organic pest control, and seasonal fruit tree feeding.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* ERROR STATE */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3 text-red-800 text-xs sm:text-sm">
            <AlertCircle size={18} className="text-red-600 shrink-0" />
            <p><strong>Firestore Connection Error:</strong> {error}. Retrying real-time updates...</p>
          </div>
        )}

        {/* SEARCH & FILTERS BAR */}
        <div className="bg-white p-4 sm:p-5 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="relative w-full sm:w-80">
              <input
                type="text"
                placeholder="Search articles & plant guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl py-2.5 pl-3.5 pr-8 text-xs font-medium text-stone-800 focus:ring-2 focus:ring-[#2F5233]"
              />
              {searchTerm ? (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600 cursor-pointer"
                >
                  <X size={14} />
                </button>
              ) : (
                <Search size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
              )}
            </div>

            <div className="flex items-center gap-2 text-xs text-stone-500 font-medium self-end sm:self-auto">
              <span>Real-time connected to Nursery Knowledge Base</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 pt-1">
            <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px] shrink-0">
              Categories:
            </span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-full font-bold text-xs transition shrink-0 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#2F5233] text-white shadow-2xs'
                  : 'bg-[#FAF7F2] text-stone-700 hover:bg-stone-200'
              }`}
            >
              All Articles ({publishedArticles.length})
            </button>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full font-bold text-xs transition shrink-0 cursor-pointer ${
                  selectedCategory === cat
                    ? 'bg-[#2F5233] text-white shadow-2xs'
                    : 'bg-[#FAF7F2] text-stone-700 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* LOADING STATE */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs p-5 space-y-4 animate-pulse">
                <div className="h-48 bg-stone-200 rounded-2xl w-full" />
                <div className="h-4 bg-stone-200 rounded w-1/3" />
                <div className="h-6 bg-stone-200 rounded w-3/4" />
                <div className="h-12 bg-stone-100 rounded w-full" />
              </div>
            ))}
          </div>
        ) : filteredArticles.length > 0 ? (
          /* ARTICLES DISPLAY GRID */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-md transition flex flex-col justify-between group"
              >
                <div>
                  <div className="relative h-48 overflow-hidden bg-stone-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-[#2F5233] text-white text-[10px] font-black px-3 py-1 rounded-full uppercase tracking-wider shadow-sm">
                      {article.category}
                    </span>
                    {article.readTime && (
                      <span className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-xs text-white text-[11px] font-medium px-2.5 py-0.5 rounded-full flex items-center gap-1">
                        <Clock size={11} /> {article.readTime}
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="flex items-center gap-3 text-[11px] text-stone-500">
                      <span className="flex items-center gap-1 font-medium">
                        <User size={12} className="text-[#E8862E]" /> {authorName(article.author)}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 font-medium">
                        <Calendar size={12} /> {article.date}
                      </span>
                    </div>

                    <h2 className="font-serif font-black text-stone-900 text-lg leading-snug group-hover:text-[#2F5233] transition">
                      {article.title}
                    </h2>

                    <p className="text-stone-600 text-xs leading-relaxed line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0 border-t border-stone-100 mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[11px] text-stone-400 font-bold">
                    <Eye size={13} /> {article.views || 100}+ views
                  </div>

                  <button
                    onClick={() => setSelectedArticle(article)}
                    className="px-4 py-2 bg-[#2F5233] hover:bg-[#1E3A20] text-white text-xs font-bold rounded-xl transition flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight size={13} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#E8862E] flex items-center justify-center mx-auto">
              <BookOpen size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-serif font-bold text-stone-900">No Articles Found</h3>
              <p className="text-stone-500 text-xs max-w-sm mx-auto">
                No published plant care guides matched your search or category filter. Try clearing your search parameters.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="px-5 py-2.5 bg-[#2F5233] hover:bg-[#1E3A20] text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
            >
              Reset Search & Filters
            </button>
          </div>
        )}
      </div>

      {/* ARTICLE READER MODAL */}
      {selectedArticle && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-3xl max-w-2xl w-full overflow-hidden shadow-2xl my-8 relative flex flex-col max-h-[90vh]">
            {/* Modal Header Bar */}
            <div className="p-4 bg-[#FAF7F2] border-b border-stone-200 flex items-center justify-between">
              <span className="text-xs font-bold text-[#2F5233] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen size={14} className="text-[#E8862E]" /> {selectedArticle.category} Article
              </span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="w-8 h-8 rounded-full bg-stone-200 hover:bg-stone-300 flex items-center justify-center text-stone-600 cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {/* Modal Scroll Content */}
            <div className="p-6 overflow-y-auto space-y-5">
              <div className="relative h-60 rounded-2xl overflow-hidden">
                <img
                  src={selectedArticle.image}
                  alt={selectedArticle.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex items-center gap-3 text-xs text-stone-500">
                <span className="font-bold text-stone-800">By {authorName(selectedArticle.author)}</span>
                <span>•</span>
                <span>{selectedArticle.date}</span>
                <span>•</span>
                <span className="font-mono text-[#2F5233] font-bold">{selectedArticle.readTime}</span>
              </div>

              <h2 className="text-2xl font-serif font-black text-stone-900 leading-snug">
                {selectedArticle.title}
              </h2>

              <p className="text-stone-700 text-sm font-medium italic bg-amber-50/70 p-4 rounded-xl border-l-4 border-[#E8862E]">
                "{selectedArticle.excerpt}"
              </p>

              <div className="space-y-4 text-stone-700 text-sm leading-relaxed border-t border-stone-100 pt-4">
                {Array.isArray(selectedArticle.content) ? (
                  selectedArticle.content.map((p, idx) => <p key={idx}>{p}</p>)
                ) : (
                  <p>{selectedArticle.content}</p>
                )}
              </div>

              {selectedArticle.tags && selectedArticle.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-4 border-t border-stone-100">
                  {selectedArticle.tags.map((tag) => (
                    <span key={tag} className="text-[11px] font-bold bg-stone-100 text-stone-600 px-3 py-1 rounded-full flex items-center gap-1">
                      <Tag size={10} /> {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-[#FAF7F2] border-t border-stone-200 flex items-center justify-between">
              <span className="text-xs text-stone-500 font-medium">Amtola Organic Nursery Guide</span>
              <button
                onClick={() => setSelectedArticle(null)}
                className="px-5 py-2 bg-[#2F5233] text-white text-xs font-bold rounded-xl hover:bg-[#1E3A20] transition cursor-pointer"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
