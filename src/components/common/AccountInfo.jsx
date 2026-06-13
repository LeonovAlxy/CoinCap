import { Flex, Typography } from 'antd';
import { WalletOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

const AccountInfo = () => {
  const totalValue = 12345.67;
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/account');
  };

  return (
    <Flex align="center" gap="small" style={{ paddingRight: 24 }}>
      <WalletOutlined
        style={{ fontSize: 40, color: '#1890ff', cursor: 'pointer' }}
        onClick={handleClick}
      />
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

export default AccountInfo;
