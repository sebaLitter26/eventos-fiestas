import { Injectable } from '@angular/core';
import { Observable, interval, pipe } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Categoria } from '../models/categoria';

import { ApiService } from './api.service';

@Injectable()
export class CategoriaService {

  constructor(private _http: ApiService) { }

  getCategorias(eventoId = null) {


    if (eventoId == null) {
      return this._http.get('categorias')
        .pipe(map(res => res.json()));
    } else {
      return this._http.get('categorias/' + eventoId)
        .pipe(map(res => res.json()));
    }

  }

  getCategoria(id: string) {


    return this._http.get('categoria/' + id)
      .pipe(map(res => res.json()));
  }

  addCategoria(categoria: Categoria) {


    return this._http.post('categoria', categoria)
      .pipe(map(res => res.json()));
  }

  editCategoria(id: string, categoria: Categoria) {


    return this._http.put('categoria/' + id, categoria)
      .pipe(map(res => res.json()));
  }

  deleteCategoria(id: string) {



    return this._http.delete('categoria/' + id)
      .pipe(map(res => res.json()));
  }

}
