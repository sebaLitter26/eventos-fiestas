import { Viaje, Direccion } from '../../models/index.models';
import * as fromViajes from '../actions';

export interface ViajeState {
  viaje: Viaje ;
  direccion: Direccion ;
  localidades: any;
  coordenadas: any;
}

const estadoInicial: ViajeState ={
  viaje: null,
  direccion: null,
  localidades: [],
  coordenadas: [],
}


export function viajeReducer (state=estadoInicial, action: fromViajes.viajeActions): ViajeState {

    switch ( action.type ){
      case fromViajes.CARGAR_NUEVO_VIAJE:
        if(state.direccion){
          (Object.entries(action.direccion)).forEach((valor)=>{
            if(valor[1]==""){
              action.direccion[valor[0]]=state.direccion[valor[0]];
            };
          });
        }
        console.log(action.direccion);
        return Object.assign({}, state, {
              direccion: action.direccion
          })
      case fromViajes.MODIFICACION_VIAJE:
        console.log(action.viaje);
        return Object.assign({}, state, {
              viaje: action.viaje
          })
      case fromViajes.CARGAR_LOCALIDADES:
        return Object.assign({}, state, {
              localidades: action.localidades
          })
      case fromViajes.CLICK_MAPA:
        return Object.assign({}, state, {
              coordenadas: action.coordenadas
          })

      default:
        return state;

    }

}
