import { Layout, Typography, Flex, Space } from 'antd';
import { DollarOutlined } from '@ant-design/icons';
import PopularCrypto from '../common/PopularCrypto';
import AccountInfo from '../common/AccountInfo';

const { Header: AntHeader } = Layout;
const { Title, Text } = Typography;

const Header = () => {
  return (
    <AntHeader
      style={{
        background: '#fff',
        height: 'auto',
        padding: '12px 24px',
        lineHeight: 'normal',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <Flex justify="space-between" wrap="wrap" gap="middle">
        <Space align="start" size="small">
          <Title style={{ margin: 0, color: '#1890ff' }}>CoinCap</Title>
        </Space>
        <Space>
          <PopularCrypto />
        </Space>
        <Space>
          <AccountInfo />
        </Space>
      </Flex>
    </AntHeader>
  );
};

export default Header;
