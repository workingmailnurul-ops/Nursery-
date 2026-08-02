import React, { useState, useMemo } from 'react';
import { Sparkles, Filter, Search, X } from 'lucide-react';
import { useFirestore } from '../context/FirestoreContext';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { Product } from '../types';

export const TrendingPage: React.FC = () => {
  const { trendingProducts, isLoading } = useFirestore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Pagination
  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const filteredProducts = useMemo(() => {
    return trendingProducts.filter((p) => {
      const matchesCategory =
        selectedCategory === 'all' || p.category.toLowerCase() === selectedCategory.toLowerCase();
      const matchesSearch =
        !searchTerm ||
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.category.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [trendingProducts, selectedCategory, searchTerm]);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const paginatedProducts = filteredProducts.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      {/* HEADER */}
      <section className="bg-gradient-to-r from-[#1E3A20] via-[#2F5233] to-[#172D19] text-white py-12 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-3">
          <span className="inline-flex items-center gap-1.5 bg-[#E8862E] text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-xs">
            <Sparkles size={14} /> Hot Demand Stock
          </span>
          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-amber-50">
            Trending Fruit Saplings
          </h1>
          <p className="text-stone-200 text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Most popular grafted plant varieties currently trending among home orchardists and rooftop gardeners across India.
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* FILTERS & SEARCH ROW */}
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0 text-xs">
            <span className="text-stone-400 font-bold uppercase text-[10px] shrink-0 flex items-center gap-1">
              <Filter size={12} /> Filter:
            </span>
            {['all', 'mango', 'guava', 'citrus', 'exotic', 'plants'].map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setPage(1);
                }}
                className={`px-3.5 py-1.5 rounded-full font-bold capitalize transition cursor-pointer shrink-0 ${
                  selectedCategory === cat
                    ? 'bg-[#2F5233] text-white shadow-2xs'
                    : 'bg-[#FAF7F2] text-stone-600 hover:bg-stone-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search trending plants..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl py-2 pl-3.5 pr-8 text-xs font-medium text-stone-800 focus:ring-2 focus:ring-[#2F5233]"
            />
            {searchTerm ? (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X size={14} />
              </button>
            ) : (
              <Search size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
            )}
          </div>
        </div>

        {/* PRODUCTS GRID */}
        {paginatedProducts.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {paginatedProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onQuickView={(p) => setQuickViewProduct(p)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white p-12 text-center rounded-3xl border border-stone-200 text-stone-500 space-y-2">
            <p className="font-bold text-base">No trending products match your filter.</p>
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSearchTerm('');
              }}
              className="text-xs font-bold text-[#E8862E] hover:underline"
            >
              Reset Search & Filters
            </button>
          </div>
        )}

        {/* PAGINATION CONTROLS */}
        {totalPages > 1 && (
          <div className="flex items-center justify-center gap-2 pt-6">
            <button
              disabled={page === 1}
              onClick={() => setPage((p) => p - 1)}
              className="px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-50 disabled:opacity-40 cursor-pointer"
            >
              Previous
            </button>
            <span className="text-xs font-bold text-stone-600 px-2">
              Page {page} of {totalPages}
            </span>
            <button
              disabled={page === totalPages}
              onClick={() => setPage((p) => p + 1)}
              className="px-4 py-2 bg-white border border-stone-200 rounded-xl text-xs font-bold text-stone-700 hover:bg-stone-50 disabled:opacity-40 cursor-pointer"
            >
              Next
            </button>
          </div>
        )}
      </div>

      {quickViewProduct && (
        <QuickViewModal product={quickViewProduct} onClose={() => setQuickViewProduct(null)} />
      )}
    </div>
  );
};
