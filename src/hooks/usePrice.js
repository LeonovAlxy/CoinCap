import { useQuery } from '@tanstack/react-query';
import { fetchPriceBySymbol } from '../services/assetsApi';

export const usePrice = (symbol) => {
  return useQuery({
    queryKey: ['price', symbol],
    queryFn: () => fetchPriceBySymbol(symbol),
    enabled: !!symbol,
    staleTime: 5000,
    refetchInterval: 5000,
    keepPreviousData: true,
  });
};
