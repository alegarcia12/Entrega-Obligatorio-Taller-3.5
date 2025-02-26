import {createSlice} from "@reduxjs/toolkit"

const initialState = [];

const slicePaises = createSlice({
    name: "paises",
    initialState,
    reducers: {
        cargaInicialPaises : (state, action) => {
            const paisesIniciales = action.payload;
            return paisesIniciales;
        },

    },
});

export const { cargaInicialPaises} = slicePaises.actions;
export default slicePaises.reducer;