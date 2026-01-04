import React from 'react';

const StatCard = ({ title, value }) => (
  <div className="card bg-base-100 shadow">
    <div className="card-body text-center">
      <p className="text-sm text-gray-500">{title}</p>
      <h3 className="text-3xl font-bold text-primary">{value}</h3>
    </div>
  </div>
);


export default StatCard;