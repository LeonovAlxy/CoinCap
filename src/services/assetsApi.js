import api from './api';

export const fetchAssets = () => api.get('/assets');

export const fetchAsset = (id) => api.get(`/assets/${id}`);

export const fetchHistory = (id, interval, start, end) =>
  api.get(`/assets/${id}/history`, { params: { interval, start, end } });

export const fetchPricesBySymbols = async (symbols) => {
  if (!symbols || symbols.length === 0) return {};
  const unique = [...new Set(symbols.filter(Boolean))];
  const query = unique.join(',');
  const body = await api.get(`/price/bysymbol/${query}`);
  const priceArray = body.data;
  const result = {};
  unique.forEach((symbol, index) => {
    result[symbol.toUpperCase()] = Number(priceArray[index]);
  });
  return result;
};
