import { useQuery } from '@tanstack/react-query';
import { fetchAssets } from '../services/assetsApi';

export const useAssets = () => {
  const query = useQuery({
    queryKey: ['assets'],
    queryFn: fetchAssets,
    staleTime: 5000,
    refetchInterval: 5000,
  });
  return {
    ...query,
    data: query.data?.data || [],
  };
};
