import { InventoryItem } from '../../types';

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
