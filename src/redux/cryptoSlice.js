import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchCrypto = createAsyncThunk(
  'crypto/fetchCrypto',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/assets');
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

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
    crypto: [],
    loading: false,
    errors: null,
    totalAccCrypto: loadTotalFromStorage(),
    previousTotalAccCrypto: loadPreviousTotalFromStorage(),
  },
  reducers: {
    clearErrors: (state) => {
      state.errors = null;
    },
    renewTotalAccCrypto: (state, action) => {
      state.totalAccCrypto = action.payload;
      localStorage.setItem('totalCryptoAcc', JSON.stringify(action.payload));
    },
    setPreviousTotalAccCrypto: (state, action) => {
      state.previousTotalAccCrypto = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCrypto.fulfilled, (state, action) => {
        state.crypto = action.payload;
        state.loading = false;
      })
      .addCase(fetchCrypto.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      })
      .addMatcher(
        (action) => action.type.endsWith('/pending'),
        (state) => {
          state.loading = true;
        },
      );
  },
  selectors: {
    selectCrypto: (state) => state.crypto,
    selectLoading: (state) => state.loading,
    selectErrors: (state) => state.errors,
    selectTotalAccCrypto: (state) => state.totalAccCrypto,
    selectPreviousTotalAccCrypto: (state) => state.previousTotalAccCrypto,
  },
});

export const { clearErrors, renewTotalAccCrypto, setPreviousTotalAccCrypto } = cryptoSlice.actions;
export const {
  selectCrypto,
  selectLoading,
  selectErrors,
  selectTotalAccCrypto,
  selectPreviousTotalAccCrypto,
} = cryptoSlice.selectors;
export default cryptoSlice.reducer;
