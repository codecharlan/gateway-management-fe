import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import AddDeviceForm from '../pages/AddDeviceForm';
import DeviceList from '../pages/DeviceList';
import "../css/gateway-details.css"

const GatewayDetails = ({ gateways }) => {
  const { serialNumber } = useParams();

  const [selectedGateway, setSelectedGateway] = useState(null);
  const [devices, setDevices] = useState([]);

  const handleDeviceRemove = (deviceId) => {
    const updatedDevices = devices.filter((device) => device.id !== deviceId);
    setDevices(updatedDevices);
  };

  useEffect(() => {
    const gateway = gateways.find((gateway) => gateway.serialNumber === serialNumber);
    if (gateway) {
      setSelectedGateway(gateway);
      setDevices(gateway.peripheralDevices || []);
    }
  }, [serialNumber, gateways]);

  const handleDeviceAdded = (newDevice) => {
    setDevices([...devices, newDevice]);
  };

  if (!selectedGateway) {
    return <p>No gateway available</p>;
  }

  return (
    <div className="gateway-details">
      <h1 className="gateway-name">{selectedGateway.name}</h1>
      <div className="gateway-info">
        <p className="serial-number">Serial Number: {selectedGateway.serialNumber}</p>
        <p className="ip-address">IP Address: {selectedGateway.ipAddress}</p>
      </div>
      <AddDeviceForm
        serialNumber={selectedGateway.serialNumber}
        onDeviceAdded={handleDeviceAdded}
      />
      <h2 className="device-list-header">Devices</h2>
      <DeviceList
        serialNumber={selectedGateway.serialNumber}
        devices={devices}
        onDeviceRemove={handleDeviceRemove}
      />
    </div>
  );
};

export default GatewayDetails;
