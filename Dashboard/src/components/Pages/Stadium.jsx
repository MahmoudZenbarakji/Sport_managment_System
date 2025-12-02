import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Stadium = () => {
  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:3000'
  const [stadiums, setStadiums] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [editingId, setEditingId] = useState(null)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    Price: '',
    Image: ''
  })

  const token = localStorage.getItem('token')

  // Fetch stadiums
  useEffect(() => {
    fetchStadiums()
    fetchCategories()
  }, [])

  const fetchStadiums = async () => {
    try {
      setLoading(true)
      const response = await axios.get(`${apiBase}/api/v1/stadium/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setStadiums(response.data)
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to fetch stadiums')
      console.error('Error fetching stadiums:', err)
    } finally {
      setLoading(false)
    }
  }

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiBase}/api/v1/category/`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      setCategories(response.data)
    } catch (err) {
      console.error('Error fetching categories:', err)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.name || !formData.description || !formData.category || !formData.Price) {
      setError('All fields are required')
      return
    }

    try {
      setLoading(true)
      if (editingId) {
        // Update stadium
        await axios.patch(`${apiBase}/api/v1/stadium/${editingId}`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      } else {
        // Create new stadium
        await axios.post(`${apiBase}/api/v1/stadium/`, formData, {
          headers: { Authorization: `Bearer ${token}` }
        })
      }
      
      setFormData({
        name: '',
        description: '',
        category: '',
        Price: '',
        Image: ''
      })
      setEditingId(null)
      await fetchStadiums()
      setError(null)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save stadium')
      console.error('Error saving stadium:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (stadium) => {
    setEditingId(stadium._id)
    setFormData({
      name: stadium.name,
      description: stadium.description,
      category: stadium.category._id || stadium.category,
      Price: stadium.Price,
      Image: stadium.Image || ''
    })
  }

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this stadium?')) {
      try {
        await axios.delete(`${apiBase}/api/v1/stadium/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        await fetchStadiums()
        setError(null)
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete stadium')
        console.error('Error deleting stadium:', err)
      }
    }
  }

  const handleCancel = () => {
    setEditingId(null)
    setFormData({
      name: '',
      description: '',
      category: '',
      Price: '',
      Image: ''
    })
    setError(null)
  }

  return (
    <div className="p-6 max-w-6xl mx-auto bg-black min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-white">Stadium Management</h1>

      {error && (
        <div className="bg-red-900 border border-red-700 text-red-100 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {/* Add/Edit Stadium Form */}
      <div className="bg-gray-900 rounded-lg shadow-md p-6 mb-8 border border-gray-800">
        <h2 className="text-2xl font-semibold mb-4 text-white">
          {editingId ? 'Edit Stadium' : 'Add New Stadium'}
        </h2>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-300 font-semibold mb-2">Stadium Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Enter stadium name"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Price</label>
            <input
              type="number"
              name="Price"
              value={formData.Price}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Enter price"
            />
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
            >
              <option value="">Select Category</option>
              {categories.map(cat => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-gray-300 font-semibold mb-2">Image URL</label>
            <input
              type="text"
              name="Image"
              value={formData.Image}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600"
              placeholder="Enter image URL"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-gray-300 font-semibold mb-2">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2 border border-gray-700 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-600 resize-none"
              placeholder="Enter stadium description"
              rows="4"
            ></textarea>
          </div>

          <div className="md:col-span-2 flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-900 border border-gray-700 disabled:opacity-50"
            >
              {loading ? 'Saving...' : (editingId ? 'Update Stadium' : 'Add Stadium')}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="bg-gray-800 text-white px-6 py-2 rounded-lg hover:bg-gray-700 border border-gray-700"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Stadiums List */}
      <div className="bg-gray-900 rounded-lg shadow-md p-6 border border-gray-800">
        <h2 className="text-2xl font-semibold mb-4 text-white">Stadiums List</h2>
        
        {loading && <p className="text-gray-400">Loading stadiums...</p>}
        
        {stadiums && stadiums.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {stadiums.map((stadium) => (
              <div key={stadium._id} className="border border-gray-700 rounded-lg shadow-md overflow-hidden bg-gray-800">
                <div className="h-40 bg-gray-700 overflow-hidden">
                  <img
                    src={stadium.Image}
                    alt={stadium.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/150'
                    }}
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-1 text-white">{stadium.name}</h3>
                  <p className="text-gray-400 text-sm mb-2 line-clamp-2">{stadium.description}</p>
                  <p className="text-gray-300 font-semibold mb-2">
                    Price: ${stadium.Price}
                  </p>
                  <p className="text-gray-700 text-sm mb-4">
                    Category: {stadium.category?.name || 'N/A'}
                  </p>
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(stadium)}
                      className="flex-1 bg-gray-700 text-white py-2 rounded hover:bg-gray-600 border border-gray-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(stadium._id)}
                      className="flex-1 bg-red-900 text-white py-2 rounded hover:bg-red-800 border border-red-700"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-400">No stadiums found. Create one to get started!</p>
        )}
      </div>
    </div>
  );
};

export default Stadium;