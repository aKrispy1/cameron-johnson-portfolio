import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { portfolioLegends as initialLegends } from '../data/legends';
import CJLogo from '../components/CJLogo';
import LiquidBackground from '../components/LiquidBackground';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [dbLegends, setDbLegends] = useState([...initialLegends]);
  const [activeLegendId, setActiveLegendId] = useState(initialLegends[0]?.id || 1);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect security parameter');
    }
  };

  const activeLegend = dbLegends.find(l => l.id === activeLegendId) || dbLegends[0];

  const handleUpdate = (field, value) => {
    setDbLegends(prev => prev.map(l => l.id === activeLegendId ? { ...l, [field]: value } : l));
  };

  const handleUpdateCaseStudy = (field, value) => {
    handleUpdate('caseStudy', {
      ...activeLegend.caseStudy,
      [field]: value
    });
  };

  const handleAddColor = () => {
    const newColor = prompt("Enter HEX color code (e.g. #7D52FC):");
    if (newColor) {
      handleUpdate('colors', [...activeLegend.colors, newColor]);
    }
  };

  const handleDeleteColor = (idx) => {
    const newColors = [...activeLegend.colors];
    newColors.splice(idx, 1);
    handleUpdate('colors', newColors);
  };

  const handlePublish = async () => {
    try {
      const resp = await fetch('/api/saveLegends', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dbLegends)
      });
      const data = await resp.json();
      if (data.success) {
        alert("Dossier Database published! Legends data successfully serialized to source files.");
      } else {
        alert("Failed to write to file: " + data.error);
      }
    } catch (e) {
      alert("Failed to connect to Local Vite API: " + e.message);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full h-screen bg-[#0C0C11] flex items-center justify-center p-6 relative select-none">
        <LiquidBackground />
        
        {/* Secure login glass card */}
        <div className="glass-panel p-10 w-full max-w-sm text-center z-10 relative rounded-[2px] border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
           <span className="absolute top-3 left-4 font-mono text-[8px] text-white/30 font-bold">[SECURE_ACCESS]</span>
           <span className="absolute top-3 right-4 font-mono text-[8px] text-[var(--color-theme)] animate-pulse tracking-widest font-bold">STANDBY</span>
           
           <CJLogo className="w-14 h-14 mx-auto mb-6 text-[var(--color-theme)]" />
           <h2 className="text-white font-display text-sm font-bold tracking-[0.25em] uppercase mb-8">
             ADMIN ACCESS PORTAL
           </h2>
           <form onSubmit={handleLogin} className="flex flex-col gap-4">
             <input 
               type="password" 
               value={password} 
               onChange={(e) => setPassword(e.target.value)} 
               placeholder="ENTER KEY (admin)" 
               className="bg-white/5 border border-white/10 rounded-[2px] p-3 text-white focus:outline-none focus:border-[var(--color-theme)] tracking-widest text-center font-mono text-xs transition-colors outline-none font-bold" 
             />
             {error && <p className="text-red-500 font-mono text-[10px] tracking-wide mt-1 font-bold">{error}</p>}
             
             <button 
               type="submit" 
               className="bg-[#7D52FC] hover:bg-[#C380FF] text-[#FAF9FC] py-3 rounded-[2px] font-display text-xs font-bold transition-all tracking-[0.2em] cursor-pointer shadow-md hover:scale-[1.02]"
             >
               AUTHORIZE KEY
             </button>
           </form>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-screen bg-[#0C0C11] text-white font-mono flex flex-col items-center py-6 px-6 lg:px-20 overflow-hidden relative select-none">
      <LiquidBackground />
      
      {/* Top Header */}
      <div className="w-full max-w-7xl flex justify-between items-center mb-6 shrink-0 z-20 glass-panel p-4 border border-white/10 rounded-[2px] bg-white/5">
        <div className="flex items-center gap-3">
          <CJLogo className="w-8 h-8 text-[var(--color-theme)]" />
          <span className="font-display font-bold text-sm tracking-widest text-white">
            CJV4 // ADMIN_CONSOLE
          </span>
        </div>
        <div className="flex gap-6 text-[10px] uppercase tracking-widest text-white/50 font-bold font-display">
           <Link to="/works" className="hover:text-[var(--color-theme)] transition-colors">Works</Link>
           <Link to="/about" className="hover:text-[var(--color-theme)] transition-colors">About</Link>
           <Link to="/contact" className="hover:text-[var(--color-theme)] transition-colors">Contact</Link>
        </div>
      </div>

      {/* Main Glass Panel */}
      <div className="w-full max-w-7xl flex-1 glass-panel border border-white/10 rounded-[2px] flex overflow-hidden shadow-2xl z-20 relative mb-4 bg-white/5">
        
        {/* Sidebar */}
        <div className="w-[260px] border-r border-white/10 p-6 flex flex-col gap-6 flex-shrink-0 bg-black/30 overflow-y-auto">
           <h3 className="text-[10px] tracking-widest font-bold text-white/40 uppercase border-b border-white/5 pb-2">
             [ LEGENDS_ARCHIVE ]
           </h3>
           <div className="flex flex-col gap-2">
             {dbLegends.map(legend => (
               <div 
                 key={legend.id} 
                 onClick={() => setActiveLegendId(legend.id)} 
                 className={`cursor-pointer font-mono tracking-wider p-2.5 rounded-[2px] transition-all text-xs ${
                   activeLegendId === legend.id 
                     ? 'bg-white/5 text-[var(--color-theme)] border-l-2 border-[var(--color-theme)] font-bold' 
                     : 'text-white/40 hover:text-white/80 hover:bg-white/2'
                 }`}
               >
                 [{String(legend.id).padStart(2, '0')}] {legend.title.toUpperCase()}
               </div>
             ))}
           </div>
        </div>

        {/* Content Region */}
        <div className="flex-1 p-8 lg:p-10 relative overflow-y-auto bg-black/10">
           
           <div className="grid grid-cols-[160px_1fr] gap-x-8 gap-y-6 items-start max-w-4xl pb-28">
             
             {/* Name */}
             <label className="text-white/50 tracking-wider pt-3.5 text-xs font-bold uppercase font-display">Project Title</label>
             <input 
               type="text" 
               value={activeLegend.title} 
               onChange={(e) => handleUpdate('title', e.target.value)} 
               className="w-full bg-black/30 border border-white/10 rounded-[2px] p-3.5 text-white font-sans text-sm focus:outline-none focus:border-[var(--color-theme)] focus:bg-black/10 transition-all outline-none font-medium" 
             />

             {/* Subtitle */}
             <label className="text-white/50 tracking-wider pt-3.5 text-xs font-bold uppercase font-display">Subtitle Badge</label>
             <input 
               type="text" 
               value={activeLegend.subtitle} 
               onChange={(e) => handleUpdate('subtitle', e.target.value)} 
               className="w-full bg-black/30 border border-white/10 rounded-[2px] p-3.5 text-white font-sans text-sm focus:outline-none focus:border-[var(--color-theme)] focus:bg-black/10 transition-all outline-none font-medium" 
             />

             {/* Description */}
             <label className="text-white/50 tracking-wider pt-3.5 text-xs font-bold uppercase font-display">Description</label>
             <textarea 
               rows="4" 
               value={activeLegend.description} 
               onChange={(e) => handleUpdate('description', e.target.value)} 
               className="w-full bg-black/30 border border-white/10 rounded-[2px] p-4 text-sm text-white font-sans leading-relaxed focus:outline-none focus:border-[var(--color-theme)] focus:bg-black/10 transition-all outline-none resize-none font-medium" 
             />

             {/* Logo */}
             <label className="text-white/50 tracking-wider pt-3.5 text-xs font-bold uppercase font-display">Brand Glyph</label>
             <div className="flex items-center gap-6">
                <div className="w-20 h-20 bg-white/5 p-3 border border-white/10 flex items-center justify-center flex-shrink-0 cursor-pointer hover:border-[var(--color-theme)] transition-all group rounded-[2px] relative overflow-hidden">
                   <img src={activeLegend.file} className="w-full h-full object-contain filter opacity-60 group-hover:opacity-10 transition-opacity" />
                   <span className="absolute inset-0 flex items-center justify-center text-3xl font-light text-[var(--color-theme)] opacity-0 group-hover:opacity-100 transition-opacity">+</span>
                </div>
                <div className="flex flex-col gap-1">
                   <span className="text-white/80 text-xs font-bold">{activeLegend.file}</span>
                   <span className="text-white/40 text-[10px] tracking-wide font-bold font-mono">SVGs stored in `/public/assets/logos/`</span>
                </div>
             </div>

             {/* Colors */}
             <label className="text-white/50 tracking-wider pt-3.5 text-xs font-bold uppercase font-display">Palette Matrix</label>
             <div className="flex items-center gap-4 flex-wrap">
                <div 
                  onClick={handleAddColor} 
                  className="w-10 h-10 bg-white/5 border border-white/10 text-white rounded-[2px] flex items-center justify-center cursor-pointer hover:bg-white/10 hover:border-[var(--color-theme)] hover:scale-105 transition-all text-xl font-light"
                  title="Add Color"
                >
                  +
                </div>
                {activeLegend.colors && activeLegend.colors.map((color, i) => (
                  <div 
                    key={i} 
                    onClick={() => handleDeleteColor(i)} 
                    className="w-10 h-10 rounded-[2px] cursor-pointer border border-white/10 shadow-md hover:scale-110 hover:border-red-500 transition-all flex items-center justify-center group relative overflow-hidden" 
                    style={{ backgroundColor: color }}
                    title="Click to delete color"
                  >
                    <span className="opacity-0 group-hover:opacity-100 text-white font-bold mix-blend-difference text-[9px] uppercase">DEL</span>
                  </div>
                ))}
                <span className="text-white/30 text-[10px] pl-2 font-bold font-mono">Add HEX value (e.g. #7D52FC)</span>
             </div>

             {/* Case Study Details */}
             <label className="text-white/50 tracking-wider pt-3.5 text-xs font-bold uppercase font-display">Case Study Content</label>
             <div className="flex flex-col gap-4 w-full">
                <div className="flex flex-col gap-1.5">
                  <span className="text-[10px] text-[var(--color-secondary)] font-bold uppercase tracking-wider">01 // THE CHALLENGE</span>
                  <textarea 
                    rows="3" 
                    value={activeLegend.caseStudy?.challenge || ''} 
                    onChange={(e) => handleUpdateCaseStudy('challenge', e.target.value)} 
                    className="w-full bg-black/30 border border-white/10 p-3.5 text-xs text-white font-sans focus:outline-none focus:border-[var(--color-theme)] focus:bg-black/10 rounded-[2px] transition-all outline-none font-medium"
                  />
                </div>
                <div className="flex flex-col gap-1.5 mt-2">
                  <span className="text-[10px] text-[var(--color-secondary)] font-bold uppercase tracking-wider">02 // THE APPROACH</span>
                  <textarea 
                    rows="3" 
                    value={activeLegend.caseStudy?.approach || ''} 
                    onChange={(e) => handleUpdateCaseStudy('approach', e.target.value)} 
                    className="w-full bg-black/30 border border-white/10 p-3.5 text-xs text-white font-sans focus:outline-none focus:border-[var(--color-theme)] focus:bg-black/10 rounded-[2px] transition-all outline-none font-medium"
                  />
                </div>
                <div className="flex flex-col gap-1.5 mt-2">
                  <span className="text-[10px] text-[var(--color-secondary)] font-bold uppercase tracking-wider">03 // THE OUTCOME</span>
                  <textarea 
                    rows="3" 
                    value={activeLegend.caseStudy?.outcome || ''} 
                    onChange={(e) => handleUpdateCaseStudy('outcome', e.target.value)} 
                    className="w-full bg-black/30 border border-white/10 p-3.5 text-xs text-white font-sans focus:outline-none focus:border-[var(--color-theme)] focus:bg-black/10 rounded-[2px] transition-all outline-none font-medium"
                  />
                </div>
             </div>

           </div>

           {/* Save Action Bar */}
           <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-[#0C0C11] via-[#0C0C11]/95 to-transparent p-8 flex justify-end gap-4 pointer-events-none z-30">
              <button 
                onClick={() => window.location.reload()} 
                className="pointer-events-auto bg-white/5 border border-white/10 px-6 py-2.5 text-white/70 hover:text-white hover:bg-white/10 rounded-[2px] font-display text-[10px] tracking-widest uppercase transition-all duration-300 cursor-pointer focus:outline-none font-bold"
              >
                RESET DRAFT
              </button>
              <button 
                onClick={handlePublish} 
                className="pointer-events-auto bg-[#7D52FC] hover:bg-[#C380FF] text-[#FAF9FC] px-6 py-2.5 font-display text-[10px] tracking-widest font-bold uppercase hover:scale-[1.02] shadow-md transition-all duration-300 rounded-[2px] cursor-pointer focus:outline-none"
              >
                PUBLISH DATABASE
              </button>
           </div>
         </div>

      </div>

      <div className="w-full max-w-7xl flex justify-between items-center text-white/30 text-[9px] font-bold uppercase tracking-widest shrink-0 px-4">
        <span>SECURITY LEVEL: ARCHIVE ADMIN</span>
        <span>SYS STATUS: LINKED // STABLE</span>
      </div>
    </div>
  );
};

export default Admin;
