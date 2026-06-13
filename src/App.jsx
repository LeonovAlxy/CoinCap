import './App.css';
import { Provider } from 'react-redux';
import store from './redux/store';
import Layout from './components/Layout/Layout';
import { BrowserRouter, Routes, Route } from 'react-router';
import Account from './pages/Account';

// модалка при добавлении в портфель (в т.ч. дробное)+в профиле добавить количество (его надо в локал добавить) и итого за каждую
// модалка при нажатии на крипту
// tanstack

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter basename="/coincap">
        <Routes>
          <Route path="/" element={<Layout />} />
          <Route path="/account" element={<Account />} />
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
