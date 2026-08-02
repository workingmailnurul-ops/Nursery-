import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Share2,
  Bookmark,
  Check,
  Tag,
  BookOpen,
  ChevronRight,
  Sparkles,
  User,
} from 'lucide-react';
import { useFirestore } from '../context/FirestoreContext';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { blogs, isLoading } = useFirestore();
  const [copied, setCopied] = React.useState(false);

  // Match post by slug or id or title
  const post = React.useMemo(() => {
    if (!blogs.length) return null;
    const cleanSlug = slug?.toLowerCase().trim();
    return blogs.find((p) => p.slug?.toLowerCase() === cleanSlug || p.id.toLowerCase() === cleanSlug) || blogs[0];
  }, [blogs, slug]);

  const relatedPosts = React.useMemo(() => {
    if (!post) return [];
    return blogs.filter((p) => p.id !== post.id).slice(0, 2);
  }, [blogs, post]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center p-8">
        <p className="text-stone-600 font-bold">Loading article...</p>
      </div>
    );
  }

  const authorName = typeof post.author === 'string' ? post.author : post.author?.name || 'Horticulture Agronomist';
  const authorRole = typeof post.author === 'object' ? post.author?.role : 'Nursery Specialist';
  const authorAvatar = typeof post.author === 'object' && post.author?.avatar ? post.author.avatar : 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80';

  const contentParagraphs = Array.isArray(post.content) ? post.content : [post.content];

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      {/* BREADCRUMB HEADER */}
      <div className="bg-white border-b border-stone-200 py-3 px-4">
        <div className="max-w-4xl mx-auto flex items-center justify-between text-xs text-stone-500">
          <div className="flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
            <Link to="/" className="hover:text-[#2A8A3C]">Home</Link>
            <ChevronRight size={12} />
            <Link to="/blog" className="hover:text-[#2A8A3C]">Blog</Link>
            <ChevronRight size={12} />
            <span className="text-stone-800 font-bold truncate max-w-[200px] sm:max-w-xs">{post.title}</span>
          </div>

          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-1 text-xs font-bold text-[#2A8A3C] hover:underline cursor-pointer"
          >
            <ArrowLeft size={14} /> Back to Blog
          </button>
        </div>
      </div>

      {/* ARTICLE WRAPPER */}
      <article className="max-w-4xl mx-auto px-4 pt-8 space-y-8">
        {/* POST META HEADER */}
        <div className="space-y-4 text-center sm:text-left">
          <span className="inline-block bg-[#2F5233] text-white text-[11px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider">
            {post.category}
          </span>

          <h1 className="text-2xl sm:text-4xl font-serif font-black text-stone-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-y border-stone-200 py-4">
            <div className="flex items-center gap-3">
              <img
                src={authorAvatar}
                alt={authorName}
                className="w-10 h-10 rounded-full object-cover border-2 border-[#2F5233]"
              />
              <div className="text-left">
                <span className="font-bold text-xs sm:text-sm text-stone-900 block leading-tight">
                  {authorName}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  {authorRole}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-stone-500 text-xs font-medium">
              <span className="flex items-center gap-1">
                <Calendar size={13} /> {post.date}
              </span>
              <span className="flex items-center gap-1">
                <Clock size={13} /> {post.readTime}
              </span>
              <button
                onClick={handleCopyLink}
                className="flex items-center gap-1 px-3 py-1.5 bg-white border border-stone-200 rounded-lg text-stone-700 hover:bg-stone-100 transition cursor-pointer"
              >
                {copied ? <Check size={13} className="text-emerald-600" /> : <Share2 size={13} />}
                <span>{copied ? 'Copied' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* HERO IMAGE */}
        <div className="rounded-3xl overflow-hidden shadow-md border border-stone-200 aspect-video">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        </div>

        {/* CONTENT BODY */}
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-stone-200 shadow-2xs space-y-6 text-stone-800 leading-relaxed text-sm sm:text-base">
          {contentParagraphs.map((paragraph, idx) => (
            <p key={idx} className="whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>

        {/* RELATED ARTICLES */}
        {relatedPosts.length > 0 && (
          <div className="pt-8 space-y-4">
            <h3 className="text-xl font-serif font-black text-[#2F5233]">More Gardening Guides</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedPosts.map((r) => (
                <Link
                  key={r.id}
                  to={`/blog/${r.slug}`}
                  className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-md transition flex items-center gap-4"
                >
                  <img src={r.image} alt="" className="w-16 h-16 rounded-xl object-cover shrink-0" />
                  <div>
                    <h4 className="font-serif font-bold text-sm text-stone-900 leading-snug line-clamp-2">
                      {r.title}
                    </h4>
                    <span className="text-[11px] text-[#E8862E] font-bold mt-1 block">Read Guide →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};
