import { useQuery } from '@tanstack/react-query';
import { fetchAssets } from '../services/assetsApi';

export const useAssets = () => {
  return useQuery({
    queryKey: ['assets'],
    queryFn: fetchAssets,
    staleTime: 60000,
    refetchInterval: 60000,
  });
};
