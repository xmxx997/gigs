
import React from 'react';
import { Marker } from 'react-leaflet';
import L from 'leaflet';
import { Job } from '../types';
import { CATEGORY_STYLES } from '../constants';

interface JobMarkerProps {
  job: Job;
  onClick: (job: Job) => void;
}

const JobMarker: React.FC<JobMarkerProps> = ({ job, onClick }) => {
  const style = CATEGORY_STYLES[job.category];

  const customIcon = L.divIcon({
    className: 'custom-marker',
    html: `
      <div class="relative w-12 h-12 flex items-center justify-center">
        <div class="absolute inset-0 rounded-full border-2 ${style.neon} bg-black/40 backdrop-blur-sm flex items-center justify-center text-xl transition-all duration-300 transform group-hover:scale-110">
          ${job.icon}
        </div>
        <div class="absolute -inset-1 rounded-full opacity-30 neon-pulse-${job.category} border-2"></div>
      </div>
    `,
    iconSize: [48, 48],
    iconAnchor: [24, 24],
  });

  return (
    <Marker 
      position={job.location} 
      icon={customIcon}
      eventHandlers={{
        click: () => onClick(job),
      }}
    />
  );
};

export default JobMarker;
