import { Flex, Typography } from 'antd';
import { WalletOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectTotalAccCrypto, selectPreviousTotalAccCrypto } from '../../redux/cryptoSlice';

const { Text } = Typography;

const AccountInfo = () => {
  const navigate = useNavigate();
  const total = useSelector(selectTotalAccCrypto);
  const previousTotal = useSelector(selectPreviousTotalAccCrypto);

  const change = total - previousTotal;
  const changePercent = previousTotal !== 0 ? (change / previousTotal) * 100 : 0;
  const isPositive = change >= 0;

  return (
    <Flex align="center" gap="small" style={{ paddingRight: 24 }}>
      <WalletOutlined
        style={{ fontSize: 40, color: '#1890ff', cursor: 'pointer' }}
        onClick={() => navigate('/account')}
      />
      <Flex vertical>
        <Text type="secondary" style={{ fontSize: 12, textAlign: 'left' }}>
          Итого:
        </Text>
        <Text strong style={{ fontSize: 16, textAlign: 'left' }}>
          ${total.toLocaleString()}
        </Text>
        {previousTotal !== 0 && (
          <Text type={isPositive ? 'success' : 'danger'} style={{ fontSize: 12 }}>
            {isPositive ? '+' : ''}
            {change.toLocaleString()} USD ({isPositive ? '+' : ''}
            {changePercent.toFixed(2)}%)
          </Text>
        )}
      </Flex>
    </Flex>
  );
};

export default AccountInfo;
