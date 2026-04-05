import { useNavigate } from 'react-router-dom';

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-screen flex flex-col justify-center items-center px-4 sm:px-6 pt-24 sm:pt-20 text-center overflow-hidden">
      <picture className="absolute inset-0 z-0">
        <source 
          media="(max-width: 640px)" 
          srcSet="https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800"
        />
        <source 
          media="(min-width: 641px)" 
          srcSet="https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=90&w=2000"
        />
        <img 
          src="https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800" 
          alt="Cherry Classic Hair" 
          className="w-full h-full object-cover object-center"
        />
      </picture>
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-[#0d0106]"></div>

      <div className="relative z-10 reveal active max-w-full px-4">
        <div className="inline-block px-3 sm:px-4 py-1 rounded-full border border-[#ff4d6d]/30 text-[#ff8fa3] text-[8px] sm:text-[9px] font-bold uppercase tracking-[0.3em] sm:tracking-[0.4em] mb-6 sm:mb-8 bg-[#ff4d6d]/5 backdrop-blur-sm">
          The New Standard of Glamour
        </div>
        <h1 className="text-5xl sm:text-7xl md:text-[120px] font-bold serif mb-4 sm:mb-6 leading-[1.1] sm:leading-[0.85] tracking-tight text-white drop-shadow-2xl">
          Dreamy <br /><span className="italic font-light text-[#ff8fa3]">Silk.</span>
        </h1>
        <p className="max-w-md sm:max-w-lg mx-auto opacity-90 text-xs sm:text-sm mb-8 sm:mb-12 leading-relaxed tracking-wide text-white/90 drop-shadow px-2">
          Indulge in ethically sourced raw units that melt seamlessly into your skin. Designed for the girl who refuses to settle for anything less than perfection.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 justify-center items-center">
          <button 
            onClick={() => navigate('/collection')}
            className="shimmer bg-white text-black px-8 sm:px-12 py-3 sm:py-5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest hover:bg-[#ff4d6d] hover:text-white transition-all duration-500 shadow-xl shadow-white/5 w-full sm:w-auto"
          >
            Explore The Vault
          </button>
          <button 
            onClick={() => navigate('/contact')}
            className="glass px-8 sm:px-12 py-3 sm:py-5 rounded-full text-[9px] sm:text-[10px] font-black uppercase tracking-widest border-white/10 hover:bg-white/5 transition backdrop-blur-md w-full sm:w-auto"
          >
            Book Custom Color
          </button>
        </div>
      </div>
    </section>
  );
};
export default Hero;
