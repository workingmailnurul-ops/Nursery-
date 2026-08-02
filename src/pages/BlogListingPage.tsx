import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  BookOpen,
  Search,
  Clock,
  Calendar,
  User,
  ArrowRight,
  ChevronRight,
  Tag,
} from 'lucide-react';
import { useFirestore } from '../context/FirestoreContext';

export const BlogListingPage: React.FC = () => {
  const { blogs, isLoading, error } = useFirestore();
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Plant Care', 'Rooftop Gardening', 'Nursery Science'];

  const publishedBlogs = blogs.filter((p) => p.status !== 'draft');

  const filteredPosts = publishedBlogs.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (post.tags && post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      {/* HERO HEADER */}
      <section className="bg-gradient-to-b from-[#1C3320] to-[#2A5232] text-white py-12 sm:py-16 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#E8862E] text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            <BookOpen size={14} />
            <span>Gardening Knowledge Base</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-amber-50">
            Plant Care Guides & Gardening Knowledge
          </h1>

          <p className="text-stone-200 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Expert horticultural advice, rooftop container guides, organic fertilizing schedules, and grafting tips directly from nursery agronomists.
          </p>

          {/* SEARCH BAR */}
          <div className="max-w-md mx-auto pt-2">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={18} />
              <input
                type="text"
                placeholder="Search care guides, fruits, soil mix..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white text-stone-800 rounded-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#E8862E] shadow-md placeholder:text-stone-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY FILTER TABS */}
      <section className="max-w-7xl mx-auto px-4 pt-8">
        <div className="flex items-center justify-center gap-2 flex-wrap border-b border-stone-200 pb-4">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-xs font-bold transition cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#2F5233] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* BLOG POSTS GRID */}
      <section className="max-w-7xl mx-auto px-4 py-10 space-y-6">
        {/* ERROR STATE */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-800 text-xs sm:text-sm font-medium">
            <strong>Firestore Error:</strong> {error}. Reconnecting live updates...
          </div>
        )}

        {/* LOADING STATE */}
        {isLoading && blogs.length === 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-white rounded-3xl border border-stone-200 p-6 space-y-4 animate-pulse">
                <div className="h-48 bg-stone-200 rounded-2xl w-full" />
                <div className="h-4 bg-stone-200 rounded w-1/3" />
                <div className="h-6 bg-stone-200 rounded w-3/4" />
                <div className="h-12 bg-stone-100 rounded w-full" />
              </div>
            ))}
          </div>
        ) : filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-lg transition group flex flex-col justify-between"
              >
                <div className="space-y-4">
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <span className="absolute top-3 left-3 bg-[#2F5233] text-white text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {post.category}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <div className="flex items-center gap-3 text-stone-400 text-xs">
                      <span className="flex items-center gap-1">
                        <Calendar size={13} /> {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock size={13} /> {post.readTime}
                      </span>
                    </div>

                    <h2 className="text-xl font-serif font-black text-stone-900 group-hover:text-[#2F5233] transition leading-snug">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h2>

                    <p className="text-xs text-stone-600 line-clamp-3 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    to={`/blog/${post.slug}`}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-[#E8862E] hover:underline pt-3 border-t border-stone-100 w-full justify-between"
                  >
                    <span>Read Full Article</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
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
              <h3 className="text-lg font-serif font-bold text-stone-900">No Gardening Guides Found</h3>
              <p className="text-stone-500 text-xs max-w-sm mx-auto">
                No blog posts matched your search or category selection.
              </p>
            </div>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="px-5 py-2.5 bg-[#2F5233] hover:bg-[#1E3A20] text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
            >
              Reset Blog Search
            </button>
          </div>
        )}
      </section>
    </div>
  );
};
