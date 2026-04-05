import { useState } from 'react';
import GlassNav from '../components/GlassNav';
import axios from 'axios';

const TrackOrder = () => {
  const [email, setEmail] = useState('');
  const [orderId, setOrderId] = useState('');
  const [order, setOrder] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setOrder(null);
    try {
      const res = await axios.get('import.meta.env.VITE_API_URL/orders/track', {
        params: { email, orderId }
      });
      setOrder(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Order not found');
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case 'pending': return 'text-yellow-400';
      case 'processing': return 'text-blue-400';
      case 'shipped': return 'text-purple-400';
      case 'delivered': return 'text-green-400';
      case 'cancelled': return 'text-red-400';
      default: return 'text-white';
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0106]">
      <GlassNav />
      <main className="pt-40 pb-20 px-6">
        <div className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-playfair mb-8 text-center">Track Your Order</h1>
          <p className="text-white/60 text-center mb-10">Enter your email and order ID to see the latest status.</p>

          <form onSubmit={handleSubmit} className="glass rounded-[40px] p-8 space-y-6">
            <div>
              <label className="block text-sm font-bold mb-2">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-pink-500 outline-none"
                placeholder="your@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-bold mb-2">Order ID</label>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-pink-500 outline-none"
                placeholder="e.g., 67f0a1b2c3d4e5f6a7b8c9d0"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-pink-500 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-pink-600 transition disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Track Order'}
            </button>
          </form>

          {error && (
            <div className="mt-8 glass rounded-[40px] p-6 text-center border border-red-500/30">
              <p className="text-red-400">{error}</p>
            </div>
          )}

          {order && (
            <div className="mt-8 glass rounded-[40px] p-8 space-y-4">
              <h2 className="text-2xl font-playfair mb-4">Order Details</h2>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="font-bold">Order ID:</span>
                <span className="text-sm">{order._id}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="font-bold">Status:</span>
                <span className={`font-bold ${getStatusColor(order.status)}`}>{order.status}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="font-bold">Total Amount:</span>
                <span>₦{(order.totalAmount * 1550).toLocaleString()}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="font-bold">Payment Method:</span>
                <span>{order.paymentMethod === 'paystack' ? 'Paystack' : 'Pay on Delivery'}</span>
              </div>
              <div className="flex justify-between border-b border-white/10 pb-2">
                <span className="font-bold">Order Date:</span>
                <span>{new Date(order.createdAt).toLocaleString()}</span>
              </div>
              <div className="mt-4">
                <h3 className="font-bold mb-2">Items:</h3>
                <ul className="space-y-2">
                  {order.items.map((item, idx) => (
                    <li key={idx} className="flex justify-between text-sm">
                      <span>{item.name} x {item.quantity}</span>
                      <span>₦{(item.price * 1550 * item.quantity).toLocaleString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-4 pt-4 border-t border-white/10">
                <h3 className="font-bold mb-2">Shipping Address:</h3>
                <p className="text-sm text-white/70">
                  {order.shippingAddress.name}<br />
                  {order.shippingAddress.address}, {order.shippingAddress.city}<br />
                  {order.shippingAddress.postalCode}<br />
                  {order.shippingAddress.phone}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default TrackOrder;
