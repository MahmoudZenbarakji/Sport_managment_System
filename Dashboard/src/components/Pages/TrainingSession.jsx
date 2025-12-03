import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

// Custom styles for datepicker to match dark theme
const datePickerStyles = `
  .react-datepicker {
    background-color: #000;
    border: 1px solid #333;
    color: #fff;
  }
  .react-datepicker__header {
    background-color: #111;
    border-bottom: 1px solid #333;
  }
  .react-datepicker__current-month,
  .react-datepicker__day-name {
    color: #fff;
  }
  .react-datepicker__day {
    color: #fff;
  }
  .react-datepicker__day:hover {
    background-color: #333;
  }
  .react-datepicker__day--selected {
    background-color: #E9622b;
    color: #fff;
  }
  .react-datepicker__day--selected:hover {
    background-color: #d4551f;
  }
  .react-datepicker__time-container {
    border-left: 1px solid #333;
  }
  .react-datepicker__time-container .react-datepicker__time {
    background-color: #000;
  }
  .react-datepicker__time-container .react-datepicker__time .react-datepicker__time-box {
    background-color: #000;
  }
  .react-datepicker__time-list-item {
    color: #fff;
  }
  .react-datepicker__time-list-item:hover {
    background-color: #333;
  }
  .react-datepicker__time-list-item--selected {
    background-color: #E9622b;
  }
  .react-datepicker__input-container input {
    background-color: #000;
    color: #fff;
    border: 1px solid #555;
    padding: 0.5rem;
    border-radius: 0.25rem;
    width: 100%;
  }
  .react-datepicker__input-container input:focus {
    outline: none;
    border-color: #E9622b;
  }
`;

const TrainingSession = () => {
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    title: '',
    description: '',
    date: null,
    durationMinutes: 60,
    capacity: 20,
    location: '',
    price: 0,
  });
  const [editForm, setEditForm] = useState({
    title: '',
    description: '',
    date: null,
    durationMinutes: 60,
    capacity: 20,
    location: '',
    price: 0,
    isActive: true,
  });

  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

  const role = typeof window !== 'undefined' ? localStorage.getItem('role') : null;

  const isCoach = role === 'coach';

  useEffect(() => {
    fetchSessions();
  }, []);

  const fetchSessions = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const url = isCoach
        ? `${apiBase}/api/v1/sessions/coach/me`
        : `${apiBase}/api/v1/sessions`;
      const res = await axios.get(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setSessions(res.data || []);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!form.date) {
      setError('Please select a date and time');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const payload = {
        ...form,
        date: form.date.toISOString(),
      };
      const res = await axios.post(`${apiBase}/api/v1/sessions`, payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setSuccess('Training session created successfully');
      setForm({
        title: '',
        description: '',
        date: null,
        durationMinutes: 60,
        capacity: 20,
        location: '',
        price: 0,
      });
      fetchSessions();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleEdit = (session) => {
    setEditingId(session._id);
    // Convert date string to Date object
    const dateValue = session.date ? new Date(session.date) : null;
    setEditForm({
      title: session.title || '',
      description: session.description || '',
      date: dateValue,
      durationMinutes: session.durationMinutes || 60,
      capacity: session.capacity || 20,
      location: session.location || '',
      price: session.price || 0,
      isActive: session.isActive !== undefined ? session.isActive : true,
    });
    setError('');
    setSuccess('');
  };

  const handleEditChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (!editForm.date) {
      setError('Please select a date and time');
      return;
    }
    try {
      const token = localStorage.getItem('token');
      const payload = {
        ...editForm,
        date: editForm.date.toISOString(),
      };
      await axios.put(`${apiBase}/api/v1/sessions/${editingId}`, payload, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setSuccess('Training session updated successfully');
      setEditingId(null);
      fetchSessions();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const handleDelete = async (sessionId) => {
    if (!window.confirm('Are you sure you want to delete this training session? This action cannot be undone.')) {
      return;
    }
    setError('');
    setSuccess('');
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`${apiBase}/api/v1/sessions/${sessionId}`, {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      });
      setSuccess('Training session deleted successfully');
      fetchSessions();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({
      title: '',
      description: '',
      date: null,
      durationMinutes: 60,
      capacity: 20,
      location: '',
      price: 0,
      isActive: true,
    });
    setError('');
    setSuccess('');
  };

  return (
    <div className="space-y-6 p-4">
      <style>{datePickerStyles}</style>
      <h1 className="text-3xl font-bold">
        {isCoach ? 'My Training Sessions' : 'All Training Sessions'}
      </h1>
      <p className="text-secondary-text">
        {isCoach
          ? 'Create and manage your training sessions. User registrations (applicants) will appear below each session.'
          : 'Overview of all active training sessions and their applicants.'}
      </p>

      {isCoach && (
        <section className="border p-4 rounded space-y-3">
          <h2 className="text-2xl font-semibold mb-2">Create Training Session</h2>
          <form onSubmit={handleCreate} className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm">Title</label>
              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full p-2 border rounded bg-black text-white"
              />
            </div>
            <div>
              <label className="block text-sm mb-1">Date & Time</label>
              <DatePicker
                selected={form.date}
                onChange={(date) => setForm({ ...form, date })}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={15}
                dateFormat="MMMM d, yyyy h:mm aa"
                placeholderText="Select date and time"
                required
                wrapperClassName="w-full"
                minDate={new Date()}
              />
            </div>
            <div>
              <label className="block text-sm">Duration (minutes)</label>
              <input
                type="number"
                name="durationMinutes"
                value={form.durationMinutes}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-black text-white"
              />
            </div>
            <div>
              <label className="block text-sm">Capacity</label>
              <input
                type="number"
                name="capacity"
                value={form.capacity}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-black text-white"
              />
            </div>
            <div>
              <label className="block text-sm">Location</label>
              <input
                name="location"
                value={form.location}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-black text-white"
              />
            </div>
            <div>
              <label className="block text-sm">Price</label>
              <input
                type="number"
                name="price"
                value={form.price}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-black text-white"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm">Description</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full p-2 border rounded bg-black text-white min-h-[80px]"
              />
            </div>
            <div className="md:col-span-2 flex gap-2 items-center">
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded"
              >
                Create Session
              </button>
              <button
                type="button"
                onClick={() =>
                  setForm({
                    title: '',
                    description: '',
                    date: null,
                    durationMinutes: 60,
                    capacity: 20,
                    location: '',
                    price: 0,
                  })
                }
                className="px-3 py-1 border rounded"
              >
                Reset
              </button>
              {success && <p className="text-green-500 text-sm">{success}</p>}
              {error && <p className="text-red-500 text-sm">{error}</p>}
            </div>
          </form>
        </section>
      )}

      <section className="border p-4 rounded">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-semibold">Training Sessions</h2>
          <div className="flex gap-2">
            {success && <p className="text-green-500 text-sm self-center">{success}</p>}
            {error && <p className="text-red-500 text-sm self-center">{error}</p>}
            <button
              onClick={fetchSessions}
              className="px-3 py-1 border rounded"
            >
              Refresh
            </button>
          </div>
        </div>

        {loading ? (
          <p>Loading sessions...</p>
        ) : sessions && sessions.length ? (
          <div className="space-y-4">
            {sessions.map((s) => (
              <div
                key={s._id}
                className="border border-gray-700 rounded p-4 bg-black/40"
              >
                {editingId === s._id ? (
                  <form onSubmit={handleUpdate} className="space-y-3">
                    <h3 className="text-xl font-bold mb-3">Edit Training Session</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm">Title</label>
                        <input
                          name="title"
                          value={editForm.title}
                          onChange={handleEditChange}
                          required
                          className="w-full p-2 border rounded bg-black text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm mb-1">Date & Time</label>
                        <DatePicker
                          selected={editForm.date}
                          onChange={(date) => setEditForm({ ...editForm, date })}
                          showTimeSelect
                          timeFormat="HH:mm"
                          timeIntervals={15}
                          dateFormat="MMMM d, yyyy h:mm aa"
                          placeholderText="Select date and time"
                          required
                          wrapperClassName="w-full"
                          minDate={new Date()}
                        />
                      </div>
                      <div>
                        <label className="block text-sm">Duration (minutes)</label>
                        <input
                          type="number"
                          name="durationMinutes"
                          value={editForm.durationMinutes}
                          onChange={handleEditChange}
                          className="w-full p-2 border rounded bg-black text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm">Capacity</label>
                        <input
                          type="number"
                          name="capacity"
                          value={editForm.capacity}
                          onChange={handleEditChange}
                          className="w-full p-2 border rounded bg-black text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm">Location</label>
                        <input
                          name="location"
                          value={editForm.location}
                          onChange={handleEditChange}
                          className="w-full p-2 border rounded bg-black text-white"
                        />
                      </div>
                      <div>
                        <label className="block text-sm">Price</label>
                        <input
                          type="number"
                          name="price"
                          value={editForm.price}
                          onChange={handleEditChange}
                          className="w-full p-2 border rounded bg-black text-white"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm">Description</label>
                        <textarea
                          name="description"
                          value={editForm.description}
                          onChange={handleEditChange}
                          className="w-full p-2 border rounded bg-black text-white min-h-[80px]"
                        />
                      </div>
                      {isCoach && (
                        <div className="md:col-span-2">
                          <label className="flex items-center gap-2">
                            <input
                              type="checkbox"
                              name="isActive"
                              checked={editForm.isActive}
                              onChange={handleEditChange}
                              className="w-4 h-4"
                            />
                            <span className="text-sm">Active Session</span>
                          </label>
                        </div>
                      )}
                    </div>
                    <div className="flex gap-2 mt-4">
                      <button
                        type="submit"
                        className="px-4 py-2 bg-green-600 text-white rounded"
                      >
                        Save Changes
                      </button>
                      <button
                        type="button"
                        onClick={cancelEdit}
                        className="px-4 py-2 bg-gray-600 text-white rounded"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                ) : (
                  <>
                    <div className="flex justify-between items-center mb-2">
                      <div>
                        <h3 className="text-xl font-bold">{s.title}</h3>
                        <p className="text-sm text-gray-400">
                          {s.date ? new Date(s.date).toLocaleString() : ''}
                        </p>
                        {s.isActive === false && (
                          <span className="inline-block mt-1 px-2 py-1 text-xs bg-red-600 text-white rounded">
                            Inactive
                          </span>
                        )}
                      </div>
                      <div className="text-right text-sm text-gray-400">
                        <p>
                          Capacity:{' '}
                          <span className="font-semibold">
                            {(s.applicants && s.applicants.length) || 0}/{s.capacity}
                          </span>
                        </p>
                        {s.price !== undefined && (
                          <p>Price: ${s.price}</p>
                        )}
                      </div>
                    </div>
                    {s.location && (
                      <p className="text-sm text-gray-300 mb-1">
                        Location: {s.location}
                      </p>
                    )}
                    {s.description && (
                      <p className="text-sm text-gray-300 mb-3">
                        {s.description}
                      </p>
                    )}

                    {s.applicants && s.applicants.length > 0 && (
                      <div className="mt-2 mb-3">
                        <p className="font-semibold mb-1">Applicants:</p>
                        <ul className="list-disc list-inside text-sm text-gray-200 space-y-1">
                          {s.applicants.map((a) => (
                            <li key={a._id}>
                              {a.name} ({a.email})
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {isCoach && (
                      <div className="flex gap-2 mt-3 pt-3 border-t border-gray-700">
                        <button
                          onClick={() => handleEdit(s)}
                          className="px-3 py-1 bg-blue-600 text-white rounded text-sm"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(s._id)}
                          className="px-3 py-1 bg-red-600 text-white rounded text-sm"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No training sessions found.</p>
        )}
      </section>
    </div>
  );
};

export default TrainingSession;


