import { PresenterManagement } from '@/components/presenter-management';
import usePresenterData from './hooks/use-presenter-data';

const App = () => {
  const presenters = usePresenterData();

  return (
    <main className="flex flex-col items-center">
      <PresenterManagement data={presenters} />
    </main>
  );
};

export default App;
