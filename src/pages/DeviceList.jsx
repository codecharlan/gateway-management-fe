import React from 'react';
import '../css/device-list.css'

const DeviceList = ({ devices, serialNumber, onDeviceRemove }) => {
  const handleRemoveDevice = (deviceId) => {
    fetch(`http://localhost:8080/api/gateway/devices/${deviceId}?serialNumber=${serialNumber}`, {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          onDeviceRemove(deviceId);
        } else {
          console.error('Failed to delete device');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="DeviceList">
      <h4>Device List</h4>
      <ul>
        {devices.map((device) => (
          <li key={device.id}>
            <h3>UID: {device.uid}</h3>
            <p>Vendor: {device.vendor}</p>
            <p>Status: {device.status ? 'Online' : 'Offline'}</p>
            <button onClick={() => handleRemoveDevice(device.id)}>Remove Device</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DeviceList;
