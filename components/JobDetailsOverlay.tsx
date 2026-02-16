
import React, { useEffect, useState } from 'react';
import { Job } from '../types';
import { CATEGORY_STYLES } from '../constants';
import { geminiService } from '../services/geminiService';
import { X, Clock, MapPin, Users, Phone, Zap, Briefcase, ChevronRight, Target } from 'lucide-react';

interface JobDetailsOverlayProps {
  job: Job;
  onClose: () => void;
}

const JobDetailsOverlay: React.FC<JobDetailsOverlayProps> = ({ job, onClose }) => {
  const [summary, setSummary] = useState<string>("DECRYPTING INTEL...");

  useEffect(() => {
    const fetchSummary = async () => {
      const s = await geminiService.summarizeJob(job);
      setSummary(s);
    };
    fetchSummary();
  }, [job]);

  return (
    <div className="fixed inset-0 z-[2000] flex items-end sm:items-center justify-center p-0 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-[#0a0a0c] w-full max-w-xl border-t sm:border border-[#00f3ff]/30 shadow-[0_0_50px_rgba(0,243,255,0.1)] rounded-t-3xl sm:rounded-2xl overflow-hidden animate-in slide-in-from-bottom-20">
        
        {/* Header Visual */}
        <div className="relative h-48 border-b border-[#00f3ff]/20 flex items-center justify-center bg-black">
          <img src={job.imageUrl} alt={job.title} className="w-full h-full object-cover opacity-40 mix-blend-screen" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0c] via-transparent to-transparent"></div>
          
          <div className="absolute text-8xl opacity-80 z-10">{job.icon}</div>

          <button 
            onClick={onClose}
            className="absolute top-4 right-4 bg-black/60 border border-[#00f3ff]/40 p-2 rounded-lg text-[#00f3ff] hover:bg-[#00f3ff]/20 transition-all z-20"
          >
            <X size={20} />
          </button>

          <div className="absolute bottom-4 left-6 flex gap-3 z-20">
            {job.isImmediate && (
              <span className="bg-green-500/10 border border-green-400 text-green-400 px-3 py-1 rounded text-[10px] font-black tracking-widest flex items-center gap-1 shadow-[0_0_10px_rgba(74,222,128,0.2)]">
                <Zap size={10} fill="currentColor" /> PRIORITY ZERO
              </span>
            )}
            <span className={`bg-[#00f3ff]/10 border border-[#00f3ff] text-[#00f3ff] px-3 py-1 rounded text-[10px] font-black tracking-widest shadow-[0_0_10px_rgba(0,243,255,0.2)] uppercase`}>
              {job.category}
            </span>
          </div>
        </div>

        {/* Content HUD */}
        <div className="p-6 space-y-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-3xl font-black text-white tracking-tight uppercase italic">{job.title}</h2>
              <p className="text-[#00f3ff] mono text-sm font-bold opacity-80 uppercase tracking-tighter">&gt; {job.company}</p>
            </div>
            <div className="text-right">
              <span className="text-3xl font-black text-[#cfff04] mono tracking-tighter italic">{job.pay}</span>
              <p className="text-gray-500 mono text-[10px] uppercase">/ {job.payFrequency}</p>
            </div>
          </div>

          <div className="relative group overflow-hidden">
            <div className="absolute -left-2 top-0 bottom-0 w-1 bg-[#00f3ff]"></div>
            <div className="bg-[#00f3ff]/5 border border-[#00f3ff]/10 p-4 rounded-r-lg">
              <p className="text-[#00f3ff] text-sm italic font-medium leading-relaxed">
                <span className="text-white opacity-40 mr-2 mono">[INTEL]</span>
                {summary}
              </p>
            </div>
          </div>

          {/* Data Grid */}
          <div className="grid grid-cols-2 gap-px bg-[#00f3ff]/10 border border-[#00f3ff]/10 rounded-lg overflow-hidden">
            <div className="bg-[#0f0f12] p-4 flex items-center gap-3">
              <MapPin size={16} className="text-[#00f3ff]" />
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 mono uppercase">Location</span>
                <span className="text-xs text-gray-300 font-bold uppercase truncate">{job.address}</span>
              </div>
            </div>
            <div className="bg-[#0f0f12] p-4 flex items-center gap-3">
              <Clock size={16} className="text-[#00f3ff]" />
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 mono uppercase">Range</span>
                <span className="text-xs text-gray-300 font-bold uppercase">{job.distance}</span>
              </div>
            </div>
            <div className="bg-[#0f0f12] p-4 flex items-center gap-3">
              <Users size={16} className="text-[#00f3ff]" />
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 mono uppercase">Vacancy</span>
                <span className="text-xs text-gray-300 font-bold uppercase">{job.spots} Slots</span>
              </div>
            </div>
            <div className="bg-[#0f0f12] p-4 flex items-center gap-3">
              <Target size={16} className="text-[#00f3ff]" />
              <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 mono uppercase">Timing</span>
                <span className="text-xs text-gray-300 font-bold uppercase">{job.shift}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
             <div className="flex items-center gap-2 mb-2">
                <div className="h-px flex-1 bg-white/10"></div>
                <h3 className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em]">Briefing</h3>
                <div className="h-px flex-1 bg-white/10"></div>
             </div>
            <p className="text-gray-400 text-sm leading-relaxed px-2">
              {job.description}
            </p>
            <div className="flex flex-wrap gap-2 pt-2 px-2">
              {job.tags.map(tag => (
                <span key={tag} className="bg-black border border-white/10 text-white/50 px-2 py-1 rounded text-[10px] font-bold mono">
                  #{tag.replace(/\s/g, '').toUpperCase()}
                </span>
              ))}
            </div>
          </div>

          <div className="flex gap-4 pt-4">
            <button className="flex-1 bg-[#00f3ff] hover:bg-[#00f3ff]/80 text-black font-black py-4 rounded-lg shadow-[0_0_20px_rgba(0,243,255,0.4)] transition-all active:scale-95 flex items-center justify-center gap-2 uppercase tracking-widest italic italic">
              ACCEPT CONTRACT <ChevronRight size={18} />
            </button>
            <a href={`tel:${job.contactNumber}`} className="bg-transparent border-2 border-[#00f3ff]/20 hover:border-[#00f3ff] p-4 rounded-lg transition-all text-[#00f3ff] group">
              <Phone size={24} className="group-hover:rotate-12 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetailsOverlay;
