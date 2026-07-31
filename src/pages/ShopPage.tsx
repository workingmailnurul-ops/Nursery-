import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Sprout, Filter, Search, X } from 'lucide-react';
import { PRODUCTS, COMBO_PACKS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { QuickViewModal } from '../components/QuickViewModal';
import { useCart } from '../context/CartContext';
import { Product } from '../types';

export const ShopPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { addToCart } = useCart();

  const activeCategory = searchParams.get('cat') || 'all';
  const searchQuery = searchParams.get('q') || '';

  const [selectedCategory, setSelectedCategory] = useState<string>(activeCategory);
  const [searchTerm, setSearchTerm] = useState<string>(searchQuery);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  const allPlants = useMemo(() => {
    return [...PRODUCTS, ...COMBO_PACKS];
  }, []);

  const filteredPlants = useMemo(() => {
    return allPlants.filter((plant) => {
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

      return matchesCategory && matchesSearch;
    });
  }, [allPlants, selectedCategory, searchTerm]);

  const handleCategorySelect = (catId: string) => {
    setSelectedCategory(catId);
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
      <div className="bg-white p-6 rounded-2xl border border-stone-200 shadow-2xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4">
          <div>
            <h1 className="text-2xl font-serif font-bold text-[#2F5233] flex items-center gap-2">
              <Sprout size={24} className="text-[#E8862E]" /> All Grafted Saplings & Combos
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Showing {filteredPlants.length} certified mother-scion fruit trees ready for courier delivery.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <input
              type="text"
              placeholder="Filter by name (e.g. Haribhanga)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
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

        {/* Category Pills Filter */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-stone-400 font-bold uppercase tracking-wider text-[10px] shrink-0 flex items-center gap-1">
            <Filter size={12} /> Filter:
          </span>
          {[
            { id: 'all', name: 'All Saplings' },
            { id: 'mango', name: 'Mango' },
            { id: 'guava', name: 'Guava' },
            { id: 'citrus', name: 'Lemon & Citrus' },
            { id: 'exotic', name: 'Exotic Varieties' },
            { id: 'combo', name: 'Combo Bundles' },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => handleCategorySelect(cat.id)}
              className={`px-3 py-1.5 rounded-xl font-bold transition shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#2F5233] text-white shadow-xs'
                  : 'bg-[#FAF7F2] text-stone-600 hover:bg-stone-200 border border-stone-200'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Plants Grid */}
      {filteredPlants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredPlants.map((plant) => (
            <ProductCard
              key={plant.id}
              product={plant}
              onAddToCart={(p) => addToCart(p, 1)}
              onQuickView={(p) => setQuickViewProduct(p)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-white p-12 rounded-2xl border border-stone-200 text-center space-y-3">
          <p className="font-serif font-bold text-lg text-[#2F5233]">
            No saplings found matching "{searchTerm || selectedCategory}"
          </p>
          <p className="text-xs text-stone-500">
            Try searching for "Mango", "Guava", "Malta", or clear your filter parameters.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSearchTerm('');
            }}
            className="px-4 py-2 bg-[#2F5233] text-white text-xs font-bold rounded-xl"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={addToCart}
      />
    </div>
  );
};
