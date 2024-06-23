import CreateProductForm from '~components/ui/Forms/CreateProductForm/CreateProductForm';
import { Toaster } from 'react-hot-toast';

const ProductPage = async () => {
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
      <CreateProductForm />
      <Toaster toastOptions={toastOptions} />
    </main>
  );
};
export default ProductPage;
