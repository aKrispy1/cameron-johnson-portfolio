import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WavyGrid from '../components/WavyGrid';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      // Simulate form submission
      setTimeout(() => {
        setFormData({ name: '', email: '', subject: '', message: '' });
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen pt-28 lg:pt-36 px-6 lg:px-16 pb-24 bg-[var(--color-background)] transition-colors duration-700 select-none overflow-x-hidden relative"
    >
      <div className="ebbing-gradient" />
      <WavyGrid />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-[var(--color-primary)]/10 pb-8 mb-16">
          <div>
            <span className="font-mono text-xs tracking-widest text-[var(--color-primary)]/40 uppercase block mb-1">DOSSIER // INDEX [03]</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tighter text-[var(--color-primary)] uppercase leading-none">
              SECURE CONTACT
            </h1>
          </div>
          <p className="font-mono text-xs text-[var(--color-theme)] mt-4 md:mt-0">
            SYSTEM // INTAKE_V4.8
          </p>
        </div>

        {/* Dossier Terminal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Contact Form */}
          <div className="lg:col-span-8 border border-[var(--color-primary)]/10 bg-[var(--color-panel)] p-8 lg:p-12 relative flex flex-col justify-between">
            <span className="absolute top-3 left-4 font-mono text-[9px] text-[var(--color-primary)]/30">[INTAKE.FORM]</span>
            <span className="absolute top-3 right-4 font-mono text-[9px] text-[var(--color-theme)] font-bold">STATUS: READY</span>

            <form onSubmit={handleSubmit} className="pt-6 flex flex-col gap-6">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div>
                  <label className="font-mono text-[10px] text-[var(--color-primary)]/40 uppercase mb-2 block tracking-wider">
                    [01] SENDER NAME *
                  </label>
                  <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    placeholder="Enter name"
                    className="w-full bg-[var(--color-background)] border border-[var(--color-primary)]/10 focus:border-[var(--color-theme)] p-4 font-sans text-base text-[var(--color-primary)] placeholder:text-[var(--color-primary)]/30 focus:outline-none transition-colors rounded-none" 
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="font-mono text-[10px] text-[var(--color-primary)]/40 uppercase mb-2 block tracking-wider">
                    [02] SENDER EMAIL *
                  </label>
                  <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    placeholder="Enter email address"
                    className="w-full bg-[var(--color-background)] border border-[var(--color-primary)]/10 focus:border-[var(--color-theme)] p-4 font-sans text-base text-[var(--color-primary)] placeholder:text-[var(--color-primary)]/30 focus:outline-none transition-colors rounded-none" 
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="font-mono text-[10px] text-[var(--color-primary)]/40 uppercase mb-2 block tracking-wider">
                  [03] CLASSIFICATION / SUBJECT
                </label>
                <input 
                  type="text" 
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  placeholder="Brand identity, System architecture, etc."
                  className="w-full bg-[var(--color-background)] border border-[var(--color-primary)]/10 focus:border-[var(--color-theme)] p-4 font-sans text-base text-[var(--color-primary)] placeholder:text-[var(--color-primary)]/30 focus:outline-none transition-colors rounded-none" 
                />
              </div>

              {/* Message */}
              <div>
                <label className="font-mono text-[10px] text-[var(--color-primary)]/40 uppercase mb-2 block tracking-wider">
                  [04] DOSSIER NOTES / INQUIRY DETAILS *
                </label>
                <textarea 
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  placeholder="Outline the parameters of your project."
                  className="w-full bg-[var(--color-background)] border border-[var(--color-primary)]/10 focus:border-[var(--color-theme)] p-4 font-sans text-base text-[var(--color-primary)] placeholder:text-[var(--color-primary)]/30 focus:outline-none transition-colors rounded-none resize-none" 
                />
              </div>

              {/* Action Button */}
              <div className="pt-4 flex items-center justify-between">
                <span className="font-mono text-[9px] text-[var(--color-primary)]/30">* REQUIRED PARAMETERS</span>
                
                <button 
                  type="submit"
                  className="px-8 py-4 border border-[var(--color-primary)]/30 bg-transparent text-[var(--color-primary)] font-mono text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer rounded-none hover:border-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/10 hover:text-[var(--color-primary)] focus:outline-none"
                >
                  {submitted ? 'TRANSMITTING...' : 'TRANSMIT MESSAGE'}
                </button>
              </div>

            </form>
          </div>

          {/* Right panel: Dossier Coordinates & Social Links */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Info panel */}
            <div className="border border-[var(--color-primary)]/10 bg-[var(--color-panel)] p-8 relative flex-1 flex flex-col justify-between">
              <span className="absolute top-3 left-4 font-mono text-[9px] text-[var(--color-primary)]/30">[OFFLINE.COORDINATES]</span>
              
              <div className="pt-6">
                <h3 className="text-xl font-display font-bold tracking-tight text-[var(--color-primary)] uppercase mb-4">
                  LOCATION PARAMETERS
                </h3>
                <p className="font-sans text-sm text-[var(--color-primary)]/70 leading-relaxed mb-6">
                  Available for strategic consultations, brand audits, and full-scale design deployments. Operating globally from Spartanburg, South Carolina.
                </p>
                
                <div className="border-l border-[var(--color-theme)] pl-4 mb-4">
                  <span className="font-mono text-[9px] text-[var(--color-primary)]/40 block">TIME ZONE</span>
                  <span className="font-mono text-xs text-[var(--color-primary)] font-bold">EASTERN STANDARD [GMT-5]</span>
                </div>
              </div>

              <div className="border-t border-[var(--color-primary)]/10 pt-6">
                <span className="font-mono text-[9px] text-[var(--color-primary)]/40 block mb-1">GENERAL INQUIRIES</span>
                <span className="font-mono text-xs text-[var(--color-theme)] font-bold">camjcreative@gmail.com</span>
              </div>
            </div>

            {/* Social Coordinate grid */}
            <div className="grid grid-cols-2 gap-4">
              
              <a 
                href="https://github.com/camjcreative" 
                target="_blank" 
                rel="noreferrer" 
                className="border border-[var(--color-primary)]/10 bg-[var(--color-panel)] p-4 flex flex-col justify-between hover:border-[var(--color-theme)] transition-colors duration-300 group rounded-none"
              >
                <span className="font-mono text-[9px] text-[var(--color-primary)]/40 uppercase group-hover:text-[var(--color-theme)] transition-colors">[GIT.DIR]</span>
                <span className="font-mono text-xs text-[var(--color-primary)] font-bold mt-4 uppercase">GITHUB →</span>
              </a>

              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="border border-[var(--color-primary)]/10 bg-[var(--color-panel)] p-4 flex flex-col justify-between hover:border-[var(--color-theme)] transition-colors duration-300 group rounded-none"
              >
                <span className="font-mono text-[9px] text-[var(--color-primary)]/40 uppercase group-hover:text-[var(--color-theme)] transition-colors">[LINK.IN]</span>
                <span className="font-mono text-xs text-[var(--color-primary)] font-bold mt-4 uppercase">LINKEDIN →</span>
              </a>

            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default Contact;
