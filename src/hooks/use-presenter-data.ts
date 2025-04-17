import { Presenter, Presenters } from '@/types';
import { useEffect, useRef, useState } from 'react';

const usePresenterData = () => {
  const [presenters, setPresenters] = useState<Presenters>([]);
  const hasFetched = useRef(false);
  const updatePresenter = (presenterData: Partial<Presenter>) => {
    setPresenters((prev) =>
      prev.map((p) =>
        p.id === presenterData.id ? { ...p, ...presenterData } : p
      )
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch('/data/presenters.json');
      const data = await response.json();

      if (data) {
        setPresenters(data);
      }
    };

    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchData();
    }
  }, []);

  return [presenters, updatePresenter] as const;
};

export default usePresenterData;
