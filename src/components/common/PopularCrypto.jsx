import { Flex, Typography } from 'antd';
import { selectCrypto } from '../../redux/cryptoSlice';
import { useSelector } from 'react-redux';

const { Text } = Typography;

const PopularCrypto = () => {
  const crypto = useSelector(selectCrypto);
  const popularCrypto = crypto.slice(0, 3);
  return (
    <Flex vertical style={{ paddingLeft: 24 }}>
      <Text underline style={{ textAlign: 'left' }}>
        Популярные криптовалюты:
      </Text>
      <Flex gap={'medium'}>
        {popularCrypto.map((item) => (
          <Flex vertical>
            <Text strong style={{ textAlign: 'left' }}>
              {item.name}
            </Text>
            <Text italic style={{ textAlign: 'left' }}>
              {Number(item.priceUsd).toLocaleString()}$
            </Text>
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default PopularCrypto;
