import { Flex, Typography } from 'antd';
import { WalletOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalAccCrypto } from '../../redux/cryptoSlice';

const { Text } = Typography;

const AccountInfo = () => {
  let totalValue = useSelector(selectTotalAccCrypto);

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
