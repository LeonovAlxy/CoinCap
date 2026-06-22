import { useQuery } from '@tanstack/react-query';
import { fetchHistory } from '../services/assetsApi';

export const useHistory = (id, interval = 'h1', days = 1) => {
  const now = Date.now();
  const start = now - days * 24 * 60 * 60 * 1000;
  return useQuery({
    queryKey: ['history', id, interval, days],
    queryFn: () => fetchHistory(id, interval, start, now),
    enabled: !!id,
    staleTime: 60000,
  });
};
