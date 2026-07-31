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
import { EXTENDED_BLOG_POSTS } from '../data/blogData';

export const BlogListingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const categories = ['All', 'Plant Care', 'Rooftop Gardening', 'Nursery Science'];

  const filteredPosts = EXTENDED_BLOG_POSTS.filter((post) => {
    const matchesCategory =
      selectedCategory === 'All' || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      {/* HERO HEADER */}
      <section className="bg-gradient-to-b from-[#1C3320] to-[#2A5232] text-white py-12 sm:py-16 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FF5252] text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            <BookOpen size={14} />
            <span>Gardening Knowledge Base</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-amber-50">
            Plant Care Guides & Gardening Tips
          </h1>

          <p className="text-stone-200 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
            Expert horticultural advice, rooftop container guide, organic fertilizing schedules, and grafting tips directly from Talukdar Nursery agronomists.
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
                className="w-full pl-10 pr-4 py-3 bg-white text-stone-800 rounded-full text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-[#FF5252] shadow-md placeholder:text-stone-400"
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
                  ? 'bg-[#2A8A3C] text-white shadow-xs'
                  : 'bg-white text-stone-700 hover:bg-stone-100 border border-stone-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* BLOG POSTS GRID */}
      <section className="max-w-7xl mx-auto px-4 pt-8">
        {filteredPosts.length === 0 ? (
          <div className="bg-white rounded-2xl p-12 text-center border border-stone-200 max-w-md mx-auto space-y-3">
            <BookOpen size={40} className="text-stone-300 mx-auto" />
            <h3 className="font-bold text-stone-800 text-base">No Articles Found</h3>
            <p className="text-stone-500 text-xs">
              No articles matched your search query "{searchQuery}". Try searching for terms like "grafted", "guava", or "soil".
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="text-xs font-bold text-[#FF5252] hover:underline"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <article
                key={post.id}
                className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-2xs hover:border-[#2A8A3C] hover:shadow-md transition duration-300 flex flex-col justify-between group"
              >
                <div className="space-y-4">
                  {/* Cover Image */}
                  <div className="relative h-48 bg-stone-100 overflow-hidden">
                    <img
                      src={post.image}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-3 left-3 bg-[#2A8A3C] text-white text-[10px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider shadow-xs">
                      {post.category}
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="px-5 space-y-2">
                    <div className="flex items-center gap-3 text-[11px] text-stone-400 font-medium">
                      <span className="flex items-center gap-1 text-stone-500">
                        <Calendar size={12} /> {post.date}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1 text-stone-500">
                        <Clock size={12} /> {post.readTime}
                      </span>
                    </div>

                    <Link to={`/blog/${post.slug}`}>
                      <h2 className="font-serif font-bold text-base text-stone-900 group-hover:text-[#FF5252] transition leading-snug">
                        {post.title}
                      </h2>
                    </Link>

                    <p className="text-stone-500 text-xs leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                </div>

                {/* Footer Meta */}
                <div className="p-5 pt-4 border-t border-stone-100 flex items-center justify-between mt-4">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.avatar}
                      alt={post.author.name}
                      className="w-7 h-7 rounded-full object-cover border border-stone-200"
                    />
                    <span className="text-xs font-semibold text-stone-700">
                      {post.author.name}
                    </span>
                  </div>

                  <Link
                    to={`/blog/${post.slug}`}
                    className="text-xs font-bold text-[#FF5252] group-hover:underline flex items-center gap-1"
                  >
                    <span>Read</span>
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};
