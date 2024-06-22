import { z } from 'zod';
import { ProductSchema } from '../lib/productShema';

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
