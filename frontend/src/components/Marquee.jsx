const Marquee = () => {
  return (
    <div className="py-10 border-y border-white/5 overflow-hidden">
      <div className="marquee-track">
        <div className="flex items-center space-x-16 px-10">
          <span className="text-4xl font-black outline-text">GLUELESS MASTERY</span>
          <span className="text-4xl font-bold italic serif text-[#ff8fa3] opacity-60">Luxe HD Lace</span>
          <span className="text-4xl font-black outline-text">RAW BURMESE CURLY</span>
          <span className="text-4xl font-bold italic serif text-[#ff8fa3] opacity-60">Hand-Tied Quality</span>
        </div>
        <div className="flex items-center space-x-16 px-10">
          <span className="text-4xl font-black outline-text">GLUELESS MASTERY</span>
          <span className="text-4xl font-bold italic serif text-[#ff8fa3] opacity-60">Luxe HD Lace</span>
          <span className="text-4xl font-black outline-text">RAW BURMESE CURLY</span>
          <span className="text-4xl font-bold italic serif text-[#ff8fa3] opacity-60">Hand-Tied Quality</span>
        </div>
      </div>
    </div>
  );
};
export default Marquee;
