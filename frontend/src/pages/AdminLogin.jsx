import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import toast from 'react-hot-toast';
import GlassNav from '../components/GlassNav';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('import.meta.env.VITE_API_URL/admin/auth/login', { username, password });
      localStorage.setItem('adminToken', res.data.token);
      toast.success('Logged in');
      navigate('/admin');
    } catch (err) {
      toast.error('Invalid credentials');
    }
  };

  return (
    <div className="min-h-screen bg-[#0d0106]">
      <GlassNav />
      <div className="pt-40 flex justify-center px-6">
        <div className="glass rounded-[40px] p-10 max-w-md w-full">
          <h2 className="text-2xl font-playfair mb-6">Admin Login</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} className="w-full p-3 bg-white/5 rounded-lg border border-white/10" required />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} className="w-full p-3 bg-white/5 rounded-lg border border-white/10" required />
            <button type="submit" className="w-full bg-pink-500 py-3 rounded-full font-black">Login</button>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AdminLogin;
