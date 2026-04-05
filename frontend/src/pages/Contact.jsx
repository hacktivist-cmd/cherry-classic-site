import React, { useState } from 'react';
import { 
  Mail, 
  MessageCircle, 
  MapPin, 
  Clock, 
  Send, 
  ArrowRight, 
  Phone,
  Share2,
  CheckCircle2,
  Calendar
} from 'lucide-react';
import GlassNav from '../components/GlassNav';

const Contact = () => {
  const [formState, setFormState] = useState('idle');

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormState('sending');
    setTimeout(() => setFormState('success'), 1500);
  };

  return (
    <div className="min-h-screen bg-[#0d0106] text-white font-sans selection:bg-pink-500 selection:text-white">
      <GlassNav />
      
      <main className="pt-40 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          
          <div className="mb-24 text-center">
            <span className="text-pink-400 text-[10px] font-black uppercase tracking-[0.5em] mb-6 block">Direct Access</span>
            <h1 className="text-6xl md:text-[100px] font-bold font-serif leading-[0.9] mb-8">
              Let's <span className="italic text-zinc-700">Connect.</span>
            </h1>
            <p className="max-w-xl mx-auto text-zinc-500 text-sm leading-relaxed">
              Whether you're inquiring about a custom "Vault" commission or booking a private fitting in Knightsbridge, our concierge team is here to assist.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-16 items-start">
            
            <div className="lg:col-span-4 space-y-12">
              <div className="glass p-10 rounded-[40px] border border-white/5">
                <h3 className="text-xl font-bold font-serif mb-8 text-white">The Studio</h3>
                <div className="space-y-8">
                  <div className="flex gap-5">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center shrink-0">
                      <MapPin size={18} className="text-pink-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Location</p>
                      <p className="text-sm text-zinc-300">12 Beauchamp Place, Knightsbridge<br/>London, SW3 1NQ</p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="w-10 h-10 rounded-xl bg-pink-500/10 flex items-center justify-center shrink-0">
                      <Clock size={18} className="text-pink-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">Studio Hours</p>
                      <p className="text-sm text-zinc-300">Mon - Sat: 10am - 7pm<br/>Sunday: By Appointment Only</p>
                    </div>
                  </div>

                  <div className="flex gap-5">
                    <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center shrink-0">
                      <MessageCircle size={18} className="text-emerald-400" />
                    </div>
                    <div>
                      <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500 mb-1">VIP WhatsApp</p>
                      <p className="text-sm text-zinc-300">+44 7700 900542</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <a href="#" className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/[0.08] transition group">
                    <span className="text-xs font-bold uppercase tracking-widest">Follow us on Instagram</span>
                    <Share2 size={18} className="text-pink-400 group-hover:scale-110 transition" />
                </a>
                <a href="#" className="flex items-center justify-between p-6 bg-white/5 rounded-3xl border border-white/5 hover:bg-white/[0.08] transition group">
                    <span className="text-xs font-bold uppercase tracking-widest">Media Inquiries</span>
                    <Mail size={18} className="text-pink-400 group-hover:scale-110 transition" />
                </a>
              </div>
            </div>

            <div className="lg:col-span-8">
              <div className="bg-white rounded-[60px] p-8 md:p-16 text-black relative overflow-hidden">
                {formState === 'success' ? (
                  <div className="py-20 text-center animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-pink-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-pink-200">
                      <CheckCircle2 className="text-white" size={40} />
                    </div>
                    <h2 className="text-3xl font-bold font-serif mb-4">Request Received.</h2>
                    <p className="text-zinc-500 max-w-sm mx-auto mb-10">Our Concierge will reach out via your preferred contact method within 24 hours.</p>
                    <button 
                      onClick={() => setFormState('idle')}
                      className="text-[10px] font-black uppercase tracking-[0.2em] border-b-2 border-pink-500 pb-1"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-12">
                      <h2 className="text-3xl md:text-4xl font-bold font-serif mb-4">The Commission Brief</h2>
                      <p className="text-zinc-500 text-sm">Tell us about your requirements. For custom units, please include preferred length and texture.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-8">
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-4">Full Name</label>
                          <input 
                            required
                            type="text" 
                            className="w-full bg-zinc-100 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-pink-500 outline-none transition"
                            placeholder="Alexandria Sterling"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-4">Email Address</label>
                          <input 
                            required
                            type="email" 
                            className="w-full bg-zinc-100 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-pink-500 outline-none transition"
                            placeholder="alex@luxury.com"
                          />
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-4">Inquiry Type</label>
                        <select className="w-full bg-zinc-100 border-none rounded-2xl px-6 py-4 text-sm focus:ring-2 focus:ring-pink-500 outline-none transition appearance-none">
                          <option>Custom "Vault" Collection Unit</option>
                          <option>Bridal Package Consultation</option>
                          <option>Maintenance & Refresh Service</option>
                          <option>Wholesale/Professional Inquiry</option>
                        </select>
                      </div>

                      <div className="space-y-2">
                        <label className="text-[9px] font-black uppercase tracking-widest text-zinc-400 ml-4">Your Message</label>
                        <textarea 
                          rows={5}
                          className="w-full bg-zinc-100 border-none rounded-3xl px-6 py-4 text-sm focus:ring-2 focus:ring-pink-500 outline-none transition resize-none"
                          placeholder="Describe your vision..."
                        ></textarea>
                      </div>

                      <button 
                        disabled={formState === 'sending'}
                        className="w-full bg-black text-white py-6 rounded-full font-black text-[10px] uppercase tracking-[0.3em] hover:bg-pink-600 transition-all flex items-center justify-center gap-4 disabled:opacity-50"
                      >
                        {formState === 'sending' ? 'Transmitting...' : 'Submit Inquiry'} 
                        <Send size={14} />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </main>

      <footer className="py-20 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-4">
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center font-bold text-[10px]">CC</div>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] opacity-40">Cherry Classic Concierge</span>
          </div>
          <div className="flex gap-10 text-[9px] font-black uppercase tracking-widest opacity-40">
            <a href="#" className="hover:text-pink-400 transition">Instagram</a>
            <a href="#" className="hover:text-pink-400 transition">Legal</a>
            <a href="#" className="hover:text-pink-400 transition">Support</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
