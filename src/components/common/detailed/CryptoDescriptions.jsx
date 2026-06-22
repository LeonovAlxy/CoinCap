import { Descriptions } from 'antd';

function CryptoDescriptions({ crypto }) {
  return (
    <Descriptions bordered column={1}>
      <Descriptions.Item label="Цена (USD)">
        ${Number(crypto.priceUsd).toLocaleString()}
      </Descriptions.Item>
      <Descriptions.Item label="Доступное предложение для торговли">
        {Number(crypto.maxSupply).toLocaleString() || '—'}
      </Descriptions.Item>
      <Descriptions.Item label="Общее кол-во выпущенных активов">
        ${Number(crypto.marketCapUsd).toLocaleString()}
      </Descriptions.Item>
      <Descriptions.Item label="Объём торговли за последние 24 часа">
        ${Number(crypto.volumeUsd24Hr).toLocaleString()}
      </Descriptions.Item>
      <Descriptions.Item label="Средняя цена по объему за последние 24 часа">
        ${Number(crypto.vwap24Hr).toLocaleString()}
      </Descriptions.Item>
      <Descriptions.Item label="Процентное изменение ценцы за последние 24 часа">
        <span style={{ color: Number(crypto.changePercent24Hr) >= 0 ? '#52c41a' : '#ff4d4f' }}>
          {Number(crypto.changePercent24Hr) >= 0 ? '+' : ''}
          {Number(crypto.changePercent24Hr).toFixed(2)}%
        </span>
      </Descriptions.Item>
      <Descriptions.Item label="Сайт">
        {crypto.explorer ? (
          <a href={crypto.explorer} target="_blank">
            {crypto.explorer}
          </a>
        ) : (
          '—'
        )}
      </Descriptions.Item>
    </Descriptions>
  );
}

export default CryptoDescriptions;
