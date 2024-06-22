'use client';
import React from 'react';
import toast from 'react-hot-toast';
import updateCacheForPaths from '../../../utils/revalidateCache';
import { resetInventory } from '../../../utils/api';

const handleResetInventory = async () => {
  try {
    await resetInventory();

    updateCacheForPaths(['/inventory']);
    updateCacheForPaths(['/product']);
    toast.success('Inventory has been reset.');
  } catch (error) {
    console.error('Error resetting inventory:', error);

    if (error instanceof Error) {
      toast.error(error.message);
    } else {
      toast.error('Failed to reset inventory. Please try again later.');
    }
  }
};

const RemoveInventory: React.FC = () => {
  return (
    <div className="max-w-[900px] mx-auto mt-8 mb-8 flex justify-between items-center">
      <h2 className="text-xl font-semibold mb-4">Inventory List</h2>
      <button
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
        onClick={handleResetInventory}
      >
        Reset Inventory
      </button>
    </div>
  );
};

export default RemoveInventory;
