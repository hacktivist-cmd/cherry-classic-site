const Reviews = () => {
  return (
    <section id="reviews" className="py-32 bg-[#0c0507]">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-20 reveal">
          <h2 className="text-5xl font-bold serif mb-4">Sweet Words</h2>
          <div className="flex justify-center text-[#ff4d6d] text-[10px] gap-1">
            <i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i><i className="fa-solid fa-star"></i>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="reveal glass p-10 rounded-[40px] border-white/5 hover:border-[#ff4d6d]/30 transition">
            <p className="text-xl italic serif opacity-80 mb-8 leading-relaxed">"Honestly, the girlies aren't ready for this lace. It literally vanished the moment it touched my skin. I'm obsessed with the Cherry Signature."</p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#ff4d6d]/20 border border-[#ff4d6d]/40"></div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest">Jasmine K.</div>
                <div className="text-[8px] opacity-40 uppercase">Miami, FL</div>
              </div>
            </div>
          </div>
          <div className="reveal glass p-10 rounded-[40px] border-white/5 md:mt-12">
            <p className="text-xl italic serif opacity-80 mb-8 leading-relaxed">"Shipping was so fast and the hair is like butter. No tangles, no shedding, just pure vibes. 10/10 would recommend to my besties."</p>
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-[#ff4d6d]/20 border border-[#ff4d6d]/40"></div>
              <div>
                <div className="text-xs font-black uppercase tracking-widest">Tasha G.</div>
                <div className="text-[8px] opacity-40 uppercase">London, UK</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Reviews;
