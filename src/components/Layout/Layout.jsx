import Header from '../Header/Header';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectTotalAccCrypto, setPreviousTotalAccCrypto } from '../../redux/cryptoSlice';

function Layout({ children }) {
  const dispatch = useDispatch();
  const total = useSelector(selectTotalAccCrypto);

  useEffect(() => {
    const totalPrev = localStorage.getItem('previousTotalCryptoAcc');
    if (totalPrev !== null) {
      dispatch(setPreviousTotalAccCrypto(Number(JSON.parse(totalPrev))));
    }
  }, [dispatch]);

  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem('previousTotalCryptoAcc', JSON.stringify(total));
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [total]);
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  );
}

export default Layout;
