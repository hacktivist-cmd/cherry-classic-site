import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist, removeFromWishlist, addToCart } = useUser();

  return (
    <div className="pt-32 min-h-screen container mx-auto px-6">
      <h1 className="text-4xl font-playfair mb-8">Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p className="text-white/60">Your wishlist is empty. <Link to="/" className="text-[#ff8fa3]">Explore collection</Link></p>
      ) : (
        <div className="grid md:grid-cols-3 gap-8">
          {wishlist.map(item => (
            <div key={item.productId} className="glass rounded-2xl overflow-hidden">
              <img src={item.imageUrl} alt={item.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold">{item.name}</h3>
                <p className="text-[#ff8fa3]">${item.price}</p>
                <div className="flex gap-2 mt-4">
                  <button onClick={() => addToCart({ _id: item.productId, name: item.name, price: item.price, imageUrl: item.imageUrl })} className="flex-1 bg-[#ff4d6d] py-2 rounded-full text-xs">Add to Cart</button>
                  <button onClick={() => removeFromWishlist(item.productId)} className="flex-1 border border-white/20 py-2 rounded-full text-xs">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default Wishlist;
