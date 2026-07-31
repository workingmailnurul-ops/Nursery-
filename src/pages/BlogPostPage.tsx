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
} from 'lucide-react';
import { EXTENDED_BLOG_POSTS } from '../data/blogData';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [copied, setCopied] = React.useState(false);

  const post = EXTENDED_BLOG_POSTS.find((p) => p.slug === slug) || EXTENDED_BLOG_POSTS[0];

  const relatedPosts = EXTENDED_BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 2);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

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
            className="flex items-center gap-1 text-xs font-bold text-[#2A8A3C] hover:underline"
          >
            <ArrowLeft size={14} /> Back to Blog
          </button>
        </div>
      </div>

      {/* ARTICLE WRAPPER */}
      <article className="max-w-4xl mx-auto px-4 pt-8 space-y-8">
        {/* POST META HEADER */}
        <div className="space-y-4 text-center sm:text-left">
          <span className="inline-block bg-[#2A8A3C] text-white text-[11px] font-extrabold px-3 py-1 rounded-md uppercase tracking-wider">
            {post.category}
          </span>

          <h1 className="text-2xl sm:text-4xl font-serif font-black text-stone-900 leading-tight">
            {post.title}
          </h1>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2 border-y border-stone-200 py-4">
            <div className="flex items-center gap-3">
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="w-10 h-10 rounded-full object-cover border-2 border-[#2A8A3C]"
              />
              <div className="text-left">
                <span className="font-bold text-xs sm:text-sm text-stone-900 block leading-tight">
                  {post.author.name}
                </span>
                <span className="text-[11px] text-stone-500 font-medium">
                  {post.author.role}
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-stone-500 font-medium">
              <span className="flex items-center gap-1">
                <Calendar size={14} className="text-stone-400" /> {post.date}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Clock size={14} className="text-stone-400" /> {post.readTime}
              </span>
              <button
                onClick={handleCopyLink}
                className="ml-2 flex items-center gap-1 bg-stone-100 hover:bg-stone-200 text-stone-700 px-3 py-1.5 rounded-md text-xs font-bold transition cursor-pointer"
              >
                {copied ? <Check size={14} className="text-emerald-600" /> : <Share2 size={14} />}
                <span>{copied ? 'Copied!' : 'Share'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* COVER IMAGE */}
        <div className="rounded-2xl overflow-hidden border border-stone-200 shadow-md h-64 sm:h-96 bg-stone-100">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>

        {/* RICH TEXT CONTENT */}
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-sm space-y-6 text-stone-800 text-sm sm:text-base leading-relaxed">
          {post.content.map((paragraph, index) => {
            if (paragraph.startsWith('### ')) {
              return (
                <h3 key={index} className="text-lg sm:text-xl font-serif font-bold text-stone-900 pt-4 border-b border-stone-100 pb-2">
                  {paragraph.replace('### ', '')}
                </h3>
              );
            }

            if (paragraph.includes('• ')) {
              const lines = paragraph.split('\n');
              return (
                <div key={index} className="bg-stone-50 p-4 rounded-xl border border-stone-200 space-y-2">
                  <span className="font-bold text-xs uppercase tracking-wider text-[#2A8A3C] block">
                    Key Recommendations
                  </span>
                  <ul className="space-y-1.5 text-xs sm:text-sm text-stone-700">
                    {lines.map((line, lIdx) => (
                      <li key={lIdx} className="font-medium">{line}</li>
                    ))}
                  </ul>
                </div>
              );
            }

            return <p key={index}>{paragraph}</p>;
          })}

          {/* TAGS FOOTER */}
          <div className="pt-6 border-t border-stone-200 flex items-center gap-2 flex-wrap">
            <span className="text-xs font-bold text-stone-500 uppercase tracking-wider flex items-center gap-1">
              <Tag size={14} /> Tags:
            </span>
            {post.tags.map((tag, idx) => (
              <span
                key={idx}
                className="bg-stone-100 text-stone-700 text-xs font-semibold px-2.5 py-1 rounded-md border border-stone-200"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* RELATED POSTS */}
        <section className="pt-8 space-y-4">
          <h3 className="text-lg font-serif font-bold text-stone-900 flex items-center gap-2">
            <BookOpen className="text-[#2A8A3C]" size={20} />
            <span>Related Gardening Articles</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {relatedPosts.map((rel) => (
              <Link
                key={rel.id}
                to={`/blog/${rel.slug}`}
                className="bg-white p-4 rounded-xl border border-stone-200 flex gap-4 hover:border-[#2A8A3C] transition shadow-2xs group"
              >
                <img
                  src={rel.image}
                  alt={rel.title}
                  className="w-20 h-20 rounded-lg object-cover shrink-0"
                />
                <div className="space-y-1 my-auto">
                  <span className="text-[10px] font-bold text-[#2A8A3C] uppercase">
                    {rel.category}
                  </span>
                  <h4 className="font-serif font-bold text-xs sm:text-sm text-stone-900 group-hover:text-[#FF5252] transition line-clamp-2">
                    {rel.title}
                  </h4>
                  <span className="text-[11px] text-stone-400 block">{rel.readTime}</span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </div>
  );
};
