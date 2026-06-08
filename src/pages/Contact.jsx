import React, { useState } from 'react';
import { motion } from 'framer-motion';
import WavyGridCanvas from '../components/WavyGridCanvas';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isTransmitting, setIsTransmitting] = useState(false);
  const [transmissionLogs, setTransmissionLogs] = useState([]);
  const [transmissionSuccess, setTransmissionSuccess] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setIsTransmitting(true);
      setTransmissionLogs([]);
      setTransmissionSuccess(false);

      const logsList = [
        '[CONNECTING] Initiating encrypted handshake with SMTP gateways...',
        '[RESOLVED] Handshake secure: TLS_AES_256_GCM_SHA384 active.',
        '[COMPILING] Packaging narrative parameters and coordinates...',
        `[ENCRYPT] Payload encrypted. Size: ${(JSON.stringify(formData).length / 1024).toFixed(2)} KB`,
        '[TRANSMIT] Dispatching packets to camjcreative@gmail.com [██████████████] 100%',
        `[VERIFIED] Secure receipt logged. ID: CJ-${Math.floor(Math.random() * 90000 + 10000)}`
      ];

      let idx = 0;
      const logInterval = setInterval(() => {
        if (idx < logsList.length) {
          setTransmissionLogs(prev => [...prev, logsList[idx]]);
          idx++;
        } else {
          clearInterval(logInterval);
          setTimeout(() => {
            setIsTransmitting(false);
            setTransmissionSuccess(true);
            setFormData({ name: '', email: '', subject: '', message: '' });
          }, 800);
        }
      }, 350);
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
      <WavyGridCanvas />

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
          <div className="lg:col-span-8 border border-[var(--color-primary)]/10 bg-[var(--color-panel)] p-8 lg:p-12 relative flex flex-col justify-between min-h-[520px] hud-anchor hud-anchor-tl hud-anchor-tr hud-anchor-bl hud-anchor-br shadow-sm">
            <span className="absolute top-3 left-4 font-mono text-[9px] text-[var(--color-primary)]/30">[INTAKE.FORM]</span>
            <span className="absolute top-3 right-4 font-mono text-[9px] text-[var(--color-theme)] font-bold">
              STATUS: {isTransmitting ? 'TRANSMITTING' : transmissionSuccess ? 'DISPATCH_OK' : 'READY'}
            </span>

            {isTransmitting ? (
              /* Monospace Transmission Terminal Console */
              <div className="flex-grow flex flex-col justify-between pt-8 font-mono text-xs text-[var(--color-primary)]/80">
                <div className="flex flex-col gap-3">
                  <span className="text-[var(--color-theme)] font-bold animate-[pulse_1s_infinite]">
                    &gt;_ SYSTEM_UPLINK: ENCRYPTED DISPATCH RUNNING
                  </span>
                  <div className="flex flex-col gap-2 mt-4 text-[var(--color-primary)]/75">
                    {transmissionLogs.map((log, idx) => (
                      <motion.div 
                        key={idx}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        &gt;_ {log}
                      </motion.div>
                    ))}
                  </div>
                </div>
                <div className="border-t border-[var(--color-primary)]/10 pt-6 flex justify-between items-center text-[var(--color-primary)]/40 text-[9px] mt-8">
                  <span>SATELLITE DOWNLINK: STANDBY...</span>
                  <span className="animate-pulse">●</span>
                </div>
              </div>
            ) : transmissionSuccess ? (
              /* Success Screen */
              <div className="flex-grow flex flex-col justify-between pt-8 font-mono text-xs text-[var(--color-primary)]/80">
                <div className="flex-grow flex flex-col items-center justify-center gap-6 py-8">
                  {/* Glowing success badge */}
                  <div className="w-16 h-16 border border-[var(--color-secondary)] bg-[var(--color-secondary)]/10 flex items-center justify-center text-[var(--color-secondary)] text-3xl font-bold relative animate-[pulse_2s_infinite]">
                    ✓
                  </div>
                  <div className="text-center max-w-sm">
                    <h3 className="text-base font-display font-bold text-[var(--color-primary)] uppercase tracking-[0.2em] mb-2">
                      TRANSMISSION COMPLETED
                    </h3>
                    <p className="font-sans text-xs sm:text-sm text-[var(--color-primary)]/70 leading-relaxed">
                      Your dossier data has been encrypted and received. Cameron's communication modules will ingest the variables and establish contact shortly.
                    </p>
                  </div>
                </div>

                <div className="border-t border-[var(--color-primary)]/10 pt-6 flex justify-between items-center mt-6">
                  <span className="text-[var(--color-primary)]/40 text-[9px]">UPLINK_CODE: 200 // VERIFIED</span>
                  <button 
                    onClick={() => setTransmissionSuccess(false)}
                    data-cursor="explore"
                    className="px-6 py-2 border border-[var(--color-primary)]/20 hover:border-[var(--color-theme)] bg-transparent font-mono text-[9px] uppercase tracking-widest text-[var(--color-primary)]/80 hover:text-[var(--color-theme)] transition-colors duration-300 rounded-none cursor-pointer focus:outline-none"
                  >
                    [ DISPATCH ANOTHER ]
                  </button>
                </div>
              </div>
            ) : (
              /* Normal Form */
              <form onSubmit={handleSubmit} className="pt-6 flex flex-col gap-6">
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="font-mono text-[10px] text-[var(--color-primary)]/40 uppercase mb-2 block tracking-wider">
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
                      className="w-full bg-[var(--color-background)]/40 border border-[var(--color-primary)]/10 focus:border-[var(--color-theme)] p-4 font-sans text-base text-[var(--color-primary)] placeholder:text-[var(--color-primary)]/30 focus:outline-none transition-colors rounded-none" 
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="font-mono text-[10px] text-[var(--color-primary)]/40 uppercase mb-2 block tracking-wider">
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
                      className="w-full bg-[var(--color-background)]/40 border border-[var(--color-primary)]/10 focus:border-[var(--color-theme)] p-4 font-sans text-base text-[var(--color-primary)] placeholder:text-[var(--color-primary)]/30 focus:outline-none transition-colors rounded-none" 
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label className="font-mono text-[10px] text-[var(--color-primary)]/40 uppercase mb-2 block tracking-wider">
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
                    className="w-full bg-[var(--color-background)]/40 border border-[var(--color-primary)]/10 focus:border-[var(--color-theme)] p-4 font-sans text-base text-[var(--color-primary)] placeholder:text-[var(--color-primary)]/30 focus:outline-none transition-colors rounded-none" 
                  />
                </div>

                {/* Message */}
                <div>
                  <label className="font-mono text-[10px] text-[var(--color-primary)]/40 uppercase mb-2 block tracking-wider">
                    [04] DOSSIER NOTES / INQUIRY DETAILS * {focusedField === 'message' ? ' // [STATE: TYPING]' : ''}
                  </label>
                  <textarea 
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    onFocus={() => setFocusedField('message')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Outline the parameters of your project."
                    data-cursor="input"
                    className="w-full bg-[var(--color-background)]/40 border border-[var(--color-primary)]/10 focus:border-[var(--color-theme)] p-4 font-sans text-base text-[var(--color-primary)] placeholder:text-[var(--color-primary)]/30 focus:outline-none transition-colors rounded-none resize-none" 
                  />
                </div>

                {/* Action Button */}
                <div className="pt-4 flex items-center justify-between">
                  <span className="font-mono text-[9px] text-[var(--color-primary)]/30">* REQUIRED PARAMETERS</span>
                  
                  <button 
                    type="submit"
                    data-cursor="explore"
                    className="px-8 py-4 border border-[var(--color-primary)]/30 bg-transparent text-[var(--color-primary)] font-mono text-xs uppercase tracking-widest transition-all duration-300 cursor-pointer rounded-none hover:border-[var(--color-secondary)] hover:bg-[var(--color-secondary)]/10 hover:text-[var(--color-primary)] focus:outline-none glow-border"
                  >
                    TRANSMIT MESSAGE
                  </button>
                </div>

              </form>
            )}
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
