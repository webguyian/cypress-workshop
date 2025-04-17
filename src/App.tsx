import { PresenterManagement } from '@/components';
import { Toaster } from '@/components/ui/sonner';

const App = () => {
  return (
    <main className="flex flex-col items-center">
      <PresenterManagement />
      <Toaster />
    </main>
  );
};

export default App;
