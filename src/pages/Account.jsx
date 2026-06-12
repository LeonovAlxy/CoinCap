import { Flex, Typography } from 'antd';
import { WalletOutlined } from '@ant-design/icons';

const { Text } = Typography;

const Account = () => {
  const totalValue = 12345.67;

  return (
    <Flex align="center" gap="small" style={{ paddingRight: 24 }}>
      <WalletOutlined style={{ fontSize: 40, color: '#1890ff' }} />
      <Flex vertical>
        <Text type="secondary" style={{ fontSize: 12, textAlign: 'left' }}>
          Итого:
        </Text>
        <Text strong style={{ fontSize: 16, textAlign: 'left' }}>
          {totalValue.toLocaleString()} USD
        </Text>
      </Flex>
    </Flex>
  );
};

export default Account;
