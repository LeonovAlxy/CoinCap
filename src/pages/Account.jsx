import { Table, Button, Typography, Card, Space, Tooltip } from 'antd';
import { CloseOutlined, ArrowLeftOutlined, WalletOutlined } from '@ant-design/icons';
import { getCryptoAcc, deleteCrypto } from '../utils/acc';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { renewTotalAccCrypto } from '../redux/cryptoSlice';
import { usePrices } from '../hooks/usePrices';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

function Account() {
  const [crypto, setCrypto] = useState(getCryptoAcc());
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const symbols = crypto.map((item) => item.symbol);
  const { data: prices = {} } = usePrices(symbols);

  const totalValueRealTime = crypto.reduce((sum, item) => {
    const price = prices[item.symbol] || Number(item.priceUsd);
    return sum + price * item.quantity;
  }, 0);

  useEffect(() => {
    dispatch(renewTotalAccCrypto(totalValueRealTime));
  }, [totalValueRealTime]);

  const handleDelete = (index) => {
    const newTotal = deleteCrypto(index);
    dispatch(renewTotalAccCrypto(newTotal));
    setCrypto(getCryptoAcc());
  };

  const columns = [
    { title: '№', key: 'index', render: (_, __, idx) => idx + 1 },
    { title: 'Название', dataIndex: 'name', key: 'name' },
    {
      title: 'Цена за ед. (USD)',
      key: 'price',
      render: (_, record) => {
        const price = prices[record.symbol.toUpperCase()] || Number(record.priceUsd);
        if (price === undefined || price === null || isNaN(price)) return <span>⏳</span>;
        return <span>${price.toLocaleString()}</span>;
      },
    },
    { title: 'Количество', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Итого (USD)',
      key: 'total',
      render: (_, record) => {
        const price = prices[record.symbol.toUpperCase()] || Number(record.priceUsd);
        if (!price || isNaN(price)) return <span>—</span>;
        return `$${(price * record.quantity).toLocaleString()}`;
      },
    },
    {
      title: '',
      key: 'delete',
      align: 'center',
      render: (_, record, idx) => (
        <Tooltip title="Удалить">
          <Button danger icon={<CloseOutlined />} onClick={() => handleDelete(idx)} />
        </Tooltip>
      ),
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Card>
          <Space direction="vertical" size="middle" style={{ width: '100%' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Space>
                <WalletOutlined style={{ fontSize: 28, color: '#1890ff' }} />
                <Title level={3}>Мой портфель</Title>
              </Space>
              <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>
                На главную
              </Button>
            </div>
            <div
              style={{
                background: '#f6ffed',
                padding: '12px 20px',
                borderRadius: 12,
                border: '1px solid #b7eb8f',
              }}
            >
              <Text strong>Общая стоимость: </Text>
              <Text style={{ fontSize: 20, color: '#52c41a' }}>
                ${totalValueRealTime.toLocaleString()}
              </Text>
            </div>
            <Table
              className="portfolio-table"
              dataSource={crypto}
              columns={columns}
              rowKey="name"
              bordered
              pagination={{ pageSize: 10 }}
            />
          </Space>
        </Card>
      </div>
    </div>
  );
}

export default Account;
