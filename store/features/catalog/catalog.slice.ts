import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { HYDRATE } from 'next-redux-wrapper';
import { Category } from '../../../interfaces';
import { CatalogState } from './catalog.types';

const initialState = {
    categories: []
} as CatalogState;

const catalogSlice = createSlice({
    name: 'catalog',
    initialState,
    reducers: {},
    extraReducers: {
        [HYDRATE]: (state, action) => {
            return {
                ...state,

            };
        }
    }
});

const loadCatalog = createAsyncThunk(
    'SERVER/loadCatalog',
    async () => {
        const { data } = await axios.get<{ categories: Category[] }>(process.env.NEXT_PUBLIC_DOMAIN + '/api/category');
        return data;
    }
);

export const catalogReducer = catalogSlice.reducer;