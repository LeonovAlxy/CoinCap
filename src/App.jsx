import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import Layout from './components/Layout/Layout';
import CryptoTable from './pages/CryptoTable';
import Account from './pages/Account';
import CryptoDetail from './pages/CryptoDetail';

//в локале хранится только количество и название, суммы подгрузка(поиск в сторе по именам,чтоб не делать доп запрос).
// в портфеле стоимость старая-фикс. тотал пересчет

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/coincap/">
        <Layout>
          <Routes>
            <Route path="/" element={<CryptoTable />} />
            <Route path="/account" element={<Account />} />
            <Route path="/:id" element={<CryptoDetail />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
