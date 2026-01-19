import React, { useState, useEffect, useMemo, useCallback, Suspense, lazy, useRef } from 'react';
import Navigation from './components/Navigation';
import BookingModal from './components/BookingModal';
import ConfirmationView from './components/ConfirmationView';
import CartModal from './components/CartModal';
import { UserLoginModal, StaffLogin } from './components/Auth/AuthModals';
import ContactSection from './components/ContactSection';
import { INITIAL_DESTINATIONS, CONTACT_INFO } from './constants';
import { Destination, Booking, User, SocialLink } from './types';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';

const Dashboard = lazy(() => import('./components/CRM/Dashboard'));

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'crm'>('home');
  const [crmView, setCrmView] = useState<'analytics' | 'orders' | 'cms' | 'settings'>('analytics');
  const [isStaffAuthenticated, setIsStaffAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDestination, setSelectedDestination] = useState<Destination | null>(null);
  const [pendingDestination, setPendingDestination] = useState<Destination | null>(null);
  const [activeBooking, setActiveBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [destinations, setDestinations] = useState<Destination[]>(INITIAL_DESTINATIONS);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>(CONTACT_INFO.socials);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());

  const journeysRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();
  const footerY = useTransform(scrollYProgress, [0.9, 1], [20, 0]);

  useEffect(() => {
    try {
      const savedBookings = localStorage.getItem('genesis_bookings');
      if (savedBookings) setBookings(JSON.parse(savedBookings));
      const savedUser = localStorage.getItem('genesis_user');
      if (savedUser) setCurrentUser(JSON.parse(savedUser));
      const savedDestinations = localStorage.getItem('genesis_destinations');
      if (savedDestinations) setDestinations(JSON.parse(savedDestinations));
      const savedSocials = localStorage.getItem('genesis_socials');
      if (savedSocials) setSocialLinks(JSON.parse(savedSocials));
      const savedFavs = localStorage.getItem('genesis_favs');
      if (savedFavs) setFavorites(new Set(JSON.parse(savedFavs)));
    } catch (e) {
      console.error("Sync error:", e);
    }
  }, []);

  const handleNavigate = useCallback((page: 'home' | 'crm') => {
    if (page === 'crm') setIsStaffAuthenticated(false);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const scrollToSection = useCallback((id: string) => {
    if (currentPage !== 'home') {
      setCurrentPage('home');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      }, 150);
    } else {
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }
  }, [currentPage]);

  const handleDestinationClick = (dest: Destination) => {
    if (!currentUser) {
      setPendingDestination(dest);
      setIsLoginModalOpen(true);
    } else {
      setSelectedDestination(dest);
    }
  };

  const toggleFavorite = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      localStorage.setItem('genesis_favs', JSON.stringify(Array.from(next)));
      return next;
    });
  };

  const handleBookingConfirm = useCallback((booking: Booking) => {
    setBookings(prev => {
      const updated = [booking, ...prev];
      localStorage.setItem('genesis_bookings', JSON.stringify(updated));
      return updated;
    });
    setActiveBooking(booking);
    setSelectedDestination(null);
  }, []);

  const handleCancelBooking = useCallback((id: string) => {
    setBookings(prev => {
      const updated = prev.filter(b => b.id !== id);
      localStorage.setItem('genesis_bookings', JSON.stringify(updated));
      return updated;
    });
  }, []);

  const filteredDestinations = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return destinations.filter(d => 
      d.name.toLowerCase().includes(q) || 
      d.tags.some(t => t.toLowerCase().includes(q))
    );
  }, [searchQuery, destinations]);

  const userBookings = useMemo(() => {
    if (!currentUser) return [];
    return bookings.filter(b => b.customerEmail === currentUser.email);
  }, [bookings, currentUser]);

  const renderHome = () => (
    <div className="space-y-0">
      <section className="min-h-[70vh] md:min-h-[90vh] flex flex-col md:flex-row items-center px-6 md:px-12 lg:px-24 gap-12 bg-white relative pt-28 md:pt-40 pb-16 overflow-hidden">
        <div className="w-full md:w-1/2 space-y-6 md:space-y-8 z-10 text-center md:text-left">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="inline-flex items-center gap-2 bg-stone-50 px-3 py-1.5 rounded-full border border-stone-100">
            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.2em] text-[#d4a373]">Crafted in Kenya</span>
          </motion.div>
          <motion.h1 initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="text-4xl sm:text-5xl lg:text-8xl font-serif tracking-tighter leading-[0.9] text-stone-800">
            Kenya isn't a trip. <br/><span className="italic text-[#5d6d4e]">It's a return.</span>
          </motion.h1>
          <p className="text-base md:text-lg text-stone-500 max-w-md mx-auto md:mx-0 font-medium leading-relaxed">
            Stop touring. Start belonging. Handcrafted journeys curated by local trackers who know the soul of the Savannah.
          </p>
          <div className="flex flex-wrap justify-center md:justify-start gap-3 pt-4">
            <button 
              onClick={() => journeysRef.current?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-[#2d2a26] text-white px-8 md:px-10 py-4 md:py-5 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-[#5d6d4e] transition-all shadow-xl"
            >
              Explore Archive
            </button>
            <button 
               onClick={() => document.getElementById('why')?.scrollIntoView({ behavior: 'smooth' })}
               className="text-stone-400 px-6 py-4 rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:text-black transition-all"
            >
              The Secret Sauce
            </button>
          </div>
        </div>
        
        <div className="w-full md:w-1/2 flex items-center justify-center relative">
          <div className="relative w-full max-w-sm aspect-[4/5] md:aspect-square lg:aspect-[4/5]">
             <motion.div 
               animate={{ y: [0, -10, 0] }}
               transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
               className="w-full h-full rounded-[2.5rem] md:rounded-[3.5rem] overflow-hidden shadow-2xl relative border-[8px] md:border-[12px] border-stone-50 z-10"
             >
               <img src="https://images.unsplash.com/photo-1516426122078-c23e76319801?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Safari" />
             </motion.div>
             <div className="absolute -bottom-6 -left-6 bg-white p-4 md:p-6 rounded-[2rem] shadow-xl z-20 border border-stone-100 hidden sm:block max-w-[180px]">
                <p className="text-stone-800 font-serif italic text-xs md:text-sm leading-snug">"Authentic heritage that resonates."</p>
                <p className="text-[7px] md:text-[8px] font-black uppercase text-[#d4a373] tracking-widest mt-2">— Sarah J.</p>
             </div>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-[#d4a373]/5 blur-[80px] md:blur-[120px] -z-10" />
        </div>
      </section>

      <div className="bg-[#2d2a26] py-6 md:py-8 border-y border-white/5 overflow-hidden">
        <div className="flex items-center gap-20 animate-marquee whitespace-nowrap">
          {[1,2,3,4].map(i => (
            <div key={i} className="flex gap-20">
              <span className="text-stone-500 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                <span className="text-[#d4a373]">✦</span> 2,400+ Journeys Woven
              </span>
              <span className="text-stone-500 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                <span className="text-[#d4a373]">✦</span> 100% Local Trackers
              </span>
              <span className="text-stone-500 text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] flex items-center gap-3">
                <span className="text-[#d4a373]">✦</span> Legacy Certified
              </span>
            </div>
          ))}
        </div>
      </div>

      <section id="journeys" ref={journeysRef} className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-white">
        <div className="max-w-7xl mx-auto space-y-12 md:space-y-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8 border-b border-stone-50 pb-12">
            <div className="space-y-2">
              <h2 className="text-4xl md:text-6xl font-serif text-stone-800 tracking-tighter">Choose your <span className="italic">thread.</span></h2>
              <p className="text-[8px] md:text-[9px] font-black uppercase text-stone-300 tracking-[0.4em]">Hand-picked routes for the 2024 season</p>
            </div>
            <div className="w-full md:w-auto">
              <input 
                type="text" placeholder="Search by activity..." 
                value={searchQuery} onChange={e => setSearchQuery(e.target.value)}
                className="w-full md:w-80 px-6 py-4 bg-stone-50 border border-stone-100 rounded-2xl text-[10px] uppercase font-black tracking-widest outline-none focus:border-[#d4a373] transition-all"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
            {filteredDestinations.map((dest) => (
              <motion.div 
                layout
                key={dest.id} 
                className="bg-stone-50 rounded-[2.5rem] overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-700 border border-stone-100 flex flex-col min-h-[500px]"
                onClick={() => handleDestinationClick(dest)}
              >
                <div className="aspect-[4/3] overflow-hidden relative shrink-0">
                  <img src={dest.image} alt={dest.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
                  <button 
                    onClick={(e) => toggleFavorite(dest.id, e)}
                    className="absolute top-4 md:top-5 right-4 md:right-5 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/90 flex items-center justify-center text-stone-800 shadow-lg hover:scale-110 active:scale-95 transition-all z-10"
                  >
                    <span className={favorites.has(dest.id) ? 'text-red-500' : 'text-stone-300'}>
                      {favorites.has(dest.id) ? '❤️' : '♡'}
                    </span>
                  </button>
                </div>
                
                <div className="p-6 md:p-8 space-y-4 flex-1 flex flex-col">
                  <div className="flex justify-between items-start">
                    <h3 className="text-xl md:text-2xl font-serif text-stone-800 leading-tight">{dest.name}</h3>
                    <div className="text-right">
                      <p className="text-[10px] md:text-[11px] font-black text-[#5d6d4e] tracking-tighter">${dest.pricePerDay}<span className="text-stone-400">/day</span></p>
                    </div>
                  </div>
                  <p className="text-stone-500 text-[13px] leading-relaxed line-clamp-2 italic">
                    "{dest.description}"
                  </p>
                  
                  <div className="pt-6 border-t border-stone-200/50 mt-auto flex flex-col gap-4">
                    <div className="flex justify-between items-center">
                      <span className="text-[8px] font-black uppercase text-stone-300 tracking-widest">{dest.rating} Rating</span>
                      <span className="text-[8px] font-black uppercase text-stone-400 tracking-widest">{dest.country}</span>
                    </div>
                    
                    <button 
                      onClick={(e) => { e.stopPropagation(); handleDestinationClick(dest); }}
                      className="w-full bg-[#2d2a26] text-white py-4 rounded-full font-black text-[9px] uppercase tracking-[0.3em] shadow-lg group-hover:bg-[#5d6d4e] transition-all transform hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2"
                    >
                      Book Now 
                      <span className="group-hover:translate-x-1 transition-transform">→</span>
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="why" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-[#fcfaf7]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-16 md:gap-24">
          <div className="space-y-6">
            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-[#d4a373]">Our Protocol</span>
            <h2 className="text-4xl md:text-6xl font-serif text-stone-800 leading-tight">We weave <br/><span className="italic text-[#5d6d4e]">better stories.</span></h2>
            <p className="text-stone-500 text-sm md:text-base leading-relaxed max-w-sm">Ordinary agencies book hotels. We weave heritage. Our platform merges ancestral knowledge with modern logistics.</p>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white p-10 rounded-[2.5rem] border border-stone-100 shadow-sm space-y-4 hover:shadow-xl transition-all">
              <h3 className="text-xl md:text-2xl font-serif text-stone-800">Ancestral Intelligence</h3>
              <p className="text-xs md:text-sm text-stone-500 leading-relaxed font-medium">Our guides aren't trained in classrooms; they are born on the soil. Access viewpoints unknown to Google Maps.</p>
            </div>
            <div className="bg-white p-10 rounded-[2.5rem] border border-stone-100 shadow-sm space-y-4 hover:shadow-xl transition-all">
              <h3 className="text-xl md:text-2xl font-serif text-stone-800">Direct Impact</h3>
              <p className="text-xs md:text-sm text-stone-500 leading-relaxed font-medium">We bypass middle-men. Your investment goes directly into local conservation and education, bypassing corporate overhead.</p>
            </div>
          </div>
        </div>
      </section>

      <section id="heritage" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24">
          <div className="w-full lg:w-1/2 space-y-6 md:space-y-10">
            <div className="space-y-4">
              <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-[#d4a373]">Oral History</span>
              <h2 className="text-4xl md:text-7xl font-serif text-stone-800 text-stone-800 leading-[0.9] tracking-tighter">Handed down, <br/><span className="italic text-[#5d6d4e]">not booked.</span></h2>
              <p className="text-base md:text-lg text-stone-500 font-medium leading-relaxed max-w-md">
                Every route we offer is vetted by village elders and third-generation trackers. We preserve the quiet paths that mass tourism forgot.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8 border-t border-stone-100 pt-10">
               <div className="space-y-1">
                 <p className="text-2xl md:text-3xl font-serif text-stone-800 italic">Since 1984</p>
                 <p className="text-[8px] font-black uppercase tracking-widest text-stone-400">Pioneer Status</p>
               </div>
               <div className="space-y-1">
                 <p className="text-2xl md:text-3xl font-serif text-stone-800 italic">42 Communities</p>
                 <p className="text-[8px] font-black uppercase tracking-widest text-stone-400">Heritage Partners</p>
               </div>
            </div>
          </div>
          <div className="w-full lg:w-1/2 relative">
             <div className="grid grid-cols-2 gap-4">
                <div className="space-y-4 pt-8">
                   <img src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?auto=format&fit=crop&q=80&w=800" className="rounded-[2rem] shadow-lg aspect-square object-cover" />
                   <img src="https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&q=80&w=800" className="rounded-[2rem] shadow-lg aspect-video object-cover" />
                </div>
                <div className="space-y-4">
                   <img src="https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&q=80&w=800" className="rounded-[2rem] shadow-lg aspect-video object-cover" />
                   <img src="https://images.unsplash.com/photo-1516026672322-bc52d61a55d5?auto=format&fit=crop&q=80&w=800" className="rounded-[2rem] shadow-lg aspect-square object-cover" />
                </div>
             </div>
             <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 md:w-48 md:h-48 bg-[#d4a373] rounded-full mix-blend-multiply blur-3xl opacity-20 -z-10" />
          </div>
        </div>
      </section>

      <section id="impact" className="py-20 md:py-32 px-6 md:px-12 lg:px-24 bg-[#5d6d4e] text-white">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-16 md:gap-24">
          <div className="w-full md:w-1/3">
             <div className="w-32 h-32 md:w-48 md:h-48 rounded-full border-4 border-white/20 flex flex-col items-center justify-center bg-white/5 relative">
                <span className="text-4xl md:text-6xl font-serif">5%</span>
                <span className="text-[8px] md:text-[10px] font-black uppercase tracking-widest opacity-60">Back to Earth</span>
                <div className="absolute -inset-4 border border-white/10 rounded-full animate-spin-slow" />
             </div>
          </div>
          <div className="flex-1 space-y-6 md:space-y-10">
            <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-amber-200">The Genesis Fund</span>
            <h2 className="text-4xl md:text-6xl font-serif tracking-tighter leading-none">Investment that <br/><span className="text-amber-200 italic">heals the soil.</span></h2>
            <p className="text-amber-50 text-sm md:text-xl font-medium leading-relaxed max-w-2xl">
              Travel isn't neutral. We ensure yours is restorative. 5% of every booking investment is wired directly to our community fund, which provides education grants for the children of trackers and funds anti-poaching units.
            </p>
            <div className="flex gap-4">
               <div className="px-6 py-3 bg-white/10 rounded-full border border-white/20 text-[9px] md:text-[11px] font-black uppercase tracking-widest">240+ Scholarships Awarded</div>
               <div className="px-6 py-3 bg-white/10 rounded-full border border-white/20 text-[9px] md:text-[11px] font-black uppercase tracking-widest">12k Protected Acres</div>
            </div>
          </div>
        </div>
      </section>

      <section id="contact-deck" className="bg-[#1a1816] text-stone-100 py-24 md:py-32 px-6 md:px-12 lg:px-24 relative overflow-hidden">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="space-y-10">
            <div className="space-y-4">
              <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.4em] text-[#d4a373]">Final Thread</span>
              <h2 className="text-5xl md:text-7xl font-serif text-white tracking-tighter leading-none">Ready to <br/><span className="text-[#d4a373] italic">begin?</span></h2>
              <p className="text-stone-400 text-base md:text-lg max-w-sm">Spaces are limited. We reply to all inquiries within 4 hours.</p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 items-center">
               <div className="w-24 h-24 rounded-full border-2 border-stone-800 flex flex-col items-center justify-center bg-[#2d2a26] shrink-0">
                  <span className="text-2xl font-serif text-white">74%</span>
                  <span className="text-[7px] font-black uppercase tracking-widest text-stone-600">Capacity</span>
               </div>
               <p className="text-stone-500 text-xs font-medium leading-relaxed italic max-w-[200px] text-center sm:text-left">Only 12 safari slots remain for the July dry season. July is almost woven.</p>
            </div>
          </div>
          <ContactSection socialLinks={socialLinks} />
        </div>
      </section>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#fcfaf7] overflow-x-hidden grainy">
      <Navigation 
        currentPage={currentPage} onNavigate={handleNavigate} crmView={crmView} onCrmViewChange={setCrmView}
        currentUser={currentUser} isStaffAuthenticated={isStaffAuthenticated} onLogout={() => setIsStaffAuthenticated(false)}
        onCartToggle={() => setIsCartOpen(!isCartOpen)} cartCount={userBookings.length}
      />
      <main>
        {currentPage === 'home' ? renderHome() : (
          isStaffAuthenticated ? (
            <Suspense fallback={<div className="pt-40 text-center font-serif italic text-stone-400">Syncing Ledger...</div>}>
              <Dashboard 
                bookings={bookings} destinations={destinations} 
                onDestinationsUpdate={(d: Destination[]) => {setDestinations(d); localStorage.setItem('genesis_destinations', JSON.stringify(d))}}
                onBookingsUpdate={(b: Booking[]) => {setBookings(b); localStorage.setItem('genesis_bookings', JSON.stringify(b))}} 
                onLogout={() => setIsStaffAuthenticated(false)} currentView={crmView}
                socialLinks={socialLinks} onSocialLinksUpdate={(s: SocialLink[]) => {setSocialLinks(s); localStorage.setItem('genesis_socials', JSON.stringify(s))}}
              />
            </Suspense>
          ) : (
            <StaffLogin onSuccess={() => setIsStaffAuthenticated(true)} onClose={() => handleNavigate('home')} />
          )
        )}
      </main>

      <AnimatePresence>
        {isLoginModalOpen && <UserLoginModal onLogin={(u: User) => {setCurrentUser(u); localStorage.setItem('genesis_user', JSON.stringify(u)); setIsLoginModalOpen(false); if(pendingDestination) setSelectedDestination(pendingDestination)}} onClose={() => setIsLoginModalOpen(false)} />}
        {selectedDestination && currentUser && <BookingModal destination={selectedDestination} onClose={() => setSelectedDestination(null)} onConfirm={handleBookingConfirm} />}
        {activeBooking && <ConfirmationView booking={activeBooking} destination={destinations.find(d => d.id === activeBooking.destinationId)!} onClose={() => setActiveBooking(null)} />}
        {isCartOpen && currentUser && <CartModal bookings={userBookings} destinations={destinations} onClose={() => setIsCartOpen(false)} onCancelBooking={handleCancelBooking} />}
      </AnimatePresence>

      <footer className="bg-[#111] py-16 md:py-24 px-6 border-t border-white/5">
        <motion.div style={{ y: footerY }} className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 items-start">
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-stone-400">Genesis.</h3>
            <p className="text-stone-600 text-[10px] font-black uppercase tracking-[0.4em]">Handcrafted in Nairobi</p>
          </div>
          
          <div className="space-y-4">
             <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-800">Archive</h4>
             <ul className="space-y-3 text-stone-500 text-[10px] font-bold uppercase tracking-widest">
                <li><button onClick={() => scrollToSection('journeys')} className="hover:text-[#d4a373]">Safaris</button></li>
                <li><button onClick={() => scrollToSection('heritage')} className="hover:text-[#d4a373]">Heritage</button></li>
                <li><button onClick={() => scrollToSection('impact')} className="hover:text-[#d4a373]">Impact</button></li>
             </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-[9px] font-black uppercase tracking-[0.4em] text-stone-800">Connect</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <a key={social.name} href={social.url} target="_blank" className="w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center text-stone-500 hover:text-white transition-all">
                  <span className="text-[10px] font-black uppercase">{social.name.charAt(0)}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
        
        <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex justify-between items-center">
          <p className="text-[8px] text-stone-800 font-black uppercase tracking-[0.5em]">Permanent Heritage</p>
          <button onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})} className="text-[#d4a373] text-[9px] font-black uppercase tracking widest">↑ Top</button>
        </div>
      </footer>
    </div>
  );
};

export default App;