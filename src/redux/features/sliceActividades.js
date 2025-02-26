import {createSlice} from "@reduxjs/toolkit"


const initialState = {
    listaActividades : [],
    /* registros : [] */
};


const sliceActividades = createSlice({
    name: "actividades",
    initialState,
    reducers: {
        cargaInicialActividades : (state, action) => {
            /* const actividadesIniciales = action.payload;
            return actividadesIniciales; */
            state.listaActividades = action.payload
        },
    },
});

export const { cargaInicialActividades } = sliceActividades.actions;
export default sliceActividades.reducer;