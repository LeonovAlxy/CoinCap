import { useEffect, useState } from 'react';
import { Spin, Alert } from 'antd';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';
import api from '../../../services/api';

function PriceChart({ cryptoId }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const now = Date.now();
        const twentyFourHoursAgo = now - 24 * 60 * 60 * 1000;

        const response = await api.get(`/assets/${cryptoId}/history`, {
          params: {
            interval: 'h1', // почасовая разбивка
            start: twentyFourHoursAgo,
            end: now,
          },
        });

        const chartData = response.data.map((item) => ({
          date: new Date(item.time).toLocaleTimeString('ru-RU', {
            hour: '2-digit',
            minute: '2-digit',
          }),
          price: Number(item.priceUsd),
        }));
        setData(chartData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchHistory();
  }, [cryptoId]);

  if (loading) return <Spin />;
  if (error)
    return <Alert message="Ошибка загрузки графика" description={error} type="error" showIcon />;
  if (!data.length) return <div>Нет данных за последние 24 часа</div>;

  return (
    <div style={{ marginTop: 24 }}>
      <h3>История цены за последние 24 часа</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Line type="monotone" dataKey="price" stroke="#1890ff" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default PriceChart;
