import { Flex, Typography, Card } from 'antd';
import { selectCrypto } from '../../redux/cryptoSlice';
import { useSelector } from 'react-redux';

const { Text } = Typography;

const PopularCrypto = () => {
  const crypto = useSelector(selectCrypto);
  const popularCrypto = crypto.slice(0, 3);

  return (
    <Flex vertical style={{ width: '100%', paddingLeft: 24 }}>
      <Text underline style={{ textAlign: 'left', fontSize: 14, marginBottom: 12 }}>
        Популярные криптовалюты:
      </Text>
      <Flex gap="middle" wrap="wrap">
        {popularCrypto.map((item) => (
          <Card
            key={item.name}
            size="small"
            style={{
              minWidth: 120,
              textAlign: 'left',
              background: '#fafafa',
              borderRadius: 8,
              boxShadow: '0 1px 2px rgba(0,0,0,0.03)',
            }}
            styles={{ body: { padding: '12px 16px' } }}
          >
            <Text strong style={{ display: 'block', fontSize: 14 }}>
              {item.name}
            </Text>
            <Text italic style={{ fontSize: 13, color: '#1890ff' }}>
              {Number(item.priceUsd).toLocaleString()} USD
            </Text>
          </Card>
        ))}
      </Flex>
    </Flex>
  );
};

export default PopularCrypto;
