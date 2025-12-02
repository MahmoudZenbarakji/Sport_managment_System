import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Category = () => {
  const [form, setForm] = useState({
    name: '',
    description: '',
    image: ''
  });
  
  const [editingId, setEditingId] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const res = await axios.get(`${apiBase}/api/v1/category`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setCategories(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // Image is provided as a URL in `form.image`.

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      const payload = {
        name: form.name,
        description: form.description,
        image: form.image || undefined
      };

      if (editingId) {
        await axios.put(
          `${apiBase}/api/v1/category/${editingId}`,
          payload,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );
        setSuccess('Category updated successfully');
        setEditingId(null);
      } else {
        await axios.post(
          `${apiBase}/api/v1/category`,
          payload,
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );
        setSuccess('Category created successfully');
      }
      setForm({ name: '', description: '', image: '' });
      // cleared form
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleEdit = (cat) => {
    setEditingId(cat._id);
    setForm({ name: cat.name, description: cat.description, image: cat.image });
  };

  const handleDelete = async (catId) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    setError('');
    try {
      const token = localStorage.getItem('token');
      await axios.delete(
        `${apiBase}/api/v1/category/${catId}`,
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );
      setSuccess('Category deleted successfully');
      fetchCategories();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm({ name: '', description: '', image: '' });
    // cleared form
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-4xl font-extrabold text-accent border-secondary-text pb-4">
        Category Management
      </h1>
      <p className="text-lg text-secondary-text">
        View and manage all categories within the system.
      </p>

      <section className="border p-4 rounded">
        <h2 className="text-2xl font-semibold mb-3">{ editingId ? 'Edit Category' : 'Add New Category'}</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block text-sm font-medium">Category Name</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="e.g., Football"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              required
              className="w-full p-2 border rounded"
              placeholder="Category description..."
              rows="3"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Image URL</label>
            <input
              name="image"
              value={form.image}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              placeholder="https://... or /uploads/yourfile.png"
            />
            {form.image && (
              <div className="h-32 bg-gray-200 rounded flex items-center justify-center mt-2 overflow-hidden">
                <img src={form.image.startsWith('http') ? form.image : `${apiBase}${form.image}`} alt="Preview" className="h-full object-cover" onError={(e)=>e.target.style.display='none'} />
              </div>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              {editingId ? 'Update Category' : 'Create Category'}
            </button>
            <button type="button" onClick={() => editingId ? handleCancel() : setForm({ name: '', description: '', image: '' })} className="px-3 py-1 border rounded">
              {editingId ? 'Cancel' : 'Reset'}
            </button>
          </div>
          {error && <p className="text-red-600">{error}</p>}
          {success && <p className="text-green-600">{success}</p>}
        </form>
      </section>

      <section className="border p-4 rounded">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-semibold">All Categories ({categories.length})</h2>
          <button onClick={fetchCategories} className="px-3 py-1 border rounded">Refresh</button>
        </div>
        {loading ? (
          <p>Loading categories...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories && categories.length ? categories.map((cat) => (
              <div key={cat._id} className="border rounded-lg shadow-md overflow-hidden">
                <div className="h-48 bg-gray-200 overflow-hidden">
                  {cat.image ? (
                    <img src={`${cat.image}`} alt={cat.name} className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">No Image</div>
                  )}
                </div>
                <div className="p-3">
                  <h3 className="text-lg font-semibold mb-1">{cat.name}</h3>
                  <p className="text-sm text-gray-600 mb-3">{cat.description ? cat.description.slice(0, 120) : '-'}</p>
                  <div className="flex gap-2">
                    <button onClick={() => handleEdit(cat)} className="flex-1 px-3 py-1 bg-blue-600 text-white rounded text-sm">Edit</button>
                    <button onClick={() => handleDelete(cat._id)} className="flex-1 px-3 py-1 bg-red-600 text-white rounded text-sm">Delete</button>
                  </div>
                </div>
              </div>
            )) : (
              <p className="col-span-full text-center text-gray-500">No categories found</p>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Category;
