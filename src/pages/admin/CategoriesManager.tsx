import React, { useState } from 'react';
import { Layers, Plus, Edit3, Trash2, Eye, EyeOff, Sparkles, X, Check } from 'lucide-react';
import { AdminCategory } from './adminData';
import { ImagePickerInput } from '../../components/ImagePickerInput';

interface CategoriesManagerProps {
  categories: AdminCategory[];
  onAddCategory: (cat: AdminCategory) => void;
  onUpdateCategory: (cat: AdminCategory) => void;
  onDeleteCategory?: (id: string) => void;
}

export const CategoriesManager: React.FC<CategoriesManagerProps> = ({
  categories,
  onAddCategory,
  onUpdateCategory,
  onDeleteCategory,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<AdminCategory | null>(null);

  const [formData, setFormData] = useState({
    name: '',
    slug: '',
    popularVariety: '',
    image: '',
    description: '',
  });

  const openAddModal = () => {
    setEditingCategory(null);
    setFormData({
      name: '',
      slug: '',
      popularVariety: '',
      image: 'https://images.unsplash.com/photo-1595231712325-2fecd1f532a3?auto=format&fit=crop&w=400&q=80',
      description: '',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (cat: AdminCategory) => {
    setEditingCategory(cat);
    setFormData({
      name: cat.name,
      slug: cat.slug,
      popularVariety: cat.popularVariety,
      image: cat.image,
      description: cat.description,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;

    if (editingCategory) {
      onUpdateCategory({
        ...editingCategory,
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        popularVariety: formData.popularVariety,
        image: formData.image,
        description: formData.description,
      });
    } else {
      onAddCategory({
        id: `cat-${Date.now()}`,
        name: formData.name,
        slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, '-'),
        itemCount: 0,
        popularVariety: formData.popularVariety || 'Hybrid Selection',
        image: formData.image || 'https://images.unsplash.com/photo-1595231712325-2fecd1f532a3?auto=format&fit=crop&w=400&q=80',
        description: formData.description,
        status: 'active',
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-stone-200 shadow-2xs">
        <div>
          <h2 className="text-xl font-serif font-black text-[#2F5233] flex items-center gap-2">
            <Layers size={22} className="text-emerald-700" /> Plant Categories & Taxonomies
          </h2>
          <p className="text-xs text-stone-500">
            Organize plant varieties by fruit type, care level, and nursery collections.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#2F5233] hover:bg-[#1E3A20] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      {/* Grid of Categories */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {categories.map((cat) => (
          <div
            key={cat.id}
            className="bg-white rounded-3xl border border-stone-200 shadow-2xs overflow-hidden flex flex-col justify-between hover:border-emerald-500 transition-all group"
          >
            <div className="relative h-36 bg-stone-100 overflow-hidden">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-4 flex flex-col justify-between text-white">
                <div className="flex justify-between items-start">
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      cat.status === 'active'
                        ? 'bg-emerald-500 text-white'
                        : 'bg-stone-600 text-stone-200'
                    }`}
                  >
                    {cat.status === 'active' ? 'Active' : 'Hidden'}
                  </span>

                  <div className="flex gap-1">
                    <button
                      onClick={() =>
                        onUpdateCategory({
                          ...cat,
                          status: cat.status === 'active' ? 'hidden' : 'active',
                        })
                      }
                      className="p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-lg backdrop-blur-xs transition"
                      title="Toggle Visibility"
                    >
                      {cat.status === 'active' ? <Eye size={14} /> : <EyeOff size={14} />}
                    </button>
                    <button
                      onClick={() => openEditModal(cat)}
                      className="p-1.5 bg-black/40 hover:bg-black/60 text-white rounded-lg backdrop-blur-xs transition"
                      title="Edit Category"
                    >
                      <Edit3 size={14} />
                    </button>
                    {onDeleteCategory && (
                      <button
                        onClick={() => {
                          if (confirm(`Delete category "${cat.name}"?`)) {
                            onDeleteCategory(cat.id);
                          }
                        }}
                        className="p-1.5 bg-red-600/80 hover:bg-red-700 text-white rounded-lg backdrop-blur-xs transition cursor-pointer"
                        title="Delete Category"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="font-serif font-black text-base text-white">{cat.name}</h3>
                  <span className="text-[11px] text-stone-300 font-mono">slug: /{cat.slug}</span>
                </div>
              </div>
            </div>

            <div className="p-4 space-y-3">
              <p className="text-xs text-stone-600 line-clamp-2 font-medium">
                {cat.description || 'Mother-scion grafted varieties engineered for early fruit production.'}
              </p>

              <div className="flex items-center justify-between text-xs pt-2 border-t border-stone-100 font-semibold">
                <span className="text-stone-500">Popular: <span className="text-stone-800">{cat.popularVariety}</span></span>
                <span className="bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-extrabold text-[11px]">
                  {cat.itemCount} Varieties
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* MODAL FOR ADD/EDIT CATEGORY */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-stone-200">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-base font-serif font-bold text-[#2F5233]">
                {editingCategory ? 'Edit Plant Category' : 'Create New Category'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-stone-700 mb-1">Category Name *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Exotic Fruit Plants"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-stone-700 mb-1">Slug URL</label>
                <input
                  type="text"
                  placeholder="e.g. exotic-fruits"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div>
                <label className="block text-stone-700 mb-1">Popular Variety Highlight</label>
                <input
                  type="text"
                  placeholder="e.g. Thai Red Dragon Fruit"
                  value={formData.popularVariety}
                  onChange={(e) => setFormData({ ...formData, popularVariety: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <ImagePickerInput
                label="Category Image"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
              />

              <div>
                <label className="block text-stone-700 mb-1">Description</label>
                <textarea
                  rows={2}
                  placeholder="Brief description of plants in this category..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div className="flex justify-end gap-2 pt-3 border-t border-stone-200">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-xl text-stone-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#2F5233] text-white rounded-xl shadow-xs"
                >
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
