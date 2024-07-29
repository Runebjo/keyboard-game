import React from 'react';
import { fingers } from '../constants';

const FingerDisplay = ({ currentKey }) => {
  return (
    <div className="flex justify-between mb-4">
      <div className="flex">
        {fingers.slice(0, 4).map((finger, index) => (
          <div
            key={index}
            className={`w-16 h-16 m-1 rounded-full ${finger.color} ${
              currentKey &&
              currentKey.finger &&
              currentKey.finger.includes(finger.name)
                ? 'ring-8 ring-orange-500'
                : 'ring-2 ring-gray-300'
            }`}
            title={finger.name}
          ></div>
        ))}
      </div>
      <div className="w-12"></div>
      <div className="flex">
        {fingers.slice(4).map((finger, index) => (
          <div
            key={index}
            className={`w-16 h-16 m-1 rounded-full ${finger.color} ${
              currentKey &&
              currentKey.finger &&
              currentKey.finger.includes(finger.name)
                ? 'ring-8 ring-orange-500'
                : 'ring-2 ring-gray-300'
            }`}
            title={finger.name}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FingerDisplay;
