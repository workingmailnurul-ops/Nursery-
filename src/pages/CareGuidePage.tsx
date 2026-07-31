import React from 'react';
import { BookOpen, Droplets, Sun, Sprout, ShieldAlert } from 'lucide-react';
import { Card } from '../components/Card';

export const CareGuidePage: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="bg-white p-6 rounded-2xl border border-[#2F5233]/15 space-y-2">
        <h1 className="text-2xl font-bold font-serif text-[#2F5233] flex items-center gap-2">
          <BookOpen size={24} className="text-[#E8862E]" /> Grafted Plant Care Guide
        </h1>
        <p className="text-xs text-stone-600">
          Expert recommendations for planting, watering, and fertilizing grafted fruit tree saplings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card hoverEffect={false} className="p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#2F5233]/10 text-[#2F5233] flex items-center justify-center">
            <Sun size={20} />
          </div>
          <h3 className="font-bold text-lg text-[#2F5233]">Sunlight Requirements</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Grafted fruit saplings require 6–8 hours of direct morning sunlight daily for optimal leaf development and fruit set.
          </p>
        </Card>

        <Card hoverEffect={false} className="p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#2F5233]/10 text-[#2F5233] flex items-center justify-center">
            <Droplets size={20} />
          </div>
          <h3 className="font-bold text-lg text-[#2F5233]">Watering & Moisture</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Keep soil moist but well-drained. Avoid waterlogging around the graft union joint to protect from root rot.
          </p>
        </Card>

        <Card hoverEffect={false} className="p-5 space-y-3">
          <div className="w-10 h-10 rounded-xl bg-[#2F5233]/10 text-[#2F5233] flex items-center justify-center">
            <Sprout size={20} />
          </div>
          <h3 className="font-bold text-lg text-[#2F5233]">Graft Joint Protection</h3>
          <p className="text-xs text-stone-600 leading-relaxed">
            Ensure the graft tape remains intact for the first 3 months. Prune away any suckers emerging below the graft tape line.
          </p>
        </Card>
      </div>
    </div>
  );
};
