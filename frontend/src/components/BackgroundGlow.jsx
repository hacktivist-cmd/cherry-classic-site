const BackgroundGlow = () => {
  return (
    <>
      <div className="bg-glow top-[-10%] left-[-10%] animate-pulse"></div>
      <div className="bg-glow bottom-[-10%] right-[-10%] animate-pulse" style={{ animationDelay: '2s' }}></div>
    </>
  );
};
export default BackgroundGlow;
