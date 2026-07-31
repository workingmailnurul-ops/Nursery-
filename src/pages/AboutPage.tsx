import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sprout,
  Award,
  ShieldCheck,
  Truck,
  HeartHandshake,
  Users,
  Building2,
  Trees,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
} from 'lucide-react';

export const AboutPage: React.FC = () => {
  const stats = [
    { label: 'Years of Green Experience', value: '12+', icon: <Award className="w-6 h-6 text-[#2A8A3C]" /> },
    { label: 'Happy Green Homes Served', value: '500,000+', icon: <Users className="w-6 h-6 text-[#2A8A3C]" /> },
    { label: 'Cities & Towns Covered', value: '1,200+', icon: <MapPin className="w-6 h-6 text-[#2A8A3C]" /> },
    { label: 'Transit Survival Rate', value: '98.4%', icon: <ShieldCheck className="w-6 h-6 text-[#2A8A3C]" /> },
  ];

  const values = [
    {
      title: '100% Certified Mother-Scion Grafting',
      description: 'We strictly propagate our fruit saplings using verified scion wood harvested from proven, high-yield mother trees. No wild seed surprises.',
      icon: <Sprout className="w-6 h-6 text-[#2A8A3C]" />,
    },
    {
      title: 'Proprietary Live-Plant Transit Packaging',
      description: 'Every plant is encased in moisture-retaining gel, root-protecting coco-peat wrap, and ventilated wooden/corrugated frames engineered for transit survival.',
      icon: <Truck className="w-6 h-6 text-[#2A8A3C]" />,
    },
    {
      title: '48-Hour Transit Damage Guarantee',
      description: 'We take full responsibility for live plant delivery. If your plant arrives damaged or wilted, submit a picture within 48 hours for a 100% free replacement.',
      icon: <ShieldCheck className="w-6 h-6 text-[#2A8A3C]" />,
    },
    {
      title: 'Lifetime Agronomist & Growing Support',
      description: 'Our customer support isn\'t over when the courier arrives. Access expert advice on soil mix, organic fertilizers, pest management, and pruning anytime.',
      icon: <HeartHandshake className="w-6 h-6 text-[#2A8A3C]" />,
    },
  ];

  return (
    <div className="bg-[#FAF7F2] min-h-screen pb-16">
      {/* HERO SECTION */}
      <section className="bg-gradient-to-b from-[#1C3320] to-[#2A5232] text-white py-14 sm:py-20 px-4">
        <div className="max-w-5xl mx-auto text-center space-y-4">
          <div className="inline-flex items-center gap-2 bg-[#FF5252] text-white text-xs font-black px-3.5 py-1.5 rounded-full uppercase tracking-wider shadow-sm">
            <Sparkles size={14} />
            <span>Our Green Journey</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-serif font-black tracking-tight text-amber-50 leading-tight">
            Nurturing Green Dreams Across Every Home & Garden
          </h1>

          <p className="text-stone-200 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Talukdar Nursery was born out of a simple vision: to bring authentic, high-yielding grafted fruit trees, lush indoor plants, seeds, and expert gardening supplies straight from certified nursery grounds to your doorstep.
          </p>
        </div>
      </section>

      {/* STATS SECTION */}
      <section className="max-w-6xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {stats.map((s, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-stone-200 shadow-md text-center space-y-2 hover:border-[#2A8A3C] transition"
            >
              <div className="w-12 h-12 rounded-full bg-[#2A8A3C]/10 flex items-center justify-center mx-auto">
                {s.icon}
              </div>
              <div className="text-2xl sm:text-3xl font-serif font-black text-stone-900">
                {s.value}
              </div>
              <p className="text-stone-500 text-xs font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* OUR STORY & MISSION */}
      <section className="max-w-5xl mx-auto px-4 pt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-4">
            <span className="text-xs font-bold text-[#2A8A3C] uppercase tracking-wider">
              About Talukdar Nursery
            </span>
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900 leading-snug">
              Making Authentic Quality Green Life Accessible to Everyone
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              For decades, home gardeners faced two major frustrations: unverified seed-grown fruit plants that took 8+ years to bear fruit (often sour), and damaged, dehydrated plants during transport.
            </p>
            <p className="text-stone-600 text-xs sm:text-sm leading-relaxed">
              Talukdar Nursery pioneered certified mother-scion grafting techniques and eco-friendly moisture-wrap transit packaging. Today, whether you are setting up an 18-inch pot on a city balcony or planting a 5-acre commercial orchard, we provide healthy, vigorous saplings guaranteed to flourish.
            </p>

            <div className="pt-2 flex items-center gap-3">
              <Link
                to="/shop"
                className="bg-[#2A8A3C] hover:bg-[#226e30] text-white font-bold text-xs sm:text-sm px-6 py-2.5 rounded-lg inline-flex items-center gap-2 shadow-sm transition"
              >
                <span>Explore Plant Collections</span>
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="relative rounded-2xl overflow-hidden shadow-lg border-4 border-white bg-stone-200 aspect-4/3">
            <img
              src="https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&w=800&q=80"
              alt="Talukdar Nursery Plant Yard"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent flex items-end p-6 text-white">
              <div className="space-y-1">
                <span className="text-xs font-bold text-emerald-300 uppercase">State-of-the-Art Nursery Yard</span>
                <p className="text-sm font-semibold text-stone-100">Over 6,000+ Plant Varieties Nurtured with Organic Agronomy</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOUNDER NOTE */}
      <section className="max-w-5xl mx-auto px-4 pt-16">
        <div className="bg-white rounded-2xl p-6 sm:p-10 border border-stone-200 shadow-sm relative overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-28 h-28 sm:w-36 sm:h-36 rounded-full overflow-hidden shrink-0 border-4 border-[#2A8A3C]/20 shadow-md">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80"
                alt="Founder & Chief Agronomist"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3 text-center md:text-left">
              <span className="text-[11px] font-bold text-[#FF5252] uppercase tracking-wider bg-rose-50 px-3 py-1 rounded-full inline-block">
                A Note From Our Founder
              </span>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900">
                "When you plant a tree, you plant hope and health for generations."
              </h3>
              <p className="text-stone-600 text-xs sm:text-sm italic leading-relaxed">
                "We believe every rooftop, balcony, and farm deserves authentic green life. That is why we personally inspect our mother scion orchards, test our moisture-retaining packaging in extreme summer heat, and back every single plant with a replacement guarantee. Thank you for letting us be part of your green home journey."
              </p>
              <div>
                <span className="font-bold text-stone-900 text-sm block">Nitin Sharma</span>
                <span className="text-stone-500 text-xs">Founder & Chief Agronomist, Talukdar Nursery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CORE VALUES */}
      <section className="max-w-5xl mx-auto px-4 pt-16">
        <div className="text-center space-y-2 mb-10">
          <span className="text-xs font-bold text-[#2A8A3C] uppercase tracking-wider">
            Why Choose Us
          </span>
          <h2 className="text-2xl sm:text-3xl font-serif font-bold text-stone-900">
            The Talukdar Promise
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v, idx) => (
            <div
              key={idx}
              className="bg-white rounded-xl p-6 border border-stone-200 shadow-2xs space-y-2 hover:border-[#2A8A3C] transition"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-[#2A8A3C]/10 flex items-center justify-center shrink-0">
                  {v.icon}
                </div>
                <h3 className="font-bold text-stone-900 text-base">{v.title}</h3>
              </div>
              <p className="text-stone-500 text-xs sm:text-sm leading-relaxed pl-13">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
