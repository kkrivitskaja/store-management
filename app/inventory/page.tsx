import InventoryList from '~components/ui/InventoryList/InventoryList';
import { getInventory } from '../utils/api';

const InventoryPage = async () => {
  const inventoryData = await getInventory();

  return (
    <main className="p-4">
      <InventoryList inventory={inventoryData} />
    </main>
  );
};
export default InventoryPage;
