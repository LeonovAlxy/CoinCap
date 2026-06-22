import { useQuery } from '@tanstack/react-query';
import { fetchPricesBySymbols } from '../services/assetsApi';

export const usePrices = (symbols) => {
  const unique = [...new Set(symbols.filter(Boolean))];
  return useQuery({
    queryKey: ['prices', unique.join(',')],
    queryFn: () => fetchPricesBySymbols(unique),
    enabled: unique.length > 0,
    staleTime: 5000,
    refetchInterval: 5000,
    keepPreviousData: true,
  });
};
