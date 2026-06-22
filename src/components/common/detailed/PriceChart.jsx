import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from 'recharts';

const PriceChart = ({ data }) => {
  if (!data || data.length === 0) return <div>Нет данных</div>;
  const chartData = data.map((item) => ({
    date: new Date(item.time).toLocaleTimeString('ru-RU', { hour: '2-digit', minute: '2-digit' }),
    price: Number(item.priceUsd),
  }));
  return (
    <div style={{ marginTop: 24 }}>
      <h3>История цены (последние 24 часа)</h3>
      <ResponsiveContainer width="100%" height={400}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" angle={-45} textAnchor="end" height={60} />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
          <Line type="monotone" dataKey="price" stroke="#1890ff" strokeWidth={2} dot={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PriceChart;
