const Contact = () => {
  return (
    <section id="contact" className="py-32 bg-[#0d0106]">
      <div className="max-w-6xl mx-auto px-6 text-center reveal">
        <h2 className="text-5xl font-bold serif mb-6">Let's Chat, Babe.</h2>
        <p className="opacity-40 text-sm mb-12">Question about your order? Need a custom lace tint? We're here for you.</p>
        <div className="inline-flex glass p-8 rounded-[40px] flex-col md:flex-row gap-10 items-center">
          <div className="flex items-center space-x-4">
            <i className="fa-solid fa-envelope text-[#ff4d6d]"></i>
            <span className="text-xs font-bold tracking-widest">HELLO@CHERRYCLASSIC.COM</span>
          </div>
          <div className="w-px h-6 bg-white/10 hidden md:block"></div>
          <div className="flex items-center space-x-4">
            <i className="fa-solid fa-phone text-[#ff4d6d]"></i>
            <span className="text-xs font-bold tracking-widest">+1 (800) CHERRY-LUXE</span>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Contact;
