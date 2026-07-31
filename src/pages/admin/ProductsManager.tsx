import React, { useState } from 'react';
import {
  Plus,
  Search,
  Edit3,
  Trash2,
  Filter,
  CheckCircle2,
  XCircle,
  Package,
  Sparkles,
  ExternalLink,
  X,
  Image as ImageIcon,
} from 'lucide-react';
import { Product } from '../../types';
import { ImagePickerInput } from '../../components/ImagePickerInput';

interface ProductsManagerProps {
  products: Product[];
  onAddProduct: (newProd: Product) => void;
  onUpdateProduct: (updated: Product) => void;
  onDeleteProduct: (productId: string) => void;
}

export const ProductsManager: React.FC<ProductsManagerProps> = ({
  products,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [stockFilter, setStockFilter] = useState<'all' | 'instock' | 'outOfStock'>('all');

  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    category: 'mango',
    price: 350,
    salePrice: 290,
    image: '',
    inStock: true,
    rating: 4.8,
    reviewCount: 12,
    badgeText: 'Mother Plant Scion',
    description: '',
    graftAge: '1.5 Year Grafted',
  });

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      category: 'mango',
      price: 350,
      salePrice: 290,
      image: 'https://images.unsplash.com/photo-1595231712325-2fecd1f532a3?auto=format&fit=crop&w=600&q=80',
      inStock: true,
      rating: 4.8,
      reviewCount: 15,
      badgeText: 'High Yield Graft',
      description: 'Genuine mother-scion grafted fruit plant ready for rooftop or orchard container planting.',
      graftAge: '1.5 Year Grafted',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (prod: Product) => {
    setEditingProduct(prod);
    setFormData({
      name: prod.name,
      category: prod.category,
      price: prod.price,
      salePrice: prod.salePrice || prod.price,
      image: prod.image,
      inStock: prod.inStock,
      rating: prod.rating,
      reviewCount: prod.reviewCount,
      badgeText: prod.badgeText || '',
      description: prod.description || '',
      graftAge: prod.graftAge || '1 Year Grafted',
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingProduct) {
      const updated: Product = {
        ...editingProduct,
        name: formData.name,
        category: formData.category as any,
        price: Number(formData.price),
        salePrice: Number(formData.salePrice),
        image: formData.image || editingProduct.image,
        inStock: formData.inStock,
        badgeText: formData.badgeText,
        description: formData.description,
        graftAge: formData.graftAge,
      };
      onUpdateProduct(updated);
    } else {
      const newProd: Product = {
        id: `prod-custom-${Date.now()}`,
        name: formData.name,
        category: formData.category as any,
        price: Number(formData.price),
        salePrice: Number(formData.salePrice),
        image: formData.image || 'https://images.unsplash.com/photo-1595231712325-2fecd1f532a3?auto=format&fit=crop&w=600&q=80',
        inStock: formData.inStock,
        rating: 5.0,
        reviewCount: 1,
        badgeText: formData.badgeText,
        description: formData.description,
        graftAge: formData.graftAge,
        potSizes: ['10-inch Soil Bag', '12-inch Grow Bag', '15-inch Container'],
      };
      onAddProduct(newProd);
    }

    setIsModalOpen(false);
  };

  // Filtered Products List
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesStock =
      stockFilter === 'all' ||
      (stockFilter === 'instock' && p.inStock) ||
      (stockFilter === 'outOfStock' && !p.inStock);

    return matchesSearch && matchesCategory && matchesStock;
  });

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-serif font-black text-[#2F5233] flex items-center gap-2">
            <Package size={22} className="text-emerald-700" /> Sapling Inventory Management
          </h2>
          <p className="text-xs text-stone-500">
            Total {products.length} catalog products listed for Talukdar Nursery.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#2F5233] hover:bg-[#1E3A20] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Plus size={16} /> Add New Plant Sapling
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-3 text-xs">
        {/* Search */}
        <div className="relative w-full md:w-72">
          <Search size={16} className="absolute left-3 top-2.5 text-stone-400" />
          <input
            type="text"
            placeholder="Search plant by name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl pl-9 pr-3 py-2 text-xs font-medium focus:ring-2 focus:ring-[#2F5233]"
          />
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 w-full md:w-auto flex-wrap">
          <div className="flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
            <Filter size={14} className="text-stone-500" />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-transparent text-stone-800 font-bold focus:outline-hidden"
            >
              <option value="all">All Categories</option>
              <option value="mango">Mango Saplings</option>
              <option value="guava">Guava Plants</option>
              <option value="citrus">Citrus & Malta</option>
              <option value="exotic">Exotic Fruits</option>
              <option value="indoor">Indoor Plants</option>
              <option value="plant-care">Organic Care</option>
            </select>
          </div>

          <div className="flex items-center gap-1.5 bg-stone-50 px-3 py-1.5 rounded-xl border border-stone-200">
            <select
              value={stockFilter}
              onChange={(e) => setStockFilter(e.target.value as any)}
              className="bg-transparent text-stone-800 font-bold focus:outline-hidden"
            >
              <option value="all">All Stock Status</option>
              <option value="instock">In Stock Only</option>
              <option value="outOfStock">Out of Stock Only</option>
            </select>
          </div>
        </div>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-3xl border border-stone-200 shadow-2xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="bg-[#FAF7F2] border-b border-stone-200 text-stone-600 font-bold uppercase tracking-wider text-[10px]">
                <th className="py-3 px-4">Product Info</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Regular Price</th>
                <th className="py-3 px-4">Sale Price</th>
                <th className="py-3 px-4">Stock Status</th>
                <th className="py-3 px-4">Graft Age</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-stone-100 font-medium">
              {filteredProducts.length === 0 ? (
                <tr>
                  <td colSpan={7} className="py-8 text-center text-stone-500">
                    No products found matching your search criteria.
                  </td>
                </tr>
              ) : (
                filteredProducts.map((p) => (
                  <tr key={p.id} className="hover:bg-stone-50/80 transition">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-3">
                        <img
                          src={p.image}
                          alt={p.name}
                          className="w-12 h-12 object-cover rounded-xl border border-stone-200 shrink-0"
                        />
                        <div>
                          <h4 className="font-serif font-bold text-stone-900 text-xs">
                            {p.name}
                          </h4>
                          {p.badgeText && (
                            <span className="text-[10px] text-[#2F5233] font-bold bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 inline-block mt-0.5">
                              {p.badgeText}
                            </span>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4 capitalize font-semibold text-stone-700">
                      {p.category}
                    </td>

                    <td className="py-3 px-4 text-stone-500 line-through">
                      ₹{p.price}
                    </td>

                    <td className="py-3 px-4 font-bold text-[#2F5233]">
                      ₹{p.salePrice || p.price}
                    </td>

                    <td className="py-3 px-4">
                      <button
                        onClick={() =>
                          onUpdateProduct({ ...p, inStock: !p.inStock })
                        }
                        className={`px-2.5 py-1 rounded-full text-[10px] font-bold transition flex items-center gap-1 cursor-pointer ${
                          p.inStock
                            ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                            : 'bg-rose-100 text-rose-800 border border-rose-300'
                        }`}
                      >
                        {p.inStock ? (
                          <>
                            <CheckCircle2 size={12} /> In Stock
                          </>
                        ) : (
                          <>
                            <XCircle size={12} /> Stock Out
                          </>
                        )}
                      </button>
                    </td>

                    <td className="py-3 px-4 text-stone-600 font-medium">
                      {p.graftAge || '1 Year Grafted'}
                    </td>

                    <td className="py-3 px-4 text-right space-x-2">
                      <button
                        onClick={() => openEditModal(p)}
                        className="p-1.5 bg-stone-100 hover:bg-stone-200 text-stone-700 rounded-lg transition cursor-pointer"
                        title="Edit Product"
                      >
                        <Edit3 size={14} />
                      </button>

                      <button
                        onClick={() => onDeleteProduct(p.id)}
                        className="p-1.5 bg-rose-50 hover:bg-rose-100 text-rose-600 rounded-lg transition cursor-pointer"
                        title="Delete Product"
                      >
                        <Trash2 size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD / EDIT PRODUCT MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-xl w-full p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-200 pb-4">
              <h3 className="text-lg font-serif font-black text-[#2F5233]">
                {editingProduct ? 'Edit Plant Sapling' : 'Add New Plant Sapling'}
              </h3>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 text-stone-400 hover:text-stone-700 rounded-full"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs font-semibold">
              <div>
                <label className="block text-stone-700 mb-1">Plant Variety Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Miyazaki Japanese Mango Grafted"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#2F5233]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#2F5233]"
                  >
                    <option value="mango">Mango Saplings</option>
                    <option value="guava">Guava Plants</option>
                    <option value="citrus">Citrus & Malta</option>
                    <option value="exotic">Exotic Fruits</option>
                    <option value="indoor">Indoor Plants</option>
                    <option value="plant-care">Organic Care</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 mb-1">Graft Age / Spec</label>
                  <input
                    type="text"
                    placeholder="e.g. 2 Year Grafted"
                    value={formData.graftAge}
                    onChange={(e) => setFormData({ ...formData, graftAge: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#2F5233]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 mb-1">Regular Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#2F5233]"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 mb-1">Discounted Sale Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formData.salePrice}
                    onChange={(e) => setFormData({ ...formData, salePrice: Number(e.target.value) })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#2F5233]"
                  />
                </div>
              </div>

              <ImagePickerInput
                label="Plant Photo (Main Image)"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
              />

              <div>
                <label className="block text-stone-700 mb-1">Badge Tagline (Optional)</label>
                <input
                  type="text"
                  placeholder="e.g. Bestseller, Limited Scion"
                  value={formData.badgeText}
                  onChange={(e) => setFormData({ ...formData, badgeText: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#2F5233]"
                />
              </div>

              <div>
                <label className="block text-stone-700 mb-1">Short Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe plant fruiting period, height, care instructions..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 focus:ring-2 focus:ring-[#2F5233]"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="inStockCheck"
                  checked={formData.inStock}
                  onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                  className="w-4 h-4 text-[#2F5233] accent-[#2F5233] rounded"
                />
                <label htmlFor="inStockCheck" className="text-stone-800 font-bold">
                  Currently Available in Stock for Order
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl text-stone-600 font-bold hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-[#2F5233] hover:bg-[#1E3A20] text-white font-bold rounded-xl shadow-xs"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
