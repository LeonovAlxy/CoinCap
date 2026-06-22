import { useQuery } from '@tanstack/react-query';
import { fetchAsset } from '../services/assetsApi';

export const useAsset = (id) => {
  return useQuery({
    queryKey: ['asset', id],
    queryFn: () => fetchAsset(id),
    enabled: !!id,
    staleTime: 60000,
  });
};
