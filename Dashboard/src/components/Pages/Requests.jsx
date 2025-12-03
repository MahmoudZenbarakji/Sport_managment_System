import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Requests = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [filterStatus, setFilterStatus] = useState('all'); // all, pending, approved, rejected

  const apiBase = import.meta.env.VITE_API_BASE || 'http://localhost:3000';

  useEffect(() => {
    fetchBookings();
  }, [filterStatus]);

  const fetchBookings = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const url = filterStatus === 'all' 
        ? `${apiBase}/api/v1/bookings`
        : `${apiBase}/api/v1/bookings?status=${filterStatus}`;
      
      const res = await axios.get(url, {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      });
      setBookings(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      await axios.patch(
        `${apiBase}/api/v1/bookings/${bookingId}/status`,
        { status: newStatus },
        {
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        }
      );
      await fetchBookings(); // Refresh the list
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update status');
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-500 text-yellow-900';
      case 'approved':
        return 'bg-green-500 text-green-900';
      case 'rejected':
        return 'bg-red-500 text-red-900';
      default:
        return 'bg-gray-500 text-gray-900';
    }
  };

  return (
    <div className="space-y-6 p-6 max-w-7xl mx-auto bg-black min-h-screen">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-extrabold text-accent border-secondary-text pb-4">
            Booking Requests
          </h1>
          <p className="text-lg text-secondary-text mt-2">
            View and manage all stadium booking requests.
          </p>
        </div>
        
        {/* Filter Buttons */}
        <div className="flex gap-2">
          <button
            onClick={() => setFilterStatus('all')}
            className={`px-4 py-2 rounded ${
              filterStatus === 'all'
                ? 'bg-accent text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilterStatus('pending')}
            className={`px-4 py-2 rounded ${
              filterStatus === 'pending'
                ? 'bg-yellow-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Pending
          </button>
          <button
            onClick={() => setFilterStatus('approved')}
            className={`px-4 py-2 rounded ${
              filterStatus === 'approved'
                ? 'bg-green-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Approved
          </button>
          <button
            onClick={() => setFilterStatus('rejected')}
            className={`px-4 py-2 rounded ${
              filterStatus === 'rejected'
                ? 'bg-red-500 text-white'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            Rejected
          </button>
        </div>
      </div>

      {error && (
        <div className="bg-red-900 text-red-200 p-4 rounded">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-12">
          <div className="text-accent text-xl">Loading bookings...</div>
        </div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-secondary-text text-xl">
            No bookings found
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left p-4 text-accent font-bold">User</th>
                <th className="text-left p-4 text-accent font-bold">Stadium</th>
                <th className="text-left p-4 text-accent font-bold">Date</th>
                <th className="text-left p-4 text-accent font-bold">Time</th>
                <th className="text-left p-4 text-accent font-bold">Payment</th>
                <th className="text-left p-4 text-accent font-bold">Status</th>
                <th className="text-left p-4 text-accent font-bold">Created</th>
                <th className="text-left p-4 text-accent font-bold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {bookings.map((booking) => (
                <tr
                  key={booking._id}
                  className="border-b border-gray-800 hover:bg-gray-900"
                >
                  <td className="p-4 text-white">
                    <div>
                      <div className="font-semibold">
                        {booking.user?.name || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-400">
                        {booking.user?.email || ''}
                      </div>
                      {booking.user?.phoneNumber && (
                        <div className="text-sm text-gray-400">
                          {booking.user.phoneNumber}
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-white">
                    <div>
                      <div className="font-semibold">
                        {booking.stadium?.name || 'N/A'}
                      </div>
                      <div className="text-sm text-gray-400">
                        ${booking.stadium?.Price || 'N/A'}
                      </div>
                    </div>
                  </td>
                  <td className="p-4 text-white">
                    {formatDate(booking.date)}
                  </td>
                  <td className="p-4 text-white">
                    {booking.time || 'N/A'}
                  </td>
                  <td className="p-4 text-accent font-semibold">
                    ${booking.payment || 'N/A'}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusBadgeClass(
                        booking.status
                      )}`}
                    >
                      {booking.status?.toUpperCase() || 'PENDING'}
                    </span>
                  </td>
                  <td className="p-4 text-gray-400 text-sm">
                    {formatDate(booking.createdAt)}
                  </td>
                  <td className="p-4">
                    {booking.status === 'pending' && (
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleStatusUpdate(booking._id, 'approved')}
                          className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700 text-sm"
                        >
                          Approve
                        </button>
                        <button
                          onClick={() => handleStatusUpdate(booking._id, 'rejected')}
                          className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 text-sm"
                        >
                          Reject
                        </button>
                      </div>
                    )}
                    {booking.status !== 'pending' && (
                      <button
                        onClick={() => handleStatusUpdate(booking._id, 'pending')}
                        className="px-3 py-1 bg-gray-600 text-white rounded hover:bg-gray-700 text-sm"
                      >
                        Reset
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Requests;
