import { Injectable } from '@angular/core';
//import 'rxjs/add/operator/map';
import { Observable, interval, pipe } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Evento } from '../models/evento';

import { ApiService } from './api.service';

@Injectable()
export class EventoService {

  constructor(private _http: ApiService) {
  }

  getEventos(page) {

    return this._http.get('eventos/' + page)
    //.pipe(map(res => res.json()));
  }


  getEvento(id: string) {


    return this._http.get('evento/' + id)
    //.pipe(map(res => res.json()));
  }

  addEvento(evento: Evento) {

    return this._http.post('evento', evento)
    //.pipe(map(res => res.json()));
  }

  editEvento(id: string, evento: Evento) {

    return this._http.put('evento/' + id, evento)
    //.pipe(map(res => res.json()));
  }

  deleteEvento(id: string) {

    return this._http.delete('evento/' + id)
    //.pipe(map(res => res.json()));
  }


}
