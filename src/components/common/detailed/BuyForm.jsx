import { useState } from 'react';
import { Button, Card, Typography, Space, InputNumber } from 'antd';
import { PlusOutlined, DollarOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { renewTotalAccCrypto } from '../../../redux/cryptoSlice';
import { buyCrypto } from '../../../utils/acc';

const { Title, Text } = Typography;

function BuyForm({ crypto }) {
  const dispatch = useDispatch();

  const [quantity, setQuantity] = useState(1);

  const handleBuy = () => {
    const cryptoWithQuantity = {
      name: crypto.name,
      priceUsd: crypto.priceUsd,
      symbol: crypto.symbol,
      quantity,
    };
    const newTotal = buyCrypto(cryptoWithQuantity);
    dispatch(renewTotalAccCrypto(newTotal));
  };

  return (
    <div
      style={{
        background: '#f6ffed',
        margin: '24px auto',
        borderRadius: 12,
        border: '1px solid #b7eb8f',
        padding: '16px',
      }}
    >
      <Space orientation="vertical" size="middle">
        <Title level={3}>
          {crypto.symbol} {crypto.name}
        </Title>
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
          Общая стоимость: ${(Number(crypto.priceUsd) * quantity).toLocaleString()}
        </Text>
        <Button type="primary" onClick={handleBuy}>
          Купить
        </Button>
      </Space>
    </div>
  );
}

export default BuyForm;
