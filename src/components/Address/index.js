import React, { useState } from 'react';
import axios from 'axios';

const initialState = {
  province: '',
  province_id: 0,
  district: '',
  district_id: 0,
  ward: '',
  ward_id: 0,
  info: '',
  phone: '',
  receiverName: '',
  default: true,
};

function Address({ userId }) {
  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    try {
      const response = await axios.post(
        `/user/${userId}/address`,
        form,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      setMessage('Address added successfully!');
      setForm(initialState);
    } catch (err) {
      setMessage('Failed to add address.');
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Add Address</h2>
      <input name="province" value={form.province} onChange={handleChange} placeholder="Province" required />
      <input name="province_id" type="number" value={form.province_id} onChange={handleChange} placeholder="Province ID" required />
      <input name="district" value={form.district} onChange={handleChange} placeholder="District" required />
      <input name="district_id" type="number" value={form.district_id} onChange={handleChange} placeholder="District ID" required />
      <input name="ward" value={form.ward} onChange={handleChange} placeholder="Ward" required />
      <input name="ward_id" type="number" value={form.ward_id} onChange={handleChange} placeholder="Ward ID" required />
      <input name="info" value={form.info} onChange={handleChange} placeholder="Info" required />
      <input name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" required />
      <input name="receiverName" value={form.receiverName} onChange={handleChange} placeholder="Receiver Name" required />
      <label>
        Default:
        <input name="default" type="checkbox" checked={form.default} onChange={handleChange} />
      </label>
      <button type="submit" disabled={loading}>
        {loading ? 'Saving...' : 'Save Address'}
      </button>
      {message && <div style={{ marginTop: 10 }}>{message}</div>}
    </form>
  );
}

export default Address;
