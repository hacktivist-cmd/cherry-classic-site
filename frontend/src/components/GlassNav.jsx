import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartModal from './CartModal';
import WishlistModal from './WishlistModal';

const GlassNav = () => {
  const { cart, wishlist } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <nav className="fixed top-0 w-full z-50 p-6">
        <div className="max-w-6xl mx-auto glass rounded-[30px] py-3 px-8 flex justify-between items-center shadow-lg">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#ff4d6d] to-[#590d22] flex items-center justify-center font-bold text-xs shadow-lg shadow-[#ff4d6d]/20">
              CC
            </div>
            <span className="text-sm font-extrabold tracking-[0.3em] serif">CHERRY CLASSIC</span>
          </Link>
          <div className="hidden md:flex space-x-10 text-[9px] font-black tracking-widest uppercase opacity-70">
            <Link to="/" className="hover:text-[#ff8fa3] transition">Home</Link>
            <Link to="/collection" className="hover:text-[#ff8fa3] transition">Collection</Link>
            <Link to="/about" className="hover:text-[#ff8fa3] transition">About</Link>
            <Link to="/contact" className="hover:text-[#ff8fa3] transition">Contact</Link>
            <Link to="/track-order" className="hover:text-[#ff8fa3] transition">Track Order</Link>
          </div>
          <div className="flex items-center space-x-5">
            <button onClick={() => setIsWishlistOpen(true)} className="relative w-8 h-8 rounded-full flex items-center justify-center hover:bg-white/10 transition">
              <i className="fa-solid fa-heart text-xs opacity-60"></i>
              {wishlist.length > 0 && <span className="absolute -top-1 -right-1 bg-[#ff4d6d] text-white text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-black">{wishlist.length}</span>}
            </button>
            <button onClick={() => setIsCartOpen(true)} className="relative w-8 h-8 rounded-full flex items-center justify-center bg-[#ff4d6d]/10">
              <i className="fa-solid fa-cart-shopping text-xs text-[#ff8fa3]"></i>
              {cartCount > 0 && <span className="absolute -top-1 -right-1 bg-white text-[#ff4d6d] text-[7px] w-3.5 h-3.5 rounded-full flex items-center justify-center font-black">{cartCount}</span>}
            </button>
          </div>
        </div>
      </nav>
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <WishlistModal isOpen={isWishlistOpen} onClose={() => setIsWishlistOpen(false)} />
    </>
  );
};
export default GlassNav;
