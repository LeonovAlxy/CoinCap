import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Spin, Alert, Typography, Descriptions, Button } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import api from '../services/api';
import Header from '../components/Header/Header';
import BuyForm from '../components/common/detailed/BuyForm';
import CryptoDescriptions from '../components/common/detailed/CryptoDescriptions';
import PriceChart from '../components/common/detailed/PriceChart';

const { Title } = Typography;

function CryptoDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [crypto, setCrypto] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await api.get(`/assets/${id}`);
        setCrypto(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDetails();
  }, [id]);

  if (error) return <Alert message="Ошибка" description={error} type="error" showIcon />;

  return (
    <>
      <div style={{ padding: 24, background: '#f0f2f5', minHeight: '100vh' }}>
        {loading ? (
          <Spin size="large" style={{ display: 'block', margin: '50px auto' }} />
        ) : (
          <Card>
            <div style={{ textAlign: 'right' }}>
              <Button icon={<ArrowLeftOutlined />} onClick={() => navigate('/')}>
                На главную
              </Button>
            </div>
            <BuyForm crypto={crypto} />

            <CryptoDescriptions crypto={crypto} />

            <PriceChart cryptoId={crypto.id} />
          </Card>
        )}
      </div>
    </>
  );
}

export default CryptoDetail;
