import { useState, useEffect } from 'react';
import {
  Table,
  Spin,
  Alert,
  Button,
  Card,
  Typography,
  Space,
  Tooltip,
  Modal,
  InputNumber,
} from 'antd';
import { PlusOutlined, DollarOutlined } from '@ant-design/icons';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCrypto, selectCrypto, selectLoading, selectErrors } from '../redux/cryptoSlice';
import ModalBuyCrypto from '../components/common/ModalBuyCrypro';
import { useNavigate } from 'react-router-dom';

const { Title, Text } = Typography;

function CryptoTable() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loading = useSelector(selectLoading);
  const errors = useSelector(selectErrors);
  const crypto = useSelector(selectCrypto);

  const showBuyModal = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  useEffect(() => {
    dispatch(fetchCrypto());
  }, [dispatch]);

  if (errors) return <Alert message="Ошибка" description={errors} type="error" showIcon />;
  if (loading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;

  const columns = [
    { title: '№', dataIndex: 'rank', key: 'rank', width: 60, align: 'center' },
    {
      title: 'Символ',
      dataIndex: 'symbol',
      key: 'symbol',
      width: 80,
      align: 'center',
      render: (symbol) => (
        <Text strong style={{ color: '#1890ff' }}>
          {symbol}
        </Text>
      ),
    },
    {
      title: 'Название',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'VWAP (24ч)',
      dataIndex: 'volumeUsd24Hr',
      key: 'volumeUsd24Hr',
      align: 'right',
      render: (volume) => `$${Number(volume).toLocaleString()}`,
    },
    {
      title: 'Изм. (24ч)',
      dataIndex: 'changePercent24Hr',
      key: 'changePercent24Hr',
      align: 'right',
      render: (change) => (
        <Text style={{ color: Number(change) >= 0 ? '#52c41a' : '#ff4d4f', fontWeight: 500 }}>
          {Number(change) >= 0 ? '+' : ''}
          {Number(change).toFixed(2)}%
        </Text>
      ),
    },
    {
      title: 'Рыночная капитализация',
      dataIndex: 'marketCapUsd',
      key: 'marketCapUsd',
      align: 'right',
      render: (cap) => `$${Number(cap).toLocaleString()}`,
    },
    {
      title: 'Цена (USD)',
      dataIndex: 'priceUsd',
      key: 'priceUsd',
      align: 'right',
      render: (price) => <Text strong>${Number(price).toLocaleString()}</Text>,
    },
    {
      title: '',
      key: 'add',
      width: 60,
      align: 'center',
      render: (_, record) => (
        <Tooltip title="Добавить в портфель">
          <Button
            type="primary"
            shape="circle"
            icon={<PlusOutlined />}
            onClick={(e) => {
              e.stopPropagation();
              showBuyModal(record);
            }}
          />
        </Tooltip>
      ),
    },
  ];

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Card
        style={{ borderRadius: 16, boxShadow: '0 8px 20px rgba(0,0,0,0.05)' }}
        styles={{ body: { padding: '20px 24px' } }}
      >
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Space>
              <DollarOutlined style={{ fontSize: 28, color: '#1890ff' }} />
              <Title level={3} style={{ margin: 0 }}>
                Рынок криптовалют
              </Title>
            </Space>
          </div>

          <Table
            dataSource={crypto}
            columns={columns}
            rowKey="id"
            pagination={{ pageSize: 10, showSizeChanger: false, showQuickJumper: true }}
            bordered
            onRow={(record) => ({
              onClick: () => navigate(`/${record.id}`),
              style: { cursor: 'pointer' },
            })}
          />
        </Space>
      </Card>

      <ModalBuyCrypto
        selectedRecord={selectedRecord}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        setSelectedRecord={setSelectedRecord}
      />
    </div>
  );
}

export default CryptoTable;
