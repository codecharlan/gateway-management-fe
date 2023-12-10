import React from 'react';
import { Link } from 'react-router-dom';
import '../css/gateway-list.css';

const GatewayList = ({ gateways }) => {
  return (
    <div className="gateway-list">
      <h2>Gateways</h2>
      <ul>
        {gateways.map((gateway) => (
          <li className="gateway-item" key={gateway.serialNumber}>
            <Link className="gateway-link" to={`/gateways/${gateway.serialNumber}`}>
              {gateway.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default GatewayList;
