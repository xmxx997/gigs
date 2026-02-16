
import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { MapContainer, TileLayer, useMap } from 'react-leaflet';
import { Search, SlidersHorizontal, Map as MapIcon, Zap, Navigation, ShieldCheck, Clock, RefreshCw, Sparkles, Calendar, MessageSquare } from 'lucide-react';
import { MOCK_JOBS, CATEGORY_STYLES } from './constants';
import { Job, JobCategory, Trip, Availability } from './types';
import JobMarker from './components/JobMarker';
import JobDetailsOverlay from './components/JobDetailsOverlay';
import TripPlanner from './components/TripPlanner';
import ChatRoom from './components/ChatRoom';

function MapController({ center }: { center: [number, number] }) {
  const map = useMap();
  useEffect(() => {
    map.setView(center, 13);
  }, [center, map]);
  return null;
}

const App: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState<JobCategory | 'all'>('all');
  const [activeTab, setActiveTab] = useState<'explore' | 'schedule' | 'connect'>('explore');
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Availability State
  const [availability, setAvailability] = useState<Availability>({
    morning: true,
    night: false,
    weekend: false,
    immediate: true
  });

  // Trip State
  const [trips, setTrips] = useState<Trip[]>([
    { id: 't1', destination: 'Irvine Sector', startDate: 'MAR 01', endDate: 'MAR 15', center: [33.6846, -117.8265], isActive: true },
    { id: 't2', destination: 'San Diego Grid', startDate: 'MAR 20', endDate: 'MAR 28', center: [32.7157, -117.1611], isActive: false }
  ]);

  const activeTrip = useMemo(() => trips.find(t => t.isActive) || trips[0], [trips]);

  const filteredJobs = useMemo(() => {
    return MOCK_JOBS.filter(job => {
      const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                           job.company.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = activeCategory === 'all' || job.category === activeCategory;
      const matchesImmediate = !availability.immediate || job.isImmediate;
      
      return matchesSearch && matchesCategory && matchesImmediate;
    });
  }, [searchQuery, activeCategory, availability, activeTrip]);

  const handleRefresh = useCallback(() => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 800);
  }, []);

  const toggleAvailability = (key: keyof Availability) => {
    setAvailability(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const activateTrip = (id: string) => {
    setTrips(prev => prev.map(t => ({ ...t, isActive: t.id === id })));
    setActiveTab('explore');
  };

  const ListContent = () => (
    <div className={`flex flex-col h-full bg-[#050505] border-l border-[#00f3ff]/20 shadow-[-10px_0_30px_rgba(0,0,0,0.5)] ${isRefreshing ? 'opacity-50 grayscale animate-pulse' : ''}`}>
      <div className="p-6 border-b border-[#00f3ff]/10 bg-black/40 backdrop-blur-md">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-[#00f3ff] shadow-[0_0_8px_#00f3ff] animate-pulse"></div>
            <h2 className="mono text-[10px] font-black text-[#00f3ff] tracking-[0.4em] uppercase">City_Feed</h2>
          </div>
          <button onClick={handleRefresh} className={`text-[#00f3ff] flex items-center gap-2 mono text-[10px] tracking-widest ${isRefreshing ? 'animate-spin' : ''}`}>
            <RefreshCw size={12} /> RE_SCAN
          </button>
        </div>
        <div className="flex items-baseline justify-between">
          <span className="text-2xl font-black italic uppercase text-white tracking-tighter truncate max-w-[150px]">{activeTrip.destination}</span>
          <span className="mono text-[10px] text-white/40 uppercase tracking-widest">Nodes: {filteredJobs.length}</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
        {filteredJobs.length > 0 ? filteredJobs.map(job => (
          <div key={job.id} onClick={() => setSelectedJob(job)} className="group relative bg-[#0a0a0c] border border-white/5 hover:border-[#00f3ff]/40 p-4 rounded-lg transition-all cursor-pointer">
            <div className="relative z-10 flex gap-4">
              <div className="w-16 h-16 rounded-lg bg-black border border-white/10 flex items-center justify-center text-3xl shrink-0 group-hover:scale-110 transition-transform">
                {job.icon}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-start">
                  <h3 className="font-black text-sm uppercase tracking-tight text-white group-hover:text-[#00f3ff] transition-colors truncate">{job.title}</h3>
                  <span className="text-[#cfff04] mono font-bold text-xs">{job.pay}</span>
                </div>
                <p className="text-[10px] mono text-white/40 uppercase mb-2">&gt; {job.company}</p>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-1 text-[9px] mono text-gray-500"><Clock size={10} /> {job.shift.split(' ')[0]}</div>
                  <div className="flex items-center gap-1 text-[9px] mono text-gray-500"><Navigation size={10} /> {job.distance}</div>
                  {job.isImmediate && <span className="ml-auto text-[8px] font-black text-green-400 tracking-widest animate-pulse">! URGENT</span>}
                </div>
              </div>
            </div>
          </div>
        )) : (
          <div className="flex flex-col items-center justify-center h-48 opacity-20 mono text-[10px] uppercase text-center space-y-4">
            <div className="w-8 h-8 border-2 border-dashed border-[#00f3ff] rounded-full animate-spin"></div>
            <p>No signal in sector</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="h-screen w-screen flex flex-col relative overflow-hidden bg-black text-white">
      
      {/* HUD Header (Shared) */}
      {(activeTab === 'explore' || activeTab === 'schedule') && (
        <div className="absolute top-0 left-0 right-0 z-[1500] p-4 sm:p-6 flex flex-col gap-4 pointer-events-none">
          <div className="flex gap-3 max-w-7xl mx-auto w-full pointer-events-auto">
            <div className="flex-1 bg-black/60 backdrop-blur-xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-[#00f3ff]/20 rounded-xl flex items-center px-4 py-4 transition-all focus-within:border-[#00f3ff]/60 group">
              <Search size={20} className="text-[#00f3ff] mr-4 opacity-70 group-focus-within:opacity-100" />
              <input 
                type="text" 
                placeholder="EXPLORE THE CITY..." 
                className="bg-transparent border-none outline-none w-full text-white mono text-xs tracking-wider placeholder:text-[#00f3ff]/30 uppercase"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            {activeTab === 'explore' && (
              <button className="bg-black/60 backdrop-blur-xl shadow-lg rounded-xl p-4 border border-[#00f3ff]/20 text-[#00f3ff] hover:bg-[#00f3ff]/10 transition-all">
                <SlidersHorizontal size={20} />
              </button>
            )}
          </div>
        </div>
      )}

      {/* Main View Port */}
      <div className="flex-1 relative">
        {activeTab === 'explore' && (
          <div className="h-full flex flex-row">
            <div className="flex-[2] relative hidden lg:block">
              <MapContainer center={activeTrip.center} zoom={13} scrollWheelZoom={true} zoomControl={false}>
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                />
                {filteredJobs.map(job => (
                  <JobMarker key={job.id} job={job} onClick={setSelectedJob} />
                ))}
                <MapController center={activeTrip.center} />
              </MapContainer>
            </div>
            <div className="flex-1 max-w-md xl:max-w-lg w-full">
              <ListContent />
            </div>
          </div>
        )}

        {activeTab === 'schedule' && (
          <TripPlanner 
            trips={trips} 
            availability={availability} 
            onUpdateAvailability={toggleAvailability}
            onActivateTrip={activateTrip}
          />
        )}

        {activeTab === 'connect' && <ChatRoom />}
      </div>

      {/* Navigation HUD */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[1600] pointer-events-none">
        <div className="bg-black/80 backdrop-blur-3xl p-2 rounded-3xl shadow-[0_0_60px_rgba(0,0,0,1)] border border-white/5 flex gap-2 pointer-events-auto">
          {[
            { id: 'explore', label: 'Explore', icon: Sparkles },
            { id: 'schedule', label: 'Schedule', icon: Calendar },
            { id: 'connect', label: 'Connect', icon: MessageSquare }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-8 py-3.5 rounded-2xl flex items-center gap-3 font-black text-[11px] transition-all uppercase tracking-widest italic ${
                activeTab === tab.id ? 'bg-[#00f3ff] text-black shadow-[0_0_30px_rgba(0,243,255,0.4)]' : 'text-white/40 hover:bg-white/5'
              }`}
            >
              <tab.icon size={18} />
              <span className="hidden sm:inline">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none z-[9999] opacity-[0.03] bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      
      {selectedJob && (
        <JobDetailsOverlay job={selectedJob} onClose={() => setSelectedJob(null)} />
      )}
    </div>
  );
};

export default App;
