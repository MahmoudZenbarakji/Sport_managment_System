import React, { useEffect, useState } from 'react';
import axios from 'axios';

const User = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    bio: '',
    city: '',
    phoneNumber: ''
  });
  const [profileFile, setProfileFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

  useEffect(() => {
    fetchUsers();
    fetchCoaches();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${apiBase}/api/v1/users`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setUsers(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchCoaches = async (page = 1, limit = 50, search = '') => {
    setError('');
    try {
      const token = localStorage.getItem('token');
      const params = new URLSearchParams();
      if (page) params.append('page', page);
      if (limit) params.append('limit', limit);
      if (search) params.append('search', search);

      const res = await axios.get(`${apiBase}/api/v1/users/coaches?${params.toString()}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      // res.data has shape { data, page, limit, total }
      setCoaches(res.data?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const fd = new FormData();
      Object.entries(form).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          fd.append(key, value);
        }
      });
      if (profileFile) {
        fd.append('profilePicture', profileFile);
      }

      const res = await axios.post(`${apiBase}/api/v1/users/create-coach`, fd, {
        headers: {
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
          // Let browser set proper multipart boundary when using FormData
        },
      });
      setSuccess('Coach created successfully');
      setForm({ name: '', email: '', password: '', bio: '', city: '', phoneNumber: '' });
      setProfileFile(null);
      // refresh users list
      fetchUsers();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-4xl font-extrabold text-accent border-secondary-text pb-4">User Management</h1>
      <p className="text-lg text-secondary-text">View, add, edit, and manage all users in the system.</p>

      <section className="border p-4 rounded">
        <h2 className="text-2xl font-semibold mb-2">Create Coach (Admin)</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm">Name</label>
            <input name="name" value={form.name} onChange={handleChange} required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm">Email</label>
            <input name="email" value={form.email} onChange={handleChange} type="email" required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm">Password</label>
            <input name="password" value={form.password} onChange={handleChange} type="password" required className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm">Bio</label>
            <input name="bio" value={form.bio} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm">City</label>
            <input name="city" value={form.city} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm">Phone</label>
            <input name="phoneNumber" value={form.phoneNumber} onChange={handleChange} className="w-full p-2 border rounded" />
          </div>
          <div>
            <label className="block text-sm">Profile Image</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setProfileFile(e.target.files?.[0] || null)}
              className="w-full p-2 border rounded"
            />
          </div>

          <div className="flex items-center gap-2">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Create Coach</button>
            <button
              type="button"
              onClick={() => {
                setForm({ name: '', email: '', password: '', bio: '', city: '', phoneNumber: '' });
                setProfileFile(null);
              }}
              className="px-3 py-1 border rounded"
            >
              Reset
            </button>
          </div>
          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}
        </form>
      </section>

      <section className="border p-4 rounded">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold mb-2">All Users</h2>
          <div>
            <button onClick={() => window.location.href = '/user/coaches'} className="px-3 py-1 mr-2 border rounded">View Coaches</button>
            <button onClick={fetchUsers} className="px-3 py-1 border rounded">Refresh</button>
          </div>
        </div>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full text-left border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border">Name</th>
                  <th className="p-2 border">Email</th>
                  <th className="p-2 border">Role</th>
                  <th className="p-2 border">City</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length ? users.map((u) => (
                  <tr key={u._id}>
                    <td className="p-2 border">{u.name}</td>
                    <td className="p-2 border">{u.email}</td>
                    <td className="p-2 border">{u.role}</td>
                    <td className="p-2 border">{u.city || '-'}</td>
                  </tr>
                )) : <tr><td className="p-2" colSpan={4}>No users found</td></tr>}
              </tbody>
            </table>
          </div>
        )}
      </section>

    </div>
  );
};

export default User;