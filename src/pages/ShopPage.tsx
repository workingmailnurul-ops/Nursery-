import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sprout, Filter, Search, X, SlidersHorizontal } from 'lucide-react';
import { useFirestore } from '../context/FirestoreContext';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { Product } from '../types';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { products, categories, isLoading, error } = useFirestore();

  const activeCategory = searchParams.get('cat') || 'all';
  const searchQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategory);
  const [searchTerm, setSearchTerm] = useState<string>(searchQuery);
  const [stockFilter, setStockFilter] = useState<'all' | 'instock'>('all');
  const [sortBy, setSortBy] = useState<'popularity' | 'price-low' | 'price-high' | 'rating'>('popularity');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Pagination
  const [page, setPage] = useState<number>(1);
  const itemsPerPage = 8;

  const filteredPlants = useMemo(() => {
    let list = products.filter((plant) => {
      // Category match
      const matchesCategory =
        selectedCategory === 'all' ||
        plant.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory === 'combo' && plant.id.startsWith('combo'));

      // Search match
      const query = searchTerm.toLowerCase().trim();
      const matchesSearch =
        !query ||
        plant.name.toLowerCase().includes(query) ||
        plant.category.toLowerCase().includes(query) ||
        (plant.scientificName && plant.scientificName.toLowerCase().includes(query));

      // Stock match
      const matchesStock = stockFilter === 'all' || plant.inStock;

      return matchesCategory && matchesSearch && matchesStock;
    });

    // Sorting
    if (sortBy === 'price-low') {
      list = list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      list = list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      list = list.sort((a, b) => b.rating - a.rating);
    } else {
      list = list.sort((a, b) => b.reviewCount - a.reviewCount);
    }

    return list;
  }, [products, selectedCategory, searchTerm, stockFilter, sortBy]);

  const totalPages = Math.ceil(filteredPlants.length / itemsPerPage);
  const paginatedPlants = filteredPlants.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
    setPage(1);
    if (catId === 'all') {
      searchParams.delete('cat');
    } else {
      searchParams.set('cat', catId);
    }
    setSearchParams(searchParams);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Page Title Header */}
      <div className="bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-stone-100 pb-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#2F5233] flex items-center gap-2">
              <Sprout size={24} className="text-[#E8862E]" /> All Grafted Saplings & Plant Catalog
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Showing {filteredPlants.length} certified mother-scion fruit trees ready for courier delivery across India.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Search plants (e.g. Mango, Guava)..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1);
              }}
              className="w-full bg-[#FAF7F2] border border-stone-300 rounded-xl py-2 pl-3.5 pr-8 text-xs font-medium text-stone-800 focus:ring-2 focus:ring-[#2F5233]"
            />
            {searchTerm ? (
              <button
                onClick={() => {
                  setSearchTerm('');
                  setPage(1);
                }}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <X size={14} />
              </button>
            ) : (
              <Search size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-stone-400" />
            )}
          </div>
        </div>

        {/* Category Pills Filter & Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-1 md:pb-0">
            <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px] shrink-0 flex items-center gap-1">
              <Filter size={12} /> Category:
            </span>
            <button
              onClick={() => handleCategorySelect('all')}
              className={`px-3 py-1.5 rounded-full font-bold transition shrink-0 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'bg-[#2F5233] text-white shadow-2xs'
                  : 'bg-[#FAF7F2] text-stone-700 hover:bg-stone-200'
              }`}
            >
              All Plants
            </button>

            {categories.map((c) => (
              <button
                key={c.id}
                onClick={() => handleCategorySelect(c.slug)}
                className={`px-3 py-1.5 rounded-full font-bold capitalize transition shrink-0 cursor-pointer ${
                  selectedCategory.toLowerCase() === c.slug.toLowerCase()
                    ? 'bg-[#2F5233] text-white shadow-2xs'
                    : 'bg-[#FAF7F2] text-stone-700 hover:bg-stone-200'
                }`}
              >
                {c.name}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3 shrink-0 self-end md:self-auto text-xs">
            {/* Stock Filter */}
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as any)}
              className="bg-[#FAF7F2] border border-stone-200 rounded-xl px-2.5 py-1.5 font-bold text-stone-700 text-xs cursor-pointer"
            >
              <option value="all">All Availability</option>
              <option value="instock">In Stock Only</option>
            </select>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[#FAF7F2] border border-stone-200 rounded-xl px-2.5 py-1.5 font-bold text-stone-700 text-xs cursor-pointer"
            >
              <option value="popularity">Sort by Popularity</option>
              <option value="rating">Top Rated</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* ERROR BANNER */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-xs sm:text-sm text-red-800 flex items-center justify-between">
          <p><strong>Error loading catalog:</strong> {error}. Real-time reconnecting...</p>
        </div>
      )}

      {/* Grid Display */}
      {isLoading && products.length === 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
            <div key={n} className="bg-white rounded-3xl border border-stone-200 p-4 space-y-3 animate-pulse">
              <div className="h-44 bg-stone-200 rounded-2xl w-full" />
              <div className="h-4 bg-stone-200 rounded w-3/4" />
              <div className="h-3 bg-stone-100 rounded w-1/2" />
              <div className="h-8 bg-stone-200 rounded-xl w-full" />
            </div>
          ))}
        </div>
      ) : paginatedPlants.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {paginatedPlants.map((plant) => (
            <ProductCard
              key={plant.id}
              product={plant}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 text-center rounded-3xl border border-stone-200 space-y-3">
          <p className="text-stone-600 font-bold text-base">No plants match your search filters.</p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
              setStockFilter('all');
            }}
            className="px-4 py-2 bg-[#2F5233] text-white font-bold text-xs rounded-xl shadow-xs hover:bg-[#1E3A20] cursor-pointer"
          >
            Clear All Filters
          </button>
        </div>
      )}

      {/* Pagination Controls */}
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

      {quickViewProduct && (
        <QuickViewModal
          product={quickViewProduct}
          onClose={() => setQuickViewProduct(null)}
        />
      )}
    </div>
  );
};
