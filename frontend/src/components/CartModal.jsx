import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const CartModal = ({ isOpen, onClose }) => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (!isOpen) return null;

  const handleCheckout = () => {
    onClose();
    navigate('/checkout');
  };

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative glass w-full max-w-md h-full shadow-2xl border-l border-white/10 animate-slide-in">
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-playfair">Your Cart</h2>
            <button onClick={onClose} className="text-white/60 hover:text-white">
              <i className="fa-solid fa-times"></i>
            </button>
          </div>
          {cart.length === 0 ? (
            <p className="text-white/60 text-center py-8">Your cart is empty.</p>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto space-y-4">
                {cart.map(item => (
                  <div key={item.productId} className="flex gap-4 p-3 glass rounded-2xl">
                    <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                    <div className="flex-1">
                      <h4 className="font-bold text-sm">{item.name}</h4>
                      <p className="text-[#ff8fa3] text-xs">${item.price}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <button onClick={() => updateQuantity(item.productId, item.quantity - 1)} className="text-white/60 text-xs">-</button>
                        <span className="text-xs">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1)} className="text-white/60 text-xs">+</button>
                      </div>
                    </div>
                    <button onClick={() => removeFromCart(item.productId)} className="text-red-400 text-xs">Remove</button>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-4 mt-4">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total</span>
                  <span>${total}</span>
                </div>
                <button onClick={handleCheckout} className="w-full mt-4 bg-[#ff4d6d] py-2 rounded-full text-sm font-black uppercase tracking-widest">
                  Checkout
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default CartModal;
