import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import store from './redux/store';
import Layout from './components/Layout/Layout';
import CryptoTable from './pages/CryptoTable';
import Account from './pages/Account';
import CryptoDetail from './pages/CryptoDetail';

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
