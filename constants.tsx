
import { Job, JobCategory, Conversation } from './types';

const generateJobs = (): Job[] => {
  const categories = Object.values(JobCategory);
  const companies = [
    'Neural Dynamics', 'Orbital Logistics', 'Cyber-Bite', 'Neon Pulse', 'UCI Bio-Labs', 
    'Spectrum Tech', 'Jamboree Retail', 'Turtle Rock Security', 'Hexa-Delivery', 'Future-Fab'
  ];
  
  const irvineCenter = { lat: 33.6846, lng: -117.8265 };
  
  const jobTemplates = [
    { title: 'Drone Operator', cat: JobCategory.TECHNICAL, icon: '🚁', tags: ['Flying', 'Remote'] },
    { title: 'Cyber-Barista', cat: JobCategory.SERVICE, icon: '☕', tags: ['High Energy', 'Tips'] },
    { title: 'Exo-Loader', cat: JobCategory.PHYSICAL, icon: '🏋️', tags: ['Heavy Lifting', 'Strength'] },
    { title: 'AR Muralist', cat: JobCategory.CREATIVE, icon: '🎨', tags: ['Design', 'Public'] },
    { title: 'Security Sentinel', cat: JobCategory.SERVICE, icon: '🛡️', tags: ['Vigilance', 'Patrol'] },
    { title: 'Data Scrubber', cat: JobCategory.TECHNICAL, icon: '💻', tags: ['Logic', 'Concentration'] },
    { title: 'Courier 01', cat: JobCategory.PHYSICAL, icon: '🚚', tags: ['Fast', 'Transit'] },
    { title: 'Hologram Editor', cat: JobCategory.CREATIVE, icon: '📽️', tags: ['Video', 'Editing'] },
    { title: 'Syntho-Chef', cat: JobCategory.SERVICE, icon: '🍔', tags: ['Cooking', 'Precision'] },
    { title: 'Circuit Welder', cat: JobCategory.TECHNICAL, icon: '🔧', tags: ['Hard Work', 'Detail'] },
    { title: 'Night Gardener', cat: JobCategory.PHYSICAL, icon: '🌳', tags: ['Outdoor', 'Botany'] },
    { title: 'Audio Architect', cat: JobCategory.CREATIVE, icon: '🎵', tags: ['Sound', 'Music'] },
    { title: 'Dog Walker (Cyber-Paws)', cat: JobCategory.SERVICE, icon: '🐕', tags: ['Animals', 'Outdoors'] },
    { title: 'Solar Tech', cat: JobCategory.TECHNICAL, icon: '⚡', tags: ['Energy', 'Safety'] },
    { title: 'Bio-Sampler', cat: JobCategory.TECHNICAL, icon: '🧪', tags: ['Research', 'Lab'] },
    { title: 'Night Club Guard', cat: JobCategory.SERVICE, icon: '🕶️', tags: ['Security', 'Vibe'] },
    { title: 'Package Sorcerer', cat: JobCategory.PHYSICAL, icon: '📦', tags: ['Warehouse', 'Speed'] },
    { title: 'Street Musician (Holo)', cat: JobCategory.CREATIVE, icon: '🎸', tags: ['Performance', 'Crowd'] },
    { title: 'Event Host', cat: JobCategory.SERVICE, icon: '🎤', tags: ['Public Speaking', 'Social'] },
    { title: 'E-Waste Recycler', cat: JobCategory.PHYSICAL, icon: '♻️', tags: ['Green', 'Scraps'] }
  ];

  const jobs: Job[] = [];
  for (let i = 1; i <= 50; i++) {
    const template = jobTemplates[i % jobTemplates.length];
    const latOffset = (Math.random() - 0.5) * 0.12;
    const lngOffset = (Math.random() - 0.5) * 0.12;
    const payValue = 20 + Math.floor(Math.random() * 40);
    
    jobs.push({
      id: `${i}`,
      title: template.title,
      company: companies[i % companies.length],
      category: template.cat,
      pay: `$${payValue}`,
      payFrequency: Math.random() > 0.8 ? 'day' : 'hour',
      description: `A unique opportunity to contribute to the thriving ${template.cat} sector of the Irvine Grid. Requirements: Focus and reliability.`,
      location: [irvineCenter.lat + latOffset, irvineCenter.lng + lngOffset],
      address: `Grid-Node ${1000 + i}, Irvine Sector`,
      distance: `${(Math.random() * 5).toFixed(1)}km`,
      shift: Math.random() > 0.5 ? '08:00 - 16:00' : '20:00 - 04:00',
      spots: 1 + Math.floor(Math.random() * 10),
      tags: [...template.tags, 'Local'],
      imageUrl: `https://picsum.photos/seed/${i + 100}/400/300`,
      isImmediate: Math.random() > 0.7,
      contactNumber: `+1-949-NEO-${i.toString().padStart(2, '0')}`,
      icon: template.icon
    });
  }
  return jobs;
};

export const MOCK_JOBS: Job[] = generateJobs();

export const MOCK_CONVERSATIONS: Conversation[] = [
  {
    id: 'c1',
    name: 'Maya @ GreenGarden',
    role: 'Shop Owner',
    avatar: '🌿',
    status: 'online',
    lastMessage: 'I loved your previous work! Ready to help out today?',
    messages: [
      { id: 'm1', senderId: 'maya', text: 'Hi! I saw you were looking for outdoor work near Irvine.', timestamp: '11:45 AM', isMe: false },
      { id: 'm2', senderId: 'me', text: 'Hey Maya! Yes, I love working in gardens. I saw your post.', timestamp: '11:46 AM', isMe: true },
      { id: 'm3', senderId: 'maya', text: 'I loved your previous work! Ready to help out today? We have a big shipment arriving.', timestamp: '11:50 AM', isMe: false },
    ]
  },
  {
    id: 'c2',
    name: 'Leo (Creative Lead)',
    role: 'Studio Partner',
    avatar: '🎨',
    status: 'online',
    lastMessage: 'The AR layers look perfect. Meet at the site?',
    messages: [
      { id: 'm4', senderId: 'leo', text: 'Check the new mural coordinates.', timestamp: '09:30 AM', isMe: false },
      { id: 'm5', senderId: 'leo', text: 'The AR layers look perfect. Meet at the site?', timestamp: '09:35 AM', isMe: false },
    ]
  },
  {
    id: 'c3',
    name: 'Kae @ Neon Pulse',
    role: 'Event Designer',
    avatar: '✨',
    status: 'offline',
    lastMessage: 'Thanks for the quick assist yesterday! You rock.',
    messages: [
      { id: 'm6', senderId: 'kae', text: 'Thanks for the quick assist yesterday! You rock.', timestamp: 'Yesterday', isMe: false },
    ]
  }
];

export const CATEGORY_STYLES: Record<JobCategory, { color: string; neon: string }> = {
  [JobCategory.SERVICE]: { color: 'bg-cyan-500', neon: 'shadow-[0_0_15px_#00f3ff] border-[#00f3ff] text-[#00f3ff]' },
  [JobCategory.PHYSICAL]: { color: 'bg-fuchsia-500', neon: 'shadow-[0_0_15px_#ff00ff] border-[#ff00ff] text-[#ff00ff]' },
  [JobCategory.TECHNICAL]: { color: 'bg-lime-500', neon: 'shadow-[0_0_15px_#cfff04] border-[#cfff04] text-[#cfff04]' },
  [JobCategory.CREATIVE]: { color: 'bg-amber-500', neon: 'shadow-[0_0_15px_#ffbd00] border-[#ffbd00] text-[#ffbd00]' },
};
