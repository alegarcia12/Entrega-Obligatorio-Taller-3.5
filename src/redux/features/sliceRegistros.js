import {createSlice} from "@reduxjs/toolkit"

const initialState = {
    /* listaActividades : [], */
    registros : []
};
 

const sliceRegistros = createSlice({
    name: "registros",
    initialState,
    reducers: {
        agregarRegistro: (state, action) => {
            const datosNuevoRegistro = action.payload;
            state.registros.push(datosNuevoRegistro);
        },

        cargaRegistros : (state, action) =>{
            state.registros = action.payload;
        },

        eliminarRegistro : (state, action) => {
            state.registros = state.registros.filter(registro => registro.id !== action.payload ); 
        }



    },
});

export const { agregarRegistro, cargaRegistros,eliminarRegistro } = sliceRegistros.actions;
export default sliceRegistros.reducer;