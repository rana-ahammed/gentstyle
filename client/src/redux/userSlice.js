import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || {}
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginredux: (state, action) => {
            state.user = action.payload;
        },
        logoutredux: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const { loginredux, logoutredux } = userSlice.actions;
export default userSlice.reducer;
