import { useState } from 'react';
import { DetailsForm, Drawer } from './components';
import PRESENTER_DATA from './data/presenters.json';
import type { Presenters } from './types';

const App = () => {
  const [presenters] = useState(PRESENTER_DATA as Presenters);

  return (
    <main className="p-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mt-10">
        Presenter Management
      </h1>
      <ul className="w-[500px] max-h-96 overflow-y-auto my-8 px-8 py-4">
        {presenters.map((presenter) => (
          <li key={presenter.email}>
            <div className="bg-gray-100 rounded-sm flex justify-between items-center mb-2 p-3">
              <strong>{presenter.name}</strong>
              <Drawer>
                <DetailsForm data={presenter} />
              </Drawer>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default App;
