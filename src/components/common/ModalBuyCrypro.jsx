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
import { PlusOutlined, DollarOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { renewTotalAccCrypto } from '../../redux/cryptoSlice';
import { buyCrypto } from '../../utils/acc';

const { Title, Text } = Typography;

function ModalBuyCrypto({ selectedRecord, setSelectedRecord, isModalOpen, setIsModalOpen }) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const handleBuy = () => {
    const cryptoWithQuantity = {
      name: selectedRecord.name,
      priceUsd: selectedRecord.priceUsd,
      symbol: selectedRecord.symbol,
      quantity,
    };
    const newTotal = buyCrypto(cryptoWithQuantity);
    dispatch(renewTotalAccCrypto(newTotal));
    setIsModalOpen(false);
    setSelectedRecord(null);
  };

  return (
    <Modal
      open={isModalOpen}
      onOk={handleBuy}
      onCancel={() => setIsModalOpen(false)}
      okText="Купить"
      cancelText="Отмена"
    >
      {selectedRecord && (
        <Space orientation="vertical" size="middle" style={{ width: '100%' }}>
          <Text strong>Купить {selectedRecord.name}</Text>
          <Text>Цена: ${Number(selectedRecord.priceUsd).toLocaleString()}</Text>
          <div>
            <Text>Количество: </Text>
            <InputNumber
              min={0.01}
              step={0.01}
              value={quantity}
              onChange={(val) => setQuantity(val)}
              style={{ width: 120 }}
            />
          </div>
          <Text strong>
            Общая стоимость: ${(Number(selectedRecord.priceUsd) * quantity).toLocaleString()}
          </Text>
        </Space>
      )}
    </Modal>
  );
}

export default ModalBuyCrypto;
