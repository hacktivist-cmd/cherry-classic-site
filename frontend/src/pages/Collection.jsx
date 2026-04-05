import React, { useState, useEffect, useMemo } from 'react';
import { Filter, Heart, ArrowRight, X, Sparkles, Eye, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import axios from 'axios';
import GlassNav from '../components/GlassNav';

const MOCK_PRODUCTS = [
  { _id: "1", name: "Velvet Cherry Wave", price: 450, category: "Frontal Units", texture: "Body Wave", lace: "HD Invisible", imageUrl: "https://images.unsplash.com/photo-1634449571010-02389ed0f9b0?auto=format&fit=crop&q=80&w=800", description: "The signature movement of the Cherry brand.", tags: ["Best Seller"] },
  { _id: "2", name: "Bone Straight Noir", price: 390, category: "Closure Units", texture: "Straight", lace: "Transparent", imageUrl: "https://images.unsplash.com/photo-1580618672591-eb180b1a973f?auto=format&fit=crop&q=80&w=800", description: "Ultra-sleek, zero-tangle raw Burmese silk.", tags: ["New Arrival"] },
  { _id: "3", name: "Burmese Curly Bloom", price: 520, category: "Full Lace", texture: "Curly", lace: "HD Invisible", imageUrl: "https://images.unsplash.com/photo-1595475884199-ad286421e7bb?auto=format&fit=crop&q=80&w=800", description: "High-volume curls that maintain their bounce.", tags: ["Premium"] },
  { _id: "4", name: "Deep Wine Custom", price: 580, category: "Frontal Units", texture: "Straight", lace: "HD Invisible", imageUrl: "https://images.unsplash.com/photo-1605497788044-5a32c7078486?auto=format&fit=crop&q=80&w=800", description: "Hand-colored deep burgundy hues.", tags: ["Custom Color"] },
  { _id: "5", name: "Silk Press Bob", price: 320, category: "Closure Units", texture: "Straight", lace: "Transparent", imageUrl: "https://images.unsplash.com/photo-1519699047748-de8e457a634e?auto=format&fit=crop&q=80&w=800", description: "12-inch precision cut.", tags: ["Glueless"] },
  { _id: "6", name: "Kinky Blowout", price: 480, category: "Frontal Units", texture: "Kinky", lace: "HD Invisible", imageUrl: "https://images.unsplash.com/photo-1560869713-7d0a29430803?auto=format&fit=crop&q=80&w=800", description: "Mimics type 4 hair blown out perfectly.", tags: ["Natural Look"] }
];

const CATEGORIES = ["All Units", "Frontal Units", "Closure Units", "Full Lace"];
const TEXTURES = ["Straight", "Body Wave", "Curly", "Kinky"];

const GlassCard = ({ product, onQuickView, onAddToCart, onAddToWishlist }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);

  const handleAddToCart = async () => {
    setAddingToCart(true);
    onAddToCart(product);
    setTimeout(() => setAddingToCart(false), 500);
  };

  return (
    <div className="group relative bg-[#1a0b10] border border-white/5 rounded-[40px] overflow-hidden transition-all duration-700 hover:border-pink-500/30"
         onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {product.tags && (
        <div className="absolute top-6 left-6 z-10 flex flex-wrap gap-2">
          {product.tags.slice(0,2).map(tag => (
            <span key={tag} className="bg-white/10 backdrop-blur-md text-pink-200 text-[8px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-full border border-white/10">{tag}</span>
          ))}
        </div>
      )}
      <div className="aspect-[4/5] overflow-hidden bg-zinc-900 relative">
        <img src={product.imageUrl} alt={product.name} className={`w-full h-full object-cover transition-transform duration-1000 ${isHovered ? 'scale-110' : 'scale-100'}`} />
        <div className={`absolute inset-0 bg-black/40 flex flex-col items-center justify-center transition-opacity duration-500 gap-4 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
          <button onClick={() => onQuickView(product)} className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-black hover:bg-pink-500 hover:text-white transition shadow-xl"><Eye size={20} /></button>
          <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">Quick Details</span>
        </div>
      </div>
      <div className="p-8">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-xl font-bold font-serif text-white">{product.name}</h3>
          <span className="text-pink-400 font-bold">${product.price}</span>
        </div>
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mb-6">{product.lace} • {product.texture}</p>
        <div className="flex gap-2">
          <button onClick={handleAddToCart} disabled={addingToCart} className="flex-1 bg-white/5 hover:bg-white/10 border border-white/5 py-4 rounded-2xl text-[9px] font-black uppercase tracking-widest text-white transition disabled:opacity-50">{addingToCart ? 'Adding...' : 'Add to Cart'}</button>
          <button onClick={() => onAddToWishlist(product)} className="w-14 bg-white/5 hover:bg-pink-500/20 border border-white/5 flex items-center justify-center rounded-2xl text-pink-300 transition"><Heart size={16} /></button>
        </div>
      </div>
    </div>
  );
};

const QuickViewModal = ({ product, onClose, onAddToCart }) => {
  const [selectedLength, setSelectedLength] = useState(24);
  const [isAdded, setIsAdded] = useState(false);
  if (!product) return null;
  const handleAdd = () => { onAddToCart(product); setIsAdded(true); setTimeout(() => { setIsAdded(false); onClose(); }, 1500); };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-10">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={onClose} />
      <div className="relative w-full max-w-5xl bg-[#0d0106] border border-white/10 rounded-[50px] overflow-hidden flex flex-col md:flex-row">
        <button onClick={onClose} className="absolute top-8 right-8 z-20 text-white/40 hover:text-white"><X size={24} /></button>
        <div className="w-full md:w-1/2 aspect-square overflow-hidden"><img src={product.imageUrl} alt={product.name} className="w-full h-full object-cover" /></div>
        <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center">
          <span className="text-pink-400 text-[10px] font-black uppercase tracking-[0.4em] mb-4">In Stock • Ready to Ship</span>
          <h2 className="text-4xl md:text-5xl font-bold font-serif text-white mb-6">{product.name}</h2>
          <p className="text-zinc-400 text-sm mb-10">{product.description}</p>
          <div className="space-y-8 mb-12">
            <div><label className="text-[10px] font-black uppercase tracking-widest text-zinc-500 block mb-4">Select Length (Inches)</label>
              <div className="flex flex-wrap gap-3">{ [18,22,24,26,30].map(len => (<button key={len} onClick={() => setSelectedLength(len)} className={`px-5 py-3 rounded-xl text-[10px] font-bold transition-all ${selectedLength===len ? 'bg-pink-500 text-white shadow-lg' : 'bg-white/5 text-zinc-400 hover:bg-white/10'}`}>{len}"</button>)) }</div>
            </div>
          </div>
          <div className="flex items-center justify-between pt-8 border-t border-white/5">
            <div><span className="text-zinc-500 text-[10px] font-bold uppercase block">Total Price</span><span className="text-3xl font-bold text-white">${product.price + (selectedLength>24?40:0)}</span></div>
            <button onClick={handleAdd} className={`px-10 py-5 rounded-full text-[11px] font-black uppercase tracking-[0.2em] transition flex items-center gap-3 ${isAdded ? 'bg-emerald-500 text-white' : 'bg-white text-black hover:bg-pink-500 hover:text-white'}`}>{isAdded ? <><Check size={16} /> Added!</> : <>Add to Cart <ArrowRight size={16} /></>}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

const Collection = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All Units");
  const [activeTexture, setActiveTexture] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const { addToCart, addToWishlist } = useCart();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('import.meta.env.VITE_API_URL/products');
        if (res.data && res.data.length) {
          const mapped = res.data.map(p => ({ ...p, texture: p.category === 'Frontal Units' ? 'Body Wave' : 'Straight', lace: 'HD Invisible', tags: p.isTrending ? ['Best Seller'] : ['New Arrival'] }));
          setProducts(mapped);
        } else setProducts(MOCK_PRODUCTS);
      } catch { setProducts(MOCK_PRODUCTS); } finally { setLoading(false); }
    };
    fetchProducts();
  }, []);

  const filteredProducts = useMemo(() => products.filter(p => {
    const matchCat = activeCategory === "All Units" || p.category === activeCategory;
    const matchTex = activeTexture === "All" || p.texture === activeTexture;
    const matchSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchTex && matchSearch;
  }), [activeCategory, activeTexture, searchQuery, products]);

  if (loading) return <div className="min-h-screen bg-[#0d0106]"><GlassNav /><div className="flex items-center justify-center h-screen"><div className="text-pink-400 text-sm animate-pulse">Loading Collection...</div></div></div>;

  return (
    <div className="min-h-screen bg-[#0d0106] text-white">
      <GlassNav />
      <main className="pt-40 pb-32 px-6">
        <div className="max-w-7xl mx-auto">
          <header className="mb-20 text-center lg:text-left flex flex-col lg:flex-row lg:items-end justify-between gap-10">
            <div><div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/10 border border-pink-500/20 text-pink-400 text-[8px] font-black uppercase tracking-[0.4em] mb-6"><Sparkles size={12} /> Winter '24 Ready-To-Wear</div><h1 className="text-6xl md:text-8xl font-bold font-serif leading-tight">Collection <br/> <span className="text-zinc-700 italic">Curated.</span></h1></div>
            <div className="flex flex-col items-center lg:items-end gap-6"><p className="text-zinc-500 text-xs max-w-sm text-center lg:text-right">Our raw hair is sourced from single-donors...</p><div className="flex gap-4 p-1.5 bg-white/5 rounded-2xl border border-white/5">{["All", ...TEXTURES].map(tex => (<button key={tex} onClick={() => setActiveTexture(tex)} className={`px-6 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all ${activeTexture === tex ? 'bg-white text-black' : 'text-zinc-500 hover:text-white'}`}>{tex}</button>))}</div></div>
          </header>
          <div className="mb-12 flex justify-center lg:justify-start"><input type="text" placeholder="Search Units..." className="w-full max-w-sm bg-white/5 border border-white/10 rounded-full px-6 py-3 text-[10px] focus:border-pink-500/50 outline-none uppercase font-bold tracking-widest" onChange={(e) => setSearchQuery(e.target.value)} /></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredProducts.length ? filteredProducts.map(p => <GlassCard key={p._id} product={p} onQuickView={setSelectedProduct} onAddToCart={addToCart} onAddToWishlist={addToWishlist} />) : (
              <div className="col-span-full py-40 text-center"><div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center text-zinc-600 mx-auto mb-4"><Filter size={32} /></div><p className="text-zinc-500 font-serif italic">No units found.</p><button onClick={() => { setActiveCategory("All Units"); setActiveTexture("All"); setSearchQuery(""); }} className="text-pink-400 text-xs font-black uppercase underline underline-offset-8 mt-4">Reset Filters</button></div>
            )}
          </div>
          <div className="mt-40 bg-gradient-to-br from-[#1a0b10] to-[#0d0106] border border-white/10 rounded-[60px] p-16 md:p-24 relative overflow-hidden"><div className="absolute top-[-50%] right-[-10%] w-[600px] h-[600px] bg-pink-500/10 blur-[120px] rounded-full" /><div className="relative z-10 max-w-2xl"><h2 className="text-5xl md:text-6xl font-bold font-serif mb-8">Can't find <br/> <span className="italic text-pink-400">your dream?</span></h2><p className="text-zinc-400 text-lg mb-12">Our master colorists take bespoke orders every Tuesday.</p><button className="bg-white text-black px-12 py-5 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-pink-500 hover:text-white transition flex items-center gap-4">Inquire for Custom Color <ArrowRight size={18} /></button></div></div>
        </div>
      </main>
      {selectedProduct && <QuickViewModal product={selectedProduct} onClose={() => setSelectedProduct(null)} onAddToCart={addToCart} />}
    </div>
  );
};
export default Collection;
