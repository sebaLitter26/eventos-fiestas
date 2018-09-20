import { Injectable } from '@angular/core';

import { Observable, interval, pipe } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { Producto } from '../models/producto';

import { ApiService } from './api.service';

@Injectable()
export class ProductoService {

  constructor(private _http: ApiService) { }

  getProductos(categoriaId = null) {


    if (categoriaId == null) {
      return this._http.get('productos')
        .pipe(map(res => res.json()));
    } else {
      return this._http.get('productos/' + categoriaId)
        .pipe(map(res => res.json()));
    }
  }

  getProducto(id: string) {

    return this._http.get('producto/' + id)
      .pipe(map(res => res.json()));
  }

  addProducto(producto: Producto) {


    return this._http.post('producto', producto)
      .pipe(map(res => res.json()));
  }

  editProducto(id: string, producto: Producto) {


    return this._http.put('producto/' + id, producto)
      .pipe(map(res => res.json()));
  }

  deleteProducto(id: string) {

    return this._http.delete('producto/' + id)
      .pipe(map(res => res.json()));
  }

}
