import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Layers, ArrowRight, Search, Leaf, AlertCircle } from 'lucide-react';
import { useFirestore } from '../context/FirestoreContext';

export const CategoriesPage: React.FC = () => {
  const { categories, isLoading, error } = useFirestore();
  const [searchQuery, setSearchQuery] = useState('');

  const activeCategories = categories.filter(c => c.status !== 'hidden');

  const filteredCategories = activeCategories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
    (cat.popularVariety && cat.popularVariety.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      <section className="bg-gradient-to-r from-[#172D19] via-[#2F5233] to-[#1E3A20] text-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-[#E8862E] text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-xs">
            <Layers size={14} /> Complete Plant Taxonomy
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-amber-50">
            Nursery Plant Categories
          </h1>
          <p className="text-stone-200 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Explore certified grafted saplings organized by fruit species, rooftop adaptability, and specialized collections.
          </p>

          <div className="max-w-md mx-auto pt-2">
            <div className="relative">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400" size={16} />
              <input
                type="text"
                placeholder="Search category (e.g. Indoor Plants, Seeds, Mango)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 bg-white text-stone-800 rounded-full text-xs focus:outline-none focus:ring-2 focus:ring-[#E8862E] shadow-sm"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6">
        {/* ERROR STATE */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex items-center gap-3 text-red-800 text-xs sm:text-sm">
            <AlertCircle size={18} className="text-red-600 shrink-0" />
            <p><strong>Firestore Error:</strong> {error}. Reconnecting real-time listeners...</p>
          </div>
        )}

        {/* LOADING STATE */}
        {isLoading && categories.length === 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs p-5 space-y-4 animate-pulse">
                <div className="h-48 bg-stone-200 rounded-2xl w-full" />
                <div className="h-5 bg-stone-200 rounded w-1/2" />
                <div className="h-10 bg-stone-100 rounded w-full" />
              </div>
            ))}
          </div>
        ) : filteredCategories.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredCategories.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="bg-white rounded-3xl border border-stone-200 overflow-hidden shadow-2xs hover:shadow-lg transition group flex flex-col justify-between"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                  <span className="absolute top-3 right-3 bg-white/90 backdrop-blur-xs text-[#2F5233] text-[10px] font-black px-2.5 py-1 rounded-full shadow-xs">
                    {cat.itemCount || 10}+ Varieties
                  </span>
                  <div className="absolute bottom-3 left-4 right-4 text-white">
                    <h2 className="text-xl font-serif font-black drop-shadow-xs">{cat.name}</h2>
                    {cat.popularVariety && (
                      <p className="text-xs text-amber-200 font-medium flex items-center gap-1 mt-0.5">
                        <Leaf size={12} /> {cat.popularVariety}
                      </p>
                    )}
                  </div>
                </div>

                <div className="p-5 space-y-3 flex-1 flex flex-col justify-between bg-white">
                  <p className="text-xs text-stone-600 leading-relaxed">
                    {cat.description || `Browse top grafted ${cat.name} saplings for home gardens and commercial orchards.`}
                  </p>

                  <div className="pt-2 flex items-center justify-between text-xs font-bold text-[#2F5233] group-hover:text-[#E8862E] transition border-t border-stone-100">
                    <span>Explore Category Page</span>
                    <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          /* EMPTY STATE */
          <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center space-y-4">
            <div className="w-16 h-16 rounded-2xl bg-amber-50 text-[#E8862E] flex items-center justify-center mx-auto">
              <Layers size={32} />
            </div>
            <div className="space-y-1">
              <h3 className="text-lg font-serif font-bold text-stone-900">No Categories Found</h3>
              <p className="text-stone-500 text-xs max-w-sm mx-auto">
                No plant categories matched your search term. Try searching for "Mango", "Seeds", or "Guava".
              </p>
            </div>
            <button
              onClick={() => setSearchQuery('')}
              className="px-5 py-2.5 bg-[#2F5233] hover:bg-[#1E3A20] text-white font-bold text-xs rounded-xl shadow-xs transition cursor-pointer"
            >
              Clear Category Search
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
