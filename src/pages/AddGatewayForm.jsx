import React, { useState } from 'react';
import '../css/gateway-form.css'; // Import the CSS file

const AddGatewayForm = () => {
  const [name, setName] = useState('');
  const [serialNumber, setSerialNumber] = useState('');
  const [ipAddress, setIpAddress] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:8080/api/gateway/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          serialNumber,
          ipAddress,
        }),
      });
      if (response.ok) {
        setName('');
        setSerialNumber('');
        setIpAddress('');
        alert('Gateway added successfully');
      } else {
        alert('Failed to add gateway');
      }
    } catch (error) {
      console.error('Error adding gateway:', error);
      alert('Failed to add gateway');
    }
  };

  return (
    <div className="AddGatewayForm">
      <h2>Add New Gateway</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
        </label>
        <label>
          Serial Number:
          <input type="text" value={serialNumber} onChange={(e) => setSerialNumber(e.target.value)} />
        </label>
        <label>
          IP Address:
          <input type="text" value={ipAddress} onChange={(e) => setIpAddress(e.target.value)} />
        </label>
        <button type="submit">Add Gateway</button>
      </form>
    </div>
  );
};

export default AddGatewayForm;
