import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Coaches = () => {
  const [coaches, setCoaches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:3000';
  const navigate = useNavigate();

  useEffect(() => {
    fetchCoaches();
  }, []);

  const fetchCoaches = async (page = 1, limit = 50, search = '') => {
    setLoading(true);
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
      setCoaches(res.data?.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Coaches</h1>
        <div>
          <button onClick={() => navigate('/user')} className="px-3 py-1 border rounded mr-2">Back</button>
          <button onClick={() => fetchCoaches()} className="px-3 py-1 bg-sky-600 text-white rounded">Refresh</button>
        </div>
      </div>

      {loading ? (
        <p>Loading coaches...</p>
      ) : error ? (
        <p className="text-red-600">{error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full text-left border-collapse">
            <thead>
              <tr>
                <th className="p-2 border">Name</th>
                <th className="p-2 border">Email</th>
                <th className="p-2 border">City</th>
                <th className="p-2 border">Bio</th>
              </tr>
            </thead>
            <tbody>
              {coaches.length ? coaches.map((c) => (
                <tr key={c._id}>
                  <td className="p-2 border">{c.name}</td>
                  <td className="p-2 border">{c.email}</td>
                  <td className="p-2 border">{c.city || '-'}</td>
                  <td className="p-2 border">{c.bio ? c.bio.slice(0, 80) : '-'}</td>
                </tr>
              )) : (
                <tr><td className="p-2" colSpan={4}>No coaches found</td></tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Coaches;
