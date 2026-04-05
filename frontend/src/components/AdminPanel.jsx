const AdminPanel = ({ isOpen, onClose }) => {
  return (
    <div
      className={`glass shadow-2xl border-l border-white/10 overflow-hidden fixed top-0 right-0 w-full max-w-[400px] h-screen z-[100] transition-all duration-[0.6s] ease-[cubic-bezier(0.19,1,0.22,1)] ${
        isOpen ? 'right-0' : '-right-full'
      }`}
    >
      <div className="h-full flex flex-col p-8 custom-scrollbar overflow-y-auto">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center space-x-3">
            <div className="w-2.5 h-2.5 rounded-full bg-pink-400 animate-pulse"></div>
            <h2 className="text-sm font-black tracking-[0.2em] uppercase text-pink-200">Management</h2>
          </div>
          <button onClick={onClose} className="opacity-40 hover:opacity-100 transition">
            <i className="fa-solid fa-times"></i>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-10">
          <div className="glass p-5 rounded-3xl bg-white/5 border-none">
            <div className="text-[8px] font-bold opacity-40 uppercase tracking-widest mb-2">Revenue</div>
            <div className="text-xl font-black">$12.4k</div>
          </div>
          <div className="glass p-5 rounded-3xl bg-white/5 border-none">
            <div className="text-[8px] font-bold opacity-40 uppercase tracking-widest mb-2">Pending</div>
            <div className="text-xl font-black text-pink-400">8 Units</div>
          </div>
        </div>

        <h3 className="text-[9px] font-black uppercase tracking-widest opacity-30 mb-5">Order Tracking</h3>
        <div className="space-y-3">
          <div className="glass p-4 rounded-2xl flex justify-between items-center bg-black/30 border-white/5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-[#ff4d6d]/10 flex items-center justify-center text-xs text-[#ff4d6d]">
                <i className="fa-solid fa-box"></i>
              </div>
              <div>
                <div className="text-xs font-bold">Order #8821</div>
                <div className="text-[8px] opacity-40 tracking-widest uppercase">Processing</div>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
          </div>
          <div className="glass p-4 rounded-2xl flex justify-between items-center bg-black/30 border-white/5">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-xl bg-pink-400/10 flex items-center justify-center text-xs text-pink-400">
                <i className="fa-solid fa-truck"></i>
              </div>
              <div>
                <div className="text-xs font-bold">Order #8819</div>
                <div className="text-[8px] opacity-40 tracking-widest uppercase">Shipped</div>
              </div>
            </div>
            <div className="w-2 h-2 rounded-full bg-emerald-400"></div>
          </div>
        </div>

        <button className="shimmer mt-auto w-full bg-gradient-to-r from-[#ff4d6d] to-[#590d22] py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-[#ff4d6d]/20">
          Update Store Status
        </button>
      </div>
    </div>
  );
};
export default AdminPanel;
