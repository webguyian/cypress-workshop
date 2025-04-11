import { useState } from 'react';
import { PresenterManagement } from '@/components/presenter-management';
import PRESENTER_DATA from '@/data/presenters.json';
import type { Presenters } from '@/types';

const App = () => {
  const [presenters] = useState(PRESENTER_DATA as Presenters);

  return (
    <main className="flex flex-col items-center">
      <PresenterManagement data={presenters} />
    </main>
  );
};

export default App;
