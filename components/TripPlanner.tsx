
import React from 'react';
import { Calendar, MapPin, Plus, Clock, Zap, ShieldCheck, ChevronRight } from 'lucide-react';
import { Trip, Availability } from '../types';

interface TripPlannerProps {
  trips: Trip[];
  availability: Availability;
  onUpdateAvailability: (key: keyof Availability) => void;
  onActivateTrip: (id: string) => void;
}

const TripPlanner: React.FC<TripPlannerProps> = ({ trips, availability, onUpdateAvailability, onActivateTrip }) => {
  return (
    <div className="h-full bg-[#050505] overflow-y-auto custom-scrollbar p-6 pt-24 pb-32">
      <div className="max-w-2xl mx-auto space-y-8">
        
        {/* Availability HUD */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <Clock size={16} className="text-[#00f3ff]" />
            <h2 className="mono text-[10px] font-black text-[#00f3ff] tracking-[0.4em] uppercase">Active_Availability</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { key: 'morning', label: 'MORNING', icon: '🌅' },
              { key: 'night', label: 'NIGHT', icon: '🌙' },
              { key: 'weekend', label: 'WEEKEND', icon: '🗓️' },
              { key: 'immediate', label: 'ASAP', icon: '⚡' },
            ].map((item) => (
              <button
                key={item.key}
                onClick={() => onUpdateAvailability(item.key as keyof Availability)}
                className={`p-4 rounded-xl border transition-all flex flex-col items-center gap-2 mono text-[10px] font-bold tracking-widest ${
                  availability[item.key as keyof Availability]
                    ? 'bg-[#00f3ff]/10 border-[#00f3ff] text-[#00f3ff] shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                    : 'bg-white/5 border-white/10 text-white/40 hover:border-white/20'
                }`}
              >
                <span className="text-xl">{item.icon}</span>
                {item.label}
              </button>
            ))}
          </div>
        </section>

        {/* Current Manifests */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <MapPin size={16} className="text-[#ff00ff]" />
              <h2 className="mono text-[10px] font-black text-[#ff00ff] tracking-[0.4em] uppercase">Sector_Manifests</h2>
            </div>
            <button className="text-[10px] mono text-white/40 hover:text-white flex items-center gap-1">
              <Plus size={12} /> NEW_NODE
            </button>
          </div>
          
          <div className="space-y-4">
            {trips.map((trip) => (
              <div 
                key={trip.id}
                onClick={() => onActivateTrip(trip.id)}
                className={`relative group bg-[#0a0a0c] border p-5 rounded-2xl transition-all cursor-pointer ${
                  trip.isActive ? 'border-[#ff00ff]/60 shadow-[0_0_20px_rgba(255,0,255,0.1)]' : 'border-white/5 grayscale opacity-60 hover:opacity-100 hover:grayscale-0'
                }`}
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-xl font-black italic uppercase tracking-tight text-white">{trip.destination}</h3>
                    <p className="mono text-[10px] text-white/40 uppercase">{trip.startDate} — {trip.endDate}</p>
                  </div>
                  {trip.isActive && (
                    <span className="bg-[#ff00ff]/20 text-[#ff00ff] text-[8px] font-black px-2 py-1 rounded tracking-[0.2em] border border-[#ff00ff]/30">ACTIVE_GRID</span>
                  )}
                </div>
                
                <div className="flex items-center gap-4 text-[10px] mono text-white/30">
                  <div className="flex items-center gap-1"><ShieldCheck size={12} /> Status: Nominal</div>
                  <div className="flex items-center gap-1"><Zap size={12} /> 12 Local Matches</div>
                </div>

                <div className="absolute right-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ChevronRight size={20} className="text-[#ff00ff]" />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Confirmed Ops */}
        <section className="bg-gradient-to-b from-[#00f3ff]/5 to-transparent p-6 rounded-3xl border border-white/5">
          <div className="flex items-center gap-3 mb-6">
            <Calendar size={16} className="text-[#cfff04]" />
            <h2 className="mono text-[10px] font-black text-[#cfff04] tracking-[0.4em] uppercase">Mission_Log</h2>
          </div>
          
          <div className="space-y-6 relative">
            <div className="absolute left-[11px] top-2 bottom-2 w-px bg-white/10"></div>
            
            <div className="flex gap-4 relative">
              <div className="w-6 h-6 rounded-full bg-black border-2 border-[#cfff04] flex-shrink-0 z-10"></div>
              <div>
                <p className="text-xs font-black text-white uppercase italic">Cyber-Barista Shift</p>
                <p className="text-[10px] mono text-white/40 uppercase">Tomorrow, 07:00 @ Neural Cafe</p>
                <div className="mt-2 bg-[#cfff04]/10 border border-[#cfff04]/20 p-2 rounded text-[10px] mono text-[#cfff04]">
                  STATUS: CONFIRMED_NODE
                </div>
              </div>
            </div>

            <div className="flex gap-4 relative">
              <div className="w-6 h-6 rounded-full bg-black border-2 border-white/20 flex-shrink-0 z-10"></div>
              <div>
                <p className="text-xs font-black text-white/40 uppercase italic">Security Sentinel Interview</p>
                <p className="text-[10px] mono text-white/40 uppercase">Fri, 14:00 @ Turtle Rock</p>
              </div>
            </div>
          </div>
        </section>

      </div>
    </div>
  );
};

export default TripPlanner;
