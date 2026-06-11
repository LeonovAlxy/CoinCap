import { Layout, Typography, Space, Card, Row, Col, Statistic } from "antd";

const { Header: AntHeader } = Layout;
const { Text, Title } = Typography;

const Header = () => {
  return (
    <AntHeader
      style={{
        background: "#fff",
        padding: "0 24px",
        height: "auto",
        lineHeight: "normal",
        borderBottom: "1px solid #f0f0f0",
      }}
    ></AntHeader>
  );
};

export default Header;
