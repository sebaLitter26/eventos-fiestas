import { Action } from '@ngrx/store';
import { Viaje, Direccion } from '../../models/index.models';

export const CARGAR_NUEVO_VIAJE ='CARGAR_NUEVO_VIAJE';
export const MODIFICACION_VIAJE = 'MODIFICACION_VIAJE';
export const CARGAR_LOCALIDADES = 'CARGAR_LOCALIDADES';
export const CLICK_MAPA = 'CLICK_MAPA';

export class CargarNuevoViaje implements Action {
  readonly type = CARGAR_NUEVO_VIAJE;
  constructor (public direccion: Direccion) {}
}

export class ModificarViaje implements Action {
  readonly type = MODIFICACION_VIAJE;
  constructor (public viaje: Viaje) {}
}

export class CargarLocalidades implements Action {
  readonly type = CARGAR_LOCALIDADES;
  constructor (public localidades: any) {}
}

export class CargarNuevasCoordenadas implements Action {
  readonly type = CLICK_MAPA;
  constructor (public coordenadas: any) {}
}

export type viajeActions = CargarNuevoViaje | ModificarViaje | CargarLocalidades | CargarNuevasCoordenadas;
