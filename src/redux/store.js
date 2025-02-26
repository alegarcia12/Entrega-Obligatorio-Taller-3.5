import { configureStore } from '@reduxjs/toolkit'
import sliceActividades from './features/sliceActividades'
import slicePaises from './features/slicePaises'
import sliceRegistros from './features/sliceRegistros'
import sliceSpinner from './features/sliceSpinner'


export const store = configureStore({
    reducer: {
        actividades: sliceActividades,
        paises: slicePaises,
        registros: sliceRegistros,
        spinner : sliceSpinner
    },
})