import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import GlassNav from '../components/GlassNav';
import { Plus, Edit, Trash2, Upload } from 'lucide-react';

const Admin = () => {
  const [token, setToken] = useState(localStorage.getItem('adminToken'));
  const [activeTab, setActiveTab] = useState('products');
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProduct, setEditingProduct] = useState(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [productForm, setProductForm] = useState({ name: '', price: '', category: '', imageUrl: '', description: '', stock: 10, isTrending: false });
  const [uploading, setUploading] = useState(false);
  const navigate = useNavigate();

  const api = axios.create({ baseURL: 'import.meta.env.VITE_API_URL' });
  api.interceptors.request.use(config => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  useEffect(() => {
    if (!token) { navigate('/admin/login'); return; }
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      if (activeTab === 'products') {
        const res = await api.get('/admin/products');
        setProducts(res.data);
      } else if (activeTab === 'orders') {
        const res = await api.get('/admin/orders');
        setOrders(res.data);
      } else if (activeTab === 'coupons') {
        const res = await api.get('/coupons');
        setCoupons(res.data);
      }
    } catch (err) {
      if (err.response?.status === 401) { localStorage.removeItem('adminToken'); navigate('/admin/login'); }
      toast.error('Failed to load');
    } finally { setLoading(false); }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('image', file);
    try {
      const res = await axios.post('import.meta.env.VITE_API_URL/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${token}` }
      });
      setProductForm({ ...productForm, imageUrl: res.data.imageUrl });
      toast.success('Image uploaded');
    } catch (err) {
      toast.error('Upload failed');
    } finally {
      setUploading(false);
    }
  };

  const handleSaveProduct = async () => {
    if (!productForm.imageUrl) { toast.error('Please upload an image'); return; }
    try {
      if (editingProduct) {
        await api.put(`/admin/products/${editingProduct._id}`, productForm);
        toast.success('Product updated');
      } else {
        await api.post('/admin/products', productForm);
        toast.success('Product created');
      }
      setShowProductModal(false);
      setEditingProduct(null);
      fetchData();
    } catch (err) { toast.error('Save failed'); }
  };

  const deleteProduct = async (id) => {
    if (confirm('Delete product?')) {
      await api.delete(`/admin/products/${id}`);
      toast.success('Deleted');
      fetchData();
    }
  };

  const updateOrderStatus = async (orderId, status) => {
    try {
      await api.put(`/admin/orders/${orderId}/status`, { status });
      toast.success('Status updated');
      fetchData();
    } catch (err) { toast.error('Failed'); }
  };

  const [couponForm, setCouponForm] = useState({ code: '', discountType: 'percentage', discountValue: '', minOrder: 0, maxUses: 1, expiresAt: '', active: true });
  const [showCouponModal, setShowCouponModal] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState(null);

  const saveCoupon = async () => {
    try {
      if (editingCoupon) {
        await api.put(`/coupons/${editingCoupon._id}`, couponForm);
      } else {
        await api.post('/coupons', couponForm);
      }
      toast.success('Coupon saved');
      setShowCouponModal(false);
      fetchData();
    } catch (err) { toast.error('Save failed'); }
  };

  const deleteCoupon = async (id) => {
    if (confirm('Delete coupon?')) {
      await api.delete(`/coupons/${id}`);
      toast.success('Deleted');
      fetchData();
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0106]">
      <GlassNav />
      <main className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-playfair mb-8">Admin Dashboard</h1>
          <div className="flex gap-4 border-b border-white/10 mb-8">
            <button className={`pb-2 px-4 ${activeTab === 'products' ? 'text-pink-400 border-b-2 border-pink-400' : 'text-white/60'}`} onClick={() => setActiveTab('products')}>Products</button>
            <button className={`pb-2 px-4 ${activeTab === 'orders' ? 'text-pink-400 border-b-2 border-pink-400' : 'text-white/60'}`} onClick={() => setActiveTab('orders')}>Orders</button>
            <button className={`pb-2 px-4 ${activeTab === 'coupons' ? 'text-pink-400 border-b-2 border-pink-400' : 'text-white/60'}`} onClick={() => setActiveTab('coupons')}>Coupons</button>
          </div>

          {activeTab === 'products' && (
            <div>
              <button onClick={() => { setEditingProduct(null); setProductForm({ name: '', price: '', category: '', imageUrl: '', description: '', stock: 10, isTrending: false }); setShowProductModal(true); }} className="mb-6 bg-pink-500 px-4 py-2 rounded-full text-sm flex items-center gap-2"><Plus size={16} /> Add Product</button>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map(p => (
                  <div key={p._id} className="glass rounded-2xl p-4">
                    <img src={p.imageUrl} alt={p.name} className="w-full h-40 object-cover rounded-xl mb-4" />
                    <h3 className="font-bold">{p.name}</h3>
                    <p className="text-pink-400">${p.price}</p>
                    <p className="text-sm">Stock: {p.stock}</p>
                    <div className="flex gap-2 mt-4">
                      <button onClick={() => { setEditingProduct(p); setProductForm(p); setShowProductModal(true); }} className="bg-white/10 p-2 rounded-full"><Edit size={16} /></button>
                      <button onClick={() => deleteProduct(p._id)} className="bg-white/10 p-2 rounded-full text-red-400"><Trash2 size={16} /></button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              {orders.map(order => (
                <div key={order._id} className="glass rounded-2xl p-6">
                  <div className="flex justify-between items-start flex-wrap gap-2">
                    <div><span className="text-xs text-white/50">Order ID:</span> <code>{order._id}</code></div>
                    <div><span className="text-xs text-white/50">Total:</span> ₦{(order.totalAmount * 1550).toLocaleString()}</div>
                    <div>
                      <select value={order.status} onChange={(e) => updateOrderStatus(order._id, e.target.value)} className="bg-white/10 border border-white/10 rounded-full px-3 py-1 text-xs">
                        <option>Pending</option><option>Processing</option><option>Shipped</option><option>Delivered</option><option>Cancelled</option>
                      </select>
                    </div>
                  </div>
                  <div className="mt-3 text-sm">Customer: {order.shippingAddress.name} ({order.shippingAddress.email})</div>
                  <div className="text-xs text-white/50 mt-1">{new Date(order.createdAt).toLocaleString()}</div>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'coupons' && (
            <div>
              <button onClick={() => { setEditingCoupon(null); setCouponForm({ code: '', discountType: 'percentage', discountValue: '', minOrder: 0, maxUses: 1, expiresAt: '', active: true }); setShowCouponModal(true); }} className="mb-6 bg-pink-500 px-4 py-2 rounded-full text-sm flex items-center gap-2"><Plus size={16} /> Add Coupon</button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {coupons.map(c => (
                  <div key={c._id} className="glass rounded-2xl p-4 flex justify-between items-center">
                    <div><span className="font-mono font-bold">{c.code}</span> - {c.discountType === 'percentage' ? `${c.discountValue}% off` : `₦${c.discountValue} off`}</div>
                    <button onClick={() => deleteCoupon(c._id)} className="text-red-400"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Product Modal with Image Upload */}
      {showProductModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="glass rounded-3xl p-8 max-w-md w-full max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl mb-4">{editingProduct ? 'Edit Product' : 'New Product'}</h3>
            <input type="text" placeholder="Name" value={productForm.name} onChange={e => setProductForm({...productForm, name: e.target.value})} className="w-full p-2 bg-white/5 rounded mb-3" />
            <input type="number" placeholder="Price (USD)" value={productForm.price} onChange={e => setProductForm({...productForm, price: e.target.value})} className="w-full p-2 bg-white/5 rounded mb-3" />
            <input type="text" placeholder="Category" value={productForm.category} onChange={e => setProductForm({...productForm, category: e.target.value})} className="w-full p-2 bg-white/5 rounded mb-3" />
            <div className="mb-3">
              <label className="block text-xs mb-1">Product Image</label>
              <input type="file" accept="image/*" onChange={handleImageUpload} className="w-full p-2 bg-white/5 rounded" disabled={uploading} />
              {uploading && <p className="text-xs text-pink-400 mt-1">Uploading...</p>}
              {productForm.imageUrl && <img src={productForm.imageUrl} className="w-24 h-24 object-cover rounded mt-2" />}
            </div>
            <textarea placeholder="Description" value={productForm.description} onChange={e => setProductForm({...productForm, description: e.target.value})} className="w-full p-2 bg-white/5 rounded mb-3" rows="2" />
            <input type="number" placeholder="Stock" value={productForm.stock} onChange={e => setProductForm({...productForm, stock: e.target.value})} className="w-full p-2 bg-white/5 rounded mb-3" />
            <label className="flex items-center gap-2 mb-4"><input type="checkbox" checked={productForm.isTrending} onChange={e => setProductForm({...productForm, isTrending: e.target.checked})} /> Trending</label>
            <div className="flex gap-3">
              <button onClick={handleSaveProduct} className="bg-pink-500 px-6 py-2 rounded-full">Save</button>
              <button onClick={() => setShowProductModal(false)} className="bg-white/10 px-6 py-2 rounded-full">Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* Coupon Modal */}
      {showCouponModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="glass rounded-3xl p-8 max-w-md w-full">
            <h3 className="text-xl mb-4">{editingCoupon ? 'Edit Coupon' : 'New Coupon'}</h3>
            <input type="text" placeholder="Code" value={couponForm.code} onChange={e => setCouponForm({...couponForm, code: e.target.value.toUpperCase()})} className="w-full p-2 bg-white/5 rounded mb-3" />
            <select value={couponForm.discountType} onChange={e => setCouponForm({...couponForm, discountType: e.target.value})} className="w-full p-2 bg-white/5 rounded mb-3">
              <option value="percentage">Percentage</option><option value="fixed">Fixed Amount</option>
            </select>
            <input type="number" placeholder="Discount Value" value={couponForm.discountValue} onChange={e => setCouponForm({...couponForm, discountValue: e.target.value})} className="w-full p-2 bg-white/5 rounded mb-3" />
            <input type="number" placeholder="Min Order (USD)" value={couponForm.minOrder} onChange={e => setCouponForm({...couponForm, minOrder: e.target.value})} className="w-full p-2 bg-white/5 rounded mb-3" />
            <input type="number" placeholder="Max Uses" value={couponForm.maxUses} onChange={e => setCouponForm({...couponForm, maxUses: e.target.value})} className="w-full p-2 bg-white/5 rounded mb-3" />
            <input type="datetime-local" value={couponForm.expiresAt} onChange={e => setCouponForm({...couponForm, expiresAt: e.target.value})} className="w-full p-2 bg-white/5 rounded mb-3" />
            <div className="flex gap-3">
              <button onClick={saveCoupon} className="bg-pink-500 px-6 py-2 rounded-full">Save</button>
              <button onClick={() => setShowCouponModal(false)} className="bg-white/10 px-6 py-2 rounded-full">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Admin;
