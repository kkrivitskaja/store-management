'use client';
import { v4 as uuidv4 } from 'uuid';
import updateCacheForPaths from '../../../utils/revalidateCache';
import toast from 'react-hot-toast';
import { updateInventory } from '../../../utils/api';
import { InventoryItem } from '../../../../types';
import React from 'react';

interface Props {
  inventory: InventoryItem[];
}

const InventoryList: React.FC<Props> = ({ inventory }) => {
  const handleRemoveItem = async (itemName: string) => {
    try {
      const updatedInventory = inventory.filter((item: InventoryItem) => item.name !== itemName);

      await updateInventory(updatedInventory);
      updateCacheForPaths(['/inventory']);

      toast.success(`${itemName} has been removed from inventory.`);
    } catch (error) {
      console.error('Error removing item from inventory:', error);

      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to remove item from inventory. Please try again later.');
      }
    }
  };

  return (
    <ul className="flex flex-col gap-y-4 max-w-[900px] m-auto">
      {inventory.map((item) => (
        <li
          key={`${item.name}_${uuidv4()}`}
          className="flex items-center justify-between p-4 border border-black-bg-gray-100 shadow-md"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full ">
            <div className="mb-2 md:mb-0">
              <span className="font-medium">{item.name}</span> - quantity: {item.quantity}
            </div>
            <button
              className="px-3 py-1 bg-red-500 text-white rounded-md md:ml-4"
              onClick={() => handleRemoveItem(item.name)}
            >
              Remove
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default InventoryList;
