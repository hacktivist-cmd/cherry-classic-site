import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import GlassNav from '../components/GlassNav';
import { ArrowLeft, CheckCircle, Copy } from 'lucide-react';
import { PaystackButton } from 'react-paystack';
import axios from 'axios';

const USD_TO_NGN = 1550;

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('pay_on_delivery');
  const [customer, setCustomer] = useState({
    name: '', email: '', address: '', city: '', postalCode: '', phone: ''
  });

  const totalUSD = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingUSD = totalUSD > 200 ? 0 : 15;
  const grandTotalUSD = totalUSD + shippingUSD;
  const grandTotalNGN = Math.round(grandTotalUSD * USD_TO_NGN);

  const handleChange = (e) => setCustomer({ ...customer, [e.target.name]: e.target.value });

  const saveOrder = async () => {
    setLoading(true);
    try {
      const items = cart.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        imageUrl: item.imageUrl
      }));
      const res = await axios.post('import.meta.env.VITE_API_URL/orders', {
        items,
        shippingAddress: customer,
        totalAmount: grandTotalUSD,
        paymentMethod
      });
      const newOrder = res.data;
      setOrderId(newOrder._id);
      clearCart();
      setOrderComplete(true);
    } catch (err) {
      alert('Order failed: ' + (err.response?.data?.message || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handlePaystackSuccess = () => {
    saveOrder();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert('Your cart is empty');
      navigate('/');
      return;
    }
    if (paymentMethod === 'pay_on_delivery') {
      saveOrder();
    }
  };

  const paystackConfig = {
    reference: `${Date.now()}-${Math.floor(Math.random() * 1000000)}`,
    email: customer.email,
    amount: grandTotalNGN * 100,
    publicKey: 'YOUR_PAYSTACK_PUBLIC_KEY',
    onSuccess: handlePaystackSuccess,
    onClose: () => alert('Payment was not completed'),
  };

  const copyOrderId = () => {
    navigator.clipboard.writeText(orderId);
    alert('Order ID copied to clipboard');
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen bg-[#0d0106]">
        <GlassNav />
        <div className="pt-40 flex items-center justify-center px-6">
          <div className="glass rounded-[60px] p-8 md:p-16 text-center max-w-2xl">
            <CheckCircle className="text-green-400 w-20 h-20 mx-auto mb-6" />
            <h2 className="text-3xl font-playfair mb-4">Order Placed!</h2>
            <p className="text-white/80 mb-6">Thank you, {customer.name}. Your Cherry Classic order is confirmed.</p>
            
            <div className="bg-white/10 rounded-2xl p-6 mb-6">
              <p className="text-sm text-white/60 mb-2">Your Order ID</p>
              <div className="flex items-center justify-center gap-3">
                <code className="text-xl font-mono font-bold text-pink-300">{orderId}</code>
                <button onClick={copyOrderId} className="p-2 hover:bg-white/10 rounded-full transition">
                  <Copy size={18} />
                </button>
              </div>
              <p className="text-xs text-yellow-300 mt-4 font-bold">
                ⚠️ IMPORTANT: Please take a screenshot or note this Order ID. You will need it to track your order and for delivery verification.
              </p>
            </div>

            <div className="flex gap-4 justify-center">
              <button onClick={() => navigate('/')} className="bg-pink-500 px-6 py-2 rounded-full text-sm font-black uppercase">Continue Shopping</button>
              <button onClick={() => navigate('/track-order')} className="glass px-6 py-2 rounded-full text-sm font-black uppercase">Track Order</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Rest of the checkout form (unchanged)
  return (
    <div className="min-h-screen bg-[#0d0106]">
      <GlassNav />
      <main className="pt-40 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-white/60 hover:text-pink-400 mb-8">
            <ArrowLeft size={16} /> Back
          </button>
          <div className="grid lg:grid-cols-3 gap-10">
            <div className="lg:col-span-2">
              <div className="glass rounded-[40px] p-8 md:p-10">
                <h1 className="text-3xl font-playfair mb-6">Checkout</h1>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <h2 className="text-lg font-bold mb-4">Shipping Details</h2>
                    <div className="grid md:grid-cols-2 gap-4">
                      <input type="text" name="name" onChange={handleChange} placeholder="Full Name" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-pink-500 outline-none" />
                      <input type="email" name="email" onChange={handleChange} placeholder="Email" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-pink-500 outline-none" />
                      <input type="text" name="address" onChange={handleChange} placeholder="Address" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-pink-500 outline-none" />
                      <input type="text" name="city" onChange={handleChange} placeholder="City" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-pink-500 outline-none" />
                      <input type="text" name="postalCode" onChange={handleChange} placeholder="Postal Code" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-pink-500 outline-none" />
                      <input type="tel" name="phone" onChange={handleChange} placeholder="Phone" required className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm focus:border-pink-500 outline-none" />
                    </div>
                  </div>

                  <div>
                    <h2 className="text-lg font-bold mb-4">Payment Method</h2>
                    <div className="flex flex-wrap gap-6">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="paymentMethod" value="pay_on_delivery" checked={paymentMethod === 'pay_on_delivery'} onChange={() => setPaymentMethod('pay_on_delivery')} />
                        Pay on Delivery (Cash / Card on arrival)
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="radio" name="paymentMethod" value="paystack" checked={paymentMethod === 'paystack'} onChange={() => setPaymentMethod('paystack')} />
                        Pay with Paystack (Card, Transfer, USSD)
                      </label>
                    </div>
                  </div>

                  {paymentMethod === 'pay_on_delivery' && (
                    <button type="submit" disabled={loading} className="w-full bg-pink-500 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-pink-600 disabled:opacity-50">
                      {loading ? 'Processing...' : `Place Order • ₦${grandTotalNGN.toLocaleString()}`}
                    </button>
                  )}

                  {paymentMethod === 'paystack' && (
                    <PaystackButton
                      {...paystackConfig}
                      text={`Pay ₦${grandTotalNGN.toLocaleString()} with Paystack`}
                      className="w-full bg-green-600 py-4 rounded-full font-black uppercase tracking-widest text-sm hover:bg-green-700 transition cursor-pointer"
                    />
                  )}
                </form>
              </div>
            </div>

            <div className="lg:col-span-1">
              <div className="glass rounded-[40px] p-8 sticky top-40">
                <h2 className="text-xl font-playfair mb-4">Your Cart</h2>
                <div className="space-y-4 max-h-80 overflow-y-auto mb-6">
                  {cart.map(item => (
                    <div key={item.productId} className="flex gap-3">
                      <img src={item.imageUrl} className="w-12 h-12 object-cover rounded-lg" />
                      <div className="flex-1">
                        <p className="text-sm font-bold">{item.name}</p>
                        <p className="text-xs text-pink-400">₦{(item.price * USD_TO_NGN).toLocaleString()} x {item.quantity}</p>
                      </div>
                      <span className="text-sm font-bold">₦{(item.price * USD_TO_NGN * item.quantity).toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="border-t border-white/10 pt-4 space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Subtotal</span>
                    <span>₦{(totalUSD * USD_TO_NGN).toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Shipping</span>
                    <span>{shippingUSD === 0 ? 'Free' : `₦${(shippingUSD * USD_TO_NGN).toLocaleString()}`}</span>
                  </div>
                  <div className="flex justify-between text-xl font-bold pt-2">
                    <span>Total</span>
                    <span>₦{grandTotalNGN.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
