'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import updateCacheForPaths from '../../../../utils/revalidateCache';
import toast from 'react-hot-toast';
import Downshift from 'downshift';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { InventoryItem } from '~types/index';
import { addInventoryItem } from '../../../../utils/api';
interface Product {
  name: string;
}
const InventoryItemSchema = z.object({
  name: z.string().nonempty('Product name is required'),

  quantity: z.number().min(1, 'Quantity must be greater than zero'),
});

interface InventoryItemAddFormProps {
  inventory: InventoryItem[];
  products: Product[];
}

type FormData = z.infer<typeof InventoryItemSchema>;

const InventoryItemAddForm: React.FC<InventoryItemAddFormProps> = ({ inventory, products }) => {
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(InventoryItemSchema),
    defaultValues: {
      name: '',
      quantity: 1,
    },
  });

  const watchedName = watch('name');
  const watchedQuantity = watch('quantity');
  const isFormValid = watchedName && Number(watchedQuantity) > 0;

  const onSubmit = async (data: FormData) => {
    const { name, quantity } = data;
    const inventoryItem = { name, quantity: quantity };

    try {
      await addInventoryItem(inventory, inventoryItem);
      updateCacheForPaths(['/inventory']);
      reset();
      toast.success('Inventory item added successfully!');
      reset();
    } catch (error) {
      console.error('Error adding inventory item:', error);
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error('Failed to add inventory item. Please try again later.');
      }
    }
  };
  return (
    <div className="max-w-lg mx-auto mt-8 mb-8">
      <h2 className="text-xl font-semibold mb-4">Add Inventory Item</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block mb-1">Product Name</label>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Downshift
                id="product-dropdown"
                onChange={(selectedItem) => field.onChange(selectedItem?.name || '')}
                itemToString={(item) => (item ? item.name : '')}
              >
                {({
                  getInputProps,
                  getItemProps,
                  isOpen,
                  inputValue,
                  highlightedIndex,
                  toggleMenu,
                  getToggleButtonProps,
                }) => (
                  <div className="relative">
                    <input
                      {...getInputProps({
                        placeholder: 'Select a product',
                        className:
                          'w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500',
                      })}
                    />
                    <button
                      className="absolute right-2 top-2 text-gray-500 cursor-pointer"
                      onClick={() => toggleMenu()}
                      {...getToggleButtonProps({
                        'aria-label': 'toggle menu',
                      })}
                    >
                      {isOpen ? <IconChevronUp /> : <IconChevronDown />}
                    </button>
                    {isOpen && (
                      <div className="absolute z-10 w-full mt-1 bg-white rounded-md border border-gray-300 shadow-lg max-h-60 overflow-y-auto">
                        {products
                          .filter((item) => !inputValue || item.name.toLowerCase().includes(inputValue.toLowerCase()))
                          .map((item, index) => (
                            <div
                              {...getItemProps({ item, index })}
                              key={item.name}
                              className={`px-4 py-2 cursor-pointer ${highlightedIndex === index ? 'bg-gray-100' : ''} truncate`}
                            >
                              {item.name}
                            </div>
                          ))}
                      </div>
                    )}
                  </div>
                )}
              </Downshift>
            )}
          />
          {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
        </div>
        <div>
          <label className="block mb-1">Quantity</label>
          <Controller
            name="quantity"
            control={control}
            render={({ field }) => (
              <input
                {...field}
                type="number"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={1}
                onChange={(event) => field.onChange(+event.target.value)}
              />
            )}
          />
          {errors.quantity && <span className="text-red-500 text-sm">{errors.quantity.message}</span>}
        </div>
        <button
          type="submit"
          className={`bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none ${isSubmitting || !isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}
          disabled={isSubmitting || !isFormValid}
        >
          Add Inventory Item
        </button>
      </form>
    </div>
  );
};
export default InventoryItemAddForm;
