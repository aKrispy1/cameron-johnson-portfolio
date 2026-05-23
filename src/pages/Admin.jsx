import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { legends as initialLegends } from '../data/legends';
import CJLogo from '../components/CJLogo';

const Admin = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const [dbLegends, setDbLegends] = useState([...initialLegends]);
  const [activeLegendId, setActiveLegendId] = useState(initialLegends[1]?.id);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin') {
      setIsAuthenticated(true);
    } else {
      setError('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="w-full h-screen bg-[#0a0a0a] flex items-center justify-center p-6">
        <div className="bg-[#151515] p-10 rounded-2xl border border-white/10 w-full max-w-sm text-center">
           <CJLogo className="w-16 h-16 mx-auto mb-8 " />
           <h2 className="text-white font-inknut font-bold tracking-widest uppercase mb-6 ">Admin Access</h2>
           <form onSubmit={handleLogin} className="flex flex-col gap-4">
             <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (admin)" className="bg-black/50 border border-white/20 rounded-lg p-3 text-white focus:outline-none focus:border-[#c380ff] tracking-widest text-center" />
             {error && <p className="text-red-500 text-xs tracking-widest">{error}</p>}
             <button type="submit" className="bg-[#c380ff]/20 border border-[#c380ff]/50 text-[#c380ff] py-3 rounded-lg font-bold hover:bg-[#c380ff]/40 transition-all tracking-widest">LOGIN</button>
           </form>
        </div>
      </div>
    );
  }

  const activeLegend = dbLegends.find(l => l.id === activeLegendId) || dbLegends[1];

  const handleUpdate = (field, value) => {
    setDbLegends(prev => prev.map(l => l.id === activeLegendId ? { ...l, [field]: value } : l));
  };

  const handleAddColor = () => {
    const newColor = prompt("Enter HEX color code (e.g. #c380ff):");
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
        alert("Database physically overwritten! Run `npm run dev` to see changes. You can safely FTP/Deploy to Hostinger now.");
      } else {
        alert("Failed: " + data.error);
      }
    } catch (e) {
      alert("Failed to connect to Local Vite API: " + e.message);
    }
  };

  return (
    <div className="w-full h-screen bg-gradient-to-br from-[#120a26] to-[#0a0a0a] text-white font-inknut flex flex-col items-center py-10 px-6 lg:px-20 overflow-hidden relative transition-all duration-1000">
      
      {/* Top Header */}
      <div className="w-full max-w-7xl flex justify-between items-center mb-10 shrink-0 z-10">
        <CJLogo className="w-12 h-12 " />
        <div className="flex gap-8 text-sm uppercase tracking-widest text-[#dfdce3] font-semibold">
           <Link to="/legends" className="hover:text-white transition-colors ">Legends</Link>
           <Link to="/about" className="hover:text-white transition-colors">About</Link>
           <Link to="/contact" className="hover:text-white transition-colors">Contact</Link>
        </div>
      </div>

      {/* Main Glass Panel */}
      <div className="w-full max-w-7xl h-full bg-white/10 backdrop-blur-[50px] border border-white/20 rounded-xl flex overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.5)] z-10">
        
        {/* Sidebar */}
        <div className="w-[250px] border-r border-white/10 p-8 flex flex-col gap-8 flex-shrink-0 bg-black/20 overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
           <h3 className="text-xl tracking-[0.2em] font-bold text-white/50">Legends</h3>
           <div className="flex flex-col gap-8">
             {dbLegends.map(legend => (
               <div key={legend.id} onClick={() => setActiveLegendId(legend.id)} className={`cursor-pointer tracking-widest border-b pb-4 transition-all hover:text-white ${activeLegendId === legend.id ? 'text-white border-white/50 text-base ' : 'text-white/40 border-white/10 text-sm'}`}>
                 {legend.title}
               </div>
             ))}
             <div className="cursor-pointer tracking-widest border-b border-white/10 pb-4 transition-all text-white/40 hover:text-white text-sm">
               + Add New
             </div>
           </div>
        </div>

        {/* Content Region */}
        <div className="flex-1 p-12 relative overflow-y-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
           <button className="absolute top-12 right-12 bg-[#ff8080ff] text-black px-6 py-2 rounded font-bold hover:opacity-80 transition-opacity uppercase tracking-widest text-sm shadow-[0_0_15px_#ff8080ff]/50">Delete</button>

           <div className="grid grid-cols-[150px_1fr] gap-x-8 gap-y-10 items-start max-w-4xl pb-32">
             
             <label className="text-white/70 tracking-widest pt-3 text-sm">Project Name</label>
             <input type="text" value={activeLegend.title} onChange={(e) => handleUpdate('title', e.target.value)} className="w-full bg-white/10 border border-white/20 rounded p-3 text-white font-inknut tracking-wide focus:outline-none focus:border-[#c380ff] shadow-inner" />

             <label className="text-white/70 tracking-widest pt-3 text-sm">Description</label>
             <textarea rows="4" value={activeLegend.description} onChange={(e) => handleUpdate('description', e.target.value)} className="w-full bg-white/10 border border-white/20 rounded p-4 text-sm text-white font-inknut tracking-wide focus:outline-none focus:border-[#c380ff] shadow-inner" />

             <label className="text-white/70 tracking-widest pt-3 text-sm">Logo</label>
             <div className="flex items-center gap-6">
               <div className="w-24 h-24 bg-white/10 border border-white/20 flex flex-col items-center justify-center rounded p-2 overflow-hidden shadow-inner flex-shrink-0 cursor-pointer hover:border-[#c380ff] transition-all group">
                  <img src={activeLegend.file} className="w-full h-full object-contain filter  opacity-50 group-hover:opacity-10" />
                  <span className="absolute text-5xl font-light text-[#c380ff] opacity-0 group-hover:opacity-100 transition-opacity">+</span>
               </div>
               <span className="text-white/50 text-sm tracking-widest">Upload .svg here</span>
             </div>

             <label className="text-white/70 tracking-widest pt-3 text-sm">Colors</label>
             <div className="flex items-center gap-4 flex-wrap">
               <div onClick={handleAddColor} className="w-12 h-12 bg-white/10 border border-[#c380ff]/50 rounded flex items-center justify-center cursor-pointer hover:bg-[#c380ff]/20 hover:scale-105 transition-all text-[#c380ff] text-2xl font-light shadow-[0_0_10px_#c380ff]/20">
                 +
               </div>
               {activeLegend.colors.map((color, i) => (
                 <div key={i} onClick={() => handleDeleteColor(i)} className="w-12 h-12 rounded cursor-pointer border border-white/20 shadow-[0_0_10px_rgba(0,0,0,0.3)] hover:scale-110 hover:border-red-500 transition-all flex items-center justify-center group" style={{ backgroundColor: color }}>
                   <span className="opacity-0 group-hover:opacity-100 text-white font-bold  mix-blend-difference text-[10px] uppercase">Del</span>
                 </div>
               ))}
               <span className="text-white/50 text-xs tracking-widest pl-2 font-light">Add Color by #hex number</span>
             </div>

             <label className="text-white/70 tracking-widest pt-3 text-sm">Gallery</label>
             <div className="flex gap-4 flex-wrap">
               <div className="w-24 h-24 bg-white/10 border border-[#c380ff]/50 rounded flex items-center justify-center cursor-pointer hover:bg-[#c380ff]/20 hover:scale-105 transition-all flex-col text-[#c380ff] shadow-inner relative">
                 <span className="text-5xl font-light">+</span>
               </div>
               {activeLegend.gallery && activeLegend.gallery.map((img, idx) => (
                  <div key={idx} className="w-24 h-24 bg-black/50 border border-white/20 rounded overflow-hidden flex items-center justify-center p-2 relative group hover:border-red-500 cursor-pointer shadow-inner">
                    <img src={img} className="w-full h-full object-contain" />
                    <div className="absolute inset-0 bg-red-900/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-sm">
                      <span className="text-white font-bold uppercase text-[10px] tracking-widest">Remove</span>
                    </div>
                  </div>
               ))}
               <div className="flex items-center text-white/50 text-xs tracking-widest min-h-[6rem] pl-2 font-light">Upload Image, Max size 1000px x 1000px</div>
             </div>
           </div>

           {/* Save Action */}
           <div className="absolute bottom-0 right-0 left-0 bg-gradient-to-t from-black/80 to-transparent p-12 flex justify-end gap-6 pointer-events-none">
              <button onClick={() => window.location.reload()} className="pointer-events-auto bg-[#151515] border border-white/20 px-8 py-3 rounded text-white tracking-widest uppercase text-xs font-bold hover:bg-white/10 transition-colors">Cancel</button>
              <button onClick={handlePublish} className="pointer-events-auto bg-white/90 text-[#120a26] px-8 py-3 rounded tracking-widest uppercase text-xs font-bold hover:bg-white transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">Publish</button>
           </div>
        </div>

      </div>

      <div className="absolute bottom-4 right-10 text-[#c380ff] tracking-widest text-[10px] opacity-70 font-bold uppercase /50">Admin Portal</div>
    </div>
  );
};

export default Admin;
