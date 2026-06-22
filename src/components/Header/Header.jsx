import { Layout, Flex, Space } from 'antd';
import PopularCrypto from '../common/PopularCrypto';
import AccountInfo from '../common/AccountInfo';

const { Header: AntHeader } = Layout;

const Header = () => {
  return (
    <AntHeader style={{ background: '#fff', padding: '0 24px', borderBottom: '1px solid #f0f0f0' }}>
      <Flex justify="space-between" align="center">
        <Space>
          <h2>CoinCap</h2>
        </Space>
        <PopularCrypto />
        <AccountInfo />
      </Flex>
    </AntHeader>
  );
};

export default Header;
