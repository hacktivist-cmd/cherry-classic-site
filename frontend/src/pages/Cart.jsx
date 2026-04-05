import { useUser } from '../context/UserContext';
import { Link } from 'react-router-dom';

const Cart = () => {
  const { cart, removeFromCart } = useUser();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="pt-32 min-h-screen container mx-auto px-6">
      <h1 className="text-4xl font-playfair mb-8">Your Cart</h1>
      {cart.length === 0 ? (
        <p className="text-white/60">Your cart is empty. <Link to="/" className="text-[#ff8fa3]">Shop now</Link></p>
      ) : (
        <div className="space-y-4">
          {cart.map(item => (
            <div key={item.productId} className="glass p-4 rounded-2xl flex justify-between items-center">
              <div className="flex items-center space-x-4">
                <img src={item.imageUrl} alt={item.name} className="w-16 h-16 object-cover rounded-lg" />
                <div>
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm text-[#ff8fa3]">${item.price} x {item.quantity}</p>
                </div>
              </div>
              <button onClick={() => removeFromCart(item.productId)} className="text-red-400 text-sm">Remove</button>
            </div>
          ))}
          <div className="text-right pt-4 border-t border-white/10">
            <p className="text-xl font-bold">Total: ${total}</p>
            <button className="mt-4 bg-[#ff4d6d] px-6 py-2 rounded-full">Checkout</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
