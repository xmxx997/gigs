
import React, { useState } from 'react';
import { Send, ChevronLeft, MoreVertical, Search, Heart, User, Sparkles } from 'lucide-react';
import { MOCK_CONVERSATIONS } from '../constants';
import { Conversation } from '../types';

const ChatRoom: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<Conversation | null>(null);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim() || !selectedChat) return;
    setInput('');
  };

  return (
    <div className="h-full bg-[#050505] flex pt-20 pb-24">
      <div className="max-w-7xl mx-auto w-full flex h-full border-x border-white/5 bg-[#0a0a0c]/40 backdrop-blur-3xl rounded-3xl overflow-hidden">
        
        {/* Connection List */}
        <div className={`w-full lg:w-96 flex flex-col border-r border-white/5 bg-black/20 ${selectedChat ? 'hidden lg:flex' : 'flex'}`}>
          <div className="p-8">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-black italic uppercase text-white tracking-tighter flex items-center gap-2">
                Connect <Sparkles size={20} className="text-[#00f3ff]" />
              </h2>
              <button className="bg-white/5 p-2 rounded-full hover:bg-white/10 transition-colors">
                <User size={20} className="text-white/40" />
              </button>
            </div>
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input 
                type="text" 
                placeholder="Search conversations..." 
                className="w-full bg-white/5 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-sm text-white focus:outline-none focus:border-[#00f3ff]/30 transition-all placeholder:text-white/10"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto custom-scrollbar px-4 space-y-2">
            {MOCK_CONVERSATIONS.map((chat) => (
              <button
                key={chat.id}
                onClick={() => setSelectedChat(chat)}
                className={`w-full flex items-center gap-4 p-5 rounded-3xl transition-all group relative overflow-hidden ${
                  selectedChat?.id === chat.id ? 'bg-[#00f3ff]/10' : 'hover:bg-white/5'
                }`}
              >
                <div className="relative">
                  <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl bg-[#111] border-2 transition-transform group-hover:scale-105 ${
                    chat.status === 'online' ? 'border-[#00f3ff]' : 'border-white/5'
                  }`}>
                    {chat.avatar}
                  </div>
                  {chat.status === 'online' && (
                    <div className="absolute bottom-1 right-1 w-4 h-4 bg-[#00f3ff] rounded-full border-4 border-[#0a0a0c]"></div>
                  )}
                </div>
                <div className="flex-1 text-left min-w-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="text-base font-bold text-white truncate group-hover:text-[#00f3ff] transition-colors">{chat.name}</h3>
                    <span className="text-[10px] text-white/20 font-medium">10:12 AM</span>
                  </div>
                  <p className="text-xs text-[#00f3ff]/60 font-medium mb-1">{chat.role}</p>
                  <p className="text-xs text-white/30 truncate italic">"{chat.lastMessage}"</p>
                </div>
                {selectedChat?.id === chat.id && (
                   <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00f3ff]"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Messaging Area */}
        <div className={`flex-1 flex flex-col relative bg-black/10 ${!selectedChat ? 'hidden lg:flex items-center justify-center' : 'flex'}`}>
          {selectedChat ? (
            <>
              {/* Profile Header */}
              <div className="px-8 py-6 border-b border-white/5 flex items-center justify-between bg-black/30">
                <div className="flex items-center gap-4">
                  <button onClick={() => setSelectedChat(null)} className="lg:hidden text-white/60 mr-2">
                    <ChevronLeft size={28} />
                  </button>
                  <div className="w-14 h-14 rounded-full border-2 border-[#00f3ff]/30 flex items-center justify-center text-3xl bg-[#111] shadow-[0_0_20px_rgba(0,243,255,0.1)]">
                    {selectedChat.avatar}
                  </div>
                  <div>
                    <h3 className="text-lg font-black text-white uppercase italic tracking-tight">{selectedChat.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-[#00f3ff] uppercase tracking-widest">{selectedChat.status}</span>
                      <span className="text-white/10">•</span>
                      <span className="text-[10px] text-white/40 font-medium uppercase">{selectedChat.role}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button className="p-3 rounded-full bg-white/5 text-[#ff00ff]/60 hover:text-[#ff00ff] hover:bg-[#ff00ff]/10 transition-all">
                    <Heart size={20} />
                  </button>
                  <button className="p-3 rounded-full bg-white/5 text-white/20 hover:text-white transition-all">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>

              {/* Chat Feed */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
                {selectedChat.messages.map((msg) => (
                  <div key={msg.id} className={`flex ${msg.isMe ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[70%] ${msg.isMe ? 'items-end' : 'items-start'}`}>
                      <div className={`px-6 py-4 rounded-3xl text-sm leading-relaxed shadow-xl ${
                        msg.isMe 
                          ? 'bg-[#00f3ff] text-black font-bold rounded-tr-none' 
                          : 'bg-[#1a1a1e] text-white/80 rounded-tl-none border border-white/5'
                      }`}>
                        {msg.text}
                      </div>
                      <p className="text-[9px] text-white/20 font-bold mt-2 uppercase tracking-tighter">{msg.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Input Zone */}
              <div className="p-8">
                <div className="flex gap-4 bg-[#1a1a1e] p-2 rounded-3xl border border-white/5 focus-within:border-[#00f3ff]/40 transition-all shadow-2xl">
                  <input 
                    type="text" 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Say hello..." 
                    className="flex-1 bg-transparent border-none outline-none py-3 px-6 text-sm text-white placeholder:text-white/10"
                  />
                  <button 
                    onClick={handleSend}
                    className="bg-[#00f3ff] text-black px-6 rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-white transition-all active:scale-95 flex items-center gap-2"
                  >
                    Send <Send size={16} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="text-center space-y-6 max-w-sm px-8">
              <div className="w-32 h-32 bg-[#111] border border-[#00f3ff]/20 rounded-full flex items-center justify-center mx-auto shadow-[0_0_50px_rgba(0,243,255,0.05)]">
                 <Sparkles size={48} className="text-[#00f3ff]/40 animate-pulse" />
              </div>
              <h2 className="text-2xl font-black italic text-white/40 uppercase tracking-tighter">Start a Connection</h2>
              <p className="text-sm text-white/20 font-medium leading-relaxed italic">
                The city is full of opportunities and people ready to build together. Choose a node on the left to start a conversation.
              </p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

export default ChatRoom;
