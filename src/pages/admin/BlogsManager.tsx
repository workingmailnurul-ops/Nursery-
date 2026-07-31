import React, { useState } from 'react';
import { BookOpen, Plus, Edit3, Trash2, Eye, Calendar, Sparkles, X } from 'lucide-react';
import { AdminBlogPost } from './adminData';
import { ImagePickerInput } from '../../components/ImagePickerInput';

interface BlogsManagerProps {
  blogPosts: AdminBlogPost[];
  onAddBlog: (post: AdminBlogPost) => void;
  onUpdateBlog: (post: AdminBlogPost) => void;
  onDeleteBlog: (id: string) => void;
}

export const BlogsManager: React.FC<BlogsManagerProps> = ({
  blogPosts,
  onAddBlog,
  onUpdateBlog,
  onDeleteBlog,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<AdminBlogPost | null>(null);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'Plant Care',
    author: 'Dr. Anita Roy',
    image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
    status: 'published' as 'published' | 'draft',
  });

  const openAddModal = () => {
    setEditingPost(null);
    setFormData({
      title: '',
      slug: '',
      category: 'Plant Care',
      author: 'Dr. Anita Roy',
      image: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80',
      status: 'published',
    });
    setIsModalOpen(true);
  };

  const openEditModal = (post: AdminBlogPost) => {
    setEditingPost(post);
    setFormData({
      title: post.title,
      slug: post.slug,
      category: post.category,
      author: post.author,
      image: post.image,
      status: post.status,
    });
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title) return;

    if (editingPost) {
      onUpdateBlog({
        ...editingPost,
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
        category: formData.category,
        author: formData.author,
        image: formData.image,
        status: formData.status,
      });
    } else {
      onAddBlog({
        id: `b-${Date.now()}`,
        title: formData.title,
        slug: formData.slug || formData.title.toLowerCase().replace(/\s+/g, '-'),
        category: formData.category,
        author: formData.author,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        readTime: '4 min read',
        status: formData.status,
        image: formData.image,
        views: 0,
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
            <BookOpen size={22} className="text-emerald-700" /> Plant Care Blog & Knowledge Base
          </h2>
          <p className="text-xs text-stone-500">
            Publish expert guides on grafted sapling acclimatization, soil mixes, and pruning tips.
          </p>
        </div>

        <button
          onClick={openAddModal}
          className="px-4 py-2.5 bg-[#2F5233] hover:bg-[#1E3A20] text-white text-xs font-bold rounded-xl shadow-xs transition flex items-center justify-center gap-2 cursor-pointer shrink-0"
        >
          <Plus size={16} /> Write New Article
        </button>
      </div>

      {/* Blogs Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded-3xl border border-stone-200 shadow-2xs overflow-hidden flex flex-col justify-between hover:border-emerald-500 transition-all group"
          >
            <div className="relative h-40 bg-stone-100 overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-3 left-3 right-3 flex justify-between items-center">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-[10px] font-extrabold shadow-xs ${
                    post.status === 'published'
                      ? 'bg-emerald-600 text-white'
                      : 'bg-amber-500 text-white'
                  }`}
                >
                  {post.status === 'published' ? 'Published' : 'Draft'}
                </span>

                <div className="flex gap-1">
                  <button
                    onClick={() => openEditModal(post)}
                    className="p-1.5 bg-black/50 hover:bg-black text-white rounded-lg backdrop-blur-xs transition"
                    title="Edit Post"
                  >
                    <Edit3 size={14} />
                  </button>
                  <button
                    onClick={() => onDeleteBlog(post.id)}
                    className="p-1.5 bg-rose-600/80 hover:bg-rose-600 text-white rounded-lg backdrop-blur-xs transition"
                    title="Delete Post"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
              <div className="space-y-1.5">
                <span className="text-[10px] text-[#2F5233] font-bold uppercase tracking-wider bg-emerald-50 px-2 py-0.5 rounded">
                  {post.category}
                </span>
                <h3 className="font-serif font-extrabold text-sm text-stone-900 leading-snug line-clamp-2">
                  {post.title}
                </h3>
              </div>

              <div className="pt-3 border-t border-stone-100 text-[11px] text-stone-500 flex items-center justify-between font-medium">
                <span>By {post.author}</span>
                <span className="flex items-center gap-1 font-bold text-stone-700">
                  <Eye size={12} /> {post.views} views
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* CREATE / EDIT BLOG MODAL */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 space-y-4 shadow-2xl border border-stone-200 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <h3 className="text-base font-serif font-bold text-[#2F5233]">
                {editingPost ? 'Edit Blog Article' : 'Write New Nursery Article'}
              </h3>
              <button onClick={() => setIsModalOpen(false)} className="text-stone-400 hover:text-stone-700">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs font-semibold">
              <div>
                <label className="block text-stone-700 mb-1">Article Title *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Grafted Mango Flowering Maintenance Guide"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-stone-700 mb-1">Category</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
                  >
                    <option value="Plant Care">Plant Care</option>
                    <option value="Rooftop Gardening">Rooftop Gardening</option>
                    <option value="Pest Management">Pest Management</option>
                    <option value="Fertilizer Guide">Fertilizer Guide</option>
                    <option value="Season Special">Season Special</option>
                  </select>
                </div>

                <div>
                  <label className="block text-stone-700 mb-1">Author Name</label>
                  <input
                    type="text"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
                  />
                </div>
              </div>

              <ImagePickerInput
                label="Banner Image"
                value={formData.image}
                onChange={(url) => setFormData({ ...formData, image: url })}
              />

              <div>
                <label className="block text-stone-700 mb-1">Publish Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2"
                >
                  <option value="published">Published (Visible on site)</option>
                  <option value="draft">Draft (Saved internally)</option>
                </select>
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
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
