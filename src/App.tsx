import { useState } from 'react';
import { DetailsForm, Drawer } from './components';
import USER_DATA from './data/speakers.json';
import type { Users } from './types';

const App = () => {
  const [users] = useState(USER_DATA as Users);

  return (
    <main className="p-10 flex flex-col items-center">
      <h1 className="text-4xl font-bold text-center mt-10">
        Presenter Management
      </h1>
      <ul className="w-[500px] max-h-96 overflow-y-auto my-8 px-8 py-4">
        {users.map((user) => (
          <li key={user.email}>
            <div className="bg-gray-100 rounded-sm flex justify-between items-center mb-2 p-3">
              <strong>{user.name}</strong>
              <Drawer>
                <DetailsForm data={user} />
              </Drawer>
            </div>
          </li>
        ))}
      </ul>
    </main>
  );
};

export default App;
