import { ActionReducerMap } from '@ngrx/store';
import * as reducers from './reducers';


export interface AppState {
    viaje: reducers.ViajeState;
    usuarios: reducers.UsuariosState;
    usuario: reducers.UsuarioState;
}

export const appReducers: ActionReducerMap<AppState> = {
    viaje: reducers.viajeReducer,
    usuarios: reducers.usuariosReducer,
    usuario: reducers.usuarioReducer
};
