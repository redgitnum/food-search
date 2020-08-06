import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFood = createAsyncThunk(
    'search/food',
    async (input) => {
        try{
            const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${input}&search_simple=1&action=process&json=1&page=1`,
                {
                    'User-Agent': 'Food search app (practice) - windows - Version 1.0'
                }
            )
            return {
                data: await response.json(),
                query: input
            }
        } catch(err) {
            return err.message
        }
    }
)

export const foodSlice = createSlice({
    name: 'search',
    initialState: {data: {}, loader: false, query: ''},
    extraReducers: {
        [fetchFood.pending]: (state, action) => {
            state.data = 'pending'
            state.loader = true
        },
        [fetchFood.rejected]: (state, action) => {
            state.data = action.payload.data
            state.loader = false
        },
        [fetchFood.fulfilled]: (state, action) => {
            state.data = action.payload.data
            state.loader = false
            state.query = action.payload.query
        }
    }
})

export default configureStore({
    reducer: foodSlice.reducer
  })