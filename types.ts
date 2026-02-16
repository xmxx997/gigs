
export enum JobCategory {
  SERVICE = 'service',
  PHYSICAL = 'physical',
  TECHNICAL = 'technical',
  CREATIVE = 'creative'
}

export interface Job {
  id: string;
  title: string;
  company: string;
  category: JobCategory;
  pay: string;
  payFrequency: 'hour' | 'day' | 'week' | 'gig';
  description: string;
  location: [number, number]; // [lat, lng]
  address: string;
  distance: string;
  shift: string;
  spots: number;
  tags: string[];
  imageUrl: string;
  isImmediate: boolean;
  contactNumber: string;
  icon: string;
}

export interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  center: [number, number];
  isActive: boolean;
}

export interface Availability {
  morning: boolean;
  night: boolean;
  weekend: boolean;
  immediate: boolean;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isMe: boolean;
}

export interface Conversation {
  id: string;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastMessage: string;
  messages: Message[];
  role: string;
}

export interface FilterState {
  categories: JobCategory[];
  minPay: number;
  immediateOnly: boolean;
}
