import React, { useState } from 'react';
import '../css/add-device.css';

const AddDeviceForm = ({ serialNumber, onDeviceAdded }) => {
  const [uid, setUid] = useState('');
  const [vendor, setVendor] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!uid || !vendor) {
      alert('Please fill in all fields');
      return;
    }

    const updatedDevice = {
      uid,
      vendor,
    };

    fetch(`http://localhost:8080/api/gateway/devices/add?serialNumber=${serialNumber}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedDevice),
    })
      .then((response) => response.json())
      .then((data) => {
        onDeviceAdded(data);
        setUid('');
        setVendor('');
      })
      .catch((error) => console.error(error));
  };

  return (
    <div className="AddDeviceForm">
      <form onSubmit={handleSubmit}>
        <h2>Add Peripheral Device</h2>
        <label htmlFor="uid">UID:</label>
        <input
          type="text"
          id="uid"
          value={uid}
          onChange={(e) => setUid(e.target.value)}
          required
        />
        <label htmlFor="vendor">Vendor:</label>
        <input
          type="text"
          id="vendor"
          value={vendor}
          onChange={(e) => setVendor(e.target.value)}
          required
        />
        <button type="submit">Add Peripheral Device</button>
      </form>
    </div>
  );
};

export default AddDeviceForm;
