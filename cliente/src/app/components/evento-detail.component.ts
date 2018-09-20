import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

import { GLOBAL } from '../services/global';
import { UserService } from '../services/user.service';
import { EventoService } from '../services/evento.service';
import { Evento } from '../models/evento';
import { CategoriaService } from '../services/categoria.service';
import { Categoria } from '../models/categoria';

@Component({
  selector: 'evento-detail',
  templateUrl: '../views/evento-detail.html',
  providers: [EventoService, CategoriaService, UserService]
})

export class EventoDetailComponent implements OnInit {
  public evento: Evento;
  public categorias: Categoria[];
  public identity;
  public alertMessage;
  private url;


  constructor(
    private _route: ActivatedRoute,
    private _router: Router,
    private _eventoService: EventoService,
    private _categoriaService: CategoriaService,
    private _userService: UserService,
  ) {
    this.identity = this._userService.getIdentity();
    this.url = GLOBAL.url;
  }

  ngOnInit() {
    console.log('evento-edit.component.ts cargado');

    // Llamar al metodo del api para sacar un evento en base a su id getEvento
    this.getEvento();
  }

  getEvento() {
    this._route.params.forEach((params: Params) => {
      let id = params['id'];

      this._eventoService.getEvento(id).subscribe(
        response => {
          if (!response.evento) {
            this._router.navigate(['/']);
          } else {
            this.evento = response.evento;

            // Sacar los categorias del evento
            this._categoriaService.getCategorias(response.evento._id).subscribe(
              response => {
                if (!response.categorias) {
                  this.alertMessage = 'Este evento no tiene categorias';
                } else {
                  this.categorias = response.categorias;
                }
              },
              error => {
                var errorMessage = <any>error;

                if (errorMessage != null) {
                  var body = JSON.parse(error._body);
                  //this.alertMessage = body.message;

                  console.log(error);
                }
              });

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

  public confirmado;
  onDeleteConfirm(id) {
    this.confirmado = id;
  }

  onCancelCategoria() {
    this.confirmado = null;
  }

  onDeleteCategoria(id) {
    this._categoriaService.deleteCategoria(id).subscribe(
      response => {
        if (!response.categoria) {
          alert('Error en el servidor');
        }

        this.getEvento();
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
  }


}
