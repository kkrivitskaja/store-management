'use client';
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import toast from 'react-hot-toast';

import { zodResolver } from '@hookform/resolvers/zod';
import updateCacheForPaths from '../../../../utils/revalidateCache';

const ProductSchema = z.object({
  name: z
    .string()
    .min(1, 'Product name is required')
    .regex(/^[\d\sA-Z\\a-z-]+$/, {
      message: 'Only latin letters, digits, spaces, and dashes are allowed',
    }),
});

type FormData = z.infer<typeof ProductSchema>;

const CreateProductForm = () => {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(ProductSchema),
    mode: 'onChange',
  });
  const isFormValid = watch('name');

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('http://184.73.145.4:8085/product', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: data.name }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add product');
      }
      updateCacheForPaths(['/product']);
      reset();
      toast.success('Product successfully added');
    } catch (error) {
      console.error('Error adding product:', error);

      if (error instanceof Error) {
        toast.error('Product name is required');
      } else {
        toast.error('Failed to add product');
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto px-4">
      <div className="mb-4">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Product Name
        </label>
        <input
          id="name"
          type="text"
          {...register('name')}
          className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-500 focus:ring-opacity-50"
        />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <button
        type="submit"
        disabled={isSubmitting || !isFormValid}
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-500 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50"
      >
        {isSubmitting ? 'Adding...' : 'Add Product'}
      </button>
    </form>
  );
};

export default CreateProductForm;
