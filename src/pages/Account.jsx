import { Table, Button, Typography, Card, Space, Tooltip } from 'antd';
import { CloseOutlined, ArrowLeftOutlined, WalletOutlined } from '@ant-design/icons';
import { getCryptoAcc, deleteCrypto } from '../utils/acc';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header/Header';
import { selectTotalAccCrypto, renewTotalAccCrypto } from '../redux/cryptoSlice';
import { useDispatch, useSelector } from 'react-redux';

const { Title, Text } = Typography;

function Account() {
  const [crypto, setCrypto] = useState(getCryptoAcc());

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const totalValue = useSelector(selectTotalAccCrypto);

  const handleDelete = (index) => {
    const newTotal = deleteCrypto(index);
    dispatch(renewTotalAccCrypto(newTotal));
    setCrypto(getCryptoAcc());
  };

  const columns = [
    {
      title: '№',
      key: 'index',
      width: 60,
      align: 'center',
      render: (_, __, index) => index + 1,
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Цена за ед. (USD)',
      dataIndex: 'priceUsd',
      key: 'priceUsd',
      align: 'right',
      render: (price) => `$${Number(price).toLocaleString()}`,
    },
    {
      title: 'Количество',
      dataIndex: 'quantity',
      key: 'quantity',
      align: 'right',
      render: (quantity) => quantity,
    },

    {
      title: 'Итого (USD)',
      key: 'total',
      align: 'right',
      render: (_, record) => `$${(Number(record.priceUsd) * record.quantity).toLocaleString()}`,
    },
    {
      title: '',
      key: 'delete',
      width: 70,
      align: 'center',
      render: (_, record, index) => (
        <Tooltip title="Удалить из портфеля">
          <Button danger type="text" icon={<CloseOutlined />} onClick={() => handleDelete(index)} />
        </Tooltip>
      ),
    },
  ];

  return (
    <div style={{ minHeight: '100vh', background: '#f5f5f5' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto', padding: '24px' }}>
        <Card
          style={{ borderRadius: 16, boxShadow: '0 8px 20px rgba(0,0,0,0.05)', marginBottom: 24 }}
          styles={{ body: { padding: '20px 24px' } }}
        >
          <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
              }}
            >
              <Space size="middle">
                <WalletOutlined style={{ fontSize: 28, color: '#1890ff' }} />
                <Title level={3} style={{ margin: 0, fontWeight: 500 }}>
                  Мой портфель
                </Title>
              </Space>
              <Tooltip title="На главную">
                <Button
                  type="default"
                  icon={<ArrowLeftOutlined />}
                  onClick={() => navigate('/')}
                  size="large"
                >
                  На главную
                </Button>
              </Tooltip>
            </div>

            <div
              style={{
                background: '#f6ffed',
                padding: '12px 20px',
                borderRadius: 12,
                border: '1px solid #b7eb8f',
              }}
            >
              <Space>
                <Text strong style={{ fontSize: 16 }}>
                  Общая стоимость:
                </Text>
                <Text style={{ fontSize: 20, color: '#52c41a', fontWeight: 600 }}>
                  ${totalValue.toLocaleString()}
                </Text>
              </Space>
            </div>

            <Table
              dataSource={crypto}
              columns={columns}
              rowKey="id"
              pagination={{ pageSize: 10, placement: ['bottomCenter'] }}
              bordered
              locale={{ emptyText: 'Портфель пуст' }}
              style={{ overflowX: 'auto' }}
            />
          </Space>
        </Card>
      </div>
    </div>
  );
}

export default Account;
