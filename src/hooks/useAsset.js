import { useQuery } from '@tanstack/react-query';
import { fetchAsset } from '../services/assetsApi';

export const useAsset = (id) => {
  const query = useQuery({
    queryKey: ['asset', id],
    queryFn: () => fetchAsset(id),
    enabled: !!id,
    staleTime: 5000,
    refetchInterval: 5000,
  });
  return {
    ...query,
    data: query.data?.data,
  };
};
