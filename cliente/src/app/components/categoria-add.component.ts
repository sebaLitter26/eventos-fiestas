import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

//import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { EventoService } from '../services/evento.service';
import { CategoriaService } from '../services/categoria.service';
import { Evento } from '../models/evento';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'categoria-add',
  templateUrl: '../views/categoria-add.html',
  providers: [CategoriaService, UserService]
})

export class CategoriaAddComponent implements OnInit {
  public titulo: string;
  public evento: Evento;
  public categoria: Categoria;
  public identity;
  public alertMessage;

  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _categoriaService: CategoriaService,
    private _userService: UserService,
    private _eventoService: EventoService
  ) {
    this.titulo = 'Crear nuevo categoria';
    this.categoria = new Categoria('', '', 2017, '', '');
    this.identity = this._userService.getIdentity();

  }

  ngOnInit() {
    console.log('categoria-add.component.ts cargado');
  }

  onSubmit() {
    this._route.params.forEach((params: Params) => {
      let evento_id = params['evento'];
      this.categoria.evento = evento_id;

      this._categoriaService.addCategoria(this.categoria).subscribe(
        response => {

          if (!response.categoria) {
            this.alertMessage = 'Error en el servidor';
          } else {
            this.alertMessage = '¡El categoria se ha creado correctamente!';
            this.categoria = response.categoria;

            this._router.navigate(['/editar-categoria', response.categoria._id]);
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
