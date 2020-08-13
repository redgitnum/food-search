import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const fetchFood = createAsyncThunk(
    'search/food',
    async (input) => {
        try{
            const response = await fetch(`https://world.openfoodfacts.org/cgi/search.pl?search_terms=${input.value}&search_simple=1&action=process&json=1&page_size=20&page=${input.page}`,
                {
                    'User-Agent': 'Food search app (practice) - windows - Version 1.0'
                }
            )
            return {
                data: await response.json(),
                query: input.value,
                page: input.page
            }
        } catch(err) {
            return err.message
        }
    }
)

export const foodSlice = createSlice({
    name: 'search',
    initialState: {data: {}, loader: false, query: '', page: '', modal: false},
    reducers: {
        modalChange: (state, action) => {
            state.modal = action.payload
        }
    },
    extraReducers: {
        [fetchFood.pending]: (state) => {
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
            state.page = action.payload.page
        }
    }
})

export const { modalChange } = foodSlice.actions

export default configureStore({
    reducer: foodSlice.reducer
  })