import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../utils/axiosInstance';

interface Item {
  id: number;
  title: string;
  description: string;
  status: string;
}

interface ApiState {
  items: Item[];
  loading: boolean;
  error: string | null;
}

export const fetchItems = createAsyncThunk<Item[]>('api/fetchItems', async () => {
  const response = await axiosInstance.get<Item[]>('/todo');
  return response.data;
});

export const createItem = createAsyncThunk<Item, Item>('api/createItem', async (newItem) => {
  const response = await axiosInstance.post<Item>('/todo', newItem);
  return response.data;
});

export const updateItem = createAsyncThunk<Item, { id: number; updatedItem: Item }>(
  'api/updateItem',
  async ({ id, updatedItem }) => {
    const response = await axiosInstance.put<Item>(`/todo/${id}`, updatedItem);
    return response.data;
  }
);

export const updateItemStatus = createAsyncThunk<Item, { id: number; status: string }>(
  'api/updateItemStatus',
  async ({ id, status }) => {
    const response = await axiosInstance.put<Item>(`/todo/status/${id}`, {status: status});
    return response.data;
  }
);

export const deleteItem = createAsyncThunk<number, number>('api/deleteItem', async (id) => {
  await axiosInstance.delete(`/todo/${id}`);
  return id;
});

const apiSlice = createSlice({
  name: 'api',
  initialState: {
    items: [],
    loading: false,
    error: null,
  } as ApiState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message as any;
      })
      .addCase(createItem.fulfilled, (state, action) => {
        state.items.push(action.payload);
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(updateItemStatus.fulfilled, (state, action) => {
        const index = state.items.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.items[index] = action.payload;
        }
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      });
  },
});

export default apiSlice.reducer;
