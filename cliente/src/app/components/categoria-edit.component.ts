import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { UserService } from '../services/user.service';
import { ApiService } from '../services/api.service';
import { CategoriaService } from '../services/categoria.service';
import { Evento } from '../models/evento';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'categoria-edit',
  templateUrl: '../views/categoria-add.html',
  providers: [CategoriaService, ApiService, UserService]
})

export class CategoriaEditComponent implements OnInit {
  public titulo: string;
  public categoria: Categoria;
  public identity;
  public alertMessage;
  public is_edit;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _http: ApiService,
    private _categoriaService: CategoriaService,
    public _userService: UserService,
  ) {
    this.titulo = 'Editar categoria';
    this.categoria = new Categoria('', '', 2017, '', '');
    this.is_edit = true;
    this.identity = this._userService.getIdentity();
  }

  ngOnInit() {
    console.log('categoria-edit.component.ts cargado');

    // Conseguir el categoria
    this.getCategoria();
  }

  getCategoria() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._categoriaService.getCategoria(id).subscribe(
        response => {

          if (!response.categoria) {
            this._router.navigate(['/']);
          } else {
            this.categoria = response.categoria;
          }

        },
        error => {
          var errorMessage = <any>error;

          if (errorMessage != null) {
            var body = JSON.parse(error._body);

            console.log(error);
          }
        }
      );
    });
  }

  onSubmit() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._categoriaService.editCategoria(id, this.categoria).subscribe(
        response => {

          if (!response.categoria) {
            this.alertMessage = 'Error en el servidor';
          } else {
            this.alertMessage = '¡La categoria se ha actualizado correctamente!';
            if (!this.filesToUpload) {
              // Redirigir
              this._router.navigate(['/evento', response.categoria.evento]);
            } else {
              // Subir la imagen del alblum
              this._http.makeFileRequest('upload-image-categoria/' + id, [], this.filesToUpload, 'image')
                .then(
                  (result) => {
                    this._router.navigate(['/evento', response.categoria.evento]);
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

  public filesToUpload: Array<File>;
  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
