import { createSlice } from '@reduxjs/toolkit';

export const typeQuery = createSlice({
    name: 'typeSelected',
    initialState: null,
    reducers: {
        typeSelected: (state, action) => action.payload 
    }
})

export const { typeSelected } = typeQuery.actions;

export default typeQuery.reducer;
