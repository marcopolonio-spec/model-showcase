import { createContext, useCallback, useContext, useEffect, useState } from 'react';
import { fetchPortfolioConfig } from '../data/portfolioData.js';

const PortfolioDataContext = createContext(null);

/**
 * Carica la configurazione dal backend (mod-show-backend) all'avvio
 * e la espone a tutti i componenti tramite `usePortfolioData()`.
 * Espone anche `loading`, `error` e `retry` per gestire gli stati UI.
 */
export const PortfolioProvider = ({ children }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const config = await fetchPortfolioConfig();
      setData(config);
    } catch (err) {
      console.error('[model-showcase] Impossibile recuperare la configurazione dal backend:', err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <PortfolioDataContext.Provider value={{ data, loading, error, retry: load }}>
      {children}
    </PortfolioDataContext.Provider>
  );
};

export const usePortfolioData = () => {
  const ctx = useContext(PortfolioDataContext);
  if (!ctx) {
    throw new Error('usePortfolioData deve essere usato dentro <PortfolioProvider>');
  }
  return ctx;
};
