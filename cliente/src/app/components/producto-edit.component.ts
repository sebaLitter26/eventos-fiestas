import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { ApiService } from '../services/api.service';
import { ProductoService } from '../services/producto.service';
import { Producto } from '../models/producto';


@Component({
  selector: 'producto-edit',
  templateUrl: '../views/producto-add.html',
  providers: [ProductoService, ApiService, UserService]
})

export class ProductoEditComponent implements OnInit {
  public titulo: string;
  public producto: Producto;
  public identity;
  public alertMessage;
  public is_edit;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: ApiService,
    private _productoService: ProductoService,
    private _userService: UserService,
  ) {
    this.titulo = 'Editar canción';
    this.producto = new Producto(1, '', '', '', '');
    this.is_edit = true;
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
    console.log('producto-edit.component.ts cargado');

    // Sacar la canción a editar
    this.getProducto();
  }

  getProducto() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._productoService.getProducto(id).subscribe(
        response => {
          if (!response.producto) {
            this._router.navigate(['/']);
          } else {
            this.producto = response.producto;
            console.log(this.producto);
          }
        },
        error => {
          var errorMessage = <any>error;

          if (errorMessage != null) {
            var body = JSON.parse(error._body);
            //this.alertMessage = body.message;

            console.log(error);
          }
        }
      );
    });
  }

  onSubmit() {

    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._productoService.editProducto(id, this.producto).subscribe(
        response => {

          if (!response.producto) {
            this.alertMessage = 'Error en el servidor';
          } else {
            this.alertMessage = '¡La canción se ha actualizamos correctamente!';

            if (!this.filesToUpload) {
              this._router.navigate(['/categoria', response.producto.categoria]);
            } else {
              // Subir el fichero de audio
              this._http.makeFileRequest('upload-file-producto/' + id, [], this.filesToUpload, 'file')
                .then(
                  (result) => {
                    this._router.navigate(['/categoria', response.producto.categoria]);
                  },
                  (error) => {
                    console.log(error);
                  }
                );
            }
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

  public filesToUpload;
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }


}
