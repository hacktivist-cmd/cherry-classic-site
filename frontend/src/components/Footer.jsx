import { Link } from 'react-router-dom';

const Footer = () => {
  const handleSubscribe = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const box = e.currentTarget.closest('#sub-box');
    if (!email.includes('@')) {
      box.style.borderColor = '#ff4d6d';
      return;
    }
    box.style.opacity = '0.5';
    document.body.classList.add('bloom-active');
    setTimeout(() => {
      box.innerHTML = `<div class="w-full text-center py-4 text-[9px] font-black uppercase tracking-[0.3em] text-[#ff8fa3]">You're on the list, babe! ✨</div>`;
      document.body.classList.remove('bloom-active');
    }, 1500);
  };

  return (
    <footer className="pt-20 pb-12 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-16 pb-20 border-b border-white/5 mb-12 items-center">
          <div className="reveal">
            <h3 className="text-4xl font-bold serif mb-4">Be A Cherry Girl.</h3>
            <p className="opacity-40 text-xs mb-8 max-w-xs">Get early access to drops, maintenance tips, and exclusive discount codes.</p>
            <form id="sub-box" onSubmit={handleSubscribe} className="glass p-1 flex items-center rounded-3xl border-[#ff4d6d]/20 focus-within:border-[#ff4d6d]/60 transition-all duration-500">
              <input name="email" type="email" placeholder="Enter your email" className="bg-transparent border-none outline-none w-full px-6 py-4 text-[10px] uppercase tracking-widest font-bold" />
              <button type="submit" className="shimmer bg-white text-black px-8 py-3.5 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-[#ff4d6d] hover:text-white transition">
                Subscribe
              </button>
            </form>
          </div>
          <div className="reveal flex flex-wrap gap-4 justify-end items-center">
            <a href="#" className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-lg hover:text-[#ff4d6d] hover:border-[#ff4d6d]/50 transition">
              <i className="fa-brands fa-instagram"></i>
            </a>
            <a href="#" className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-lg hover:text-[#ff4d6d] hover:border-[#ff4d6d]/50 transition">
              <i className="fa-brands fa-tiktok"></i>
            </a>
            <a href="#" className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-lg hover:text-[#ff4d6d] hover:border-[#ff4d6d]/50 transition">
              <i className="fa-brands fa-pinterest"></i>
            </a>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row justify-between items-center text-[7px] font-bold uppercase tracking-[0.4em] opacity-30 gap-6">
          <div>© 2024 Cherry Classic Hair • Studio Luxe</div>
          <div className="flex space-x-10">
            <Link to="/track-order" className="hover:opacity-100 transition">Track Order</Link>
            <a href="#" className="hover:opacity-100 transition">Shipping</a>
            <a href="#" className="hover:opacity-100 transition">Privacy</a>
            <a href="#" className="hover:opacity-100 transition">Lace Care</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
