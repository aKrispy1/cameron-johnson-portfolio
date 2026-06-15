import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import LiquidBackground from '../components/LiquidBackground';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionSuccess, setTransmissionSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsTransmitting(true);
      setTransmissionSuccess(false);

      // Simulate a contemporary backend dispatch
      setTimeout(() => {
        setIsTransmitting(false);
        setTransmissionSuccess(true);
        setFormData({ name: '', email: '', subject: '', message: '' });
      }, 2000);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full min-h-screen pt-28 lg:pt-36 px-6 lg:px-16 pb-24 bg-[#CCCCCC] select-none overflow-x-hidden relative"
    >
      <LiquidBackground />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-black/10 pb-8 mb-16">
          <div>
            <span className="font-mono text-xs tracking-widest text-[#0C0C11]/40 uppercase block mb-1 font-bold">DOSSIER // INDEX [03]</span>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold tracking-tight text-[#0C0C11] uppercase leading-none">
              SECURE CONTACT
            </h1>
          </div>
          <p className="font-mono text-xs text-[#7D52FC] mt-4 md:mt-0 font-bold uppercase tracking-widest">
            SYSTEM // INTAKE_V4.8
          </p>
        </div>

        {/* Dossier Terminal Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left panel: Contact Form */}
          <div className="lg:col-span-8 glass-panel p-8 lg:p-12 relative flex flex-col justify-between min-h-[540px] rounded-[2px] border border-white/20 shadow-[0_8px_32px_0_rgba(12,12,17,0.06)]">
            
            {/* HUD details */}
            <span className="absolute top-4 left-5 font-mono text-[9px] text-[#0C0C11]/30 font-bold">[INTAKE.FORM]</span>
            <span className="absolute top-4 right-5 font-mono text-[9px] text-[#7D52FC] font-bold tracking-widest">
              STATUS: {isTransmitting ? 'TRANSMITTING' : transmissionSuccess ? 'DISPATCH_OK' : 'READY'}
            </span>
            <span className="absolute bottom-4 left-5 font-mono text-[9px] text-[#0C0C11]/20">+</span>
            <span className="absolute bottom-4 right-5 font-mono text-[9px] text-[#0C0C11]/20">+</span>

            <AnimatePresence mode="wait">
              {isTransmitting ? (
                /* Clean Loading Spinner View */
                <motion.div
                  key="loader"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                  className="flex-grow flex flex-col items-center justify-center pt-8"
                >
                  <div className="relative flex items-center justify-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                      className="w-16 h-16 rounded-full border-t-2 border-r-2 border-[var(--color-theme)] border-l-transparent border-b-transparent"
                    />
                    <div className="absolute font-mono text-[9px] text-[#0C0C11]/40 tracking-wider font-bold">
                      UPLINK
                    </div>
                  </div>
                  <span className="font-mono text-xs text-[#0C0C11]/70 tracking-[0.25em] mt-6 block uppercase animate-pulse font-bold">
                    Encrypting and sending payload...
                  </span>
                </motion.div>
              ) : transmissionSuccess ? (
                /* Glass Success Panel */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  transition={{ duration: 0.4 }}
                  className="flex-grow flex flex-col justify-between pt-8"
                >
                  <div className="flex-grow flex flex-col items-center justify-center gap-6 py-8">
                    <div className="w-16 h-16 rounded-[2px] bg-[#BCEF0C]/10 border border-[#BCEF0C]/40 flex items-center justify-center text-[#7D52FC] text-3xl font-light shadow-md animate-[pulse_2s_infinite]">
                      ✓
                    </div>
                    <div className="text-center max-w-sm">
                      <h3 className="text-base font-display font-bold text-[#0C0C11] uppercase tracking-[0.2em] mb-2">
                        TRANSMISSION SECURED
                      </h3>
                      <p className="font-sans text-sm text-[#0C0C11]/70 leading-relaxed font-medium">
                        Your project parameters have been successfully encrypted and dispatched. Cameron will establish a communications link shortly.
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-black/5 pt-6 flex justify-between items-center mt-6">
                    <span className="text-[#0C0C11]/40 font-mono text-[9px] tracking-wider font-bold">UPLINK_CODE: 200 // OK</span>
                    <button 
                      onClick={() => setTransmissionSuccess(false)}
                      data-cursor="explore"
                      className="px-6 py-2.5 bg-white/20 hover:bg-white/40 border border-white/30 rounded-[2px] font-display text-[10px] uppercase tracking-widest text-[#0C0C11] hover:text-[#7D52FC] transition-all duration-300 cursor-pointer focus:outline-none font-bold"
                    >
                      DISPATCH ANOTHER
                    </button>
                  </div>
                </motion.div>
              ) : (
                /* Contact Form */
                <motion.form 
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onSubmit={handleSubmit} 
                  className="pt-8 flex flex-col gap-6"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Name */}
                    <div>
                      <label className="font-mono text-[10px] text-[#0C0C11]/40 uppercase mb-2 block tracking-wider font-bold">
                        [01] SENDER NAME * {focusedField === 'name' ? ' // [STATE: TYPING]' : ''}
                      </label>
                      <input 
                        type="text" 
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        onFocus={() => setFocusedField('name')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Enter name"
                        data-cursor="input"
                        className="w-full bg-white/40 border border-white/40 focus:border-[#7D52FC] focus:bg-white/60 p-4 font-sans text-base text-[#0C0C11] placeholder:text-[#0C0C11]/30 focus:outline-none transition-all rounded-[2px] outline-none font-medium" 
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="font-mono text-[10px] text-[#0C0C11]/40 uppercase mb-2 block tracking-wider font-bold">
                        [02] SENDER EMAIL * {focusedField === 'email' ? ' // [STATE: TYPING]' : ''}
                      </label>
                      <input 
                        type="email" 
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        onFocus={() => setFocusedField('email')}
                        onBlur={() => setFocusedField(null)}
                        placeholder="Enter email address"
                        data-cursor="input"
                        className="w-full bg-white/40 border border-white/40 focus:border-[#7D52FC] focus:bg-white/60 p-4 font-sans text-base text-[#0C0C11] placeholder:text-[#0C0C11]/30 focus:outline-none transition-all rounded-[2px] outline-none font-medium" 
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="font-mono text-[10px] text-[#0C0C11]/40 uppercase mb-2 block tracking-wider font-bold">
                      [03] CLASSIFICATION / SUBJECT {focusedField === 'subject' ? ' // [STATE: TYPING]' : ''}
                    </label>
                    <input 
                      type="text" 
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      onFocus={() => setFocusedField('subject')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Brand identity, System architecture, etc."
                      data-cursor="input"
                      className="w-full bg-white/40 border border-white/40 focus:border-[#7D52FC] focus:bg-white/60 p-4 font-sans text-base text-[#0C0C11] placeholder:text-[#0C0C11]/30 focus:outline-none transition-all rounded-[2px] outline-none font-medium" 
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="font-mono text-[10px] text-[#0C0C11]/40 uppercase mb-2 block tracking-wider font-bold">
                      [04] DOSSIER NOTES / INQUIRY DETAILS * {focusedField === 'message' ? ' // [STATE: TYPING]' : ''}
                    </label>
                    <textarea 
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      onFocus={() => setFocusedField('message')}
                      onBlur={() => setFocusedField(null)}
                      placeholder="Outline the parameters of your project."
                      data-cursor="input"
                      className="w-full bg-white/40 border border-white/40 focus:border-[#7D52FC] focus:bg-white/60 p-4 font-sans text-base text-[#0C0C11] placeholder:text-[#0C0C11]/30 focus:outline-none transition-all rounded-[2px] outline-none resize-none font-medium" 
                    />
                  </div>

                  {/* Action Button - Slate blue */}
                  <div className="pt-4 flex items-center justify-between">
                    <span className="font-mono text-[9px] text-[#0C0C11]/30 font-bold">* REQUIRED PARAMETERS</span>
                    
                    <button 
                      type="submit"
                      data-cursor="explore"
                      className="px-8 py-3.5 bg-[#7D52FC] hover:bg-[#C380FF] text-[#FAF9FC] font-display text-xs uppercase tracking-widest font-bold border border-white/20 transition-all duration-300 rounded-[2px] shadow-[0_4px_16px_rgba(125,82,252,0.25)] cursor-pointer focus:outline-none hover:scale-[1.02]"
                    >
                      TRANSMIT MESSAGE
                    </button>
                  </div>

                </motion.form>
              )}
            </AnimatePresence>
          </div>

          {/* Right panel: Dossier Coordinates & Social Links */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            
            {/* Info panel */}
            <div className="glass-panel p-8 relative flex-1 flex flex-col justify-between rounded-[2px] border border-white/20 shadow-[0_8px_32px_0_rgba(12,12,17,0.06)]">
              
              {/* HUD details */}
              <span className="absolute top-4 left-5 font-mono text-[9px] text-[#0C0C11]/30 font-bold">[OFFLINE.COORDINATES]</span>
              
              <div className="pt-6">
                <h3 className="text-xl font-display font-bold tracking-tight text-[#0C0C11] uppercase mb-4">
                  LOCATION PARAMETERS
                </h3>
                <p className="font-sans text-sm text-[#0C0C11]/70 leading-relaxed mb-6 font-medium">
                  Available for strategic consultations, brand audits, and full-scale design deployments. Operating globally from Spartanburg, South Carolina.
                </p>
                
                <div className="border-l border-[var(--color-theme)] pl-4 mb-4">
                  <span className="font-mono text-[9px] text-[#0C0C11]/40 block font-bold">TIME ZONE</span>
                  <span className="font-mono text-xs text-[#0C0C11] font-bold">EASTERN STANDARD [GMT-5]</span>
                </div>
              </div>

              <div className="border-t border-black/5 pt-6">
                <span className="font-mono text-[9px] text-[#0C0C11]/40 block mb-1 font-bold">GENERAL INQUIRIES</span>
                <span className="font-mono text-xs text-[var(--color-theme)] font-bold">camjcreative@gmail.com</span>
              </div>
            </div>

            {/* Social Coordinate grid */}
            <div className="grid grid-cols-2 gap-4">
              
              <a 
                href="https://github.com/camjcreative" 
                target="_blank" 
                rel="noreferrer" 
                className="glass-card p-5 flex flex-col justify-between hover:border-[var(--color-theme)] transition-colors duration-300 group rounded-[2px] border border-white/25 shadow-xs"
              >
                <span className="font-mono text-[9px] text-[#0C0C11]/40 uppercase group-hover:text-[var(--color-theme)] transition-colors font-bold">[GIT.DIR]</span>
                <span className="font-display font-bold text-xs text-[#0C0C11] mt-4 uppercase">GITHUB →</span>
              </a>

              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noreferrer" 
                className="glass-card p-5 flex flex-col justify-between hover:border-[var(--color-theme)] transition-colors duration-300 group rounded-[2px] border border-white/25 shadow-xs"
              >
                <span className="font-mono text-[9px] text-[#0C0C11]/40 uppercase group-hover:text-[var(--color-theme)] transition-colors font-bold">[LINK.IN]</span>
                <span className="font-display font-bold text-xs text-[#0C0C11] mt-4 uppercase">LINKEDIN →</span>
              </a>

            </div>

          </div>

        </div>

      </div>
    </motion.div>
  );
};

export default Contact;
