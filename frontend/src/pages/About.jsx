import React from 'react';
import { Globe, Award, Users, Sparkles, MapPin, CheckCircle2, ArrowRight, Quote } from 'lucide-react';
import GlassNav from '../components/GlassNav';

const BRAND_PILLARS = [
  { title: "Single Donor Sourcing", desc: "We exclusively source from single donors...", icon: <Globe className="text-pink-400" /> },
  { title: "The Zero-Glue Standard", desc: "Our units are engineered for high-performance glueless wear...", icon: <Award className="text-pink-400" /> },
  { title: "Ethical Lifecycle", desc: "Every strand is traceable...", icon: <Users className="text-pink-400" /> }
];

const About = () => {
  return (
    <div className="min-h-screen bg-[#0d0106] text-white">
      <GlassNav />
      <main className="pt-40">
        {/* Rest of your About page content */}
        <section className="max-w-7xl mx-auto px-6 mb-40">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <div className="aspect-[4/5] rounded-[60px] overflow-hidden border border-white/10">
                <img src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover" alt="Founder" />
              </div>
            </div>
            <div>
              <span className="text-pink-400 text-[10px] font-black uppercase tracking-[0.5em] mb-8 block">The Creative Director</span>
              <h1 className="text-6xl md:text-8xl font-bold font-serif mb-10">Beyond <br/> <span className="italic text-zinc-700">The Surface.</span></h1>
              <Quote className="text-pink-500/20 mb-6" size={48} />
              <p className="text-xl italic font-serif text-zinc-300 mb-10">"Cherry Classic wasn't built to sell hair..."</p>
              <p className="text-zinc-500 text-sm max-w-lg">After 7 years in the luxury hair industry...</p>
            </div>
          </div>
        </section>
        {/* Add other sections similarly */}
      </main>
    </div>
  );
};
export default About;
