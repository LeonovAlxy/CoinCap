import { Flex, Typography, Card } from 'antd';
import { useAssets } from '../../hooks/useAssets';

const { Text } = Typography;

const PopularCrypto = () => {
  const { data: crypto = [] } = useAssets();
  const popular = crypto.slice(0, 3);
  return (
    <Flex gap="middle" wrap="wrap">
      <Text underline style={{ textAlign: 'left', fontSize: 14, marginBottom: 12 }}>
        Популярные криптовалюты:
      </Text>
      {popular.map((item) => (
        <Card key={item.id} size="small">
          <Text strong>{item.symbol}</Text>
          <Text> $ {Number(item.priceUsd).toLocaleString()}</Text>
        </Card>
      ))}
    </Flex>
  );
};

export default PopularCrypto;
