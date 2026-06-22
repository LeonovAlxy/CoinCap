import { createSlice } from '@reduxjs/toolkit';

const loadTotalFromStorage = () => {
  const saved = localStorage.getItem('totalCryptoAcc');
  return saved !== null ? Number(JSON.parse(saved)) : 0;
};

const loadPreviousTotalFromStorage = () => {
  const saved = localStorage.getItem('previousTotalCryptoAcc');
  return saved !== null ? Number(JSON.parse(saved)) : 0;
};

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    totalAccCrypto: loadTotalFromStorage(),
    previousTotalAccCrypto: loadPreviousTotalFromStorage(),
  },
  reducers: {
    renewTotalAccCrypto: (state, action) => {
      state.totalAccCrypto = action.payload;
      localStorage.setItem('totalCryptoAcc', JSON.stringify(action.payload));
    },
    setPreviousTotalAccCrypto: (state, action) => {
      state.previousTotalAccCrypto = action.payload;
    },
  },
  selectors: {
    selectTotalAccCrypto: (state) => state.totalAccCrypto,
    selectPreviousTotalAccCrypto: (state) => state.previousTotalAccCrypto,
  },
});

export const { renewTotalAccCrypto, setPreviousTotalAccCrypto } = cryptoSlice.actions;
export const { selectTotalAccCrypto, selectPreviousTotalAccCrypto } = cryptoSlice.selectors;
export default cryptoSlice.reducer;
