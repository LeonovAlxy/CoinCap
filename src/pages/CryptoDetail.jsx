import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spin, Alert, Typography, Descriptions, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import Header from '../components/Header/Header';
import BuyForm from '../components/common/detailed/BuyForm';
import CryptoDescriptions from '../components/common/detailed/CryptoDescriptions';
import PriceChart from '../components/common/detailed/PriceChart';
import { useHistory } from '../hooks/useHistorу';
import { useAsset } from '../hooks/useAsset';

const { Title } = Typography;

function CryptoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data: crypto, isLoading, isError } = useAsset(id);
  const { data: history } = useHistory(id, 'h1', 1);

  if (isLoading) return <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />;
  if (isError) return <Alert message="Ошибка" type="error" />;

  return (
    <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
      <Card>
        <div style={{ textAlign: 'right' }}>
          <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>
            На главную
          </Button>
        </div>
        <BuyForm crypto={crypto} />
        <CryptoDescriptions crypto={crypto} />
        <PriceChart data={history} />
      </Card>
    </div>
  );
}

export default CryptoDetail;
