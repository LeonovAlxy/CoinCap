import { useEffect } from 'react';
import { Table, Spin, Alert, Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCrypto, selectCrypto, selectLoading, selectErrors } from '../redux/cryptoSlice';

const handleClick = (data) => {
  console.log(data);
};

const columns = [
  {
    title: '№',
    dataIndex: 'rank',
    key: 'rank',
    width: 40,
  },
  {
    dataIndex: 'symbol',
    key: 'symbol',
    width: 40,
    render: (symbol) => <span style={{ color: 'blue' }}>{symbol}</span>,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },

  {
    title: 'VWAP(24Hr)',
    dataIndex: 'volumeUsd24Hr',
    key: 'volumeUsd24Hr',
    render: (volume) => `$${Number(volume).toLocaleString()}$`,
  },
  {
    title: 'Change (24Hr)',
    dataIndex: 'changePercent24Hr',
    key: 'changePercent24Hr',
    render: (change) => (
      <span style={{ color: Number(change) >= 0 ? 'green' : 'red' }}>
        {Number(change).toFixed(2)}%
      </span>
    ),
  },
  {
    title: 'Market Cap',
    dataIndex: 'marketCapUsd',
    key: 'marketCapUsd',
    render: (cap) => `${Number(cap).toLocaleString()}$`,
  },
  {
    title: 'Price',
    dataIndex: 'priceUsd',
    key: 'priceUsd',
    render: (price) => `${Number(price).toLocaleString()}$`,
  },
  {
    dataIndex: 'symbol',
    key: 'add',
    render: (symbol) => (
      <Button color="primary" variant="solid" onClick={() => handleClick(symbol)}>
        <PlusOutlined />
      </Button>
    ),
  },
];

function CryptoTable() {
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading);
  const errors = useSelector(selectErrors);
  const crypto = useSelector(selectCrypto);
  useEffect(() => {
    dispatch(fetchCrypto());
  }, []);

  if (errors) return <Alert message="Ошибка" description={errors} type="error" showIcon />;
  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  }
  return (
    <div style={{ padding: 24 }}>
      <h1>CoinCap</h1>
      <Table
        dataSource={crypto}
        columns={columns}
        rowKey="id"
        pagination={{
          pageSize: 10,
          placement: ['bottomCenter'],
          showSizeChanger: false,
        }}
        bordered
      />
    </div>
  );
}

export default CryptoTable;
