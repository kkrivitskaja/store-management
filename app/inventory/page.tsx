import InventoryList from '~components/ui/InventoryList/InventoryList';
import { getInventory, getProducts } from '../utils/api';
import InventoryItemAddForm from '~components/ui/Forms/InventoryItemAddForm/InventoryItemAddForm';
import { Toaster } from 'react-hot-toast';
import RemoveInventory from '~components/ui/RemoveInventory/RemoveInventory';

const InventoryPage = async () => {
  const inventoryData = await getInventory();
  const productsData = await getProducts();

  // eslint-disable-next-line react-perf/jsx-no-new-object-as-prop
  const toastOptions = {
    success: {
      style: {
        background: 'green',
        color: 'white',
      },
    },
    error: {
      style: {
        background: 'red',
        color: 'white',
      },
    },
  };

  return (
    <main className="p-4">
      <InventoryItemAddForm products={productsData} inventory={inventoryData} />
      <RemoveInventory />
      <InventoryList inventory={inventoryData} />

      <Toaster toastOptions={toastOptions} />
    </main>
  );
};
export default InventoryPage;
