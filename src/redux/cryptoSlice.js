import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../services/api';

export const fetchCrypto = createAsyncThunk(
  'crypto/fetchCrypto',
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get('/assets');
      const crypto = response.data;
      return crypto;
    } catch (error) {
      return rejectWithValue(error.response?.data || error.message);
    }
  },
);

const cryptoSlice = createSlice({
  name: 'crypto',
  initialState: {
    crypto: [],
    loading: false,
    errors: null,
  },
  reducers: {
    clearErrors: (state) => {
      state.errors = null;
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
  },
});

export const { clearErrors } = cryptoSlice.actions;
export const { selectCrypto, selectLoading, selectErrors } = cryptoSlice.selectors;
export default cryptoSlice.reducer;
