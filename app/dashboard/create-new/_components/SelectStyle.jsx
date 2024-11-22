'use client'
import Image from 'next/image';
import React, { useState } from 'react';

function SelectStyle({ onUserSelect }) {
  const styleOptions = [
    {
      name: 'Realistic',
      image: '/real.png',
    },
    {
      name: 'Cartoon',
      image: '/cartoon.png',
    },
    {
      name: 'WaterColor',
      image: '/watercolor.png',
    },
    {
      name: 'ResidentEvil',
      image: '/RE.png',
    },
  ];

  const [selectedOption, setSelectedOption] = useState();

  return (
    <div className="mt-7 p-5 bg-white dark:bg-gray-900 rounded-lg shadow-md">
      <h2 className="font-bold text-2xl text-primary mb-2">Style</h2>
      <p className="text-gray-500 mb-5">Select Your Video Style</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5">
        {styleOptions.map((item, index) => (
          <div
            key={index}
            onClick={() => {
              setSelectedOption(item.name);
              onUserSelect('imageStyle', item.name);
            }}
            className={`relative hover:scale-105 transition-all cursor-pointer rounded-xl overflow-hidden shadow-lg ${
              selectedOption === item.name
                ? 'border-4 border-primary dark:border-blue-500'
                : 'border border-gray-300 dark:border-gray-700'
            }`}
          >
            <Image
              alt={item.name}
              src={item.image}
              width={200}
              height={200}
              className="h-48 object-cover w-full"
            />
            <h2 className="absolute bottom-0 w-full bg-gradient-to-t from-black to-transparent text-white text-center text-sm font-medium p-1">
              {item.name}
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SelectStyle;
