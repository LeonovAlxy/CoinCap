import { Layout, Typography, Flex } from 'antd';
import PopularCrypto from '../common/PopularCrypto';
import Account from '../../pages/Account';

const { Header: AntHeader } = Layout;
const { Title } = Typography;

const Header = () => {
  return (
    <AntHeader
      style={{
        background: '#fff',
        height: 'auto',
        lineHeight: 'normal',
        display: 'flex',
        borderBottom: '1px solid #f0f0f0',
      }}
    >
      <Flex justify="space-between" align="center" style={{ width: '100%' }}>
        <PopularCrypto />
        <Title style={{ color: 'blue', margin: 0 }}>CoinCap</Title>
        <Account />
      </Flex>
    </AntHeader>
  );
};

export default Header;
