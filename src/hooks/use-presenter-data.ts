import { useEffect, useRef, useState } from 'react';

const usePresenterData = () => {
  const [presenters, setPresenters] = useState([]);
  const hasFetched = useRef(false);

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

  return presenters;
};

export default usePresenterData;
