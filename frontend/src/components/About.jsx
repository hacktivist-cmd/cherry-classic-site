const About = () => {
  return (
    <section id="about" className="py-32 bg-[#0d0106] relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
        <div className="reveal glass rounded-[60px] p-2 aspect-[4/5] relative overflow-hidden">
          <img src="https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=800" className="w-full h-full object-cover rounded-[58px] opacity-80" alt="Cherry Classic Philosophy" />
        </div>
        <div className="reveal">
          <h2 className="text-5xl font-bold serif mb-8">Our Philosophy</h2>
          <p className="opacity-60 text-lg leading-relaxed mb-8 serif italic">"Confidence is the best accessory, but premium hair comes a close second."</p>
          <p className="opacity-40 mb-10 leading-relaxed">Cherry Classic was founded on the belief that luxury hair should be an experience, not just a purchase. We specialize in ethically sourced raw hair and invisible lace technology that mimics the natural scalp perfectly.</p>
          <div className="grid grid-cols-2 gap-8">
            <div>
              <h4 className="text-[#ff4d6d] font-bold mb-2">Ethical Sourcing</h4>
              <p className="text-[10px] opacity-40 uppercase tracking-widest">100% Raw Virgin Donors</p>
            </div>
            <div>
              <h4 className="text-[#ff4d6d] font-bold mb-2">Global Shipping</h4>
              <p className="text-[10px] opacity-40 uppercase tracking-widest">To Your Door in 3-5 Days</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default About;
