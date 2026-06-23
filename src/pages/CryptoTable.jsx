import { useState } from 'react';
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
import { PlusOutlined } from '@ant-design/icons';
import ModalBuyCrypto from '../components/common/ModalBuyCrypro';
import { useNavigate } from 'react-router-dom';
import { useAssets } from '../hooks/useAssets';

const { Title, Text } = Typography;

function CryptoTable() {
  const navigate = useNavigate();

  const { data: crypto = [], isLoading, isError, error } = useAssets();
  const [selectedRecord, setSelectedRecord] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const showBuyModal = (record) => {
    setSelectedRecord(record);
    setIsModalOpen(true);
  };

  if (isLoading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  if (isError) return <Alert message="Ошибка" description={error?.message} type="error" showIcon />;

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
      <Card styles={{ body: { padding: '20px 24px' } }}>
        <Table
          className="crypto-table"
          dataSource={crypto}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          onRow={(record) => ({
            onClick: () => navigate(`/${record.id}`),
            style: { cursor: 'pointer' },
          })}
        />
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
