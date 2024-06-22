import InventoryList from '~components/ui/InventoryList/InventoryList';
import { getInventory, getProducts } from '../utils/api';
import InventoryItemAddForm from '~components/ui/Forms/InventoryItemAddForm/InventoryItemAddForm';

const InventoryPage = async () => {
  const inventoryData = await getInventory();
  const productsData = await getProducts();

  return (
    <main className="p-4">
      <InventoryItemAddForm products={productsData} inventory={inventoryData} />
      <InventoryList inventory={inventoryData} />
    </main>
  );
};
export default InventoryPage;
