import { useEffect, useState } from 'react';

import { getRandomFact } from '../services/facts';

export const useCatFact = () => {
  const [fact, setFact] = useState(null);

  const refreshFact = () => {
    getRandomFact().then(newFact => setFact(newFact));
  };

  useEffect(refreshFact, []);

  return { fact, refreshFact };
};
