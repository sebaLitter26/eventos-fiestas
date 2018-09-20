import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';

@Component({
  selector: 'producto-add',
  templateUrl: '../views/producto-add.html',
  providers: [ProductoService, UserService]
})

export class ProductoAddComponent implements OnInit {
  public titulo: string;
  public producto: Producto;
  public identity;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _productoService: ProductoService,
    private _userService: UserService,
  ) {
    this.titulo = 'Crear nueva canción';
    this.producto = new Producto(1, '', '', '', '');
    this.identity = this._userService.getIdentity();

  }

  ngOnInit() {
    console.log('producto-add.component.ts cargado');
  }


  onSubmit() {

    this._route.params.forEach((params: Params) => {
      let categoria_id = params['categoria'];
      this.producto.categoria = categoria_id;

      this._productoService.addProducto(this.producto).subscribe(
        response => {

          if (!response.producto) {
            this.alertMessage = 'Error en el servidor';
          } else {
            this.alertMessage = '¡El Producto se ha creado correctamente!';
            this.producto = response.producto;

            this._router.navigate(['/editar-producto', response.producto._id]);
          }

        },
        error => {
          var errorMessage = <any>error;

          if (errorMessage != null) {
            var body = JSON.parse(error._body);
            this.alertMessage = body.message;

            console.log(error);
          }
        }
      );

    });

  }


}
