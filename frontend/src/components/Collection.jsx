const Collection = () => {
  return (
    <section id="collection" className="max-w-6xl mx-auto px-6 py-32">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 reveal">
        <div>
          <h2 className="text-5xl font-bold serif leading-none">The Collection</h2>
          <p className="text-[#ff8fa3] text-[10px] font-bold uppercase tracking-[0.3em] mt-4">Sweet & Sophisticated</p>
        </div>
        <div className="mt-6 md:mt-0 opacity-40 text-[9px] font-bold tracking-widest uppercase">
          Filter by Length <i className="fa-solid fa-chevron-down ml-2"></i>
        </div>
      </div>

      <div className="asymmetric-grid">
        <div className="reveal glass rounded-[50px] overflow-hidden group relative cursor-pointer min-h-[600px] shadow-2xl">
          <img src="https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&q=80&w=1200" className="w-full h-full object-cover transition duration-1000 group-hover:scale-105 filter saturate-[1.1]" alt="Velvet Cherry Wave" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#590d22] via-transparent to-transparent opacity-80"></div>
          <div className="absolute bottom-0 left-0 p-12 w-full">
            <span className="bg-white text-[#ff4d6d] text-[8px] font-black px-4 py-1.5 rounded-full uppercase tracking-widest mb-5 inline-block">Trending Now</span>
            <h3 className="text-4xl font-bold serif mb-3">Velvet Cherry Wave</h3>
            <p className="opacity-70 text-xs mb-8 max-w-xs leading-relaxed">26" Frontal Unit • Pre-plucked Natural Hairline • Customizable Tints</p>
            <button className="shimmer bg-[#ff4d6d] text-white px-10 py-4 rounded-full text-[10px] font-black uppercase tracking-widest transition">Add To Wishlist</button>
          </div>
        </div>

        <div className="flex flex-col gap-5">
          <div className="reveal glass rounded-[40px] overflow-hidden group flex-1 relative cursor-pointer border-[#ff4d6d]/10">
            <img src="https://images.unsplash.com/photo-1595475884199-ad286421e7bb?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover opacity-60 group-hover:opacity-100 transition duration-700" alt="Lace Essentials" />
            <div className="absolute inset-0 flex flex-col justify-end p-8">
              <h4 className="text-xl font-bold serif">Lace Essentials</h4>
              <div className="w-8 h-1 bg-[#ff4d6d] mt-2 group-hover:w-20 transition-all duration-500"></div>
            </div>
          </div>
          <div className="reveal glass rounded-[40px] p-10 flex-1 flex flex-col justify-center border-dashed border-[#ff4d6d]/30 group hover:bg-[#ff4d6d]/5 transition">
            <div className="w-12 h-12 rounded-2xl bg-[#ff4d6d]/10 flex items-center justify-center text-[#ff4d6d] mb-6 group-hover:scale-110 transition">
              <i className="fa-solid fa-wand-sparkles"></i>
            </div>
            <h4 className="text-2xl font-bold serif mb-3 text-pink-100">Color Customization</h4>
            <p className="opacity-40 text-xs leading-relaxed">Let our colorists blend the perfect pastel or deep wine shade for your unique vibe.</p>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Collection;
