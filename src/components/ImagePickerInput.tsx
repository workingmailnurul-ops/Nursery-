import React, { useState, useRef } from 'react';
import { Upload, Image as ImageIcon, X, Check, Sparkles, ImagePlus, Images } from 'lucide-react';

interface ImagePickerInputProps {
  label?: string;
  value: string;
  onChange: (url: string) => void;
  placeholder?: string;
  required?: boolean;
}

const STOCK_GALLERY_IMAGES = [
  {
    category: 'Citrus & Malta',
    items: [
      { name: 'Bari-1 Malta & Lemon', url: 'https://images.unsplash.com/photo-1595231712325-2fecd1f532a3?auto=format&fit=crop&w=600&q=80' },
      { name: 'Kagzi Seedless Lime', url: 'https://images.unsplash.com/photo-1534531141161-e4160499e97c?auto=format&fit=crop&w=600&q=80' },
      { name: 'Fresh Citrus Oranges', url: 'https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?auto=format&fit=crop&w=600&q=80' },
    ]
  },
  {
    category: 'Mangoes & Tropical',
    items: [
      { name: 'Katimon All-Time Mango', url: 'https://images.unsplash.com/photo-1553279768-865429fa0078?auto=format&fit=crop&w=600&q=80' },
      { name: 'Haribhanga Mango Graft', url: 'https://images.unsplash.com/photo-1601493700631-2b16ec4b4716?auto=format&fit=crop&w=600&q=80' },
      { name: 'Miyazaki Red Mango', url: 'https://images.unsplash.com/photo-1591073113125-e46713c829ed?auto=format&fit=crop&w=600&q=80' },
    ]
  },
  {
    category: 'Guava, Pomegranate & Fruits',
    items: [
      { name: 'Thai-7 Seedless Guava', url: 'https://images.unsplash.com/photo-1536511135764-896eef67191f?auto=format&fit=crop&w=600&q=80' },
      { name: 'Red Ruby Pomegranate', url: 'https://images.unsplash.com/photo-1596363505729-4190a9506133?auto=format&fit=crop&w=600&q=80' },
      { name: 'Red Dragon Fruit', url: 'https://images.unsplash.com/photo-1528825871115-3581a5387919?auto=format&fit=crop&w=600&q=80' },
    ]
  },
  {
    category: 'Palms & Exotic',
    items: [
      { name: 'Vietnam Dwarf Coconut', url: 'https://images.unsplash.com/photo-1598880940371-c756e015fea1?auto=format&fit=crop&w=600&q=80' },
      { name: 'Red Passion Fruit', url: 'https://images.unsplash.com/photo-1546548970-71785318a17b?auto=format&fit=crop&w=600&q=80' },
    ]
  },
  {
    category: 'Indoor & Garden Foliage',
    items: [
      { name: 'Monstera Deliciosa', url: 'https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80' },
      { name: 'Fiddle Leaf Fig', url: 'https://images.unsplash.com/photo-1545241047-6083a3684587?auto=format&fit=crop&w=600&q=80' },
      { name: 'Rubber Black Prince', url: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=600&q=80' },
    ]
  },
  {
    category: 'Care & Fertilizers',
    items: [
      { name: 'Organic Mustard Oil Cake', url: 'https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=600&q=80' },
      { name: 'Vermi-Compost & Soil', url: 'https://images.unsplash.com/photo-1617576683096-00fc8eecb3af?auto=format&fit=crop&w=600&q=80' },
      { name: 'Pruning & Potting', url: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?auto=format&fit=crop&w=600&q=80' },
    ]
  }
];

export const ImagePickerInput: React.FC<ImagePickerInputProps> = ({
  label,
  value,
  onChange,
  placeholder = 'https://images.unsplash.com/...',
  required = false,
}) => {
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [activeTab, setActiveTab] = useState(STOCK_GALLERY_IMAGES[0].category);
  const [dragOver, setDragOver] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      alert('Please select a valid image file');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      if (event.target?.result) {
        onChange(event.target.result as string);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onChange(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-stone-700 font-semibold mb-1 text-xs">
          {label} {required && <span className="text-rose-500">*</span>}
        </label>
      )}

      {/* Main Container */}
      <div className="space-y-2">
        {/* Preview box if image exists */}
        {value && (
          <div className="relative group w-full h-28 bg-stone-100 rounded-2xl overflow-hidden border border-stone-200">
            <img
              src={value}
              alt="Selected Preview"
              className="w-full h-full object-cover"
              onError={(e) => {
                // Fallback thumbnail if url broken
                (e.target as HTMLImageElement).src =
                  'https://images.unsplash.com/photo-1595231712325-2fecd1f532a3?auto=format&fit=crop&w=400&q=80';
              }}
            />
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="px-2.5 py-1 bg-white text-stone-900 text-[11px] font-bold rounded-lg shadow-xs flex items-center gap-1 hover:bg-stone-100 cursor-pointer"
              >
                <Upload size={12} /> Replace
              </button>
              <button
                type="button"
                onClick={() => onChange('')}
                className="p-1 bg-rose-600 text-white rounded-lg shadow-xs hover:bg-rose-700 cursor-pointer"
                title="Remove image"
              >
                <X size={14} />
              </button>
            </div>
            <span className="absolute bottom-1.5 left-2 bg-black/60 backdrop-blur-xs text-white text-[10px] font-bold px-2 py-0.5 rounded-md">
              Selected Image Preview
            </span>
          </div>
        )}

        {/* Input & Action Buttons */}
        <div className="space-y-2">
          {/* URL Text Input */}
          <input
            type="url"
            value={value}
            required={required && !value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs focus:ring-2 focus:ring-[#2F5233] focus:outline-hidden"
          />

          {/* Action Row: Upload from Gallery + Preset Plant Gallery */}
          <div
            onDragOver={(e) => {
              e.preventDefault();
              setDragOver(true);
            }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            className={`grid grid-cols-2 gap-2 p-2 rounded-xl border border-dashed transition ${
              dragOver ? 'border-emerald-600 bg-emerald-50' : 'border-stone-300 bg-stone-50/50'
            }`}
          >
            {/* Hidden File Input */}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {/* Upload from Gallery / Computer Button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-white hover:bg-emerald-50 border border-stone-200 text-[#2F5233] rounded-lg text-xs font-bold transition shadow-2xs cursor-pointer group"
            >
              <ImagePlus size={15} className="text-emerald-700 group-hover:scale-110 transition-transform" />
              <span>Add from Gallery</span>
            </button>

            {/* Stock Nursery Gallery Picker */}
            <button
              type="button"
              onClick={() => setShowGalleryModal(true)}
              className="flex items-center justify-center gap-1.5 py-2 px-3 bg-[#2F5233] hover:bg-[#1E3A20] text-white rounded-lg text-xs font-bold transition shadow-2xs cursor-pointer"
            >
              <Sparkles size={14} className="text-amber-300 animate-pulse" />
              <span>Plant Stock Gallery</span>
            </button>
          </div>
        </div>
      </div>

      {/* STOCK PLANT GALLERY MODAL */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-60 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 space-y-4 shadow-2xl border border-stone-200 max-h-[85vh] flex flex-col">
            <div className="flex items-center justify-between border-b border-stone-200 pb-3">
              <div>
                <h3 className="text-base font-serif font-black text-[#2F5233] flex items-center gap-2">
                  <ImageIcon size={20} className="text-emerald-700" /> Nursery Stock Plant Gallery
                </h3>
                <p className="text-xs text-stone-500">
                  Select a high-resolution photo from our verified plant collection
                </p>
              </div>
              <button
                type="button"
                onClick={() => setShowGalleryModal(false)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-lg hover:bg-stone-100"
              >
                <X size={20} />
              </button>
            </div>

            {/* Category Tabs */}
            <div className="flex gap-1.5 overflow-x-auto pb-2 border-b border-stone-100 scrollbar-none shrink-0">
              {STOCK_GALLERY_IMAGES.map((cat) => (
                <button
                  key={cat.category}
                  type="button"
                  onClick={() => setActiveTab(cat.category)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition cursor-pointer ${
                    activeTab === cat.category
                      ? 'bg-[#2F5233] text-white shadow-xs'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {cat.category}
                </button>
              ))}
            </div>

            {/* Gallery Grid */}
            <div className="flex-1 overflow-y-auto pr-1">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {STOCK_GALLERY_IMAGES.find((c) => c.category === activeTab)?.items.map((img) => {
                  const isSelected = value === img.url;
                  return (
                    <div
                      key={img.url}
                      onClick={() => {
                        onChange(img.url);
                        setShowGalleryModal(false);
                      }}
                      className={`relative group h-32 rounded-2xl overflow-hidden border-2 cursor-pointer transition-all ${
                        isSelected
                          ? 'border-emerald-600 ring-4 ring-emerald-100'
                          : 'border-stone-200 hover:border-emerald-400'
                      }`}
                    >
                      <img
                        src={img.url}
                        alt={img.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent p-2 flex flex-col justify-end text-white">
                        <span className="text-[11px] font-bold line-clamp-1">{img.name}</span>
                      </div>

                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-emerald-600 text-white p-1 rounded-full shadow-md">
                          <Check size={14} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-3 border-t border-stone-200 flex justify-between items-center text-xs">
              <button
                type="button"
                onClick={() => {
                  fileInputRef.current?.click();
                  setShowGalleryModal(false);
                }}
                className="text-[#2F5233] font-bold hover:underline flex items-center gap-1 cursor-pointer"
              >
                <Images size={14} /> Upload custom image from device gallery instead
              </button>
              <button
                type="button"
                onClick={() => setShowGalleryModal(false)}
                className="px-4 py-2 border border-stone-300 rounded-xl text-stone-600 font-bold hover:bg-stone-50"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
