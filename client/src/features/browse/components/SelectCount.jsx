import React, { useState } from 'react';
import { Button } from '@material-tailwind/react';

const SelectCount = ({counts,setCounts}) => {
  // Initial state for the three counters


  // Function to handle increment
  const increment = (index) => {
    const newCounts = [...counts];
    if (newCounts[index] < 5) {
      newCounts[index]++;
    }
    setCounts(newCounts);
  };

  // Function to handle decrement
  const decrement = (index) => {
    const newCounts = [...counts];
    if (newCounts[index] > 0) {
      newCounts[index]--;
    }
    setCounts(newCounts);
  };

  // Handle reset functionality
  const handleReset = () => {
    setCounts([1, 1]); // Reset all counters to 1
  };

  // Handle apply functionality
  const handleApply = () => {
    console.log("Applied counts:", counts); // You can replace this with any further logic
  };

  return (
    <div className='min-w-[300px] min-h-[230px] flex flex-col justify-between'>
      <div className='flex flex-col gap-5'>
        {counts.map((count, index) => (
          <div key={index} className='flex w-full justify-around'>
            <h1 className='font-custom font-bold text-black pt-2'>
              Adults
            </h1>
            <div className='flex gap-6'>
              <Button
                size='sm'
                variant='outlined'
                className='rounded-full border-2 border-blue-400'
                onClick={() => decrement(index)}
              >
                -
              </Button>
              <Button size='sm' variant='outlined'>{count}</Button>
              <Button
                size='sm'
                variant='outlined'
                className='rounded-full border-2 border-blue-400'
                onClick={() => increment(index)}
              >
                +
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className='flex justify-between'>
        <Button size='sm' className='bg-transparent text-black' onClick={handleReset}>
          Reset
        </Button>
        <Button size='sm' color='blue' onClick={handleApply}>
          Apply
        </Button>
      </div>
    </div>
  );
};

export default SelectCount;
