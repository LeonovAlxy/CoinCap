import { usePrice } from '../../hooks/usePrice';
import { Spin } from 'antd';

const PriceCell = ({ symbol }) => {
  const { data: price, isLoading, isError } = usePrice(symbol);

  if (isLoading) return <Spin size="small" style={{ display: 'block', margin: '50px auto' }} />;
  if (isError || price === undefined) return <span>—</span>;
  return <span>${price.toLocaleString()}</span>;
};

export default PriceCell;
