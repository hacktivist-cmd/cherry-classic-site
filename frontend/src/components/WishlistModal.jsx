import { useCart } from '../context/CartContext';

const WishlistModal = ({ isOpen, onClose }) => {
  const { wishlist, removeFromWishlist, addToCart } = useCart();

  if (!isOpen) return null;

  const handleAddToCart = (item) => {
    addToCart({ _id: item.productId, name: item.name, price: item.price, imageUrl: item.imageUrl });
  };

  return (
    <div className="fixed inset-0 z-[200] flex justify-end">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative glass w-full max-w-md h-full shadow-2xl border-l border-white/10 animate-slide-in">
        <div className="p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-playfair">Wishlist</h2>
            <button onClick={onClose} className="text-white/60 hover:text-white">
              <i className="fa-solid fa-times"></i>
            </button>
          </div>
          {wishlist.length === 0 ? (
            <p className="text-white/60 text-center py-8">Your wishlist is empty.</p>
          ) : (
            <div className="flex-1 overflow-y-auto space-y-4">
              {wishlist.map(item => (
                <div key={item.productId} className="flex gap-4 p-3 glass rounded-2xl">
                  <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                  <div className="flex-1">
                    <h4 className="font-bold text-sm">{item.name}</h4>
                    <p className="text-[#ff8fa3] text-xs">${item.price}</p>
                  </div>
                  <div className="flex gap-2">
                    <button onClick={() => handleAddToCart(item)} className="text-green-400 text-xs">Add to Cart</button>
                    <button onClick={() => removeFromWishlist(item.productId)} className="text-red-400 text-xs">Remove</button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export default WishlistModal;
