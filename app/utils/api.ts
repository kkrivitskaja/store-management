import { z } from 'zod';
import { ProductSchema } from '../lib/productShema';
import { InventoryItem } from '../../types';

type FormData = z.infer<typeof ProductSchema>;

export const addProduct = async (formData: FormData) => {
  const response = await fetch('http://184.73.145.4:8085/product', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: formData.name }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || 'Failed to add product');
  }

  return response.json();
};

export const getInventory = async () => {
  try {
    const res = await fetch('http://184.73.145.4:8085/inventory');
    if (!res.ok) {
      console.error('Failed to fetch inventory');
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching inventory:', error);
    return [];
  }
};

export const getProducts = async () => {
  try {
    const res = await fetch('http://184.73.145.4:8085/product/all');
    if (!res.ok) {
      console.error('Failed to fetch products');
      return [];
    }
    return await res.json();
  } catch (error) {
    console.error('Error fetching products:', error);
    return [];
  }
};

export const updateInventory = async (updatedInventory: InventoryItem[]) => {
  try {
    const response = await fetch(`http://184.73.145.4:8085/inventory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedInventory),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to update inventory');
    }

    return await response.json();
  } catch (error) {
    console.error('Error updating inventory:', error);
  }
};

export const addInventoryItem = async (inventory: InventoryItem[], inventoryItem: InventoryItem) => {
  try {
    const response = await fetch(`http://184.73.145.4:8085/inventory`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...inventory, { name: inventoryItem.name, quantity: inventoryItem.quantity }]),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to add product');
    }

    return await response.json();
  } catch (error) {
    console.error('Error adding product to inventory:', error);
  }
};

export const resetInventory = async (): Promise<void> => {
  try {
    const response = await fetch('http://184.73.145.4:8085/inventory/reset', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Failed to reset inventory');
    }
  } catch (error) {
    if (error instanceof Error) {
      console.error('Error resetting inventory:', error.message);
      throw new Error(error.message);
    } else {
      console.error('Unexpected error:', error);
    }
  }
};
